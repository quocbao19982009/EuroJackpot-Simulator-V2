import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import { isTicketCompleted } from "@/utils/functions";

import { Box, Button, useTheme } from "@mui/material";
import LotteryTicket from "../lotteryTicket/LotteryTicket";
import TicketAction from "./TicketAction";

interface TicketRowProps {
  ticket: LotteryTicketModel;
  isCurrentTicket: boolean; // This is if the ticket is CURRENT_LOTTERY_ID
  isEditing: boolean; // If the ticket is editing mode
  isDisabled: boolean; // If the ticket is disabled
  primaryNumberCount: number;
  secondaryNumberCount: number;
  onDelete: (id: string) => void;
  onRandom: () => void;
  onEdit: () => void;
  onFinishEdit: () => void;
}

const TicketRow = ({
  ticket,
  //TODO: change the name from IsCurrentTicket to something more meaningful
  isCurrentTicket,
  isDisabled,
  isEditing,
  onFinishEdit,
  primaryNumberCount,
  secondaryNumberCount,
  onDelete,
  onEdit,
  onRandom,
}: TicketRowProps) => {
  const theme = useTheme();
  // NOTE: these predraw circle only in for the isCurrenTickets
  const emptyPrimaryNumber = new Array(primaryNumberCount).fill(undefined);
  const emptySecondaryNumber = new Array(secondaryNumberCount).fill(undefined);

  const primaryNumberShow: number[] = ticket.primaryNumbers.concat(
    emptyPrimaryNumber.slice(ticket.primaryNumbers.length)
  );

  const secondaryNumbersShow: number[] = ticket.secondaryNumbers.concat(
    emptySecondaryNumber.slice(ticket.secondaryNumbers.length)
  );

  const isActionVisible =
    primaryNumberShow.some((number) => typeof number === "number") ||
    secondaryNumbersShow.some((number) => typeof number === "number");

  const isAllFilled =
    primaryNumberShow.every((number) => typeof number === "number") &&
    secondaryNumbersShow.every((number) => typeof number === "number");

  const getBackgroundColor = () => {
    if (isAllFilled && isCurrentTicket) {
      return theme.palette.primary.light;
    }
    if (isEditing) {
      return theme.palette.gameColor.unselected;
    }

    return "";
  };

  if (ticket.id === CURRENT_LOTTERY_ID) {
    console.log("isEditing", isEditing);
    console.log("isCurrentTicket", isCurrentTicket);
  }

  return (
    <Box
      borderRadius={isEditing ? 1 : 0}
      border={isEditing ? "2px solid rgb(114, 0, 140)" : ""}
      sx={{
        borderRadius: 1,
        padding: {
          xs: "0.25rem 0.5rem",
          md: "0.5rem 1rem",
        },
        display: "flex",
        fontWeight: 600,
        justifyContent: "space-between",
        transition: "background-color .3s ease-in-out",
        backgroundColor: getBackgroundColor(),
        ":nth-of-type(2n)": {
          backgroundColor: getBackgroundColor() || "#f7f9fc",
        },
        opacity: isDisabled ? 0.5 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      <LotteryTicket
        id={ticket.id}
        primaryNumbers={primaryNumberShow}
        secondaryNumbers={secondaryNumbersShow}
        manualSelection={ticket.manualSelection}
      />

      {isEditing && !isCurrentTicket ? (
        <Button
          disabled={
            !isTicketCompleted(
              ticket.primaryNumbers,
              ticket.secondaryNumbers,
              primaryNumberCount,
              secondaryNumberCount
            )
          }
          onClick={onFinishEdit}
        >
          OK
        </Button>
      ) : (
        <TicketAction
          hidden={!isActionVisible}
          id={ticket.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onRandom={onRandom}
        />
      )}
    </Box>
  );
};

export default TicketRow;
