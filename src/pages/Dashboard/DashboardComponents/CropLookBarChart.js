import * as React from "react";
import { Chart } from "react-google-charts";

export default function CropLookBarChart({data=[], options={}}) {
  return (
    <>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </>
  );
}
