import NumberGrid from "@/components/game/numberGrid/NumberGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { randomTicket, setNumber } from "@/redux/slices/lotterySlice";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Box, Button } from "@mui/material";

const GameNumberSelector = () => {
  const dispatch = useAppDispatch();
  const {
    lotteries,
    currentEditingTicketId,
    isEditingTicket,
    completedLotteries,
    gameSettings,
    currentGameType,
  } = useAppSelector((state) => state.lotterySlice);

  const {
    primaryNumberCount,
    primaryNumberRange,
    secondaryNumberCount,
    secondaryNumberRange,
    maxTicketsPerUser,
  } = gameSettings![currentGameType];

  const currentLottery = lotteries.find(
    (ticket) => ticket.id === currentEditingTicketId
  )!;
  const isMaxTicketReach = completedLotteries.length >= maxTicketsPerUser;

  return (
    <Box
      className="GameNumberSelector"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
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
          dispatch(setNumber({ number, type: "primary" }))
        }
      />
      {secondaryNumberCount !== 0 && (
        <NumberGrid
          disabled={isMaxTicketReach && !isEditingTicket}
          title="Select Star numbers"
          totalNumbers={secondaryNumberRange}
          maxNumberSelected={secondaryNumberCount}
          selectedNumbers={currentLottery.secondaryNumbers}
          onNumberSelected={(number) =>
            dispatch(setNumber({ number, type: "secondary" }))
          }
        />
      )}
      <Button
        disabled={isMaxTicketReach}
        variant="outlined"
        color="inherit"
        onClick={() => dispatch(randomTicket(currentEditingTicketId))}
        startIcon={<ShuffleIcon />}
      >
        Value the remaining number
      </Button>
    </Box>
  );
};

export default GameNumberSelector;
