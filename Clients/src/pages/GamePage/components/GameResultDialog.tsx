import GameDetail from "@/components/game/gameDetail/GameDetail";
import { GameModel } from "@/types/GameModel";
import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, Dialog } from "@mui/material";

interface GameResultDialogProps {
  open: boolean;
  handleClose: () => void;
  gameResult: GameModel | null;
  loading: boolean;
}

const GameResultDialog = ({
  open,
  handleClose,
  gameResult,
  loading,
}: GameResultDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="result modal"
      aria-describedby="result modal"
      sx={{
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
      }}
      fullWidth={true}
      maxWidth="xl"
    >
      {!gameResult && <CircularProgress />}
      {gameResult && <GameDetail gameResult={gameResult} />}

      <Button variant="contained" onClick={handleClose}>
        <CloseIcon />
      </Button>
    </Dialog>
  );
};

export default GameResultDialog;
