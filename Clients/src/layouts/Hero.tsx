import { Container, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";

import ImageDesktop from "@/assets/hero.png";
import ImageMobile from "@/assets/heroMobile.png";

const Header = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.secondary,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          backgroundImage: {
            xs: `url(${ImageMobile}) `,
            md: `url(${ImageDesktop})`,
          },
          height: {
            md: "12rem",
            xs: "10rem",
          },
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          component={"h1"}
          fontWeight="900"
          fontSize={"2rem"}
          sx={{
            fontSize: {
              xs: "2rem",
              md: "3rem",
            },
          }}
        >
          Eurojackpot
        </Box>
        <Typography>c. 32 000 000 €</Typography>
      </Container>
    </Box>
  );
};

export default Header;
