import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Chart from "react-apexcharts";
import { styled } from "@mui/system";
import { useNavigate } from "react-router";

const PriceLineChart = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500); // 0.5 seconds delay
    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  const redirectFoodChart = (dataObject) => {
  
    if (dataObject) {
      navigate("/price-food-chart", {
        state: {
            data: dataObject && dataObject,
            fruits: data.fruits,
            vegetables : data.vegetables
        }
        
      });
    } else {
      navigate("/price-food-chart");
    }
  };

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
      categories: Object.keys(data.vegetables[0].yearPrice), // Assuming all items have the same years
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

  const renderChart = (item) => {
    const series = [
      {
        name: "Price",
        data: Object.values(item.yearPrice),
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
            {item.name}
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

  return loaded ? (
    <div>
      <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
        Vegetables
      </Typography>
      <Box display="flex" flexWrap="wrap" sx={{}}>
        {data.vegetables.map((item) => (
          <Box marginRight="20px">{renderChart(item)}</Box>
        ))}
      </Box>
      <div style={{ textAlign: "right" }}>
        <Button onClick={() => redirectFoodChart()}>View More..</Button>
      </div>

      <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
        Fruits
      </Typography>
      <Box display="flex" flexWrap="wrap" fontWeight={"bold"} sx={{}}>
        {data.fruits.map((item) => (
          <Box marginRight="20px">{renderChart(item)}</Box>
        ))}
      </Box>
      <div style={{ textAlign: "right" }}>
        <Button>View More..</Button>
      </div>
      {/* {data.fruits.map(renderChart)} */}
    </div>
  ) : null;
};

export default PriceLineChart;
