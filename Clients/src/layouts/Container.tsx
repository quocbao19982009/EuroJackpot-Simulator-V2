import { getGameSetting } from "@/lib/api/gameApi";
import { getUserInfo } from "@/lib/api/userApi";
import { useAppSelector } from "@/redux/hook";
import { setGameSetting } from "@/redux/slices/lotterySlice";
import { logout, updateUserInfo } from "@/redux/slices/userSlice";
import { getTokenFromStorage } from "@/utils/localStorage";
import { Box, CircularProgress, Container as ContainerUI } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(getTokenFromStorage());

  useEffect(() => {
    setToken(getTokenFromStorage());
  }, []);

  const { isGameSettingLoaded } = useAppSelector((state) => state.lotterySlice);
  const userInfoQuery = useQuery("userInfo", getUserInfo, {
    onSuccess: (data) => {
      dispatch(updateUserInfo(data));
    },
    onError: () => {
      dispatch(logout());
    },
    enabled: token ? true : false,
    retry: false,
  });

  const gameSettingQuery = useQuery("gameSetting", getGameSetting, {
    onSuccess: (data) => {
      dispatch(setGameSetting(data));
    },
    enabled: !isGameSettingLoaded,
    retry: false,
  });

  const location = useLocation();
  const isGameUrl = location.pathname.includes("/game");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        scrollbarGutter: "stable",
      }}
    >
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
      {isGameUrl && <Hero />}
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
              sm: "1rem",
            },
          }}
          maxWidth="xl"
        >
          {(userInfoQuery.isLoading || gameSettingQuery.isLoading) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!userInfoQuery.isLoading && !gameSettingQuery.isLoading && children}
        </ContainerUI>
      </Box>
      <Footer />
    </Box>
  );
};

export default Container;
