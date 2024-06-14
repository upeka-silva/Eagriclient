import * as React from "react";
import { tokens } from "../../../utils/theme/app-theme";
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
    name: "Southern",
    Bean: 4000,
    Pumpkin: 2400,
    amt: 2400,
  },
  {
    name: "Northern",
    Bean: 3000,
    Pumpkin: 1398,
    amt: 2210,
  },
  {
    name: "Western",
    Bean: 2000,
    Pumpkin: 9800,
    amt: 2290,
  },
  {
    name: "Uva",
    Bean: 2780,
    Pumpkin: 3908,
    amt: 2000,
  },
  {
    name: "Eastern",
    Bean: 1890,
    Pumpkin: 4800,
    amt: 2181,
  },
  {
    name: "Central",
    Bean: 2390,
    Pumpkin: 3800,
    amt: 2500,
  },
  {
    name: "Sabaragamuwa",
    Bean: 3490,
    Pumpkin: 4300,
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
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#d9534f" />
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
          <Bar dataKey="Bean" fill="#5bc0de" minPointSize={5}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="Pumpkin" fill="#f0ad4e" minPointSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}