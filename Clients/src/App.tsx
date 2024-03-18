import CssBaseline from "@mui/material/CssBaseline";
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

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </>
  );
}

export default App;
