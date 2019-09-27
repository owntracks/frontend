import { getApiUrl } from "@/util";

const fetchApi = (path, params = {}) => {
  const url = getApiUrl(path);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url);
};

export const getVersion = async () => {
  const response = await fetchApi("/api/0/version");
  const json = await response.json();
  const version = json.version;
  return version;
};

export const getUsers = async () => {
  const response = await fetchApi("/api/0/list");
  const json = await response.json();
  const users = json.results;
  return users;
};

export const getDevices = async users => {
  const devices = {};
  await Promise.all(
    users.map(async user => {
      const response = await fetchApi(`/api/0/list`, { user });
      const json = await response.json();
      const userDevices = json.results;
      devices[user] = userDevices;
    })
  );
  return devices;
};

export const getLastLocations = async (user, device) => {
  const params = {};
  if (user) {
    params["user"] = user;
    if (device) {
      params["device"] = device;
    }
  }
  const response = await fetchApi("/api/0/last", params);
  const json = await response.json();
  return json;
};

export const getUserDeviceLocationHistory = async (
  user,
  device,
  start,
  end
) => {
  const startDate = start.toISOString().split("T")[0];
  const endDate = end.toISOString().split("T")[0];
  const response = await fetchApi("/api/0/locations", {
    from: `${startDate}T00:00:00`,
    to: `${endDate}T23:59:59`,
    user,
    device,
    format: "json",
  });
  const json = await response.json();
  return json.data;
};

export const getLocationHistory = async (devices, start, end) => {
  const locationHistory = {};
  await Promise.all(
    Object.keys(devices).map(async user => {
      locationHistory[user] = {};
      await Promise.all(
        devices[user].map(async device => {
          locationHistory[user][device] = await getUserDeviceLocationHistory(
            user,
            device,
            start,
            end
          );
        })
      );
    })
  );
  return locationHistory;
};

export const connectWebsocket = async callback => {
  let url = getApiUrl("/ws/last");
  url.protocol = url.protocol.replace("http", "ws");
  url = url.href;
  const ws = new WebSocket(url);
  console.info(`[WS] Connecting to ${url}...`);
  ws.onopen = () => {
    console.info("[WS] Connected");
    ws.send("LAST");
  };
  ws.onclose = () => {
    console.info("[WS] Disconnected. Reconnecting in one second...");
    setTimeout(connectWebsocket, 1000);
  };
  ws.onmessage = async msg => {
    if (msg.data) {
      try {
        const data = JSON.parse(msg.data);
        if (data._type === "location") {
          console.info("[WS] Location update received");
          callback && (await callback());
        }
      } catch (err) {
        if (msg.data !== "LAST") {
          console.exception(err);
        }
      }
    } else {
      console.info("[WS] Ping");
    }
  };
};
