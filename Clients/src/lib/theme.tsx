import { createTheme } from "@mui/material/styles";

export interface ShareGameColor {
  primaryColor: string;
  primaryTextColor: string;
  secondaryColor: string;
  secondaryTextColor: string;
}

const allGameColorDefault = {
  eurojackpot: {
    primaryColor: "#72008c",
    primaryTextColor: "#fff",
    secondaryColor: "#ffec01",
    secondaryTextColor: "#000",
  },
  lotto: {
    primaryColor: "#ffec01",
    primaryTextColor: "#000",
    secondaryColor: "",
    secondaryTextColor: "#000",
  },
};
const commonBreakpoints = {
  values: {
    xs: 0,
    mobile: 400,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

const commonTextFieldProps = {
  defaultProps: {
    InputLabelProps: {
      style: { color: "#000" },
    },
  },
};

const commonText = {
  primary: "rgba(0, 0, 0, 0.87)",
  secondary: "rgba(0, 0, 0, 0.6)",
};

const commonSecondary = { main: "#ffdd00", dark: "#ffd000" };

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    mobile: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
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
    allGameColor: {
      lotto: ShareGameColor;
      eurojackpot: ShareGameColor;
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
    allGameColor?: {
      lotto?: ShareGameColor;
      eurojackpot?: ShareGameColor;
    };
  }
}

// A custom theme for this app
const theme = {
  eurojackpot: createTheme({
    breakpoints: commonBreakpoints,
    components: {
      MuiTextField: commonTextFieldProps,
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
      secondary: commonSecondary,
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
      allGameColor: allGameColorDefault,
      text: commonText,
    },
  }),
  lotto: createTheme({
    breakpoints: commonBreakpoints,
    components: {
      MuiTextField: commonTextFieldProps,
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
      // Secondary is the header color or the page color. Might need better name in the future
      secondary: commonSecondary,
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
        primary: "#ffec01",
        lightPrimary: "#ffd000",
        secondary: "#ffec01",
        defaultBorder: "rgb(163, 170, 180)",
        manualSelectedBorder: "rgb(83, 88, 96)",
      },
      allGameColor: allGameColorDefault,
      text: commonText,
    },
  }),
};

export default theme;
