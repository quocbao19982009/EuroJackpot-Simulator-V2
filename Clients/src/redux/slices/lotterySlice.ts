import { GameSettingsOptions, GameType } from "@/types/GameSetting.interfaces";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/utils/constants";
import { createRandomTicket } from "@/utils/functions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const initTicket = {
  id: CURRENT_LOTTERY_ID,
  manualSelection: {
    primary: [],
    secondary: [],
  },
  primaryNumbers: [],
  secondaryNumbers: [],
};

interface LotteryState {
  currentGameType: GameType;
  isGameSettingLoaded: boolean;
  gameSettings?: GameSettingsOptions;
  lotteries: LotteryTicketModel[];
  completedLotteries: LotteryTicketModel[];
  isEditingTicket: boolean;
  currentEditingTicketId: string;
  isMaxTicketReach: boolean;
}

const initialState: LotteryState = {
  currentGameType: GameType.Lotto,
  isGameSettingLoaded: false,
  gameSettings: undefined,
  isEditingTicket: false,
  currentEditingTicketId: CURRENT_LOTTERY_ID,
  lotteries: [initTicket],
  completedLotteries: [],
  isMaxTicketReach: false,
};

//TODO: These redux look like a mess, need to refactor it
export const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {
    setNumber: (
      state,
      action: PayloadAction<{ number: number; type: "primary" | "secondary" }>
    ) => {
      const { number, type } = action.payload;

      const targetLottery = state.lotteries.find(
        (ticket) => ticket.id === state.currentEditingTicketId
      );

      if (!targetLottery) {
        toast.error("No ticket found to set number");
        return;
      }

      const targetNumbers =
        type === "primary"
          ? targetLottery.primaryNumbers
          : targetLottery.secondaryNumbers;
      const manualSelection =
        type === "primary"
          ? targetLottery.manualSelection.primary
          : targetLottery.manualSelection.secondary;
      const LotteryInputType =
        type === "primary" ? "primaryNumbers" : "secondaryNumbers";

      if (targetNumbers.includes(number)) {
        // Remove from manual selection
        targetLottery.manualSelection[type] = manualSelection.filter(
          (n) => n !== number
        );
        targetLottery[LotteryInputType] = targetNumbers.filter(
          (n) => n !== number
        );
      } else {
        // Add to manual selection
        targetLottery.manualSelection[type] = [...manualSelection, number];
        targetLottery[LotteryInputType] = [...targetNumbers, number];
      }
      targetLottery.manualSelection[type].sort();
      targetLottery[LotteryInputType].sort();
    },
    // This function should assign id
    addLotteryTicket: (state, action: PayloadAction<LotteryTicketModel>) => {
      const newTicket = { ...action.payload, id: uuidv4() };

      setCurrentTicketId(newTicket.id);

      state.lotteries = state.lotteries.concat(newTicket);
    },
    removeLotteryTicket: (state, action: PayloadAction<string>) => {
      const targetLottery = state.lotteries.find(
        (ticket) => ticket.id === state.currentEditingTicketId
      );

      if (!targetLottery) {
        toast.error("No ticket found to remove");
        return;
      }

      if (action.payload === CURRENT_LOTTERY_ID) {
        // Reset the ticket
        Object.assign(targetLottery, initTicket);
      } else {
        // Remove the ticket from the list
        state.lotteries = state.lotteries.filter(
          (ticket) => ticket.id !== action.payload
        );
      }
    },
    removeAllLotteryTicket: (state) => {
      state.lotteries = initialState.lotteries;
    },
    updateLotteryTicket: (state, action: PayloadAction<LotteryTicketModel>) => {
      // Replace the ticket with the new update
      const ticketId = action.payload.id;
      // Find the the ticket in the completed list
      const ticketIndex = state.lotteries.findIndex(
        (ticket) => ticket.id === ticketId
      );
      // Update the ticket
      Object.assign(state.lotteries[ticketIndex], action.payload);
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

      if (!ticketToRandom) {
        toast.error("No ticket found to random");
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
    },
    updateCompletedLotteries: (state) => {
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
  setNumber,
  removeAllLotteryTicket,
  addLotteryTicket,
  updateLotteryTicket,
  removeLotteryTicket,
  setCurrentTicketId,
  randomTicket,
  updateCompletedLotteries,
  setGameSetting,
  setCurrentGameType,
} = lotterySlice.actions;

export default lotterySlice.reducer;
