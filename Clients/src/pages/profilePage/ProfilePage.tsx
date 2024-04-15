import AvatarDefault from "@/components/avatarDefault/AvatarDefault";
import ErrorNotice from "@/components/errorNotice/ErrorNotice";
import { useAppSelector } from "@/redux/hook";
import { formatMoney } from "@/utils/functions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import EmailIcon from "@mui/icons-material/Email";
import PaidIcon from "@mui/icons-material/Paid";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

interface UserInfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const UserInfoItem = ({ icon: Icon, label, value }: UserInfoItemProps) => (
  <ListItem sx={{ display: "flex", justifyContent: "flex-start" }}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={`${label}: ${value}`} />
  </ListItem>
);

const ProfilePage = () => {
  const { userInfo } = useAppSelector((state) => state.userSlice);
  if (!userInfo) {
    return <ErrorNotice message="Cannot fetch user info" />;
  }

  const { email, totalGames, balance, totalTopUps, totalWinnings } = userInfo;

  return (
    <>
      <Typography variant="h2">User Profile</Typography>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
          paddingTop: "1rem",
        }}
      >
        {userInfo && (
          <>
            <AvatarDefault userInfo={userInfo} sx={{ width: 70, height: 70 }} />
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <UserInfoItem
                icon={AccountCircleIcon}
                label="Name"
                value={email}
              />
              <UserInfoItem icon={EmailIcon} label="Email" value={email} />
              <UserInfoItem
                icon={SportsEsportsIcon}
                label="Total play"
                value={`${totalGames} game(s)`}
              />
              <UserInfoItem
                icon={PaidIcon}
                label="Balance"
                value={formatMoney(balance)}
              />
              <UserInfoItem
                icon={AddCardIcon}
                label="Total top up"
                value={formatMoney(totalTopUps)}
              />
              <UserInfoItem
                icon={CreditScoreIcon}
                label="Total win"
                value={formatMoney(totalWinnings)}
              />
            </List>
          </>
        )}
      </Paper>
    </>
  );
};

export default ProfilePage;
