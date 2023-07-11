import React from "react";
import { Card } from "@mui/material";
import {
  // ArgumentAxis,
  // ValueAxis,
  Chart,
  AreaSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { useUserAccessValidation } from "../../hooks/authentication";

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 15 },
  { argument: 3, value: 20 },
];

const Dashboard = () => {
  useUserAccessValidation();

  return (
    <div>
      <Card sx={{ width: "400px" }}>
        <Chart
          data={data}
          // width={400}
          // height={200}
        >
          {/* <ArgumentAxis /> */}
          {/* <ValueAxis /> */}

          <AreaSeries valueField="value" argumentField="argument" />
        </Chart>
      </Card>
    </div>
  );
};

export default Dashboard;
