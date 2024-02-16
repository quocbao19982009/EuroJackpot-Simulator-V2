import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    hover: {
      main: string;
    };
    disabled: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    hover?: {
      main?: string;
    };
    disabled?: {
      main?: string;
    };
  }
}

// A custom theme for this app
const theme = {
  eurojackpot: createTheme({
    palette: {
      // Primary is the main color game
      primary: { main: "#72008c", light: "#72007880" },
      // Secondary is the header color or the page color. Might need better name in the future
      secondary: { main: "#ffec01", dark: "#ffd000" },
      // Need to put the hover color here and stuff here
      action: {
        hover: "#FDF2FF",
      },
      hover: { main: "#FDF2FF" },
      disabled: { main: "#F7F9FC" },
      text: {
        primary: "#000",
        secondary: "#fff",
      },
    },
  }),
};

export default theme;
