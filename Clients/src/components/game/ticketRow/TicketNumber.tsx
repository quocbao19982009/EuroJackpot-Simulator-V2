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

  const getBackgroundColor = () => {
    if (isHighlighted && isNumberPrimary) {
      // GameName is defiled in the LotteryTicket component
      if (gameName === GameModelName.Lotto) {
        return theme.palette.allGameColor.lotto.primaryColor;
      } else if (gameName === GameModelName.Eurojackpot) {
        return theme.palette.allGameColor.eurojackpot.primaryColor;
      }

      return theme.palette.lotteryColor.primary;
    } else if (isHighlighted && numberType === "secondary") {
      // GameName is defiled in the LotteryTicket component
      if (gameName === GameModelName.Lotto) {
        return theme.palette.allGameColor.lotto.secondaryColor;
      } else if (gameName === GameModelName.Eurojackpot) {
        return theme.palette.allGameColor.eurojackpot.secondaryColor;
      }
      // If not than default to secondary color
      return theme.palette.lotteryColor.secondary;
    }
    return "#fff";
  };

  // TODO: This need to bet set in Theme for correct color and contrast
  const getColor = () => {
    if (isHighlighted && isNumberPrimary) {
      if (gameName === GameModelName.Lotto) {
        return theme.palette.allGameColor.lotto.primaryTextColor;
      } else if (gameName === GameModelName.Eurojackpot) {
        return theme.palette.allGameColor.eurojackpot.primaryTextColor;
      }

      return theme.palette.gameColor.textUnselected;
    }

    return theme.palette.text.primary;
  };

  const getBorderColor = () => {
    if (isManualSelection) {
      return theme.palette.lotteryColor.manualSelectedBorder;
    }
    if (isHighlighted && isNumberPrimary) {
      if (gameName === GameModelName.Lotto) {
        return theme.palette.allGameColor.lotto.primaryColor;
      } else if (gameName === GameModelName.Eurojackpot) {
        return theme.palette.allGameColor.eurojackpot.primaryColor;
      }
      return theme.palette.lotteryColor.primary;
    }
    if (isHighlighted && isNumberSecondary) {
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
