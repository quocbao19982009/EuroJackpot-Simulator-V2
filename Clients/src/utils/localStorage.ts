import { UserInfo } from "@/types/UserInfo.interfaces";

const userInfoKey = "userInfo";
const tokenKey = "token";

// TODO: Consider using a more secure way to store the token, for example, encrypted or hashed

// Ultis for local storage
export const getUserInfoFromStorage = (): UserInfo | null => {
  const userInfo = localStorage.getItem(userInfoKey);
  return userInfo ? JSON.parse(userInfo) : null;
};

export const saveUserInfoToStorage = (userInfo: UserInfo, token: string) => {
  localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
  // Encrypt the token before saving it to the local storage
  localStorage.setItem(tokenKey, token);
};

export const clearUserInfoStorage = () => {
  localStorage.removeItem(userInfoKey);
  localStorage.removeItem(tokenKey);
};

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem(tokenKey);
};
