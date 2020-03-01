import { log, logLevels } from "@/logging";
import { getApiUrl } from "@/util";

/**
 * Callback for new WebSocket location messages.
 *
 * @callback webSocketLocationCallback
 */

/**
 * Fetch an API resource.
 *
 * @param {String} path API resource path
 * @param {Object} [params] Query parameters
 * @returns {Promise} Promise returned by the fetch function
 */
const fetchApi = (path, params = {}) => {
  const url = getApiUrl(path);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  log("HTTP", `GET ${url.href}`);
  return fetch(url.href).catch(error => log("HTTP", error, logLevels.ERROR));
};

/**
 * Get the recorder's version.
 *
 * @returns {String} Version
 */
export const getVersion = async () => {
  const response = await fetchApi("/api/0/version");
  const json = await response.json();
  const version = json.version;
  return version;
};

/**
 * Get all users.
 *
 * @returns {Array.<User>} Array of usernames
 */
export const getUsers = async () => {
  const response = await fetchApi("/api/0/list");
  const json = await response.json();
  const users = json.results;
  return users;
};

/**
 * Get all devices for the provided users.
 *
 * @param {Array.<User>} users Array of usernames
 * @returns {Object.<User, Array.<Device>>}
 *   Object mapping each username to an array of device names
 */
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

/**
 * Get last locations for a specific or all user/device.
 *
 * @param {User} [user] Get last locations of all devices from this user
 * @param {Device} [device] Get last location of specific device
 * @returns {Array.<LastLocation>} Array of last location objects
 */
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

/**
 * Get the location history of a specific user/device.
 *
 * @param {User} user Username
 * @param {Device} device Device name
 * @param {String} start Start date and time in UTC
 * @param {String} end End date and time in UTC
 * @returns {LocationHistory} Array of location history objects
 */
export const getUserDeviceLocationHistory = async (
  user,
  device,
  start,
  end
) => {
  const response = await fetchApi("/api/0/locations", {
    from: start,
    to: end,
    user,
    device,
    format: "json",
  });
  const json = await response.json();
  return json.data;
};

/**
 * Get the location history of multiple devices.
 *
 * @param {Object.<User, Array.<Device>>} devices
 *   Devices of which the history should be fetched
 * @param {String} start Start date and time in UTC
 * @param {String} end End date and time in UTC
 * @returns {Object.<User, Object.<Device, LocationHistory>>}
 *   Array of location history objects
 */
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

/**
 * Connect to the WebSocket API, reconnect when necessary and handle received
 * messages.
 *
 * @param {webSocketLocationCallback} [callback] Callback for location messages
 */
export const connectWebsocket = async callback => {
  let url = getApiUrl("/ws/last");
  url.protocol = url.protocol.replace("http", "ws");
  url = url.href;
  const ws = new WebSocket(url);
  log("WS", `Connecting to ${url}`);
  ws.onopen = () => {
    log("WS", "Connected");
    ws.send("LAST");
  };
  ws.onclose = event => {
    log(
      "WS",
      `Disconnected unexpectedly (reason: ${event.reason ||
        "unknown"}). Reconnecting in one second.`,
      logLevels.WARNING
    );
    setTimeout(connectWebsocket, 1000);
  };
  ws.onmessage = async msg => {
    if (msg.data) {
      try {
        const data = JSON.parse(msg.data);
        if (data._type === "location") {
          log("WS", "Location update received");
          callback && (await callback());
        }
      } catch (err) {
        if (msg.data !== "LAST") {
          log("WS", err, logLevels.ERROR);
        }
      }
    } else {
      log("WS", "Ping");
    }
  };
};
