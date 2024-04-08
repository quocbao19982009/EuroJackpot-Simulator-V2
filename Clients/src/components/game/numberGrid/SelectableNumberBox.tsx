import { Box, Theme, styled } from "@mui/material";

interface SelectableNumberBoxProps {
  isSelected: boolean;
  isDisabled: boolean;
}

// Animation Keyframes
const selectingNumberKeyframes = {
  "0%": {
    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.24)",
    pointerEvents: "none",
    transform: "scale(1)",
  },
  "50%": {
    boxShadow: "0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)",
    pointerEvents: "none",
    transform: "scale(1.4)",
  },
  "100%": {
    pointerEvents: "auto",
    transform: "scale(1)",
  },
};

// This will be replace with themes
const getBackgroundColor = (
  theme: Theme,
  isSelected: boolean,
  isDisabled: boolean
) => {
  if (isSelected) {
    return theme.palette.gameColor.selected;
  }
  if (isDisabled) {
    return theme.palette.gameColor.disabled;
  }
  return theme.palette.gameColor.unselected;
};

const SelectableNumberBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isDisabled",
})<SelectableNumberBoxProps>(({ theme, isSelected, isDisabled }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  userSelect: "none",
  willChange: "transform",
  aspectRatio: "1 / 1",
  backgroundColor: getBackgroundColor(theme, isSelected, isDisabled),
  cursor: isDisabled ? "" : "pointer",
  pointerEvents: isDisabled ? "none" : "auto",
  color: isSelected
    ? theme.palette.gameColor.textUnselected
    : theme.palette.gameColor.textSelected,
  // hover effect
  "&:hover": {
    backgroundColor: isDisabled ? "" : theme.palette.gameColor.hover,
  },
  // Animation,
  transition: isSelected
    ? " background-color 0.3s ease-in-out"
    : "border-radius 0.2s ease-in-out, background-color 0.1s ease-in-out",
  borderRadius: isSelected ? "100%" : "0.25rem",
  animation: isSelected ? "selecting-number 0.3s ease-in-out forwards" : "",
  "@keyframes selecting-number": selectingNumberKeyframes,
}));

export default SelectableNumberBox;
