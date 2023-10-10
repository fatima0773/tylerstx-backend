// Winston Import
import winston from 'winston';

// Define custom log levels with colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
  }
};

// Add the custom log levels to the logger
winston.addColors(customLevels.colors);

// Create logger with custom levels
export const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// END OF FILE