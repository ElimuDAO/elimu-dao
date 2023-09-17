"use client";
import { createTheme } from "@mui/material/styles";
import { DM_Sans } from "next/font/google";

export const chakraPetch = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#0097a7",
    },
    secondary: {
      main: "#fff",
      contrastText: "#0097a7",
    },
    error: {
      main: "#ff1744",
    },
  },
  typography: {
    fontFamily: chakraPetch.style.fontFamily,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
