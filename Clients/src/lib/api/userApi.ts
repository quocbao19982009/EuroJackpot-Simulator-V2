import { UserInfo } from "@/types/UserInfo.interfaces";
import { BASED_URL } from "@/utils/constants";
import { getHeader, handleResponse } from "./utils";

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  email: string;
  password: string;
}

export const postLogin = async (
  userLoginDto: UserLoginDto
): Promise<UserInfo> => {
  const response = await fetch(`${BASED_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLoginDto),
  });

  return handleResponse(response);
};

export const postRegister = async (
  userRegisterDto: UserRegisterDto
): Promise<UserInfo> => {
  const response = await fetch(`${BASED_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userRegisterDto),
  });

  return handleResponse(response);
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await fetch(`${BASED_URL}/users/me`, {
    headers: getHeader(),
  });

  return handleResponse(response);
};
