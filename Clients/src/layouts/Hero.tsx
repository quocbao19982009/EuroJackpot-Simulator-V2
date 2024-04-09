import { Container, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";

import EurojackpotImageDesktop from "@/assets/eurojackpot/hero.png";
import EurojackpotImageMobile from "@/assets/eurojackpot/heroMobile.png";
import LottoImageDesktop from "@/assets/lotto/hero.png";
import LottoImageMobile from "@/assets/lotto/heroMobile.png";
import { useAppSelector } from "@/redux/hook";
import { formatMoney } from "@/utils/functions";

const Header = () => {
  const theme = useTheme();
  const { gameSettings, currentGameType, isGameSettingLoaded } = useAppSelector(
    (state) => state.lotterySlice
  );
  if (!isGameSettingLoaded) return null;

  const { name, jackpotAmount } = gameSettings![currentGameType];
  const getHeroImage = () => {
    switch (name) {
      case "Eurojackpot":
        return {
          md: `url(${EurojackpotImageDesktop})`,
          xs: `url(${EurojackpotImageMobile})`,
        };
      case "Lotto":
        return {
          md: `url(${LottoImageDesktop})`,
          xs: `url(${LottoImageMobile})`,
        };
      default:
        return {
          xs: "",
          md: "",
        };
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.lotteryColor.primary,
        color: theme.palette.gameColor.textUnselected,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          backgroundImage: getHeroImage(),
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
        <Typography
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
          {name}
        </Typography>
        <Typography fontSize={"1.5rem"}>
          {formatMoney(jackpotAmount)}
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
