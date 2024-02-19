import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gameColor: {
      disabled: string;
      selected: string;
      unselected: string;
      hover: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    gameColor?: {
      disabled?: string;
      selected?: string;
      unselected?: string;
      hover?: string;
    };
  }
}

// A custom theme for this app
const theme = {
  eurojackpot: createTheme({
    palette: {
      // Primary is the main color game
      // Main is the main color
      // Light is the hover color for game
      primary: { main: "#72008c", light: "#72007880" },
      // Secondary is the header color or the page color. Might need better name in the future
      secondary: { main: "#ffec01", dark: "#ffd000" },
      // Need to put the hover color here and stuff here
      gameColor: {
        disabled: "#F7F9FC",
        selected: "#72008c",
        unselected: "#FDF2FF",
        hover: "#72007880",
      },
      text: {
        primary: "#000",
        secondary: "#fff",
      },
    },
  }),
};

export default theme;
