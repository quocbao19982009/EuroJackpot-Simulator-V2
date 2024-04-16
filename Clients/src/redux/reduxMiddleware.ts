import { GameType } from "@/types/GameSetting.interfaces";
import { CURRENT_LOTTERY_ID } from "@/utils/constants";

import { Middleware, createAction } from "@reduxjs/toolkit";
import {
  addLotteryTicket,
  getLotteriesFromLocalStorage,
  removeLotteryTicket,
  saveLotteriesToLocalStorage,
  updateAllLotteryTicket,
  updateCompletedLotteries,
} from "./slices/lotterySlice";
import { RootState } from "./store";

// Action to match
const setNumberAction = createAction<number>("lottery/setNumber");

const addRandomTicket = createAction("lottery/randomTicket");
const updateCompletedLotteriesAction = createAction(
  "lottery/updateCompletedLotteries"
);
const updateAllLotteryTicketAction = createAction(
  "lottery/updateAllLotteryTicket"
);
const setCurrentGameTypeAction = createAction<GameType>(
  "lottery/setCurrentGameType"
);

let timeoutId: NodeJS.Timeout | null = null;
let delayTime = 500;

export const lotteryMiddleware: Middleware<object, RootState> =
  (storeAPI) => (next) => (action: any) => {
    next(action);
    if (action.type.startsWith("lottery/")) {
      const state = storeAPI.getState();
      const { lotteries, isEditingTicket, gameSettings, currentGameType } =
        state.lotterySlice;
      const currentLottery = lotteries.find(
        (ticket) => ticket.id === CURRENT_LOTTERY_ID
      );

      const { primaryNumberCount, secondaryNumberCount } =
        gameSettings![currentGameType];

      const isAddingNumber = setNumberAction.match(action);
      const isRandomTicket = addRandomTicket.match(action);

      if (
        !isEditingTicket &&
        currentLottery &&
        currentLottery.primaryNumbers.length === primaryNumberCount &&
        currentLottery.secondaryNumbers.length === secondaryNumberCount
      ) {
        if (isAddingNumber || isRandomTicket) {
          if (timeoutId) {
            clearTimeout(timeoutId);
            delayTime = 0;
            timeoutId = null;
          }
          timeoutId = setTimeout(() => {
            storeAPI.dispatch(addLotteryTicket(currentLottery));
            storeAPI.dispatch(removeLotteryTicket(currentLottery.id));
            timeoutId = null;
            delayTime = 500;
          }, delayTime);
        }
      }
      // Update the completed lotteries when every CRUD action is done
      if (!updateCompletedLotteriesAction.match(action)) {
        storeAPI.dispatch(updateCompletedLotteries());
      }

      if (setCurrentGameTypeAction.match(action)) {
        const latestState = storeAPI.getState();
        const { currentGameType: newGameType } = latestState.lotterySlice;
        console.log("newGameType", newGameType);
        const localStorageLottery = getLotteriesFromLocalStorage(newGameType);

        // if there is lottery in completed lotteries, clear it, give a warning
        storeAPI.dispatch(updateAllLotteryTicket(localStorageLottery));
      }

      if (
        !updateAllLotteryTicketAction.match(action) &&
        !updateCompletedLotteriesAction.match(action) &&
        !setCurrentGameTypeAction.match(action)
      ) {
        const latestState = storeAPI.getState();
        const { lotteries, currentGameType } = latestState.lotterySlice;
        saveLotteriesToLocalStorage(lotteries, currentGameType);
      }
    }
  };
