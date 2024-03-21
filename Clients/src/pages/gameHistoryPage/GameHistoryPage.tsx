import GameDetail from "@/components/game/gameDetail/GameDetail";
import { getGameHistory } from "@/lib/api/gameApi";
import {
  Box,
  List,
  ListItem,
  Paper,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";

const GameHistoryPage = () => {
  const gameHistoryQuery = useQuery("gameHistory", getGameHistory);
  let lotteryHistory = gameHistoryQuery.data?.games;
  console.log("lotteryHistory", lotteryHistory);

  const handleChange = (event: SelectChangeEvent) => {
    console.log("change", event.target.value);
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
              <Box sx={{ minWidth: 120 }}>
                {/* <FormControl fullWidth>
                  <InputLabel id="sortBy">Sort By</InputLabel>
                  <Select
                    labelId="sortBySelect"
                    id="sortBySelect"
                    label="Sort By"
                    onChange={handleChange}
                  >
                    <MenuItem value={"new"}>Newest</MenuItem>
                    <MenuItem value={"old"}>Oldest</MenuItem>
                  </Select>
                </FormControl> */}
              </Box>
              <List>
                {lotteryHistory &&
                  lotteryHistory.map((lotteryGame) => (
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
