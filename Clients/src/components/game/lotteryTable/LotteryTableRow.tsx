import { LotteryInGame } from "@/types/GameModel";
import { matchNumberLottery } from "@/utils/functions";
import StarIcon from "@mui/icons-material/Star";
import { Box, TableCell, TableRow } from "@mui/material";
import TicketNumber from "../ticketRow/TicketNumber";

interface LotteryTableRowProps {
  index: number;
  lottery: LotteryInGame;
  resultLottery: LotteryInGame;
}

const LotteryTableRow = ({
  lottery,
  index,
  resultLottery,
}: LotteryTableRowProps) => {
  const hitNumbersArray = matchNumberLottery(lottery, resultLottery);

  const { matchNumber, matchStarNumber } = hitNumbersArray;

  const numberHit = (numberInput: number) => {
    return matchNumber.includes(numberInput);
  };
  const starNumberHit = (numberInput: number) => {
    return matchStarNumber.includes(numberInput);
  };

  const hitsAmount =
    matchStarNumber.length === 0
      ? matchNumber.length
      : `${matchNumber.length} + ${matchStarNumber.length}`;

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Box
          component="ol"
          sx={{
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "1rem",
            alignContent: "flex-end",
          }}
        >
          {lottery.primaryNumbers.map((number) => (
            <TicketNumber
              key={`${number}_primary`}
              number={number}
              numberType={"primary"}
              isHighlighted={numberHit(number)}
            />
          ))}
          <StarIcon></StarIcon>
          {lottery.secondaryNumbers.map((number) => (
            <TicketNumber
              key={`${number}_secondary`}
              number={number}
              numberType={"secondary"}
              isHighlighted={starNumberHit(number)}
            />
          ))}
        </Box>
      </TableCell>
      <TableCell>{hitsAmount}</TableCell>
    </TableRow>
  );
};

export default LotteryTableRow;
