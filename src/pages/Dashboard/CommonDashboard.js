import React from "react";
import { Grid, useTheme } from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import ChartOne from "./DashboardComponents/ChartOne";
import ChartTwo from "./DashboardComponents/ChartTwo";
import StatBox from "../../components/DashBoardStatBox/StatBox";
import { Forest, Image, Satellite } from "@mui/icons-material";
import { tokens } from "../../utils/theme/app-theme";

const CommonDashboard = () => {
  useUserAccessValidation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        <Grid item sm={4} md={4} sx={12}>
          <StatBox
            title={"1,723"}
            subtitle="Total GAP Requests"
            progress="0.75"
            increase="+14%"
            icon={<Image sx={{ color: colors.pure_white, fontSize: "28px" }} />}
          />
        </Grid>
        <Grid item sm={4} md={4} lg={4} sx={12}>
          <StatBox
            title={"1,723"}
            subtitle="Total Land"
            progress="0.75"
            increase="+14%"
            icon={
              <Satellite sx={{ color: colors.pure_white, fontSize: "28px" }} />
            }
          />
        </Grid>
        <Grid item sm={4} md={4} lg={4} sx={12}>
          <StatBox
            title={"1,723"}
            subtitle="Total Services"
            progress="0.75"
            increase="+14%"
            icon={
              <Forest sx={{ color: colors.pure_white, fontSize: "32px" }} />
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: "30px" }}>
        <Grid item sm={4} md={4} lg={4} sx={12}>
          <ChartOne />
        </Grid>
        <Grid item sm={8} md={8} lg={8} sx={12}>
          <ChartTwo />
        </Grid>
      </Grid>
    </div>
  );
};

export default CommonDashboard;
