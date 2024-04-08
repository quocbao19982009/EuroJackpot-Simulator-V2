import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Container from "./layouts/Container";
import GamePage from "./pages/GamePage/GamePage";
import GameHistoryPage from "./pages/gameHistoryPage/GameHistoryPage";
import LoginPage from "./pages/loginPage/LoginPage";
import NotFoundScreen from "./pages/notFoundPage/NotFoundPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import TransactionPage from "./pages/transactionPage/TransactionPage";

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
        // Path can be / or /game
        path: "/",
        element: <Outlet />,
        children: [
          // TODO: What is the default page for the game?
          {
            path: "/",
            // element: <h1>EUROJACPOT</h1>,
            element: <GamePage />,
          },
          {
            path: "/eurojackpot",
            // element: <h1>EUROJACPOT</h1>,
            element: <GamePage />,
          },
          // { path: "/lotto", element: <h1>LOTTO</h1> },
          { path: "/lotto", element: <GamePage /> },
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
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
