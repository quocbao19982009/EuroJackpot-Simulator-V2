import { HealthCheckResponse, getHealthCheck } from "@/lib/api/healthCheckApi";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";

const HealthPage = () => {
  const [healthCheck, setHealthCheck] = useState<HealthCheckResponse | null>(
    null
  );
  const isBackendHealthy = healthCheck?.isBackendHealthy;
  const isDatabaseHealthy = healthCheck?.isDatabaseHealthy;

  const healthCheckQuery = useQuery("healthCheck", getHealthCheck, {
    onSuccess: (data) => {
      console.log("data", data);
      setHealthCheck(data);
    },
    onError: () => {
      setHealthCheck(null);
    },
    retry: false,
  });

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Health Check Page
      </Typography>

      {healthCheckQuery.isLoading && (
        <Typography variant="body1">Loading...</Typography>
      )}
      {healthCheck && (
        <Typography variant="body1" component="div">
          <Typography
            component="div"
            color={isBackendHealthy ? "green" : "red"}
          >
            Backend is healthy: {isBackendHealthy ? "Yes" : "No"}
          </Typography>{" "}
          <Typography
            component="div"
            color={isDatabaseHealthy ? "green" : "red"}
          >
            Database is connected: {isDatabaseHealthy ? "Yes" : "No"}
          </Typography>
        </Typography>
      )}
    </Box>
  );
};

export default HealthPage;
