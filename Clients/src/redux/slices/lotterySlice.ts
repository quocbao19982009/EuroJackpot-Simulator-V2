import { LotteryInput, LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/ultis/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface LotteryState {
  currentLottery: LotteryTicketModel;
  completedLotteries: LotteryTicketModel[];
  maxPrimaryNumberSelected: number;
  primaryNumberTotals: number; // Always assume that this will start from 1 to the number
  maxSecondaryNumberSelected: number;
  secondaryNumberTotals: number; // Always assume that this will start from 1 to the number
}

// Define the initial state using that type
const initialState: LotteryState = {
  currentLottery: {
    id: CURRENT_LOTTERY_ID,

    manualSelection: {
      primary: [],
      secondary: [],
    },
    createTime: new Date(),
    primaryNumbers: [],
    secondaryNumbers: [],
  },
  completedLotteries: [],
  // Change this into null or 0 in the future because this will be get from the server
  maxPrimaryNumberSelected: 5,
  primaryNumberTotals: 50,
  maxSecondaryNumberSelected: 2,
  secondaryNumberTotals: 10,
};

//TODO: Need to make sure that a the ticket cannot add over the max number of primary and secondary numbers

//TODO: These redux look like a mess, need to refactor it
export const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {
    setPrimaryNumber: (state, action: PayloadAction<number>) => {
      // If the number is already in the array, remove it
      if (state.currentLottery.primaryNumbers.includes(action.payload)) {
        // Remove from manual Selection
        state.currentLottery.manualSelection.primary =
          state.currentLottery.manualSelection.primary
            .filter((number) => number !== action.payload)
            .sort();
        // Remove from primary numbers
        state.currentLottery.primaryNumbers =
          state.currentLottery.primaryNumbers
            .filter((number) => number !== action.payload)
            .sort();
      } else {
        // Add to manual Selection
        state.currentLottery.manualSelection.primary =
          state.currentLottery.manualSelection.primary
            .concat(action.payload)
            .sort();
        // If the number is not in the array, add it
        state.currentLottery.primaryNumbers =
          state.currentLottery.primaryNumbers.concat(action.payload).sort();
      }
    },
    setSecondaryNumber: (state, action: PayloadAction<number>) => {
      // If the number is already in the array, remove it
      if (state.currentLottery.secondaryNumbers.includes(action.payload)) {
        // Remove from manual Selection
        state.currentLottery.manualSelection.secondary =
          state.currentLottery.manualSelection.secondary
            .filter((number) => number !== action.payload)
            .sort();

        state.currentLottery.secondaryNumbers =
          state.currentLottery.secondaryNumbers
            .filter((number) => number !== action.payload)
            .sort();
      } else {
        // Add to manual Selection
        state.currentLottery.manualSelection.secondary =
          state.currentLottery.manualSelection.secondary
            .concat(action.payload)
            .sort();

        // If the number is not in the array, add it
        state.currentLottery.secondaryNumbers =
          state.currentLottery.secondaryNumbers.concat(action.payload).sort();
      }
    },
    setCurrentLotteryTicket: (state, action: PayloadAction<LotteryInput>) => {
      state.currentLottery = {
        ...action.payload,
        createTime: new Date(),
        id: CURRENT_LOTTERY_ID,
      };
    },
    // This function should assign id
    addLotteryTicket: (state, action: PayloadAction<LotteryInput>) => {
      const newTicket: LotteryTicketModel = {
        ...action.payload,
        createTime: new Date(),
        id: uuidv4(),
      };

      state.completedLotteries = state.completedLotteries.concat(newTicket);
    },
    removeLotteryTicket: (state, action: PayloadAction<string>) => {
      if (action.payload == CURRENT_LOTTERY_ID) {
        // Reset the current ticket
        state.currentLottery = initialState.currentLottery;
      }

      state.completedLotteries = state.completedLotteries.filter(
        (ticket) => ticket.id !== action.payload
      );
    },
    editLotteryTicket: (state, action: PayloadAction<LotteryTicketModel>) => {
      // Replace the ticket with the new update
      const ticketId = action.payload.id;
      // Find the the ticket in the completed list
      const ticketIndex = state.completedLotteries.findIndex(
        (ticket) => ticket.id === ticketId
      );
      // Update the ticket
      state.completedLotteries[ticketIndex] = action.payload;
    },
    clearCurrentLotteryTicket: (state) => {
      state.currentLottery = initialState.currentLottery;
    },
  },
});

export const {
  setPrimaryNumber,
  setSecondaryNumber,
  setCurrentLotteryTicket,
  addLotteryTicket,
  editLotteryTicket,
  removeLotteryTicket,
  clearCurrentLotteryTicket,
} = lotterySlice.actions;

export default lotterySlice.reducer;
