import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Container from "./layouts/Container";
import GamePage from "./pages/GamePage/GamePage";
import GameHistoryPage from "./pages/gameHistoryPage/GameHistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Container>
        <GamePage />
      </Container>
    ),
  },
  {
    path: "/history",
    element: (
      <Container>
        <GameHistoryPage />
      </Container>
    ),
  },
  {
    path: "/TEST",
    element: <div>TEST</div>,
  },
]);

// Create a client
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
