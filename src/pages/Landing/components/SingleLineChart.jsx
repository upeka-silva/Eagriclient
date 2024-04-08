import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router";

const RenderChart = ({ item }) => {
  const options = {
    chart: {
      id: "realtime",
      toolbar: {
        show: false,
      },
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },

      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },

    xaxis: {
      categories: "", // Assuming all items have the same years
      labels: {
        show: false, // hide x-axis labels
      },
      axisBorder: {
        show: false, // hide x-axis border
      },
      axisTicks: {
        show: false, // hide x-axis ticks
      },
    },
    yaxis: {
      labels: {
        show: false, // hide y-axis labels
      },
      axisBorder: {
        show: false, // hide y-axis border
      },
      axisTicks: {
        show: false, // hide y-axis ticks
      },
    },
    title: {
      text: "",
      align: "left",
      style: {
        fontFamily: "inherit", // use the font of the parent element
      },
    },
    legend: {
      show: false, // hide legend
    },
    stroke: {
      width: 3, // Adjust this value to change the line thickness
    },
    animations: {
      enabled: true,
      easing: "linear", // specify the easing function for the transition
      speed: 800, // specify the speed of the transition in milliseconds
      animateGradually: {
        enabled: true,
        delay: 150, // specify the delay between each series
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350, // specify the speed of dynamic animation
      },
    },
  };

  console.log({ item });
  const navigate = useNavigate();

  const redirectFoodChart = (dataObject) => {
    console.log({ dataObject });
    if (dataObject) {
      navigate("/price-food-chart", {
        state: {
          data: dataObject && dataObject,
        },
      });
    } else {
    }
  };

  const data = item?.monthlyPriceAverage.map((entry) =>
    parseFloat(entry.averagePrice)
  );

  console.log({ data });

  const series = [
    {
      name: "Price",
      data: data,
    },
  ];

  return (
    <Card
      onClick={() => redirectFoodChart(item)}
      key={item.name}
      sx={{
        width: "250px",
        height: "140px",
        borderRadius: "15px", // Add border radius
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add box shadow
        marginBottom: "20px", // Add margin bottom
      }}
    >
      <CardContent>
        <Typography fontSize={""} gutterBottom>
          {item?.foodName}
        </Typography>
        <Chart
          options={options}
          series={series}
          type="line"
          width="200px"
          height="100px"
        />
      </CardContent>
    </Card>
  );
};

export default RenderChart;
