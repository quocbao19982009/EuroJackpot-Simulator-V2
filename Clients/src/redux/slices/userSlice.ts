import { UserInfo } from "@/types/UserInfo.interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const userInfoKey = "userInfo";
const tokenKey = "token";

interface UserState {
  isLogin: boolean;
  userInfo: UserInfo | null;
}

const userInfoFromStorage = localStorage.getItem(userInfoKey);
const userInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

const tokenFromStorage = localStorage.getItem(tokenKey);

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

// Ultis for local storage
const saveUserInfoToStorage = (userInfo: UserInfo, token: string) => {
  localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
  localStorage.setItem(tokenKey, token);
};

const clearUserInfoStorage = () => {
  localStorage.removeItem(userInfoKey);
  localStorage.removeItem(tokenKey);
};
