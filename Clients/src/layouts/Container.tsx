import { Box, Container as ContainerUI } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
      <Header />
      <Hero />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ContainerUI
          sx={{
            flexGrow: 2,
            padding: {
              xs: "0",
              sm: "0 1rem",
            },
          }}
          maxWidth="xl"
        >
          {children}
        </ContainerUI>
      </Box>
      <Footer />
    </Box>
  );
};

export default Container;
