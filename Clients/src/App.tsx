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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Container>
        <Outlet />
      </Container>
    ),
    children: [
      {
        path: "/",
        element: <h1>WHAT EVER</h1>,
      },
      {
        // Path can be / or /game
        path: "/game",
        element: <Outlet />,
        children: [
          // TODO: What is the default page for the game?
          {
            path: "/game/eurojackpot",
            element: <GamePage />,
          },
          { path: "/game/lotto", element: <GamePage /> },
        ],
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/history",
        element: <GameHistoryPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
      {
        path: "*",
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
