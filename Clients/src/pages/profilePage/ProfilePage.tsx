import AvatarDefault from "@/components/avatarDefault/AvatarDefault";
import { useAppSelector } from "@/redux/hook";
import { formatMoney } from "@/utils/functions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import EmailIcon from "@mui/icons-material/Email";
import PaidIcon from "@mui/icons-material/Paid";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Typography } from "@mui/material";
const ProfilePage = () => {
  const { userInfo } = useAppSelector((state) => state.userSlice);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        // marginBottom: "1rem",
      }}
    >
      <Typography variant="h4">User Profile</Typography>
      {userInfo && (
        <>
          <AvatarDefault userInfo={userInfo} sx={{ width: 70, height: 70 }} />

          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
            }}
          >
            <li
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <AccountCircleIcon />
              Name: {userInfo.email}
            </li>
            <li
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <EmailIcon />
              Email: {userInfo.email}
            </li>
            <li
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <SportsEsportsIcon />
              <span>Total play: {userInfo.totalGames} game(s)</span>
            </li>
            <li
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <PaidIcon />
              <span>Balance: {formatMoney(userInfo.balance)}</span>
            </li>
            <li
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <AddCardIcon />
              <span>Total top up: {formatMoney(userInfo.totalTopUps)}</span>
            </li>
            <li
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <CreditScoreIcon />
              <span>Total win: {formatMoney(userInfo.totalWinnings)}</span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
