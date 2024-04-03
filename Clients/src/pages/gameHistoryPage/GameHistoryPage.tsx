import GameDetail from "@/components/game/gameDetail/GameDetail";
import { getGameHistory } from "@/lib/api/gameApi";
import { GameModel } from "@/types/GameModel";
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useQuery } from "react-query";

// TODO: Change the state name so it will make more sense, these string should be turn into enum

// ulitity function
const sortGameHistory = (data: GameModel[], sortBy: "desc" | "asc") => {
  return [...data].sort((a, b) => {
    return sortBy === "desc"
      ? +new Date(b.date) - +new Date(a.date)
      : +new Date(a.date) - +new Date(b.date);
  });
};

const GameHistoryPage = () => {
  const gameHistoryQuery = useQuery("gameHistory", getGameHistory);
  let lotteryHistory = gameHistoryQuery.data?.games;
  const [sortBy, setSortBy] = useState<"desc" | "asc">("desc");
  const sortedLotteryHistory = lotteryHistory
    ? sortGameHistory(lotteryHistory, sortBy)
    : [];

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value === "desc" || value === "asc") {
      setSortBy(value);
    } else {
      // Set a default value if the incoming value is not allowed
      setSortBy("desc");
    }
  };

  return (
    <>
      <Typography component={"h1"} variant={"h1"}>
        Game History
      </Typography>
      <Box sx={{ marginTop: "1rem" }}>
        {gameHistoryQuery.isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {gameHistoryQuery.isSuccess && lotteryHistory?.length === 0 && (
          <Typography component={"h3"} variant={"h6"}>
            You haven't play any game
          </Typography>
        )}
        {gameHistoryQuery.isSuccess && lotteryHistory?.length !== 0 && (
          <div>
            <h2>Your Game Hisotry</h2>
            <Paper
              elevation={16}
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
                  <MenuItem value={"desc"}>Newest</MenuItem>
                  <MenuItem value={"asc"}>Oldest</MenuItem>
                </Select>
              </FormControl>

              <List>
                {lotteryHistory &&
                  sortedLotteryHistory.map((lotteryGame) => (
                    <ListItem key={lotteryGame.date.toString()}>
                      <GameDetail gameResult={lotteryGame} />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </div>
        )}
      </Box>
    </>
  );
};

export default GameHistoryPage;
