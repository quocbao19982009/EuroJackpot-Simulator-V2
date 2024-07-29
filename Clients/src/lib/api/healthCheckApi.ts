import { BASED_URL } from "@/utils/constants";
import { handleResponse } from "./utils";

export interface HealthCheckResponse {
  isBackendHealthy: boolean;
  isDatabaseHealthy: boolean;
  databaseServer: string;
}

export const getHealthCheck = async (): Promise<HealthCheckResponse> => {
  const response = await fetch(`${BASED_URL}/healthcheck`);

  return handleResponse(response);
};
