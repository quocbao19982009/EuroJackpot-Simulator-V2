import { GameModel } from "@/types/GameModel";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { BASED_URL } from "@/utils/constants";

export const postCreateGame = async (
  lotteryTickets: LotteryTicketModel[]
): Promise<{ gameResult: GameModel }> => {
  const ticketToPost = lotteryTickets.map((ticket) => {
    return {
      PrimaryNumber: ticket.primaryNumbers,
      SecondaryNumber: ticket.secondaryNumbers,
    };
  });

  try {
    const response = await fetch(`${BASED_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tickets: ticketToPost }),
    });
    if (!response.ok) {
      throw new Error("Failed to create game");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create game");
  }
};