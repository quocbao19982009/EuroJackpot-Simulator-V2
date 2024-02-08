import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Container from "./layout/Container";
import GamePage from "./pages/GamePage";

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
        <h1>Starting</h1>
      </Container>
    </>
  );
}

export default App;
