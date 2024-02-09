import TicketModel from "@/type/TicketModel";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";
import TicketAction from "./TicketAction";
import TicketNumber from "./TicketNumber";

interface TicketRowProps {
  ticket: TicketModel;
  isCurrentTicket?: boolean;
  maxPrimaryNumberSelected: number;
  maxSecondaryNumberSelected: number;
  onDelete: () => void;
  onRandom: () => void;
  onEdit: () => void;
}

const TicketRow = ({
  ticket,
  onDelete,
  onEdit,
  onRandom,
  isCurrentTicket,
  maxPrimaryNumberSelected,
  maxSecondaryNumberSelected,
}: TicketRowProps) => {
  const isPrimaryFull =
    ticket.primaryNumbers.length === maxPrimaryNumberSelected;

  const primaryNumberShow: number[] = isPrimaryFull
    ? ticket.primaryNumbers
    : ticket.primaryNumbers.concat(
        new Array(maxPrimaryNumberSelected - ticket.primaryNumbers.length).fill(
          undefined
        )
      );

  const isSecondaryFull =
    ticket.secondaryNumbers.length === maxSecondaryNumberSelected;
  const secondaryNumberShow: number[] = isSecondaryFull
    ? ticket.secondaryNumbers
    : ticket.secondaryNumbers.concat(
        new Array(
          maxSecondaryNumberSelected - ticket.secondaryNumbers.length
        ).fill(undefined)
      );

  const isActionVisible =
    secondaryNumberShow.some((item) => typeof item === "number") ||
    primaryNumberShow.some((item) => typeof item === "number");
  return (
    <Box
      bgcolor={isCurrentTicket ? "rgb(253, 242, 255)" : ""}
      border={isCurrentTicket ? "2px solid rgb(114, 0, 140)" : ""}
      borderRadius={isCurrentTicket ? 1 : 0}
      sx={{
        borderRadius: 1,
        padding: {
          xs: "0.25rem 1rem",
          md: "0.5rem 1rem",
        },
        display: "flex",
        fontWeight: 600,
        justifyContent: "space-between",
        transition: "background-color .3s ease-in-out",

        ":nth-of-type(2n)": {
          backgroundColor: "#f7f9fc",
        },
      }}
    >
      <Box
        className="row-number"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {primaryNumberShow.map((number) => (
          <TicketNumber
            key={`${ticket.id}_${number}_primary`}
            number={number}
          />
        ))}

        <StarIcon sx={{ width: "2rem", margin: "0.25rem 0.25rem 0.25rem 0" }} />
        {secondaryNumberShow.map((number) => (
          <TicketNumber
            key={`${ticket.id}_${number}_secondary`}
            number={number}
          />
        ))}
      </Box>
      {isActionVisible && (
        <TicketAction onDelete={onDelete} onEdit={onEdit} onRandom={onRandom} />
      )}
    </Box>
  );
};

export default TicketRow;
