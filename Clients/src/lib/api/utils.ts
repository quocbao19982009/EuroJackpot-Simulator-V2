import { getTokenFromStorage } from "@/utils/localStorage";

export const getHeader = () => {
  const token = getTokenFromStorage();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
