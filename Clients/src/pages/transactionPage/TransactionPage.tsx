import { getBalanceHistory } from "@/lib/api/balanceApi";
import { Divider, Grid, Hidden, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";
import TopUpSelection from "./components/TopupSelection";
import TransactionTable from "./components/TransactionTable";

const TransitionScreen = () => {
  const { data, isLoading, refetch } = useQuery(
    "balanceHistory",
    getBalanceHistory,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Typography variant="h2">Transaction</Typography>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
          padding: "1rem 0",
        }}
      >
        <Grid container width={"100%"} gap="1rem">
          <Grid item xs={12} md={3}>
            <TopUpSelection refetchBalanceHistory={refetch} />
          </Grid>

          <Hidden mdDown>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ paddingRight: "1rem" }}
            />
          </Hidden>
          <Hidden mdUp>
            <Divider orientation="horizontal" sx={{ width: "100%" }} />
          </Hidden>

          <Grid item xs={12} md={8}>
            <Typography
              component="h3"
              // variant="h4"
              color="text.primary"
              gutterBottom
              textAlign="center"
            >
              Top-up History
            </Typography>
            {isLoading ? (
              <Typography variant="h4" component={"h4"} textAlign="center">
                Loading...
              </Typography>
            ) : data?.length === 0 ? (
              <Typography variant="h4" component={"h4"} textAlign="center">
                No History Transition
              </Typography>
            ) : (
              <TransactionTable transactionHistory={data ?? []} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default TransitionScreen;
