import { ErrorResponse } from "@/types/ErrorResponse.intrfaces";
import { UserInfo } from "@/types/UserInfo.interfaces";
import { BASED_URL } from "@/utils/constants";

export interface userLoginDto {
  email: string;
  password: string;
}

export const postLogin = async (
  userLoginDto: userLoginDto
): Promise<UserInfo> => {
  try {
    const response = await fetch(`${BASED_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginDto),
    });
    if (!response.ok) {
      const responseBody = (await response.json()) as ErrorResponse;
      // TODO: Need to figure out how the error message is handle
      if (response.status === 401 && responseBody.errors) {
        return Promise.reject(responseBody);
      }
      throw new Error("Failed to login");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login");
  }
};

export interface userRegisterDto {
  name: string;
  email: string;
  password: string;
}

export const postRegister = async (
  userRegisterDto: userRegisterDto
): Promise<UserInfo> => {
  try {
    const response = await fetch(`${BASED_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegisterDto),
    });
    if (!response.ok) {
      const responseBody = (await response.json()) as ErrorResponse;
      return Promise.reject(responseBody);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register");
  }
};
