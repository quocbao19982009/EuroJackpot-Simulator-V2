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
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";

const GamePage = () => {
  const {
    lotteries,
    maxPrimaryNumberSelected,
    primaryNumberTotals,
    maxSecondaryNumberSelected,
    secondaryNumberTotals,
    currentEditingTicketId,
    isEditingTicket,
  } = useAppSelector((state) => state.lotterySlice);
  const dispatch = useAppDispatch();

  const currentLottery = lotteries.find(
    (ticket) => ticket.id === currentEditingTicketId
  )!;

  const completedLotteries = lotteries.filter(
    (ticket) => ticket.id !== CURRENT_LOTTERY_ID
  );

  const rowText =
    completedLotteries.length === 0
      ? "No ready-made rows"
      : completedLotteries.length === 1
      ? "1 ready-made row"
      : `${completedLotteries.length} ready-made rows`;

  // Action Function
  const onAddRandomTicket = (ticket: LotteryTicketModel) => {
    if (ticket.id !== CURRENT_LOTTERY_ID) {
      onRandomTicket(ticket);
      return;
    }

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
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        marginTop: 2,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <Box>
        {/* TODO: Title game need to be updated when there are more */}
        <h1>Eurojackpot Game</h1>
        <Box
          className="gameArea"
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            margin: "1.5rem 1rem",
            justifyContent: "space-between",
          }}
        >
          <Box
            className="numbers"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
          >
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
              onNumberSelected={(number) =>
                dispatch(setSecondaryNumber(number))
              }
            />
            <Button onClick={() => onAddRandomTicket(currentLottery)}>
              Random value the remaining number
            </Button>
          </Box>
          <Box className="lotteryRow" sx={{ width: "100%" }}>
            <Typography sx={{ marginBottom: 2 }} fontWeight="bold">
              {rowText}
            </Typography>
            <Box>
              {lotteries
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
                    ticket={ticket}
                    isEditing={ticket.id === currentEditingTicketId}
                    isDisabled={
                      isEditingTicket && ticket.id !== currentEditingTicketId
                    }
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
        </Box>
      </Box>
    </Paper>
  );
};

export default GamePage;
