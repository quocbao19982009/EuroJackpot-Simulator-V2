// hooks/useTicketNumbers.ts
import { useAppSelector } from "@/redux/hook";

export const useLotteryTicketDetails = (ticketId: string) => {
  const { lotteries, currentGameType, gameSettings } = useAppSelector(
    (state) => state.lotterySlice
  );
  if (!gameSettings) {
    throw new Error("Game settings not loaded");
  }
  const { primaryNumberCount, secondaryNumberCount } =
    gameSettings[currentGameType];

  const currentLottery = lotteries.find((ticket) => ticket.id === ticketId);

  if (!currentLottery) {
    throw new Error("Ticket not found");
  }

  const emptyPrimaryNumber = new Array(primaryNumberCount).fill(undefined);
  const emptySecondaryNumber = new Array(secondaryNumberCount).fill(undefined);

  const primaryNumberShow: number[] = currentLottery.primaryNumbers.concat(
    emptyPrimaryNumber.slice(currentLottery.primaryNumbers.length)
  );

  const secondaryNumbersShow: number[] = currentLottery.secondaryNumbers.concat(
    emptySecondaryNumber.slice(currentLottery.secondaryNumbers.length)
  );

  const isActionVisible =
    primaryNumberShow.some((number) => typeof number === "number") ||
    secondaryNumbersShow.some((number) => typeof number === "number");

  const isAllFilled =
    primaryNumberShow.every((number) => typeof number === "number") &&
    secondaryNumbersShow.every((number) => typeof number === "number");

  return {
    primaryNumberShow,
    secondaryNumbersShow,
    isActionVisible,
    isAllFilled,
  };
};
