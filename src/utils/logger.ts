// Simple logger utility to help with debugging

const isDev = import.meta.env.DEV;

// Used for type checking log levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (isDev) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: unknown[]) => {
    console.info(`[INFO] ${message}`, ...args);
  },
  
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  
  error: (message: string, ...args: unknown[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  
  // Log database operations specifically
  db: (operation: string, details: unknown) => {
    if (isDev) {
      console.log(`[DB] ${operation}:`, details);
    }
  }
};

export default logger;