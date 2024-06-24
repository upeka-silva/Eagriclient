import React from "react";
import { Grid } from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import CropLookBarChart from "./CropLookBarChart";

const CropVsTargetProgress = () => {
  useUserAccessValidation();

  const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
  };

  return (
    <Grid item sm={6} md={6} lg={6} sx={6}>
      <CropLookBarChart data={data} options={options}/>
    </Grid>
  );
};

export default CropVsTargetProgress;
