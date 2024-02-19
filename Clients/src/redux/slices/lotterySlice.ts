import { LotteryInput, LotteryTicketModel } from "@/types/LotteryTicketModel";
import { CURRENT_LOTTERY_ID } from "@/ultis/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface LotteryState {
  lotteries: LotteryTicketModel[];
  isEditingTicket: boolean;
  currentEditingTicketId: string;
  maxPrimaryNumberSelected: number;
  primaryNumberTotals: number; // Always assume that this will start from 1 to the number
  maxSecondaryNumberSelected: number;
  secondaryNumberTotals: number; // Always assume that this will start from 1 to the number
  maxTicket: number;
}

// Define the initial state using that type
const initialState: LotteryState = {
  isEditingTicket: false,
  currentEditingTicketId: CURRENT_LOTTERY_ID,
  lotteries: [
    {
      id: CURRENT_LOTTERY_ID,
      manualSelection: {
        primary: [],
        secondary: [],
      },
      createTime: new Date().getTime(),
      primaryNumbers: [],
      secondaryNumbers: [],
    },
  ],
  // Change this into null or 0 in the future because this will be get from the server
  maxPrimaryNumberSelected: 5,
  primaryNumberTotals: 50,
  maxSecondaryNumberSelected: 2,
  secondaryNumberTotals: 10,
  maxTicket: 5,
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
    // setCurrentLotteryTicket: (state, action: PayloadAction<LotteryInput>) => {
    //   state.currentLottery = {
    //     ...action.payload,
    //     createTime: new Date().getTime(),
    //     id: CURRENT_LOTTERY_ID,
    //   };
    // },
    // This function should assign id
    addLotteryTicket: (state, action: PayloadAction<LotteryInput>) => {
      const newTicket: LotteryTicketModel = {
        ...action.payload,
        createTime: new Date().getTime(),
        id: uuidv4(),
      };

      setCurrentTicket(newTicket);
      if (state.lotteries.length - 1 === state.maxTicket) {
        console.log("Max ticket reached");
        return;
      }

      state.lotteries = state.lotteries.concat(newTicket);
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
      state.lotteries[ticketIndex] = action.payload;
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
      // set the current editing ticket
      // state.isEditingTicket = true;
      // state.currentEditingTicketId = action.payload.id;

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
} = lotterySlice.actions;

export default lotterySlice.reducer;
