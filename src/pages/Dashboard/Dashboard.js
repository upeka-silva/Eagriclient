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

import { useServiceContext } from "../../context/ServiceContext";


const Dashboard = () => {
  useUserAccessValidation();
    const { service } = useServiceContext();
    console.log(service)
  return (
    <div>
      <Grid container>
        <Grid
          item
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
          lg={4}
          sx={{
            padding: "10px",
          }}
        >
          <ChartOne />
        </Grid>
        <Grid
          item
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
