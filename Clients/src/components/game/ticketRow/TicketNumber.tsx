import { ShareGameColor } from "@/lib/theme";
import { GameModelName } from "@/types/GameModel";
import { Box, useTheme } from "@mui/material";

interface TicketNumberProps {
  number: number;
  isManualSelection?: boolean;
  isHighlighted?: boolean;
  numberType: "primary" | "secondary";
  gameName?: GameModelName;
}

const TicketNumber = ({
  number,
  isManualSelection,
  isHighlighted,
  numberType,
  gameName,
}: TicketNumberProps) => {
  const theme = useTheme();
  const isNumberPrimary = numberType === "primary";
  const isNumberSecondary = numberType === "secondary";

  const getColorFromTheme = (colorKey: keyof ShareGameColor) => {
    if (gameName === GameModelName.Lotto) {
      return theme.palette.allGameColor.lotto[colorKey];
    } else if (gameName === GameModelName.Eurojackpot) {
      return theme.palette.allGameColor.eurojackpot[colorKey];
    }
    return theme.palette.common.white;
  };
  const getBackgroundColor = () => {
    if (isHighlighted) {
      if (isNumberPrimary) {
        return getColorFromTheme("primaryColor");
      } else if (isNumberSecondary) {
        return getColorFromTheme("secondaryColor");
      }
    }
    return theme.palette.common.white;
  };

  const getColor = () => {
    if (isHighlighted) {
      if (isNumberPrimary) {
        return gameName === GameModelName.Lotto
          ? theme.palette.allGameColor.lotto.primaryTextColor
          : gameName === GameModelName.Eurojackpot
          ? theme.palette.allGameColor.eurojackpot.primaryTextColor
          : theme.palette.gameColor.textUnselected;
      }
    }
    return theme.palette.text.primary;
  };

  const getBorderColor = () => {
    if (isManualSelection) {
      return theme.palette.lotteryColor.manualSelectedBorder;
    }
    if (isHighlighted) {
      return isNumberPrimary
        ? getColorFromTheme("primaryColor")
        : isNumberSecondary
        ? theme.palette.lotteryColor.secondary
        : theme.palette.lotteryColor.defaultBorder;
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
