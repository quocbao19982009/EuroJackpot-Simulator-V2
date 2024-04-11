import { GameModelName, LotteryInGame } from "@/types/GameModel";

import { matchNumberLottery } from "@/utils/functions";
import { Grid } from "@mui/material";
import LotteryTicket from "../lotteryTicket/LotteryTicket";

interface LotteryListProps {
  lotteriesPlayed: LotteryInGame[];
  resultLottery: LotteryInGame;
  gameName: GameModelName;
}

const LotteryList = ({
  lotteriesPlayed,
  resultLottery,
  gameName,
}: LotteryListProps) => {
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      alignItems="center"
      rowGap={2}
    >
      {lotteriesPlayed.map((lottery) => {
        const hitNumbersArray = matchNumberLottery(lottery, resultLottery);

        const { matchNumber, matchStarNumber } = hitNumbersArray;

        const hitsAmount =
          matchStarNumber.length === 0
            ? matchNumber.length
            : `${matchNumber.length} + ${matchStarNumber.length}`;

        return (
          <Grid
            key={lottery.id}
            item
            container
            xs={12}
            sx={{
              borderBottom: "1px solid rgba(0,0,0,0.2)",
            }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={10}>
              <LotteryTicket
                id={lottery.id.toString()}
                primaryNumbers={lottery.primaryNumbers}
                secondaryNumbers={lottery.secondaryNumbers}
                highlightPrimaryNumbers={resultLottery.primaryNumbers}
                highlightSecondaryNumbers={resultLottery.secondaryNumbers}
                gameName={gameName}
              />
            </Grid>
            <Grid item xs={2} textAlign={"center"}>
              {hitsAmount}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LotteryList;
