// Simple logger utility to help with debugging

const isDev = import.meta.env.DEV;

// Used for type checking log levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const logger = {
  debug: (message: string, ...args: any[]) => {
    if (isDev) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: any[]) => {
    console.info(`[INFO] ${message}`, ...args);
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  
  // Log database operations specifically
  db: (operation: string, details: any) => {
    if (isDev) {
      console.log(`[DB] ${operation}:`, details);
    }
  }
};

export default logger;