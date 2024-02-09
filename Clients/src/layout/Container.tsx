import { Box, Container as ContainerUI } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ContainerUI maxWidth="xl" component="main">
          {children}
        </ContainerUI>
      </Box>

      <Footer />
    </>
  );
};

export default Container;
