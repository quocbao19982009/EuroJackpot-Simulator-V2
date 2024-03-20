import { LotteryInGame } from "@/types/GameModel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LotteryTableRow from "./LotteryTableRow";

interface LotteryTableProps {
  playLottery: LotteryInGame[];
  resultLottery: LotteryInGame;
}

const LotteryTable = ({ playLottery, resultLottery }: LotteryTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Game detail table">
        <TableHead>
          <TableRow>
            <TableCell>Line</TableCell>
            <TableCell align="center">Numbers</TableCell>
            <TableCell align="left">Hits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playLottery.map((lottery, index) => (
            <LotteryTableRow
              key={index}
              resultLottery={resultLottery}
              lottery={lottery}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LotteryTable;