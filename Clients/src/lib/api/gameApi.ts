import { ErrorResponse } from "@/types/ErrorResponse.interfaces";
import { GameModel } from "@/types/GameModel";
import { GameSetting } from "@/types/GameSetting.interfaces";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { UserInfo } from "@/types/UserInfo.interfaces";
import { BASED_URL } from "@/utils/constants";
import { getHeader } from "./utils";

export const postCreateGame = async (
  lotteryTickets: LotteryTicketModel[]
): Promise<{ gameResult: GameModel; user: UserInfo }> => {
  const ticketToPost = lotteryTickets.map((ticket) => {
    return {
      PrimaryNumber: ticket.primaryNumbers,
      SecondaryNumber: ticket.secondaryNumbers,
    };
  });

  try {
    const response = await fetch(`${BASED_URL}/games`, {
      method: "POST",
      headers: getHeader(),
      body: JSON.stringify({ tickets: ticketToPost }),
    });
    if (!response.ok) {
      const responseBody = (await response.json()) as ErrorResponse;

      if (responseBody.errors) {
        return Promise.reject(responseBody);
      }
      throw new Error("Failed to login");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create game");
  }
};

export const getGameSetting = async (): Promise<{
  gameSettings: GameSetting;
}> => {
  try {
    const response = await fetch(`${BASED_URL}/gamesetting`);
    if (!response.ok) {
      throw new Error("Failed to get game setting");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get game setting");
  }
};

export const getGameHistory = async (): Promise<{ games: GameModel[] }> => {
  try {
    const response = await fetch(`${BASED_URL}/games/history`, {
      headers: getHeader(),
    });
    if (!response.ok) {
      throw new Error("Failed to get game history");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get game history");
  }
};
