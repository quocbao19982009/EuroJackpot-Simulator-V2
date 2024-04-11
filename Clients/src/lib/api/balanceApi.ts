import { Transaction } from "@/types/Transaction.interfaces";
import { UserInfo } from "@/types/UserInfo.interfaces";
import { BASED_URL } from "@/utils/constants";
import { getHeader, handleResponse } from "./utils";

export const postTopUpBalance = async (amount: number): Promise<UserInfo> => {
  const response = await fetch(`${BASED_URL}/balance/`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify({ amount }),
  });
  return handleResponse(response);
};

export const getBalanceHistory = async (): Promise<Transaction[]> => {
  const response = await fetch(`${BASED_URL}/balance/history`, {
    headers: getHeader(),
  });

  return handleResponse(response);
};
