import { LotteryInGame } from "@/types/GameModel";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";

/**
 * Checks if a ticket is completed by comparing the number of primary and secondary numbers selected with the maximum allowed numbers.
 * @param primaryNumber - An array of primary numbers selected.
 * @param secondaryNumber - An array of secondary numbers selected.
 * @param maxPrimaryNumberSelected - The maximum number of primary numbers allowed to be selected.
 * @param maxSecondaryNumberSelected - The maximum number of secondary numbers allowed to be selected.
 * @returns A boolean indicating whether the ticket is completed or not.
 */
export const isTicketCompleted = (
  primaryNumber: number[],
  secondaryNumber: number[],
  maxPrimaryNumberSelected: number,
  maxSecondaryNumberSelected: number
): boolean => {
  return (
    primaryNumber.length === maxPrimaryNumberSelected &&
    secondaryNumber.length === maxSecondaryNumberSelected
  );
};

/**
 * Creates a random ticket based on the given parameters.
 *
 * @param ticket - The input ticket with manual selections.
 * @param maxPrimaryNumberSelected - The maximum number of primary numbers to be selected.
 * @param primaryNumberTotals - The total number of available primary numbers.
 * @param maxSecondaryNumberSelected - The maximum number of secondary numbers to be selected.
 * @param secondaryNumberTotals - The total number of available secondary numbers.
 * @returns A new LotteryInput object representing the random ticket.
 */
export const createRandomTicket = (
  ticket: LotteryTicketModel,
  maxPrimaryNumberSelected: number,
  primaryNumberTotals: number,
  maxSecondaryNumberSelected: number,
  secondaryNumberTotals: number
): LotteryTicketModel => {
  const manualSelectionPrimary = ticket?.manualSelection.primary || [];
  const manualSelectionSecondary = ticket?.manualSelection.secondary || [];

  // Create a random ticket
  const primaryNumbers: number[] = [...manualSelectionPrimary];
  const secondaryNumbers: number[] = [...manualSelectionSecondary];

  while (primaryNumbers.length < maxPrimaryNumberSelected) {
    const number = Math.floor(Math.random() * primaryNumberTotals) + 1;
    if (!primaryNumbers.includes(number)) {
      primaryNumbers.push(number);
    }
  }

  while (secondaryNumbers.length < maxSecondaryNumberSelected) {
    const number = Math.floor(Math.random() * secondaryNumberTotals) + 1;
    if (!secondaryNumbers.includes(number)) {
      secondaryNumbers.push(number);
    }
  }

  return {
    ...ticket,
    primaryNumbers,
    secondaryNumbers,
  };
};

// TODO: These function are kinda similar, maybe we can merge them into one function

export const randomizeTicket = (
  ticket: LotteryTicketModel,
  primaryNumberTotals: number,
  secondaryNumberTotals: number
): LotteryTicketModel => {
  const manualSelection = ticket.manualSelection;
  const primaryNumbers: number[] = [...manualSelection.primary];
  const secondaryNumbers: number[] = [...manualSelection.secondary];

  while (primaryNumbers.length < primaryNumberTotals) {
    const number = Math.floor(Math.random() * primaryNumberTotals) + 1;
    if (!primaryNumbers.includes(number)) {
      primaryNumbers.push(number);
    }
  }

  while (secondaryNumbers.length < secondaryNumberTotals) {
    const number = Math.floor(Math.random() * secondaryNumberTotals) + 1;
    if (!secondaryNumbers.includes(number)) {
      secondaryNumbers.push(number);
    }
  }

  return {
    ...ticket,
    primaryNumbers,
    secondaryNumbers,
  };
};

export const dateFormat = (date: Date) => {
  const dateObj = new Date(date);

  let year = dateObj.getFullYear();
  let month: number | string = dateObj.getMonth() + 1;
  let dt: number | string = dateObj.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${dt}.${month}.${year}`;
};

const compareLotteryTicket = (arr1: number[], arr2: number[]) => {
  return arr1.filter((item) => arr2.includes(item));
};

export const matchNumberLottery = (
  playerLottery: LotteryInGame,
  resultLottery: LotteryInGame
) => {
  const {
    primaryNumbers: numberSelectedbyUser,
    secondaryNumbers: starNumberSelectedbyUser,
  } = playerLottery;
  const {
    primaryNumbers: numberSelectedResult,
    secondaryNumbers: starNumberSelectedResult,
  } = resultLottery;

  const matchNumber = compareLotteryTicket(
    numberSelectedbyUser,
    numberSelectedResult
  );
  const matchStarNumber = compareLotteryTicket(
    starNumberSelectedbyUser,
    starNumberSelectedResult
  );

  return { matchNumber, matchStarNumber };
};

export const validateTicket = (
  ticket: LotteryTicketModel,
  maxPrimaryNumberSelected: number,
  primaryNumberTotals: number,
  maxSecondaryNumberSelected: number,
  secondaryNumberTotals: number
): boolean => {
  const primaryNumber = ticket.primaryNumbers;
  const secondaryNumber = ticket.secondaryNumbers;
  // Check if the ticket is in the range of the max number
  const isInPrimaryRange = primaryNumber.every(
    (number) => number <= primaryNumberTotals
  );
  const isInSecondaryRange = secondaryNumber.every(
    (number) => number <= secondaryNumberTotals
  );
  return (
    primaryNumber.length === maxPrimaryNumberSelected &&
    secondaryNumber.length === maxSecondaryNumberSelected &&
    isInPrimaryRange &&
    isInSecondaryRange
  );
};