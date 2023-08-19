import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { PieChart , pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function ChartOne() {
  const data =  [
    { id: 0, value: 10, label: "GAP" },
    { id: 1, value: 15, label: "Lands" },
    { id: 2, value: 20, label: "Crops" },
  ]

  return (
    
    <Paper
      sx={{
        width: "100%",
        height: "300px",
        backgroundColor: "#f2f0f0",
        display:'flex',
        // justifyContent:'center'
      }}
    >
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
            data,
          },
        ]}
        width={350}
        height={300}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
            
          },
        }}
        
      />
    </Paper>
  );
}
