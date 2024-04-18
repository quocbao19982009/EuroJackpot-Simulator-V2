import { EUROJACKPOT_ROUTE } from "@/utils/constants";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        textAlign: "center",
        gap: "2rem",
        padding: "0 20px",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", color: "#4CAF50" }}>
        Welcome to Our Lucky Adventure
      </Typography>
      <Typography variant="h6">Hey there, fellow dreamer! 🌟</Typography>
      <Typography variant="body1">
        Have you ever found yourself lost in the wild dreams of hitting the
        millions jackpot, just like me? Well, you've landed in the right place!
        Our application, inspired by the magic of Veikkaus, is here to remind
        you that while dreams are wonderful, becoming a millionaire overnight
        might be a tad improbable. 😅
      </Typography>
      <Typography variant="body1">
        My journey into creating this enchanting world began with a simple
        question: "What are the odds?" 🎲 Instead of diving into complex math
        and numbers, I've built this application to bring the excitement of the
        lottery experience right to your fingertips! Let's see if luck favors
        us!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(EUROJACKPOT_ROUTE)}
      >
        Let's Get Started!
      </Button>
    </Box>
  );
};

export default WelcomePage;
