import TicketRow from "@/components/game/ticketRow/TicketRow";
import { postCreateGame } from "@/lib/api/gameApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  removeAllLotteryTicket,
  setCurrentGameType,
  setCurrentTicketId,
} from "@/redux/slices/lotterySlice";
import { updateUserInfo } from "@/redux/slices/userSlice";
import { ErrorResponse } from "@/types/ErrorResponse.interfaces";
import { GameType } from "@/types/GameSetting.interfaces";
import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import { getErrorMessage } from "@/utils/functions";
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
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import GameMobileSelectDialog from "./components/GameMobileSelectDialog";
import GameNumberSelector from "./components/GameNumberSelector";
import GameResultDialog from "./components/GameResultDialog";
import GameSummary from "./components/GameSummary";

// Todo: This file should be split into smaller components
const GamePage = () => {
  const [openGameResultDialog, setOpenGameResultDialog] = useState(false);
  const [openGameMobileSelectDialog, setOpenGameMobileSelectDialog] =
    useState(false);

  const closeGameMobileSelectDialogHandler = () => {
    dispatch(setCurrentTicketId(CURRENT_LOTTERY_ID));
    setOpenGameMobileSelectDialog(false);
  };

  // TODO: These API call need to be moved into a seperate file
  const gameMutation = useMutation(postCreateGame, {
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

  const { lotteries, completedLotteries, gameSettings, currentGameType } =
    useAppSelector((state) => state.lotterySlice);

  const { maxTicketsPerUser } = gameSettings![currentGameType];

  const dispatch = useAppDispatch();

  const isMaxTicketReach = completedLotteries.length >= maxTicketsPerUser;
  const rowText =
    completedLotteries.length === 0
      ? "No ready-made rows"
      : completedLotteries.length === 1
      ? "1 ready-made row"
      : `${completedLotteries.length} ready-made rows`;

  const onPayHandler = async () => {
    if (completedLotteries.length === 0) {
      toast.error("You need to have at least one ticket to play the game");
      return;
    }
    setOpenGameResultDialog(true);
    try {
      gameMutation.mutate({
        lotteryTickets: completedLotteries,
        gameType: currentGameType,
      });
    } catch (error) {
      console.error(`Failed while creating game: ${error}`);
    }
  };
  // Setting the current game type
  const params = useLocation();
  useEffect(() => {
    let gameType = GameType.Lotto;
    if (params.pathname === "/lotto") {
      gameType = GameType.Lotto;
    } else if (params.pathname === "/eurojackpot") {
      gameType = GameType.Eurojackpot;
    }
    dispatch(setCurrentGameType(gameType));
  }, [dispatch, params.pathname]);

  return (
    <>
      {/* TODO: Figure out how is the loading should work */}
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
          <h1>{currentGameType} Game</h1>
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
              <GameNumberSelector />
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
                        setOpenGameMobileSelectDialog={
                          setOpenGameMobileSelectDialog
                        }
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
      {/* Game Dialog when game created */}
      <GameResultDialog
        open={openGameResultDialog && gameMutation.isSuccess}
        handleClose={() => {
          setOpenGameResultDialog(false);
        }}
        gameResult={gameMutation.data?.gameResult || null}
        loading={gameMutation.isLoading}
      />
      <GameMobileSelectDialog
        open={openGameMobileSelectDialog}
        handleClose={closeGameMobileSelectDialogHandler}
      />
    </>
  );
};

export default GamePage;
