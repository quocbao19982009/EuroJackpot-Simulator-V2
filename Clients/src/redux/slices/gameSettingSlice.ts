import { GameSetting } from "@/types/GameSetting.interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameSettingState extends GameSetting {
  isGameSettingLoaded: boolean;
}

// Define the initial state using that type
// TODO: Need to figure out what would be the default value for the game setting
const initialState: GameSettingState = {
  isGameSettingLoaded: false,
  primaryNumberRange: 50,
  secondaryNumberRange: 10,
  primaryNumberCount: 5,
  secondaryNumberCount: 2,
  maxTicketsPerUser: 20,
};

export const gameSettingSlice = createSlice({
  name: "gameSetting",
  initialState,
  reducers: {
    setGameSetting: (state, action: PayloadAction<GameSetting>) => {
      state.isGameSettingLoaded = true;
      state.primaryNumberCount = action.payload.primaryNumberCount;
      state.primaryNumberRange = action.payload.primaryNumberRange;
      state.secondaryNumberCount = action.payload.secondaryNumberCount;
      state.secondaryNumberRange = action.payload.secondaryNumberRange;
      state.maxTicketsPerUser = action.payload.maxTicketsPerUser;
    },
  },
});

export const { setGameSetting } = gameSettingSlice.actions;

export default gameSettingSlice.reducer;
