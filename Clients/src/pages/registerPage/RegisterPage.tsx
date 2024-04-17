import { postRegister } from "@/lib/api/userApi";
import { getErrorMessage } from "@/lib/api/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { login } from "@/redux/slices/userSlice";
import { ApiErrorResponse } from "@/types/ErrorResponse.interfaces";
import { EUROJACKPOT_ROUTE } from "@/utils/constants";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Link as LinkUI,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogin } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    if (isLogin) navigate(EUROJACKPOT_ROUTE);
  }, [isLogin, navigate]);

  if (isLogin) {
    navigate(EUROJACKPOT_ROUTE);
    return null;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isLoading } = useMutation(postRegister, {
    onSuccess: (data) => {
      const token = data.token;
      if (!token) {
        console.error("No token found");
        return;
      }
      dispatch(
        login({
          userInfo: {
            email: data.email,
            id: data.id,
            balance: data.balance,
            totalGames: data.totalGames,
            totalWinnings: data.totalWinnings,
            totalTopUps: data.totalTopUps,
          },
          token,
        })
      );
      navigate("/"); // Navigate to home page
    },
    onError: (error: ApiErrorResponse) => {
      setErrorMessage(getErrorMessage(error));
    },
  });

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email");
      return;
    }

    // Check if password length is at least 8 characters
    if (password.length < 4) {
      setErrorMessage("Password should be at least 8 characters long");
      return;
    }

    mutate({ email, password });
  };

  return (
    <Box
      sx={{
        padding: 2,
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1 }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: "50%",
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          required
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Box>
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>

        <LinkUI to="/login" variant="body2" component={Link}>
          Already have an account? Sign in
        </LinkUI>
      </Box>
    </Box>
  );
};

export default RegisterPage;
