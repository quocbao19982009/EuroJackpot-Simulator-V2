import LotteryTicket from "@/components/game/lotteryTicket/LotteryTicket";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addLotteryTicket,
  clearCurrentLotteryTicket,
  setCurrentTicket,
  updateLotteryTicket,
} from "@/redux/slices/lotterySlice";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import { createRandomTicket } from "@/utils/functions";
import CloseIcon from "@mui/icons-material/Close";
import { Button, DialogContent, IconButton, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GameNumberSelector from "./GameNumberSelector";

interface GameMobileSelectDialogProps {
  open: boolean;
  handleClose: () => void;
}

// TODO: Separate the Ticket Number and its function to a new component
const GameMobileSelectDialog = ({
  open,
  handleClose,
}: GameMobileSelectDialogProps) => {
  const theme = useTheme();
  const {
    lotteries,
    currentEditingTicketId,
    isEditingTicket,
    completedLotteries,
    currentGameType,
    gameSettings,
  } = useAppSelector((state) => state.lotterySlice);
  const {
    primaryNumberCount,
    primaryNumberRange,
    secondaryNumberCount,
    secondaryNumberRange,
    maxTicketsPerUser,
  } = gameSettings![currentGameType];

  const dispatch = useAppDispatch();
  const currentLottery = lotteries.find(
    (ticket) => ticket.id === currentEditingTicketId
  )!;
  const isMaxTicketReach = completedLotteries.length >= maxTicketsPerUser;

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

  // NOTE: these predraw circle only in for the isCurrenTickets
  // TODO: This is repeated from TicketRow.tsx Fix this
  const emptyPrimaryNumber = new Array(primaryNumberCount).fill(undefined);
  const emptySecondaryNumber = new Array(secondaryNumberCount).fill(undefined);

  const primaryNumberShow: number[] = currentLottery.primaryNumbers.concat(
    emptyPrimaryNumber.slice(currentLottery.primaryNumbers.length)
  );

  const secondaryNumbersShow: number[] = currentLottery.secondaryNumbers.concat(
    emptySecondaryNumber.slice(currentLottery.secondaryNumbers.length)
  );

  const isAllFilled =
    primaryNumberShow.every((number) => typeof number === "number") &&
    secondaryNumbersShow.every((number) => typeof number === "number");

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      scroll="paper"
      //   sx={{ margin: "1rem" }}
    >
      <AppBar
        sx={{
          position: "relative",
          background: theme.palette.gameColor.selected,
          color: theme.palette.gameColor.textUnselected,
        }}
      >
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit ticket
          </Typography>

          {/* TODO: Only when ticket is completed than show this. Need Ultis function to check */}
          {isAllFilled && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <DialogContent dividers={true}>
        {/* <Box
          className="numbers"
          sx={{
            padding: "1rem",
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
            onNumberSelected={(number) => dispatch(setPrimaryNumber(number))}
          />
          <NumberGrid
            disabled={isMaxTicketReach && !isEditingTicket}
            title="Select Star numbers"
            totalNumbers={secondaryNumberRange}
            maxNumberSelected={secondaryNumberCount}
            selectedNumbers={currentLottery.secondaryNumbers}
            onNumberSelected={(number) => dispatch(setSecondaryNumber(number))}
          />
          <Button
            variant="outlined"
            disabled={isMaxTicketReach}
            onClick={() => onAddRandomTicket(currentLottery)}
          >
            Random value the remaining number
          </Button>
        </Box> */}
        <GameNumberSelector />
      </DialogContent>
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "white",
          padding: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <LotteryTicket
          id={currentLottery.id}
          primaryNumbers={primaryNumberShow}
          secondaryNumbers={secondaryNumbersShow}
        />

        <Button
          disabled={!isAllFilled}
          variant="outlined"
          onClick={handleClose}
        >
          Save
        </Button>
      </AppBar>
    </Dialog>
  );
};

export default GameMobileSelectDialog;
