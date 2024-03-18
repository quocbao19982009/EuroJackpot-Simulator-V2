import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { Box, Button, Typography } from "@mui/material";

interface GameSummaryProps {
  completedLotteries: LotteryTicketModel[];
  onPay: () => void;
}

const GameSummary = ({ completedLotteries, onPay }: GameSummaryProps) => {
  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "fit-content",
        },
        flexGrow: {
          xs: 1,
          md: 2,
          lg: 1,
        },
        position: {
          xs: "sticky",
          lg: "static",
        },
        top: 10,
      }}
    >
      <Typography fontWeight="bold">Summary:</Typography>
      <Typography fontWeight="bold">Eurojackpot</Typography>
      <Typography>Ticket number: {completedLotteries.length}</Typography>
      <Button
        variant="contained"
        sx={{ width: "100%", borderRadius: "25px" }}
        onClick={onPay}
      >
        {`Pay ${completedLotteries.length * 2}.00€`}
      </Button>
    </Box>
  );
};

export default GameSummary;
