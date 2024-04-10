import Logo from "@/assets/logo/VeikkausLogo.svg";
import AvatarDefault from "@/components/avatarDefault/AvatarDefault";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/slices/userSlice";
import { formatMoney } from "@/utils/functions";
import MenuIcon from "@mui/icons-material/Menu";
import { SvgIcon, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import UserMenu from "./components/UserMenu";

const Header = () => {
  const theme = useTheme();

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

  const handleLogout = () => {
    dispatch(logout());
  };
  const pageItems = [
    { text: "Game", link: "/" },
    { text: "Eurojackpot", link: "/game/eurojackpot" },
    { text: "Lotto", link: "/game/lotto" },
    { text: "Rule", link: "/rule" },
    { text: "About", link: "/about" },
  ];

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
          <Typography
            variant="h6"
            noWrap
            component="a"
            color={theme.palette.primary.main}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              gap: "0.5rem",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <SvgIcon
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                width: "40px",
              }}
              component="span"
            >
              <Logo></Logo>
            </SvgIcon>
            <span>Veikkaus</span>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {anchorElNav && (
              <NavMenu
                anchorEl={anchorElNav}
                pageItems={pageItems}
                handleClose={handleCloseNavMenu}
              />
            )}
          </Box>
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
            <SvgIcon
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                width: "40px",
              }}
              component="span"
            >
              <Logo></Logo>
            </SvgIcon>
            Veikkaus
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pageItems.map((page) => (
              <Button
                key={page.text}
                component={Link}
                to={page.link}
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
              <UserMenu
                onLogout={handleLogout}
                anchorEl={anchorElUser}
                handleClose={handleCloseUserMenu}
              />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
