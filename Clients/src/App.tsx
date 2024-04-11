import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import Container from "./layouts/Container";
import theme from "./lib/theme.tsx";
import GamePage from "./pages/GamePage/GamePage";
import GameHistoryPage from "./pages/gameHistoryPage/GameHistoryPage";
import LoginPage from "./pages/loginPage/LoginPage";
import NotFoundScreen from "./pages/notFoundPage/NotFoundPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import TransactionPage from "./pages/transactionPage/TransactionPage";
import { useAppSelector } from "./redux/hook.ts";
import {
  EUROJACKPOT_ROUTE,
  GAME_ROUTE,
  HISTORY_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  LOTTO_ROUTE,
  NOT_FOUND_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  TRANSACTION_ROUTE,
} from "./utils/constants.ts";

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: (
      <Container>
        <Outlet />
      </Container>
    ),
    children: [
      {
        path: HOME_ROUTE,
        element: <h1>WHAT EVER</h1>,
      },
      {
        path: GAME_ROUTE,
        element: <Outlet />,
        children: [
          {
            path: EUROJACKPOT_ROUTE,
            element: <GamePage />,
          },
          { path: LOTTO_ROUTE, element: <GamePage /> },
        ],
      },
      {
        path: PROFILE_ROUTE,
        element: <ProfilePage />,
      },
      {
        path: HISTORY_ROUTE,
        element: <GameHistoryPage />,
      },
      {
        path: LOGIN_ROUTE,
        element: <LoginPage />,
      },
      {
        path: REGISTER_ROUTE,
        element: <RegisterPage />,
      },
      {
        path: TRANSACTION_ROUTE,
        element: <TransactionPage />,
      },
      {
        path: NOT_FOUND_ROUTE,
        element: <NotFoundScreen />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  const { currentGameType } = useAppSelector((state) => state.lotterySlice);

  return (
    <>
      <ThemeProvider theme={theme[currentGameType]}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
