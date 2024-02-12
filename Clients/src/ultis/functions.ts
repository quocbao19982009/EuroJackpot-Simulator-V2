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
