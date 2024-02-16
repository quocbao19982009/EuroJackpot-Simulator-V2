import { Box, Container as ContainerUI } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <Header />
      <Hero />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ContainerUI className="main" maxWidth="xl">
          {children}
        </ContainerUI>
      </Box>

      <Footer />
    </>
  );
};

export default Container;
