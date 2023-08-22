import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from 'react-native'; 
interface ThemeContextType {
  isDarkMode: boolean;
  setToLightTheme: () => Promise<void>;
  setToDarkTheme: () => Promise<void>;
  setToSystemTheme: () => Promise<void>; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadModePreference().then(preferredMode => {
      setIsDarkMode(preferredMode === 'dark');
    });
  }, []);

  const loadModePreference = async () => {
    try {
      const mode = await AsyncStorage.getItem('theme');
      return mode || 'light';
    } catch (error) {
      console.error('Error loading mode preference', error);
      return 'light';
    }
  };

  const setToLightTheme = async () => {
    setIsDarkMode(false);
    try {
      await AsyncStorage.setItem('theme', 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };
  const setToSystemTheme = async () => {
    const systemColorScheme = Appearance.getColorScheme();
    setIsDarkMode(systemColorScheme === 'dark');
    console.log(systemColorScheme)
    try {
      await AsyncStorage.setItem('theme', systemColorScheme || 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
    if (systemColorScheme === 'dark') {
      setToDarkTheme();
    } else {
      setToLightTheme();
 
  };
  };


  const setToDarkTheme = async () => {
    setIsDarkMode(true);
    try {
      await AsyncStorage.setItem('theme', 'dark');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const themeContextValue: ThemeContextType = {
    isDarkMode,
    setToLightTheme,
    setToDarkTheme,
    setToSystemTheme
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};