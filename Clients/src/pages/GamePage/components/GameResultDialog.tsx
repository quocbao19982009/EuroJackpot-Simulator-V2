import GameDetail from "@/components/game/gameDetail/GameDetail";
import { GameModel } from "@/types/GameModel";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
      scroll="paper"
      maxWidth={"xl"}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Game Result
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
      <DialogContent dividers={true}>
        {loading && <CircularProgress />}
        {gameResult && <GameDetail gameResult={gameResult} />}
      </DialogContent>
    </Dialog>
  );
};

export default GameResultDialog;
