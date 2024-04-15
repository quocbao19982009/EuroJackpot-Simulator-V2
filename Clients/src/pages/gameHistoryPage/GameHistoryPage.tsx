import GameDetail from "@/components/game/gameDetail/GameDetail";
import { getGameHistory } from "@/lib/api/gameApi";
import { GameModel } from "@/types/GameModel";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TablePagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

enum SortOrder {
  Desc = "desc",
  Asc = "asc",
}

const GameHistoryPage = () => {
  const gameHistoryQuery = useQuery("gameHistory", getGameHistory);
  const [sortBy, setSortBy] = useState<SortOrder>(SortOrder.Desc);
  const [sortedLotteryHistory, setSortedLotteryHistory] = useState<GameModel[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (gameHistoryQuery.data?.games) {
      const sorted = [...gameHistoryQuery.data.games].sort((a, b) => {
        return sortBy === SortOrder.Desc
          ? +new Date(b.date) - +new Date(a.date)
          : +new Date(a.date) - +new Date(b.date);
      });
      setSortedLotteryHistory(sorted);
    }
  }, [gameHistoryQuery.data?.games, sortBy]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as SortOrder;
    setSortBy(value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box sx={{ marginTop: "1rem" }}>
        {gameHistoryQuery.isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {gameHistoryQuery.isError && (
          <Typography variant="h6">Failed to load game history</Typography>
        )}
        {gameHistoryQuery.isSuccess && sortedLotteryHistory.length === 0 && (
          <Typography variant="h6">You haven't played any game</Typography>
        )}
        {gameHistoryQuery.isSuccess && sortedLotteryHistory.length !== 0 && (
          <>
            <Typography variant="h2">Your Game History</Typography>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "rgb(231, 235, 240)",
                padding: "2rem",
                marginTop: "1rem",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="sortBy">Sort By</InputLabel>
                <Select
                  labelId="sortBySelect"
                  id="sortBySelect"
                  label="Sort By"
                  value={sortBy}
                  onChange={handleChange}
                >
                  <MenuItem value={SortOrder.Desc}>Newest</MenuItem>
                  <MenuItem value={SortOrder.Asc}>Oldest</MenuItem>
                </Select>
              </FormControl>

              <List>
                {sortedLotteryHistory
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((lotteryGame) => (
                    <ListItem key={lotteryGame.date.toString()}>
                      <GameDetail gameResult={lotteryGame} />
                    </ListItem>
                  ))}
              </List>

              <TablePagination
                component="div"
                count={sortedLotteryHistory.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
              />
            </Paper>
          </>
        )}
      </Box>
    </>
  );
};

export default GameHistoryPage;
