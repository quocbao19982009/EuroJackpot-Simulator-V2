import { postRegister } from "@/lib/api/userApi";
import { useAppDispatch } from "@/redux/hook";
import { login } from "@/redux/slices/userSlice";
import { ApiErrorResponse } from "@/types/ErrorResponse.interfaces";
import { getErrorMessage } from "@/utils/functions";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Link as LinkUI,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { mutate, isLoading, error } = useMutation(postRegister, {
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
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error);
    },
  });

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password, name });
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
          margin="normal"
          fullWidth
          autoComplete="given-name"
          name="name"
          id="Name"
          label="Name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          {error && (
            <Typography variant="body2" color="error">
              {getErrorMessage(error)}
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
