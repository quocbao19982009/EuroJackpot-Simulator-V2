import { GameModelName } from "@/types/GameModel";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import PrizeTable from "./components/PrizeTable";

const eurojackpotPrizes = [
  {
    prizeCondition: "Match 5 main numbers and 2 star numbers",
    odd: "1 in 139 838 160",
    prize: "€35 000 000",
  },
  {
    prizeCondition: "Match 5 main numbers and 1 star number",
    odd: "1 in 6 991 908",
    prize: "€914 260",
  },
  {
    prizeCondition: "Match 5 main numbers",
    odd: "1 in 3 107 515",
    prize: "€149 959",
  },
  {
    prizeCondition: "Match 4 main numbers and 2 star numbers",
    odd: "1 in 621 503",
    prize: "€5 049",
  },
  {
    prizeCondition: "Match 4 main numbers and 1 star number",
    odd: "1 in 31 075",
    prize: "€271",
  },
  {
    prizeCondition: "Match 3 main numbers and 2 star numbers",
    odd: "1 in 14 125",
    prize: "€100",
  },
  {
    prizeCondition: "Match 4 main numbers",
    odd: "1 in 13 811",
    prize: "€110",
  },
  {
    prizeCondition: "Match 2 main numbers and 2 star numbers",
    odd: "1 in 985",
    prize: "€22",
  },
  {
    prizeCondition: "Match 3 main numbers and 1 star number",
    odd: "1 in 706",
    prize: "€19",
  },
  {
    prizeCondition: "Match 3 main numbers",
    odd: "1 in 314",
    prize: "€15",
  },
  {
    prizeCondition: "Match 1 main number and 2 star numbers",
    odd: "1 in 188",
    prize: "€10",
  },
  {
    prizeCondition: "Match 2 main numbers and 1 star number",
    odd: "1 in 49",
    prize: "€8",
  },
];

const lottoPrizes = [
  {
    prizeCondition: "Match 7 main numbers",
    odd: "1 in 45,057,474",
    prize: "€4,700,000",
  },
  {
    prizeCondition: "Match 6 main numbers",
    odd: "1 in 3,838,380",
    prize: "€2,460",
  },
  {
    prizeCondition: "Match 5 main numbers",
    odd: "1 in 55,491",
    prize: "€54",
  },
  {
    prizeCondition: "Match 4 main numbers",
    odd: "1 in 1,033",
    prize: "€10",
  },
  {
    prizeCondition: "Match 3 main numbers",
    odd: "1 in 57",
    prize: "€2",
  },
];

const OddPage = () => {
  const [prizesGameType, setPrizesGameType] = useState<GameModelName>(
    GameModelName.Lotto
  );

  const handleSwitchGameType = () => {
    setPrizesGameType(
      prizesGameType === GameModelName.Lotto
        ? GameModelName.Eurojackpot
        : GameModelName.Lotto
    );
  };

  const prizes =
    prizesGameType === GameModelName.Lotto ? lottoPrizes : eurojackpotPrizes;

  return (
    <Box>
      <Button onClick={handleSwitchGameType}>
        Switch to{" "}
        {prizesGameType === GameModelName.Lotto
          ? GameModelName.Eurojackpot
          : GameModelName.Lotto}
      </Button>
      <Box>
        <Typography variant="h4" gutterBottom>
          Odd of Winning: {prizesGameType}
        </Typography>
        <Paper sx={{ mt: 2 }}>
          <PrizeTable prizes={prizes} />
        </Paper>
      </Box>
    </Box>
  );
};

export default OddPage;
