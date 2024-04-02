import { ErrorResponse } from "@/types/ErrorResponse.interfaces";
import { Transaction } from "@/types/Transaction.interfaces";
import { UserInfo } from "@/types/UserInfo.interfaces";
import { BASED_URL } from "@/utils/constants";
import { getHeader } from "./utils";

export const postTopUpBalance = async (amount: number): Promise<UserInfo> => {
  try {
    const response = await fetch(`${BASED_URL}/balance/`, {
      method: "POST",
      headers: getHeader(),
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      const responseBody = (await response.json()) as ErrorResponse;

      if (responseBody.errors) {
        return Promise.reject(responseBody);
      }
      throw new Error("Failed to top up balance");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to top up balance");
  }
};

export const getBalanceHistory = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${BASED_URL}/balance/history`, {
      headers: getHeader(),
    });
    if (!response.ok) {
      const responseBody = (await response.json()) as ErrorResponse;

      if (responseBody.errors) {
        return Promise.reject(responseBody);
      }
      throw new Error("Failed to top up balance");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get balance");
  }
};
