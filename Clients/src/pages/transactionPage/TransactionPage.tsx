import { Box, Button, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useEffect, useState } from "react";

import { getBalanceHistory, postTopUpBalance } from "@/lib/api/balanceApi";
import { useAppDispatch } from "@/redux/hook";
import { updateUserInfo } from "@/redux/slices/userSlice";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import TransactionTable from "./components/TransactionTable";

const TransitionScreen = () => {
  const dispatch = useAppDispatch();
  const [successPopup, setSuccessPopup] = useState<boolean>(false);
  const [popupAmount, setPopupAmount] = useState<string>("10");

  const { data, isLoading, refetch } = useQuery(
    "balanceHistory",
    getBalanceHistory,
    {
      staleTime: Infinity,
    }
  );

  const topUpBalanceMutation = useMutation(postTopUpBalance, {
    onSuccess: (data) => {
      toast.success("Top up Success");
      dispatch(updateUserInfo(data));
      refetch();
    },
  });

  useEffect(() => {
    setSuccessPopup(false);
  }, [successPopup, dispatch]);

  return (
    <div>
      <Typography
        component="h3"
        variant="h4"
        color="text.primary"
        gutterBottom
        textAlign="center"
      >
        Select Amount
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
            onChange={(e) => {
              setPopupAmount(e.target.value);
            }}
          >
            <FormControlLabel value="10" control={<Radio />} label="10€" />
            <FormControlLabel value="20" control={<Radio />} label="20€" />
            <FormControlLabel value="50" control={<Radio />} label="50€" />
            <FormControlLabel value="100" control={<Radio />} label="100€" />
          </RadioGroup>
          <Button
            variant="contained"
            onClick={() => {
              topUpBalanceMutation.mutate(+popupAmount);
            }}
          >
            Pay
          </Button>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexGrow: "1",
          }}
        ></Box>
      </Box>
      <Box
        component={"div"}
        sx={{
          borderTop: "1px solid black",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <Typography
          component="h3"
          variant="h4"
          color="text.primary"
          gutterBottom
          textAlign="center"
        >
          Topup History
        </Typography>
        {isLoading && (
          <Typography variant="h4" component={"h4"} textAlign="center">
            Loading...
          </Typography>
        )}
        {!isLoading && data && data.length === 0 && (
          <Typography variant="h4" component={"h4"} textAlign="center">
            No History Transition
          </Typography>
        )}
        {!isLoading && data && data.length > 0 && (
          <TransactionTable transactionHistory={data} />
        )}
      </Box>
    </div>
  );
};

export default TransitionScreen;
