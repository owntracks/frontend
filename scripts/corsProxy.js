const corsProxy = require("cors-anywhere");

const host = process.env.OT_PROXY_HOST || "0.0.0.0";
const port = process.env.OT_PROXY_PORT || 8888;
const username = process.env.OT_BASIC_AUTH_USERNAME || null;
const password = process.env.OT_BASIC_AUTH_PASSWORD || null;

const options = {
  httpProxyOptions: {
    ws: true,
  },
};

if (username !== null && password !== null) {
  console.log(`Basic auth for user ${username} enabled`);
  options.setHeaders = {
    Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
      "base64"
    )}`,
  };
}

corsProxy.createServer(options).listen(port, host, () => {
  console.log(`Running CORS Anywhere on http://${host}:${port}`);
});
