import { UserInfo } from "@/types/UserInfo.interfaces";
import {
  clearUserInfoStorage,
  saveTokenKeyLocalStorage,
} from "@/utils/localStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLogin: boolean;
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  isLogin: false,
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userInfo: UserInfo;
        token: string;
      }>
    ) => {
      state.isLogin = true;
      state.userInfo = action.payload.userInfo;
      saveTokenKeyLocalStorage(action.payload.token);
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = null;
      clearUserInfoStorage();
    },
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, updateUserInfo } = userSlice.actions;
