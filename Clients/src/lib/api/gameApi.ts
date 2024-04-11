import { GameModel } from "@/types/GameModel";
import { GameSettingsOptions, GameType } from "@/types/GameSetting.interfaces";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { UserInfo } from "@/types/UserInfo.interfaces";
import { BASED_URL } from "@/utils/constants";
import { handleResponse } from "@/utils/functions";
import { getHeader } from "./utils";

interface PostCreateGameProps {
  lotteryTickets: LotteryTicketModel[];
  gameType: GameType;
}

export const postCreateGame = async ({
  lotteryTickets,
  gameType,
}: PostCreateGameProps): Promise<{ gameResult: GameModel; user: UserInfo }> => {
  const ticketToPost = lotteryTickets.map((ticket) => ({
    PrimaryNumber: ticket.primaryNumbers,
    SecondaryNumber: ticket.secondaryNumbers,
  }));

  const response = await fetch(`${BASED_URL}/games/${gameType}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify({ tickets: ticketToPost }),
  });

  return handleResponse(response);
};

export const getGameSetting = async (): Promise<GameSettingsOptions> => {
  const response = await fetch(`${BASED_URL}/gamesetting`);
  return handleResponse(response);
};

export const getGameHistory = async (): Promise<{ games: GameModel[] }> => {
  const response = await fetch(`${BASED_URL}/games/history`, {
    headers: getHeader(),
  });

  return handleResponse(response);
};
