import LotteryTicket from "@/components/game/lotteryTicket/LotteryTicket";
import { useLotteryTicketDetails } from "@/hook/useLotteryTicketDetails";
import { useAppSelector } from "@/redux/hook";
import CloseIcon from "@mui/icons-material/Close";
import { Button, DialogContent, IconButton, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GameNumberSelector from "./GameNumberSelector";

interface GameMobileSelectDialogProps {
  open: boolean;
  handleClose: () => void;
}

const GameMobileSelectDialog = ({
  open,
  handleClose,
}: GameMobileSelectDialogProps) => {
  const theme = useTheme();
  const { currentEditingTicketId } = useAppSelector(
    (state) => state.lotterySlice
  );

  const { primaryNumberShow, secondaryNumbersShow, isAllFilled } =
    useLotteryTicketDetails(currentEditingTicketId);

  return (
    <Dialog fullScreen open={open} onClose={handleClose} scroll="paper">
      <AppBar
        sx={{
          position: "relative",
          background: theme.palette.gameColor.selected,
          color: theme.palette.gameColor.textUnselected,
        }}
      >
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit ticket
          </Typography>
          {isAllFilled && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <DialogContent dividers={true}>
        <GameNumberSelector />
      </DialogContent>
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "white",
          padding: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <LotteryTicket
          id={currentEditingTicketId}
          primaryNumbers={primaryNumberShow}
          secondaryNumbers={secondaryNumbersShow}
        />

        <Button
          disabled={!isAllFilled}
          variant="outlined"
          onClick={handleClose}
        >
          Save
        </Button>
      </AppBar>
    </Dialog>
  );
};

export default GameMobileSelectDialog;
