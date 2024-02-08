import { Box, Container as ContainerUI } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />

        <ContainerUI component="main" sx={{ m: 5 }}>
          {children}
        </ContainerUI>
      </Box>

      <Footer />
    </>
  );
};

export default Container;
