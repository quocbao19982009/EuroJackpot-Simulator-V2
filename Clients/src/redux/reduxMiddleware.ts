import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import { Middleware, createAction } from "@reduxjs/toolkit";
import {
  addLotteryTicket,
  clearCurrentLotteryTicket,
} from "./slices/lotterySlice";
import { RootState } from "./store";

// Action to match
const setPrimaryNumberAction = createAction<number>("lottery/setPrimaryNumber");
const setSecondaryNumberAction = createAction<number>(
  "lottery/setSecondaryNumber"
);
const addRandomTicket = createAction("lottery/randomTicket");

// This middleware is used to automatically add a ticket to the list of tickets
// Currently: ticket is added if the ticket is complete (all numbers are selected) manually or randomly
// Middleware
export const lotteryMiddleware: Middleware<{}, RootState> =
  (storeAPI) => (next) => (action: any) => {
    next(action);
    console.log("action", action);
    const state = storeAPI.getState();
    const { lotteries, isEditingTicket, gameSettings, currentGameType } =
      state.lotterySlice;
    const currentLottery = lotteries.find(
      (ticket) => ticket.id === CURRENT_LOTTERY_ID
    );

    const { primaryNumberCount, secondaryNumberCount } =
      gameSettings![currentGameType];

    const isAddingNumber =
      setPrimaryNumberAction.match(action) ||
      setSecondaryNumberAction.match(action);
    const isRandomTicket = addRandomTicket.match(action);

    if (
      !isEditingTicket &&
      currentLottery &&
      currentLottery.primaryNumbers.length === primaryNumberCount &&
      currentLottery.secondaryNumbers.length === secondaryNumberCount
    ) {
      if (isAddingNumber || isRandomTicket) {
        setTimeout(() => {
          storeAPI.dispatch(addLotteryTicket(currentLottery));
          storeAPI.dispatch(clearCurrentLotteryTicket());
        }, 500);
      }

      // TODO: Do I need to clear the timeout?
    }
  };
