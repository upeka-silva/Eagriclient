import React from "react";
import { Card, Container, Grid } from "@mui/material";
import {
  // ArgumentAxis,
  // ValueAxis,
  Chart,
  AreaSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { useUserAccessValidation } from "../../hooks/authentication";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import StatBox from "../../components/DashBoardStatBox/StatBox";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Dashboard = () => {
  useUserAccessValidation();

  return (
    <div>
      <Grid container>
        <Grid
          item
          sm={4}
          md={4}
          sm={4}
          md={4}
          lg={4}
          sx={{
            padding: "10px",
          }}
        >
          <StatBox
            title={"1,723"}
            subtitle="Total GAP Requests"
            // progress="0.75"
            // increase="+14%"
            icon={
              <AccountBalanceWalletIcon
                sx={{ color: "#1c8f91", fontSize: "28px" }}
              />
            }
          />
        </Grid>
        <Grid
          item
          sm={4}
          md={4}
          sm={4}
          md={4}
          lg={4}
          sx={{
            padding: "10px",
          }}
        >
          <StatBox
            title={"1,723"}
            subtitle="Total Land"
            // progress="0.75"
            // increase="+14%"
            icon={
              <AccountBalanceWalletIcon
                sx={{ color: "#1c8f91", fontSize: "28px" }}
              />
            }
          />
        </Grid>
        <Grid
          item
          sm={4}
          md={4}
          sm={4}
          md={4}
          lg={4}
          sx={{
            padding: "10px",
          }}
        >
          <StatBox
            title={"1,723"}
            subtitle="Total Services"
            // progress="0.75"
            // increase="+14%"
            icon={
              <AccountBalanceWalletIcon
                sx={{ color: "#1c8f91", fontSize: "28px" }}
              />
            }
          />
        </Grid>
        <Grid
          item
          sm={4}
          md={4}
          sm={4}
          md={4}
          lg={4}
          sx={{
            padding: "10px",
          }}
        >
          <ChartOne />
        </Grid>
        <Grid
          item
          sm={8}
          md={8}
          sm={8}
          md={8}
          lg={8}
          sx={{
            padding: "10px",
          }}
        >
          <ChartTwo />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
