import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "light"
    ? {
        green: {
          100: "#E8F5E9",
          200: "#C8E6C9",
          300: "#A5D6A7",
          400: "#81C784",
          500: "#66BB6A",
          600: "#4CAF50",
          700: "#43A047",
          800: "#388E3C",
          900: "#2E7D32",
        },
        red: {
          100: "#FFEBEE",
          200: "#FFCDD2",
          300: "#EF9A9A",
          400: "#E57373",
          500: "#EF5350",
          600: "#F44336",
          700: "#E53935",
          800: "#D32F2F",
          900: "#C62828",
        },
        greenAccent: {
          100: "#B9F6CA",
          200: "#69F0AE",
          400: "#00E676",
          700: "#00C853",
        },
        pure_white: "#FFFFFF",
        black: "#000000",
        off_white: "#F5F5F5",
        ivory: "#FFFFF0",
        linen: "#FAF0E6",
        grey: {
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        table_header: "#40a845",
      }
    : {
        green: {
          100: "#E8F5E9",
          200: "#C8E6C9",
          300: "#A5D6A7",
          400: "#81C784",
          500: "#66BB6A",
          600: "#4CAF50",
          700: "#43A047",
          800: "#388E3C",
          900: "#2E7D32",
        },
        red: {
          100: "#FFEBEE",
          200: "#FFCDD2",
          300: "#EF9A9A",
          400: "#E57373",
          500: "#EF5350",
          600: "#F44336",
          700: "#E53935",
          800: "#D32F2F",
          900: "#C62828",
        },
        greenAccent: {
          100: "#B9F6CA",
          200: "#69F0AE",
          400: "#00E676",
          700: "#00C853",
        },
        dark_white: "#FFFFFF",
        cool_grey: "#DCDCDC",
        smoke: "#EEEFF1",
        ghost_white: "#F8F8FF",
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: { main: colors.green[500] },
            secondary: { main: colors.greenAccent[500] },
            error: { main: colors.red[500] },
            success: { main: colors.greenAccent[500] },
            background: { default: "#F5F5F5" },
            text: { primary: "#000000" },
            divider: "rgba(0, 0, 0, 0.12)",
          }
        : {
            primary: { main: colors.green[500] },
            secondary: { main: colors.greenAccent[500] },
            error: { main: colors.red[500] },
            success: { main: colors.greenAccent[500] },
            background: { default: "#121212" },
            text: { primary: "#FFFFFF" },
            divider: "rgba(255, 255, 255, 0.12)",
          }),
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
