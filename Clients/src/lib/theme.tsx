import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gameColor: {
      disabled: string;
      selected: string;
      unselected: string;
      hover: string;
      textSelected: string;
      textUnselected: string;
    };
    lotteryColor: {
      primary: string;
      lightPrimary: string;
      secondary: string;
      defaultBorder: string;
      manualSelectedBorder: string;
      highlightBorder: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    gameColor?: {
      disabled?: string;
      selected?: string;
      unselected?: string;
      hover?: string;
      textSelected?: string;
      textUnselected?: string;
    };
    lotteryColor?: {
      primary?: string;
      lightPrimary?: string;
      secondary?: string;
      defaultBorder?: string;
      manualSelectedBorder?: string;
      highlightBorder?: string;
    };
  }
}

// A custom theme for this app
const theme = {
  eurojackpot: createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          InputLabelProps: {
            style: { color: "#000" },
          },
        },
      },
      // Make the outline button always black and border color always yellow
      MuiButton: {
        styleOverrides: {
          outlined: {
            color: "#000",
            borderColor: "#72008c",
          },
        },
      },
    },
    palette: {
      // Primary is the main color game
      // Main is the main color
      // Light is the hover color for game
      // Secondary is the header color or the page color. Might need better name in the future
      secondary: { main: "#ffec01", dark: "#ffd000" },
      // Need to put the hover color here and stuff here
      gameColor: {
        disabled: "#F7F9FC",
        selected: "#72008c",
        unselected: "#FDF2FF",
        hover: "#72007880",
        textSelected: "#000",
        textUnselected: "#fff",
      },
      lotteryColor: {
        primary: "#72008c",
        lightPrimary: "#72007880",
        secondary: "#ffec01",
        defaultBorder: "rgb(163, 170, 180)",
        manualSelectedBorder: "rgb(83, 88, 96)",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
      },
    },
  }),
  lotto: createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          InputLabelProps: {
            style: { color: "#000" },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            color: "#000",
            borderColor: "rgb(255, 221, 0)",
          },
        },
      },
    },
    palette: {
      // Primary is the main color game
      // Main is the main color
      // Light is the hover color for game

      // Secondary is the header color or the page color. Might need better name in the future
      secondary: { main: "#ffec01", dark: "#ffd000" },
      // Need to put the hover color here and stuff here
      gameColor: {
        disabled: "#F7F9FC",
        selected: "rgb(255, 200, 0)",
        unselected: "rgb(255, 251, 189)",
        hover: "#ffd000",
        textSelected: "#000",
        textUnselected: "#000",
      },
      lotteryColor: {
        primary: "rgb(255, 200, 0)",
        lightPrimary: "#ffd000",
        secondary: "#ffec01",
        defaultBorder: "rgb(163, 170, 180)",
        manualSelectedBorder: "rgb(83, 88, 96)",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
      },
    },
  }),
};

export default theme;
