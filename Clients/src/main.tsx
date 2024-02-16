import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import theme from "./theme.tsx";

declare module "@mui/material/styles" {
  interface Theme {
    companyRed: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    companyRed?: {
      main?: string;
    };
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme["eurojackpot"]}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
