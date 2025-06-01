import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  // Always use dark mode for this app
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Apply dark mode class to document
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-gray-900');
  }, []);

  const toggleDarkMode = () => {
    // For this app, we always stay in dark mode
    setDarkMode(true);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};