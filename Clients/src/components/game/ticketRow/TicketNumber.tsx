import { Box } from "@mui/material";

interface TicketNumberProps {
  number: number;
  isManualSelection: boolean;
}

const TicketNumber = ({ number, isManualSelection }: TicketNumberProps) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "#fff",
        border: "2px solid transparent",
        borderRadius: "100%",
        display: "flex",
        height: "2rem",
        justifyContent: "center",
        margin: "0.25rem 0.25rem 0.25rem 0",
        width: "2rem",
        borderColor: `${
          isManualSelection ? "rgb(83, 88, 96)" : "rgb(163, 170, 180)"
        }`,
      }}
    >
      {number}
    </Box>
  );
};

export default TicketNumber;
