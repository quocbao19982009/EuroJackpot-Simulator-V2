import { UserInfo } from "@/types/UserInfo.interfaces";
import { clearUserInfoStorage, getUserInfoFromStorage, saveUserInfoToStorage } from "@/utils/localStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface UserState {
  isLogin: boolean;
  userInfo: UserInfo | null;
}

const userInfo = getUserInfoFromStorage();

const initialState: UserState = {
  isLogin: userInfo ? true : false,
  userInfo: userInfo,
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
      saveUserInfoToStorage(action.payload.userInfo, action.payload.token);
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = null;
      clearUserInfoStorage();
    },
  },
});

export const { login, logout } = userSlice.actions;

