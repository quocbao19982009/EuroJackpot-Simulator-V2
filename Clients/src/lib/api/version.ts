import { BASED_URL } from "@/utils/constants";
import { handleResponse } from "./utils";

export interface VersionResponse {
  version: string;
}

export const getVersion = async (): Promise<VersionResponse> => {
  const response = await fetch(`${BASED_URL}/version`);

  return handleResponse(response);
};
