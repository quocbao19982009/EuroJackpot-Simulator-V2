import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";
import TicketAction from "./TicketAction";
import TicketNumber from "./TicketNumber";

interface TicketRowProps {
  ticket: LotteryTicketModel;
  isCurrentTicket?: boolean;
  maxPrimaryNumberSelected: number;
  maxSecondaryNumberSelected: number;
  onDelete: (id: string) => void;
  onRandom: () => void;
  onEdit: () => void;
}

const TicketRow = ({
  ticket,
  isCurrentTicket,
  maxPrimaryNumberSelected,
  maxSecondaryNumberSelected,
  onDelete,
  onEdit,
  onRandom,
}: TicketRowProps) => {
  // NOTE: these predraw circle only in for the isCurrenTickets
  const emptyPrimaryNumber = new Array(maxPrimaryNumberSelected).fill(
    undefined
  );
  const emptySecondaryNumber = new Array(maxSecondaryNumberSelected).fill(
    undefined
  );

  const primaryNumberShow: number[] = ticket.primaryNumbers.concat(
    emptyPrimaryNumber.slice(ticket.primaryNumbers.length)
  );

  const secondaryNumbersShow: number[] = ticket.secondaryNumbers.concat(
    emptySecondaryNumber.slice(ticket.secondaryNumbers.length)
  );

  const isActionVisible =
    primaryNumberShow.some((number) => typeof number === "number") ||
    secondaryNumbersShow.some((number) => typeof number === "number");

  const isAllFilled =
    primaryNumberShow.every((number) => typeof number === "number") &&
    secondaryNumbersShow.every((number) => typeof number === "number");

  const getBackgroundColor = () => {
    if (isAllFilled && isCurrentTicket) {
      return "rgba(114, 0, 120, 0.5)";
    }
    if (isCurrentTicket) {
      return "rgb(253, 242, 255)";
    }

    return "";
  };

  return (
    <Box
      bgcolor={getBackgroundColor()}
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
        {primaryNumberShow
          .sort((a, b) => a - b)
          .map((number, index) => (
            <TicketNumber
              key={`${ticket.id}_${index}_primary`}
              number={number}
              isManualSelection={ticket.manualSelection.primary.includes(
                number
              )}
            />
          ))}

        <StarIcon sx={{ width: "2rem", margin: "0.25rem 0.25rem 0.25rem 0" }} />
        {secondaryNumbersShow
          .sort((a, b) => a - b)
          .map((number, index) => (
            <TicketNumber
              key={`${ticket.id}_${index}_${number}_secondary`}
              number={number}
              isManualSelection={ticket.manualSelection.secondary.includes(
                number
              )}
            />
          ))}
      </Box>
      {isActionVisible && (
        <TicketAction
          id={ticket.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onRandom={onRandom}
        />
      )}
    </Box>
  );
};

export default TicketRow;
