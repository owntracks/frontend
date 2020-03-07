import config from "@/config";

export const logLevels = {
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

/* eslint-disable no-console */
const logFunctions = {
  [logLevels.INFO]: console.info,
  [logLevels.WARNING]: console.warn,
  [logLevels.ERROR]: console.error,
};
/* eslint-enable no-console */

const logColors = {
  [logLevels.INFO]: "#0d66ba",
  [logLevels.WARNING]: "#cf8429",
  [logLevels.ERROR]: "#ad1515",
};

/**
 * Log a message to the browser's console.
 *
 * Convenience wrapper for `console.{info,warn,error}` doing some formatting
 * and taking the `verbose` config option into account.
 *
 * @param {String} label Log message label, useful for filtering
 * @param {String|LogMessageFunction} message Log message
 * @param {String} [level] Log level, use `logLevels` constants
 */
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
  logFunc(
    `%c${label}`,
    css,
    typeof message === "function" ? message() : message
  );
};
