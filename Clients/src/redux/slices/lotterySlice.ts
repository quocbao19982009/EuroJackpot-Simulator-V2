import { GameSettingsOptions, GameType } from "@/types/GameSetting.interfaces";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import { createRandomTicket } from "@/utils/functions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// TODO: need to sync it with backend
interface LotteryState {
  // Game setting state
  currentGameType: GameType;
  isGameSettingLoaded: boolean;
  gameSettings?: GameSettingsOptions;
  // Lottery state
  lotteries: LotteryTicketModel[];
  completedLotteries: LotteryTicketModel[];
  isEditingTicket: boolean;
  currentEditingTicketId: string;
  isMaxTicketReach: boolean;
}

// Define the initial state using that type
const initialState: LotteryState = {
  // Game setting state
  currentGameType: GameType.Lotto,
  isGameSettingLoaded: false,
  gameSettings: undefined,
  // Lottery state
  isEditingTicket: false,
  currentEditingTicketId: CURRENT_LOTTERY_ID,
  lotteries: [
    {
      id: CURRENT_LOTTERY_ID,
      manualSelection: {
        primary: [],
        secondary: [],
      },
      primaryNumbers: [],
      secondaryNumbers: [],
    },
  ],
  completedLotteries: [],
  isMaxTicketReach: false,
};

//TODO: Need to make sure that a the ticket cannot add over the max number of primary and secondary numbers

//TODO: These redux look like a mess, need to refactor it
export const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {
    setPrimaryNumber: (state, action: PayloadAction<number>) => {
      const targetLottery = state.lotteries.find(
        (ticket) => ticket.id === state.currentEditingTicketId
      );
      if (!targetLottery) {
        console.error("No ticket found to set primary number");
        return;
      }

      // If the number is already in the array, remove it
      if (targetLottery.primaryNumbers.includes(action.payload)) {
        // Remove from manual Selection
        targetLottery.manualSelection.primary =
          targetLottery.manualSelection.primary
            .filter((number) => number !== action.payload)
            .sort();
        // Remove from primary numbers
        targetLottery.primaryNumbers = targetLottery.primaryNumbers
          .filter((number) => number !== action.payload)
          .sort();
      } else {
        // Add to manual Selection
        targetLottery.manualSelection.primary =
          targetLottery.manualSelection.primary.concat(action.payload).sort();
        // If the number is not in the array, add it
        targetLottery.primaryNumbers = targetLottery.primaryNumbers
          .concat(action.payload)
          .sort();
      }
    },
    setSecondaryNumber: (state, action: PayloadAction<number>) => {
      const targetLottery = state.lotteries.find(
        (ticket) => ticket.id === state.currentEditingTicketId
      );
      if (!targetLottery) {
        console.error("No ticket found to set secondary number");
        return;
      }

      // If the number is already in the array, remove it
      if (targetLottery.secondaryNumbers.includes(action.payload)) {
        // Remove from manual Selection
        targetLottery.manualSelection.secondary =
          targetLottery.manualSelection.secondary
            .filter((number) => number !== action.payload)
            .sort();

        targetLottery.secondaryNumbers = targetLottery.secondaryNumbers
          .filter((number) => number !== action.payload)
          .sort();
      } else {
        // Add to manual Selection
        targetLottery.manualSelection.secondary =
          targetLottery.manualSelection.secondary.concat(action.payload).sort();

        // If the number is not in the array, add it
        targetLottery.secondaryNumbers = targetLottery.secondaryNumbers
          .concat(action.payload)
          .sort();
      }
    },
    // This function should assign id
    addLotteryTicket: (state, action: PayloadAction<LotteryTicketModel>) => {
      const newTicket = { ...action.payload, id: uuidv4() };

      setCurrentTicket(newTicket);

      state.lotteries = state.lotteries.concat(newTicket);
      // Update the completed lotteries
      state.completedLotteries = state.lotteries.filter(
        (ticket) => ticket.id !== CURRENT_LOTTERY_ID
      );
    },
    removeLotteryTicket: (state, action: PayloadAction<string>) => {
      const targetLottery = state.lotteries.find(
        (ticket) => ticket.id === state.currentEditingTicketId
      );

      if (!targetLottery) {
        console.error("No ticket found to remove");
        return;
      }

      if (action.payload === CURRENT_LOTTERY_ID) {
        // Reset the ticket
        targetLottery.id = CURRENT_LOTTERY_ID;
        targetLottery.primaryNumbers = [];
        targetLottery.secondaryNumbers = [];
        targetLottery.manualSelection = {
          primary: [],
          secondary: [],
        };
      } else {
        // Remove the ticket from the list
        state.lotteries = state.lotteries.filter(
          (ticket) => ticket.id !== action.payload
        );
      }
      // Update the completed lotteries
      state.completedLotteries = state.lotteries.filter(
        (ticket) => ticket.id !== CURRENT_LOTTERY_ID
      );
    },
    removeAllLotteryTicket: (state) => {
      state.lotteries = initialState.lotteries;
      // Update the completed lotteries
      state.completedLotteries = state.lotteries.filter(
        (ticket) => ticket.id !== CURRENT_LOTTERY_ID
      );
    },
    updateLotteryTicket: (state, action: PayloadAction<LotteryTicketModel>) => {
      // Replace the ticket with the new update
      const ticketId = action.payload.id;
      // Find the the ticket in the completed list
      const ticketIndex = state.lotteries.findIndex(
        (ticket) => ticket.id === ticketId
      );
      // Update the ticket
      state.lotteries[ticketIndex] = action.payload;
      console.log("state.lotteries", state.lotteries);
      // Update the completed lotteries
      state.completedLotteries = state.lotteries.filter(
        (ticket) => ticket.id !== CURRENT_LOTTERY_ID
      );
    },
    clearCurrentLotteryTicket: (state) => {
      const targetLottery = state.lotteries.find(
        (ticket) => ticket.id === state.currentEditingTicketId
      );
      if (!targetLottery) {
        console.error("No ticket found to remove");
        return;
      }

      targetLottery.id = CURRENT_LOTTERY_ID;
      targetLottery.primaryNumbers = [];
      targetLottery.secondaryNumbers = [];
      targetLottery.manualSelection = {
        primary: [],
        secondary: [],
      };
    },
    // This function basically set the current ticket number
    setCurrentTicket: (state, action: PayloadAction<LotteryTicketModel>) => {
      const targetLottery = state.lotteries.find(
        (ticket) => ticket.id === state.currentEditingTicketId
      );
      if (!targetLottery) {
        console.error("No ticket found to set secondary number");
        return;
      }
      targetLottery.manualSelection = action.payload.manualSelection;
      targetLottery.primaryNumbers = action.payload.primaryNumbers;
      targetLottery.secondaryNumbers = action.payload.secondaryNumbers;
    },
    setCurrentTicketId: (state, action: PayloadAction<string>) => {
      state.currentEditingTicketId = action.payload;
      if (action.payload === CURRENT_LOTTERY_ID) {
        state.isEditingTicket = false;
      } else {
        state.isEditingTicket = true;
      }
    },
    randomTicket: (state) => {
      const ticketToRandom = state.lotteries.find(
        (ticket) => ticket.id === state.currentEditingTicketId
      );

      console.log("ticketToRandom", ticketToRandom);

      if (!ticketToRandom) {
        // TODO: This is not possible, but need to handle it
        console.error("No ticket found to random");
        return;
      }

      const {
        primaryNumberCount,
        primaryNumberRange,
        secondaryNumberCount,
        secondaryNumberRange,
      } = state.gameSettings![state.currentGameType];

      const randomTicketInput = createRandomTicket(
        ticketToRandom,
        primaryNumberCount,
        primaryNumberRange,
        secondaryNumberCount,
        secondaryNumberRange
      );

      // Update the ticket
      Object.assign(ticketToRandom, randomTicketInput);
      // Update the completed lotteries
      state.completedLotteries = state.lotteries.filter(
        (ticket) => ticket.id !== CURRENT_LOTTERY_ID
      );
    },
    setGameSetting: (state, action: PayloadAction<GameSettingsOptions>) => {
      state.isGameSettingLoaded = true;
      state.gameSettings = action.payload;
    },
    setCurrentGameType: (state, action: PayloadAction<GameType>) => {
      state.currentGameType = action.payload;
      // Clear all the tickets
      // TODO: Save the ticket before clearing or give a warning
      state.lotteries = initialState.lotteries;
      state.completedLotteries = initialState.completedLotteries;
    },
  },
});

export const {
  setPrimaryNumber,
  setSecondaryNumber,
  removeAllLotteryTicket,
  addLotteryTicket,
  updateLotteryTicket,
  removeLotteryTicket,
  clearCurrentLotteryTicket,
  setCurrentTicket,
  setCurrentTicketId,
  randomTicket,
  setGameSetting,
  setCurrentGameType,
} = lotterySlice.actions;

export default lotterySlice.reducer;
