import NumberGrid from "@/components/game/numberGrid/NumberGrid";
import TicketRow from "@/components/game/ticketRow/TicketRow";
import { postCreateGame } from "@/lib/api/gameApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addLotteryTicket,
  clearCurrentLotteryTicket,
  removeAllLotteryTicket,
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Divider,
  Hidden,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import GameSummary from "./components/GameSummary";
// TOdO: This file should be split into smaller components
const GamePage = () => {
  const {
    lotteries,
    maxPrimaryNumberSelected,
    primaryNumberTotals,
    maxSecondaryNumberSelected,
    secondaryNumberTotals,
    currentEditingTicketId,
    isEditingTicket,
    maxTicket,
    completedLotteries,
  } = useAppSelector((state) => state.lotterySlice);
  const dispatch = useAppDispatch();
  const currentLottery = lotteries.find(
    (ticket) => ticket.id === currentEditingTicketId
  )!;

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

  const onPayHandler = async () => {
    const gameResult = await postCreateGame(completedLotteries);
    console.log(gameResult);
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
            display: "flex",
            alignItems: "flex-start",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            flexGrow: {
              sm: 1,
            },
            gap: 2,
            margin: "1.5rem 1rem",
            justifyContent: "space-between",
          }}
        >
          <Box
            className="form"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: {
                xs: "column",
                lg: "row",
              },
              minWidth: {
                sm: "460px",
              },
              width: {
                xs: "100%",
                sm: "auto",
              },
              gap: 2,
              flexGrow: {
                sx: 0,
                sm: 1,
              },
            }}
          >
            {/* Number box */}
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
                onNumberSelected={(number) =>
                  dispatch(setPrimaryNumber(number))
                }
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
            <Hidden mdDown>
              <Divider flexItem orientation="vertical" />
            </Hidden>
            <Hidden lgUp>
              <Divider flexItem orientation="horizontal" />
            </Hidden>
            {/* Lottery Row */}
            <Box
              className="lotteryRow"
              sx={{
                flexGrow: {
                  md: 2,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography fontWeight="bold">
                  {rowText +
                    " " +
                    `${
                      lotteries.length - 1 === maxTicket
                        ? "(max ticket reach)"
                        : ""
                    }`}
                </Typography>

                <Button
                  color={"error"}
                  variant="text"
                  endIcon={<DeleteOutlineIcon />}
                  onClick={() => dispatch(removeAllLotteryTicket())}
                >
                  Delete all rows
                </Button>
              </Box>
              <List
                sx={{
                  maxHeight: "600px",
                  overflow: "auto",
                  scrollbarGutter: "stable",
                }}
              >
                {lotteries
                  .slice()
                  .sort((a, b) => {
                    // If ticket has the id of CURRENT_LOTTERY_ID, it should be at the first of the list. If not sort by createTime
                    if (a.id === CURRENT_LOTTERY_ID) return -1;
                    if (b.id === CURRENT_LOTTERY_ID) return 1;
                    return lotteries.indexOf(b) - lotteries.indexOf(a);
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
              </List>
            </Box>
          </Box>
          <Hidden smDown>
            <Divider flexItem orientation="vertical" />
          </Hidden>
          <Hidden smUp>
            <Divider flexItem orientation="horizontal" />
          </Hidden>

          <GameSummary
            completedLotteries={completedLotteries}
            onPay={onPayHandler}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default GamePage;
