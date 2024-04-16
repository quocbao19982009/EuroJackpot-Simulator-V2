import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface PrizeTableProps {
  prizes: { prizeCondition: string; odd: string; prize: string }[];
}

const PrizeTable = ({ prizes }: PrizeTableProps) => {
  return (
    <TableContainer>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "var(--light-purple)" }}>
            <TableCell>
              <Typography variant="h6">Prize Tier</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Odds of Winning</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Prize</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prizes.map((prize, index) => (
            <TableRow
              key={index}
              sx={{
                ":nth-of-type(2n)": { backgroundColor: "var(--light-purple)" },
              }}
            >
              <TableCell>
                <Typography variant="body1">{prize.prizeCondition}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{prize.odd}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{prize.prize}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PrizeTable;
