import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Container from "./layouts/Container";
import GamePage from "./pages/GamePage/GamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GamePage />,
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
      <Container>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
