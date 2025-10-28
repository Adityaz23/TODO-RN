import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";

export interface ColorSchema {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    success: [string, string];
    primary: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  background: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorSchema = {
  bg: "#f5fffa",
  surface: "#ffe4e1",
  text: "#808080",
  textMuted: "gray",
  border: "#c6635eff",
  primary: "#cd5c5cff",
  success: "#228b22",
  warning: "#b61d1dff",
  danger: "#8b0000",
  shadow: "#696969",
  gradients: {
    background: ["#ca8b8bff", "#efede5ff"],
    surface: ["#ffffff", "#f8fafc"],
    success: ["#419a30ff", "#4a6d90ff"],
    primary: ["#3b82f6", "#b6bfdaff"],
    warning: ["#d61313ff", "#d31313ff"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#b2dc51ff", "#d97706"],
    empty: ["#f3f4f6", "#e5e7eb"],
  },
  background: {
    input: "#ffffff",
    editInput: "#ffffff",
  },
  statusBarStyle: "light-content" as const,
};
const darkColors: ColorSchema = {
  bg: "#0f172a",
  surface: "#1e293b",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  border: "#627289ff",
  primary: "#e2eceeff",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
  shadow: "#000000",
  gradients: {
    background: ["#223b76ff", "#606b7eff"],
    surface: ["#1e293b", "#334155"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#374151", "#4b5563"],
    empty: ["#374151", "#4b5563"],
  },
  background: {
    input: "#1e293b",
    editInput: "#0f172a",
  },
  statusBarStyle: "light-content" as const,
};

interface ConstThemeContext {
  isDarkMode: Boolean;
  toggleDarkMode: () => void;
  colors: ColorSchema;
}

const ThemeContext = createContext<undefined | ConstThemeContext>(undefined); // basic react with which we are just going at the moment and some typescript for type safety.
// Now for the toggle function to work we need to have the local sstroage but the local storage in the mobile dev is different then the web for it we need the async-storage it is same as the local storage of the web.
// npm i @react-native-async-storage/async-storage
// Async storage is a react native simple,promise based API,for persisting small bits of the data on the user's device.

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async() =>{
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode",JSON.stringify(newMode))
  } 

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{isDarkMode,toggleDarkMode,colors}}>
        {children}
    </ThemeContext.Provider>
  )
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(context === undefined){
        throw new Error("useTheme must be used inside the ThemeProvdier");
    }
    return context
}

const Themes = () => {};

export default Themes;
