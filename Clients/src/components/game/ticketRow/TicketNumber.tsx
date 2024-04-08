import { Box, useTheme } from "@mui/material";

interface TicketNumberProps {
  number: number;
  isManualSelection?: boolean;
  isHighlighted?: boolean;
  numberType: "primary" | "secondary";
}

const TicketNumber = ({
  number,
  isManualSelection,
  isHighlighted,
  numberType,
}: TicketNumberProps) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (isHighlighted && numberType === "primary") {
      return theme.palette.lotteryColor.primary;
    } else if (isHighlighted && numberType === "secondary") {
      return theme.palette.lotteryColor.secondary;
    }
    return "#fff";
  };

  // TODO: This need to bet set in Theme for correct color and contrast
  const getColor = () => {
    if (isHighlighted && numberType === "primary") {
      return theme.palette.gameColor.textUnselected;
    }

    return theme.palette.text.primary;
  };

  const getBorderColor = () => {
    if (isManualSelection) {
      return theme.palette.lotteryColor.manualSelectedBorder;
    }
    if (isHighlighted && numberType === "primary") {
      return theme.palette.lotteryColor.primary;
    }
    if (isHighlighted && numberType === "secondary") {
      return theme.palette.lotteryColor.secondary;
    }
    return theme.palette.lotteryColor.defaultBorder;
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: getBackgroundColor(),
        color: getColor(),
        border: "2px solid transparent",
        borderRadius: "100%",
        display: "flex",
        height: "2rem",
        justifyContent: "center",
        margin: "0.25rem 0.25rem 0.25rem 0",
        fontSize: "1rem",
        fontWeight: 600,
        width: "2rem",
        borderColor: getBorderColor(),
      }}
    >
      {number}
    </Box>
  );
};

export default TicketNumber;
