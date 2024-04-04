import AvatarDefault from "@/components/avatarDefault/AvatarDefault";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/slices/userSlice";
import { formatMoney, stringToColor } from "@/utils/functions";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// TODO: Refactor this component
const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { userInfo, isLogin } = useAppSelector((state) => state.userSlice);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItems = [
    { text: "Profile", onClick: () => navigate("/profile") },
    { text: "Transaction", onClick: () => navigate("/transaction") },
    { text: "Game History", onClick: () => navigate("/history") },
    {
      text: "Logout",
      onClick: () => {
        setAnchorElUser(null);
        dispatch(logout());
        navigate("/login");
      },
    },
  ];
  const pageItems = [
    { text: "Game", onClick: () => navigate("/") },
    { text: "Rule", onClick: () => navigate("/rule") },
    { text: "About", onClick: () => navigate("/about") },
  ];

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0].toUpperCase()}`,
    };
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.primary,
      }}
    >
      <Container className="Test1" maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {anchorElNav && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pageItems.map((item) => (
                  <MenuItem key={item.text} onClick={item.onClick}>
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pageItems.map((page) => (
              <Button
                key={page.text}
                onClick={page.onClick}
                sx={{
                  my: 2,
                  color: "inherit",
                  display: "block",
                  borderRadius: "2rem",
                  ":hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          {!isLogin && (
            <Box sx={{ flexGrow: 0 }}>
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button sx={{ my: 2, color: "#26282b", display: "block" }}>
                  Sign In
                </Button>
              </Link>
            </Box>
          )}
          {isLogin && userInfo && (
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography
                component={"span"}
                sx={{
                  color: "#26282b",
                  marginLeft: "0.3rem",
                }}
              >
                {formatMoney(userInfo.balance)}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AvatarDefault userInfo={userInfo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.text} onClick={item.onClick}>
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
