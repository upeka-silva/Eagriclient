import * as React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { tokens } from "../../../utils/theme/app-theme";
import { useTheme } from "@mui/material";

export default function ChartOne() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    { name: "Bg 375", value: 700 },
    { name: "Kahawanu", value: 300 },
    { name: "Ld 371", value: 300 },
    { name: "Bw 367", value: 200 },
  ];

  const COLORS = ["#5cb85c", "#5bc0de", "#f0ad4e", "#d9534f"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div>
        <div className="row d-flex justify-content-center text-center">
          <div className="col-md-8">
            <ResponsiveContainer
              width={400}
              height={400}
              className="text-center"
            >
              <PieChart width={400} height={400}>
                <Legend layout="vertical" verticalAlign="top" align="top" />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
