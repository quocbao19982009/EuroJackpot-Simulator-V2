import { postTopUpBalance } from "@/lib/api/balanceApi";
import { useAppDispatch } from "@/redux/hook";
import { updateUserInfo } from "@/redux/slices/userSlice";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const topUpOptions = ["10", "20", "50", "100"];

interface TopUpSelectionProps {
  refetchBalanceHistory: () => void;
}
const TopUpSelection = ({ refetchBalanceHistory }: TopUpSelectionProps) => {
  const dispatch = useAppDispatch();
  const [popupAmount, setPopupAmount] = useState<string>("10");

  const topUpBalanceMutation = useMutation(postTopUpBalance, {
    onSuccess: (data) => {
      toast.success("Top up Success");
      dispatch(updateUserInfo(data));
      refetchBalanceHistory();
    },
  });

  const handleTopUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPopupAmount(e.target.value);
  };

  const handleTopUp = () => {
    topUpBalanceMutation.mutate(+popupAmount);
  };

  return (
    <>
      <Typography
        component="h3"
        // variant="h4"
        color="text.primary"
        gutterBottom
        textAlign="center"
      >
        Select amount for top up:
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          flexGrow: "1",
        }}
        component={"form"}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="Popup Amount"
            defaultValue="10"
            value={popupAmount}
            name="radio-buttons-group"
            onChange={handleTopUpChange}
          >
            {topUpOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={`${option}€`}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={handleTopUp}>
          Top up
        </Button>
      </Box>
    </>
  );
};

export default TopUpSelection;
