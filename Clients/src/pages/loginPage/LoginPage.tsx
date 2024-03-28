import { postLogin } from "@/lib/api/userApi";
import { useAppDispatch } from "@/redux/hook";
import { login } from "@/redux/slices/userSlice";
import { ErrorResponse } from "@/types/ErrorResponse.intrfaces";
import { getErrorMessage } from "@/utils/functions";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as LinkUI, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // TODO: These states should it be do in another way?

  const [email, setEmail] = useState("user1@example.com");
  const [password, setPassword] = useState("password");
  const theme = useTheme();

  const { mutate, isLoading, error, data } = useMutation(postLogin, {
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
          },
          token,
        })
      );
    },
    onError: (error: ErrorResponse) => {
      console.error(error);
    },
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        Sign in
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
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
        <LinkUI to="/register" component={Link} variant="body2">
          {"Don't have an account? Sign Up"}
        </LinkUI>
      </Box>
    </Box>
  );
};

export default LoginPage;
