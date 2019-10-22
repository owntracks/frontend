import config from "@/config";

export const logLevels = {
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

const logFunctions = {
  [logLevels.INFO]: console.info,
  [logLevels.WARNING]: console.warn,
  [logLevels.ERROR]: console.error,
};

const logColors = {
  [logLevels.INFO]: "#0d66ba",
  [logLevels.WARNING]: "#cf8429",
  [logLevels.ERROR]: "#ad1515",
};

export const log = (label, message, level = logLevels.INFO) => {
  if (!Object.keys(logLevels).includes(level)) {
    log("WARNING", `invalid log level: ${level}`, logLevels.WARNING);
    return;
  }
  if (level !== logLevels.ERROR && !config.verbose) {
    return;
  }
  const css = `
  background: ${logColors[level]};
  border-radius: 5px;
  color: #fff;
  padding: 3px;
  `;
  const logFunc = logFunctions[level];
  logFunc(`%c${label}`, css, message);
};
