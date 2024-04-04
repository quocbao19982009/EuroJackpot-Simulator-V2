import { UserInfo } from "@/types/UserInfo.interfaces";
import { stringToColor } from "@/utils/functions";
import { Avatar, AvatarProps as MuiAvatarProps } from "@mui/material";

interface AvatarProps extends MuiAvatarProps {
  userInfo: UserInfo;
}

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0].toUpperCase()}`,
  };
};

const AvatarDefault = ({ userInfo, ...avatarProps }: AvatarProps) => {
  return (
    <Avatar
      {...stringAvatar(userInfo.email)}
      {...avatarProps}
      sx={{ ...stringAvatar(userInfo.email).sx, ...avatarProps.sx }}
      alt={userInfo.email}
    />
  );
};

export default AvatarDefault;
