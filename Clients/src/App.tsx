import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Container from "./layouts/Container";
import GamePage from "./pages/GamePage/GamePage";
import GameHistoryPage from "./pages/gameHistoryPage/GameHistoryPage";
import LoginPage from "./pages/loginPage/LoginPage";
import NotFoundScreen from "./pages/notFoundPage/NotFoundPage";
import RegisterPage from "./pages/registerPage/RegisterPage";

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
        element: <GamePage />,
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
