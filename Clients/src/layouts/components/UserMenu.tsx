import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  onLogout: () => void;
}

// Extract UserMenu into a separate component
const UserMenu = ({ anchorEl, handleClose, onLogout }: UserMenuProps) => {
  const menuItems = [
    { name: "Profile", link: "/profile" },
    { name: "Transaction", link: "/transaction" },
    { name: "Game History", link: "/history" },
    { name: "Logout", link: "/logout", onClick: onLogout },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {menuItems.map((item) => (
        <MenuItem
          onClick={() => {
            handleClose();
            item.onClick && item.onClick();
          }}
          component={Link}
          to={item.link}
          key={item.name}
        >
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserMenu;
