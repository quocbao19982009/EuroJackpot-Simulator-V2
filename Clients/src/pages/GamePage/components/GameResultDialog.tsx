import GameDetail from "@/components/game/gameDetail/GameDetail";
import { GameModel } from "@/types/GameModel";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

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
      <DialogTitle>Game Result</DialogTitle>
      <Divider />
      <DialogContent>
        {loading && <CircularProgress />}
        {gameResult && <GameDetail gameResult={gameResult} />}
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameResultDialog;
