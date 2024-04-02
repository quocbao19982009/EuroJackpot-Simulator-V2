import { getGameSetting } from "@/lib/api/gameApi";
import { getUserInfo } from "@/lib/api/userApi";
import { useAppSelector } from "@/redux/hook";
import { setGameSetting } from "@/redux/slices/gameSettingSlice";
import { logout, updateUserInfo } from "@/redux/slices/userSlice";
import { getTokenFromStorage } from "@/utils/localStorage";
import { Box, Container as ContainerUI } from "@mui/material";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
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
  //Init Login
  // TODO: Is this the best place to put this here?
  const { isGameSettingLoaded } = useAppSelector(
    (state) => state.gameSettingSlice
  );
  const userInfoQuery = useQuery("userInfo", getUserInfo, {
    onSuccess: (data) => {
      console.log("refetch user info data?");
      dispatch(updateUserInfo(data));
    },
    onError: () => {
      dispatch(logout());
    },
    enabled: getTokenFromStorage() ? true : false, // Only run if token is available
  });

  const gameSettingQuery = useQuery("gameSetting", getGameSetting, {
    onSuccess: (data) => {
      dispatch(setGameSetting(data.gameSettings));
    },
    enabled: !isGameSettingLoaded,
  });
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
          {/* TODO: Using a spinner here */}
          {(userInfoQuery.isLoading || gameSettingQuery.isLoading) && (
            <div>Loading...</div>
          )}
          {!userInfoQuery.isLoading && !gameSettingQuery.isLoading && children}
        </ContainerUI>
      </Box>
      <Footer />
    </Box>
  );
};

export default Container;
