import React, { createContext, useState, useContext, useEffect } from "react";
const colors = require("tailwindcss/colors");

interface ThemeContextProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext must be used within a FormProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isDarkMode, setisDarkMode] = useState(false);
  const toggleTheme = () => {
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      setisDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setisDarkMode(false);
    }
  };
  const t = {
    darkMode: "class",
    theme: {
      colors: {
        ...colors,
        //#f0f8ff #f2f2f7
        zinc: {
          50: "#f0f8ff",
          100: "#e5e5ea",
          200: "#d1d1d6",
          300: "#c7c7cc",
          400: "#aeaeb2",
          500: "#636366",
          600: "#48484a",
          700: "#3a3a3c",
          800: "#1F222A",
          900: "#000000",
        },
    
      },
    },
  };
  useEffect(() => {
    //@ts-ignore
    if (window.tailwind != undefined) {
      //@ts-ignore
      window.tailwind.config = t;
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
