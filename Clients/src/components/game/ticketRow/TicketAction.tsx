import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import { Box, IconButton } from "@mui/material";
interface TicketActionProps {
  id: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onRandom: () => void;
}

const TicketAction = ({
  id,
  onDelete,
  onEdit,
  onRandom,
}: TicketActionProps) => {
  return (
    <Box
      className="row-action"
      sx={{
        display: "flex",
        alignSelf: "center",
        height: "2.25rem",
        justifyContent: "space-between",
      }}
    >
      <IconButton onClick={onEdit}>
        <EditOutlinedIcon />
      </IconButton>
      <IconButton onClick={onRandom}>
        <ShuffleOutlinedIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(id)}>
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </IconButton>
    </Box>
  );
};

export default TicketAction;
