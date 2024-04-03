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
import { updateUserInfo } from "@/redux/slices/userSlice";
import { ErrorResponse } from "@/types/ErrorResponse.interfaces";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import { createRandomTicket, getErrorMessage } from "@/utils/functions";
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
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import GameResultDialog from "./components/GameResultDialog";
import GameSelectDialog from "./components/GameSelectDialog";
import GameSummary from "./components/GameSummary";

// TOdO: This file should be split into smaller components
const GamePage = () => {
  const [openGameResultDialog, setOpenGameResultDialog] = useState(false);
  const [openGameSelectDialog, setOpenGameSelectDialog] = useState(false);
  const openGameSelectDialogHandler = () => {
    setOpenGameSelectDialog(true);
  };
  const closeGameSelectDialogHandler = () => {
    onFinishEdit();
    setOpenGameSelectDialog(false);
  };

  // TODO: These API call need to be moved into a seperate file
  const gameMutation = useMutation({
    mutationFn: postCreateGame,
    onSuccess: (data) => {
      dispatch(removeAllLotteryTicket());
      dispatch(updateUserInfo(data.user));
    },
    onError: (error: ErrorResponse) => {
      // TODO: Is there a better way to handle this error?
      if (error.statusCode === 401) {
        toast.error("Please login to play the game");
      } else {
        toast.error(`Failed while creating game: ${getErrorMessage(error)}`);
      }
    },
  });

  const {
    lotteries,
    currentEditingTicketId,
    isEditingTicket,
    completedLotteries,
  } = useAppSelector((state) => state.lotterySlice);
  const {
    primaryNumberCount,
    primaryNumberRange,
    secondaryNumberCount,
    secondaryNumberRange,
    maxTicketsPerUser,
  } = useAppSelector((state) => state.gameSettingSlice);

  const dispatch = useAppDispatch();
  const currentLottery = lotteries.find(
    (ticket) => ticket.id === currentEditingTicketId
  )!;
  const isMaxTicketReach = completedLotteries.length >= maxTicketsPerUser;
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
      primaryNumberCount,
      primaryNumberRange,
      secondaryNumberCount,
      secondaryNumberRange
    );
    dispatch(setCurrentTicket(randomTicketInput));
    setTimeout(() => {
      dispatch(addLotteryTicket(randomTicketInput));
      dispatch(clearCurrentLotteryTicket());
    }, 300);
  };

  const onRandomTicket = (ticket: LotteryTicketModel) => {
    const randomTicketInput = createRandomTicket(
      ticket,
      primaryNumberCount,
      primaryNumberRange,
      secondaryNumberCount,
      secondaryNumberRange
    );

    dispatch(updateLotteryTicket(randomTicketInput));
  };

  const onEditTicket = (ticket: LotteryTicketModel) => {
    dispatch(setCurrentTicketId(ticket.id));
    // If it is in mobile width, open the dialog
    if (window.innerWidth < 600) {
      openGameSelectDialogHandler();
    }
  };
  const onFinishEdit = () => {
    dispatch(setCurrentTicketId(CURRENT_LOTTERY_ID));
  };

  const onPayHandler = async () => {
    if (completedLotteries.length === 0) {
      toast.error("You need to have at least one ticket to play the game");
      return;
    }
    setOpenGameResultDialog(true);
    try {
      gameMutation.mutate(completedLotteries);
    } catch (error) {
      console.error(`Failed while creating game: ${error}`);
    }
  };

  // Check if the ticket is completed if this a good way?
  useEffect(() => {
    if (
      !isEditingTicket &&
      currentLottery.primaryNumbers.length === primaryNumberCount &&
      currentLottery.secondaryNumbers.length === secondaryNumberCount
    ) {
      const timeoutId = setTimeout(() => {
        dispatch(addLotteryTicket(currentLottery));
        dispatch(clearCurrentLotteryTicket());
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [currentLottery, dispatch, primaryNumberCount, secondaryNumberCount]);

  return (
    <>
      <Button onClick={openGameSelectDialogHandler}>Open Game Select</Button>
      {/* TODO: Figure out how is the loading should work */}
      <Paper
        elevation={3}
        sx={{
          padding: {
            xs: 1,
            sm: 2,
          },
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
              margin: {
                xs: 0,
                sm: 2,
              },
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
                  disabled={isMaxTicketReach && !isEditingTicket}
                  title="Choose numbers"
                  totalNumbers={primaryNumberRange}
                  maxNumberSelected={primaryNumberCount}
                  selectedNumbers={currentLottery.primaryNumbers}
                  onNumberSelected={(number) =>
                    dispatch(setPrimaryNumber(number))
                  }
                />
                <NumberGrid
                  disabled={isMaxTicketReach && !isEditingTicket}
                  title="Select Star numbers"
                  totalNumbers={secondaryNumberRange}
                  maxNumberSelected={secondaryNumberCount}
                  selectedNumbers={currentLottery.secondaryNumbers}
                  onNumberSelected={(number) =>
                    dispatch(setSecondaryNumber(number))
                  }
                />
                <Button
                  disabled={isMaxTicketReach}
                  onClick={() => onAddRandomTicket(currentLottery)}
                >
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
                  width: "100%",
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
                      `${isMaxTicketReach ? "(max ticket reach)" : ""}`}
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
                    // maxHeight: "600px",
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
                          isEditingTicket &&
                          ticket.id !== currentEditingTicketId
                        }
                        isCurrentTicket={ticket.id === CURRENT_LOTTERY_ID}
                        primaryNumberCount={primaryNumberCount}
                        secondaryNumberCount={secondaryNumberCount}
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
        {/* Game Dialog when game created */}
        <GameResultDialog
          open={openGameResultDialog && gameMutation.isSuccess}
          handleClose={() => {
            setOpenGameResultDialog(false);
          }}
          gameResult={gameMutation.data?.gameResult || null}
          loading={gameMutation.isLoading}
        />
      </Paper>
      <GameSelectDialog
        open={openGameSelectDialog}
        handleClose={closeGameSelectDialogHandler}
      />
    </>
  );
};

export default GamePage;
