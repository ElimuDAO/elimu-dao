"use client";
import { mainTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Elimu DAO</title>
        <meta name="description" content="Verifiable Grassroots Education" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
