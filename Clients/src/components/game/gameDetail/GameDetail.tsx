import { GameModel } from "@/types/GameModel";
import { dateFormat } from "@/utils/functions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import LotteryTable from "../lotteryTable/LotteryTable";
import LotteryTicket from "../lotteryTicket/LotteryTicket";

interface GameDetailProps {
  gameResult: GameModel;
}

// TODO: Fix the fucking table pls
const GameDetail = ({ gameResult }: GameDetailProps) => {
  const resultLottery = gameResult.resultLottery;
  return (
    <Accordion
      sx={{
        width: "100%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="game-accordion"
        id="game-accordion"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignContent: "center",
          }}
        >
          <Typography alignSelf={"center"}>Eurojackpot</Typography>
          <Box>
            <Typography>
              Price <strong>{gameResult.totalCost}.00 €</strong>
            </Typography>
            <Typography>
              Draw <strong>{dateFormat(new Date(gameResult.date))}</strong>
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography margin={"1rem 0"}>Result</Typography>
        <LotteryTicket
          id={resultLottery.id.toString()}
          primaryNumbers={resultLottery.primaryNumbers}
          secondaryNumbers={resultLottery.secondaryNumbers}
          highlightAll={true}
        />
        <Typography marginTop={"1rem"}>Your play lottery</Typography>
        <LotteryTable
          playLottery={gameResult.lotteriesPlayed}
          resultLottery={gameResult.resultLottery}
        />
        <Typography sx={{ marginTop: "1rem" }}>
          <strong>Your Profit: {gameResult.totalWinning}.00 €</strong>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default GameDetail;
