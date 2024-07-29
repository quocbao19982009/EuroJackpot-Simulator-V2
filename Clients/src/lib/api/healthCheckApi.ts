import { handleResponse } from "./utils";

export interface HealthCheckResponse {
  isBackendHealthy: boolean;
  isDatabaseHealthy: boolean;
  databaseServer: string;
}

export const getHealthCheck = async (): Promise<HealthCheckResponse> => {
  const response = await fetch(`http://localhost:5000/api/healthcheck`);

  return handleResponse(response);
};
