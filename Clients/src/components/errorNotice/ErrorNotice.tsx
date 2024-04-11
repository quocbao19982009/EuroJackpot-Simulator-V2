import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface ErrorNoticeProps {
  message?: string;
}

const ErrorNotice = ({ message }: ErrorNoticeProps) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "60vh",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography align="center" color="textPrimary" variant="h3">
              500: Server error
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              Server is not responding. Please try again later.
            </Typography>
            {message && (
              <Typography
                align="center"
                color="textPrimary"
                variant="subtitle2"
              >
                Detail error: {message}
              </Typography>
            )}
            <Link to="/">
              <Button
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
              >
                Go back to dashboard
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ErrorNotice;
