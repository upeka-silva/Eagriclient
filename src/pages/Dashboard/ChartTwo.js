import * as React from "react";
import { tokens } from "../../utils/theme/app-theme";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@mui/material";

const data = [
  {
    name: "GN A",
    crop1: 4000,
    crop2: 2400,
    amt: 2400,
  },
  {
    name: "GN B",
    crop1: 3000,
    crop2: 1398,
    amt: 2210,
  },
  {
    name: "GN C",
    crop1: 2000,
    crop2: 9800,
    amt: 2290,
  },
  {
    name: "GN D",
    crop1: 2780,
    crop2: 3908,
    amt: 2000,
  },
  {
    name: "GN E",
    crop1: 1890,
    crop2: 4800,
    amt: 2181,
  },
  {
    name: "GN F",
    crop1: 2390,
    crop2: 3800,
    amt: 2500,
  },
  {
    name: "GN G",
    crop1: 3490,
    crop2: 4300,
    amt: 2100,
  },
];

export default function ChartTwo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <circle
          cx={x + width / 2}
          cy={y - radius}
          r={radius}
          fill={colors.green[900]}
        />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value.split(" ")[1]}
        </text>
      </g>
    );
  };
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="crop1" fill={colors.green[400]} minPointSize={5}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="crop2" fill={colors.green[900]} minPointSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
