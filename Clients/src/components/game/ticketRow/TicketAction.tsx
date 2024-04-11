import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import { Box, IconButton } from "@mui/material";
interface TicketActionProps {
  id: string;
  hidden?: boolean;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onRandom: () => void;
}

const TicketAction = ({
  id,
  hidden,
  onDelete,
  onEdit,
  onRandom,
}: TicketActionProps) => {
  const isCurrenTicket = id === CURRENT_LOTTERY_ID;
  return (
    <Box
      className="row-action"
      sx={{
        display: "flex",
        visibility: hidden ? "hidden" : "visible",
        alignSelf: "center",
        height: "2.25rem",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        sx={{ visibility: `${isCurrenTicket ? "hidden" : "visible"}` }}
        size="small"
        onClick={onEdit}
      >
        <EditOutlinedIcon />
      </IconButton>

      <IconButton size="small" onClick={onRandom}>
        <ShuffleOutlinedIcon />
      </IconButton>
      <IconButton size="small" onClick={() => onDelete(id)}>
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </IconButton>
    </Box>
  );
};

export default TicketAction;
