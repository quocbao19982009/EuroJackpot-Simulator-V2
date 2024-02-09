import NumberGrid from "@/components/game/numberGrid/NumberGrid";
import TicketRow from "@/components/game/ticketRow/TicketRow";
import TicketModel from "@/type/TicketModel";
import { Box } from "@mui/material";

const mockTickets: TicketModel[] = [
  {
    id: "1",
    primaryNumbers: [1, 2, 3, 4, 5],
    secondaryNumbers: [1, 2],
  },
  {
    id: "1",
    primaryNumbers: [1, 2, 3, 2, 5],
    secondaryNumbers: [1, 3],
  },
];

const currentTicket: TicketModel = {
  id: "1",
  primaryNumbers: [],
  secondaryNumbers: [],
};

const maxPrimaryNumberSelected = 5;
const maxSecondaryNumberSelected = 2;

const GamePage = () => {
  return (
    <Box sx={{ py: 4 }}>
      GamePage
      <NumberGrid
        title="Choose numbers"
        totalNumbers={50}
        maxNumberSelected={maxPrimaryNumberSelected}
        selectedNumbers={[1, 2, 3]}
        onNumberSelected={(number) => console.log(number)}
      />
      <NumberGrid
        title="Select Star numbers"
        totalNumbers={10}
        maxNumberSelected={maxSecondaryNumberSelected}
        selectedNumbers={[1, 2]}
        onNumberSelected={(number) => console.log(number)}
      />
      <br></br>
      <Box>
        <TicketRow
          ticket={currentTicket}
          isCurrentTicket={true}
          maxPrimaryNumberSelected={maxPrimaryNumberSelected}
          maxSecondaryNumberSelected={maxSecondaryNumberSelected}
          onDelete={function (): void {
            throw new Error("Function not implemented.");
          }}
          onRandom={function (): void {
            throw new Error("Function not implemented.");
          }}
          onEdit={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        {mockTickets.map((ticket) => (
          <TicketRow
            ticket={ticket}
            maxPrimaryNumberSelected={maxPrimaryNumberSelected}
            maxSecondaryNumberSelected={maxSecondaryNumberSelected}
            onDelete={function (): void {
              throw new Error("Function not implemented.");
            }}
            onRandom={function (): void {
              throw new Error("Function not implemented.");
            }}
            onEdit={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GamePage;
