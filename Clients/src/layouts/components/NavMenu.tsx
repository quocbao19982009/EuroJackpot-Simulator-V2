import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  pageItems: { text: string; link: string }[];
  handleClose: () => void;
}

const NavMenu = ({ anchorEl, pageItems, handleClose }: UserMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {pageItems.map((item) => (
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={item.link}
          key={item.text}
        >
          {item.text}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NavMenu;
