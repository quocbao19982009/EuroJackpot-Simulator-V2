import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import { createRandomTicket, isTicketCompleted } from "@/utils/functions";

import { useLotteryTicketDetails } from "@/hook/useLotteryTicketDetails";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  removeLotteryTicket,
  setCurrentTicketId,
  updateLotteryTicket,
} from "@/redux/slices/lotterySlice";
import { Box, Button, useTheme } from "@mui/material";
import LotteryTicket from "../lotteryTicket/LotteryTicket";
import TicketAction from "./TicketAction";

interface TicketRowProps {
  ticket: LotteryTicketModel;
  setOpenGameMobileSelectDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const TicketRow = ({
  ticket,
  setOpenGameMobileSelectDialog,
}: TicketRowProps) => {
  const theme = useTheme();
  const {
    currentEditingTicketId,
    isEditingTicket,
    gameSettings,
    currentGameType,
  } = useAppSelector((state) => state.lotterySlice);

  if (!gameSettings) {
    throw new Error("Game settings not loaded");
  }

  const dispatch = useAppDispatch();
  const {
    primaryNumberCount,
    primaryNumberRange,
    secondaryNumberCount,
    secondaryNumberRange,
  } = gameSettings[currentGameType];

  // State
  const isEditing = ticket.id === currentEditingTicketId;
  const isCurrentTicket = ticket.id === CURRENT_LOTTERY_ID;
  const isDisabled = isEditingTicket && ticket.id !== currentEditingTicketId;

  // Action
  const onRandomTicket = () => {
    const randomTicketInput = createRandomTicket(
      ticket,
      primaryNumberCount,
      primaryNumberRange,
      secondaryNumberCount,
      secondaryNumberRange
    );

    dispatch(updateLotteryTicket(randomTicketInput));
  };

  const onEditTicket = () => {
    dispatch(setCurrentTicketId(ticket.id));
    // If it is in mobile width, open the dialog
    if (window.innerWidth < 600) {
      setOpenGameMobileSelectDialog(true);
    }
  };
  const onFinishEdit = () => {
    dispatch(setCurrentTicketId(CURRENT_LOTTERY_ID));
  };

  const onDeleteTicket = () => {
    dispatch(removeLotteryTicket(ticket.id));
  };

  const {
    primaryNumberShow,
    secondaryNumbersShow,
    isAllFilled,
    isActionVisible,
  } = useLotteryTicketDetails(ticket.id);

  const getBackgroundColor = () => {
    if (isAllFilled && isCurrentTicket) {
      return theme.palette.lotteryColor.lightPrimary;
    }
    if (isEditing) {
      return theme.palette.gameColor.unselected;
    }

    return "";
  };

  return (
    <Box
      borderRadius={isEditing ? 1 : 0}
      border={
        isEditing ? `2px solid ${theme.palette.lotteryColor.primary}` : ""
      }
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
          onDelete={onDeleteTicket}
          onEdit={onEditTicket}
          onRandom={onRandomTicket}
        />
      )}
    </Box>
  );
};

export default TicketRow;
