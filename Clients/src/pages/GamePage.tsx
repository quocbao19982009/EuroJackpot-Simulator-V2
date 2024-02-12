import NumberGrid from "@/components/game/numberGrid/NumberGrid";
import TicketRow from "@/components/game/ticketRow/TicketRow";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addLotteryTicket,
  clearCurrentLotteryTicket,
  removeLotteryTicket,
  setCurrentTicket,
  setCurrentTicketId,
  // setCurrentLotteryTicket,
  setPrimaryNumber,
  setSecondaryNumber,
  updateLotteryTicket,
} from "@/redux/slices/lotterySlice";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/ultis/constants";
import { createRandomTicket } from "@/ultis/functions";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";

const GamePage = () => {
  const {
    completedLotteries,
    maxPrimaryNumberSelected,
    primaryNumberTotals,
    maxSecondaryNumberSelected,
    secondaryNumberTotals,
    currentEditingTicketId,
    isEditingTicket,
  } = useAppSelector((state) => state.lotterySlice);

  const currentLottery = completedLotteries.find(
    (ticket) => ticket.id === currentEditingTicketId
  )!;
  console.log("currentLottery", currentLottery);

  const dispatch = useAppDispatch();

  const onAddRandomTicket = (ticket: LotteryTicketModel) => {
    const randomTicketInput = createRandomTicket(
      ticket,
      maxPrimaryNumberSelected,
      primaryNumberTotals,
      maxSecondaryNumberSelected,
      secondaryNumberTotals
    );
    dispatch(setCurrentTicket(randomTicketInput));
    setTimeout(() => {
      dispatch(addLotteryTicket(randomTicketInput));
      dispatch(clearCurrentLotteryTicket());
    }, 1000);
  };

  const onRandomTicket = (ticket: LotteryTicketModel) => {
    const randomTicketInput = createRandomTicket(
      ticket,
      maxPrimaryNumberSelected,
      primaryNumberTotals,
      maxSecondaryNumberSelected,
      secondaryNumberTotals
    );

    dispatch(updateLotteryTicket(randomTicketInput));
  };

  const onEditTicket = (ticket: LotteryTicketModel) => {
    dispatch(setCurrentTicketId(ticket.id));
  };
  const onFinishEdit = () => {
    dispatch(setCurrentTicketId(CURRENT_LOTTERY_ID));
  };

  // Check if the ticket is completed if this a good way?
  useEffect(() => {
    if (
      !isEditingTicket &&
      currentLottery.primaryNumbers.length === maxPrimaryNumberSelected &&
      currentLottery.secondaryNumbers.length === maxSecondaryNumberSelected
    ) {
      const timeoutId = setTimeout(() => {
        dispatch(addLotteryTicket(currentLottery));
        dispatch(clearCurrentLotteryTicket());
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [
    currentLottery,
    dispatch,
    maxPrimaryNumberSelected,
    maxSecondaryNumberSelected,
  ]);

  return (
    <Box sx={{ py: 4 }}>
      GamePage
      <NumberGrid
        title="Choose numbers"
        totalNumbers={primaryNumberTotals}
        maxNumberSelected={maxPrimaryNumberSelected}
        selectedNumbers={currentLottery.primaryNumbers}
        onNumberSelected={(number) => dispatch(setPrimaryNumber(number))}
      />
      <NumberGrid
        title="Select Star numbers"
        totalNumbers={secondaryNumberTotals}
        maxNumberSelected={maxSecondaryNumberSelected}
        selectedNumbers={currentLottery.secondaryNumbers}
        onNumberSelected={(number) => dispatch(setSecondaryNumber(number))}
      />
      <br></br>
      <Button onClick={() => onAddRandomTicket(currentLottery)}>
        Create a Random Ticket
      </Button>
      <Box>
        {completedLotteries
          .slice()
          .sort((a, b) => {
            // If ticket has the id of CURRENT_LOTTERY_ID, it should be at the first of the list. If not sort by createTime
            if (a.id === CURRENT_LOTTERY_ID) return -1;
            if (b.id === CURRENT_LOTTERY_ID) return 1;
            return b.createTime - a.createTime;
          })
          .map((ticket) => (
            <TicketRow
              key={ticket.id}
              isEditing={ticket.id === currentEditingTicketId}
              ticket={ticket}
              isCurrentTicket={ticket.id === CURRENT_LOTTERY_ID}
              maxPrimaryNumberSelected={maxPrimaryNumberSelected}
              maxSecondaryNumberSelected={maxSecondaryNumberSelected}
              onDelete={(id) => dispatch(removeLotteryTicket(id))}
              onRandom={() => onRandomTicket(ticket)}
              onEdit={() => onEditTicket(ticket)}
              onFinishEdit={() => onFinishEdit()}
            />
          ))}
      </Box>
    </Box>
  );
};

export default GamePage;
