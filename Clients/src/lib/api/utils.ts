import { ErrorResponse } from "@/types/ErrorResponse.interfaces";
import { getTokenFromStorage } from "@/utils/localStorage";

export const getHeader = () => {
  const token = getTokenFromStorage();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const responseBody = (await response.json()) as ErrorResponse;

    if (responseBody.errors) {
      return Promise.reject(responseBody);
    }

    switch (response.status) {
      case 400:
        throw new Error("Bad request");
      case 401:
        throw new Error("Unauthorized");
      case 500:
        throw new Error("Server error");
      default:
        throw new Error("An unknown error occurred");
    }
  }

  return response.json();
};
