import NumberGrid from "@/components/game/numberGrid/NumberGrid";
import TicketRow from "@/components/game/ticketRow/TicketRow";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addLotteryTicket,
  clearCurrentLotteryTicket,
  editLotteryTicket,
  removeLotteryTicket,
  setCurrentLotteryTicket,
  setPrimaryNumber,
  setSecondaryNumber,
} from "@/redux/slices/lotterySlice";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { createRandomTicket } from "@/ultis/functions";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";

const GamePage = () => {
  const {
    currentLottery,
    completedLotteries,
    maxPrimaryNumberSelected,
    primaryNumberTotals,
    maxSecondaryNumberSelected,
    secondaryNumberTotals,
  } = useAppSelector((state) => state.lotterySlice);
  const dispatch = useAppDispatch();

  const onAddRandomTicket = (ticket: LotteryTicketModel) => {
    const randomTicketInput = createRandomTicket(
      ticket,
      maxPrimaryNumberSelected,
      primaryNumberTotals,
      maxSecondaryNumberSelected,
      secondaryNumberTotals
    );
    dispatch(setCurrentLotteryTicket(randomTicketInput));
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

    dispatch(editLotteryTicket(randomTicketInput));
  };

  // Check if the ticket is completed if this a good way?
  useEffect(() => {
    if (
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
        <TicketRow
          key={currentLottery.id}
          ticket={currentLottery}
          isCurrentTicket={true}
          maxPrimaryNumberSelected={maxPrimaryNumberSelected}
          maxSecondaryNumberSelected={maxSecondaryNumberSelected}
          onDelete={(id) => dispatch(removeLotteryTicket(id))}
          onRandom={() => onAddRandomTicket(currentLottery)}
          onEdit={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        {completedLotteries
          .slice()
          .sort((a, b) => b.createTime.getTime() - a.createTime.getTime())
          .map((ticket) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              maxPrimaryNumberSelected={maxPrimaryNumberSelected}
              maxSecondaryNumberSelected={maxSecondaryNumberSelected}
              onDelete={(id) => dispatch(removeLotteryTicket(id))}
              onRandom={() => onRandomTicket(ticket)}
              onEdit={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default GamePage;
