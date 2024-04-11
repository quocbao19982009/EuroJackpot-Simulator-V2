import { GameModel } from "@/types/GameModel";
import { dateFormat, formatMoney } from "@/utils/functions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LotteryTicket from "../lotteryTicket/LotteryTicket";
import LotteryList from "./PlayedLottery";

interface GameDetailProps {
  gameResult: GameModel;
}

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
          <Typography alignSelf={"center"}>{gameResult.name}</Typography>
          <Box>
            <Typography>
              Price <strong>{formatMoney(gameResult.totalCost)}</strong>
            </Typography>
            <Typography>
              Draw <strong>{dateFormat(new Date(gameResult.date))}</strong>
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          direction={{
            xs: "column",
          }}
        >
          <Grid item xs={12}>
            <Typography marginTop={"1rem"}>Draw lottery</Typography>
            <LotteryTicket
              id={resultLottery.id.toString()}
              primaryNumbers={resultLottery.primaryNumbers}
              secondaryNumbers={resultLottery.secondaryNumbers}
              highlightAll={true}
              gameName={gameResult.name}
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={10}>
              <Typography marginTop={"1rem"}>Played lottery</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography textAlign={"center"} marginTop={"1rem"}>
                Hits
              </Typography>
            </Grid>
            <LotteryList
              lotteriesPlayed={gameResult.lotteriesPlayed}
              resultLottery={gameResult.resultLottery}
              gameName={gameResult.name}
            />
          </Grid>
        </Grid>
        <Typography sx={{ marginTop: "1rem" }}>
          <strong>Your Profit: {formatMoney(gameResult.totalWinning)}</strong>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default GameDetail;
