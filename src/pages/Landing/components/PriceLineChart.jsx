import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Chart from "react-apexcharts";
import { styled } from "@mui/system";
import { useNavigate } from "react-router";
import axios from "axios";
import { getAllHartiData } from "../../../redux/actions/hartiGraph/action";

const PriceLineChart = ({ data }) => {
  const navigate = useNavigate();

  const [allRiceData, setallRiceData] = useState([]);
  const [otherFruitsData, setOtherFruitsData] = useState([]);
  const [allData, setallData] = useState([]);
  const [loading, setLoading] = useState(false);

  //get the data price and foods data

  const riceData = async () => {
    setLoading(true);
    getAllHartiData()
      .then((response) => {
        console.log({ response });
        setallData(response?.dataList);
        const riceGroupData = response?.dataList
          .filter((item) => item.groupName === "Rice")
          .slice(0, 4);
        const otherFruitsData = response?.dataList?.filter(
          (item) => item.groupName === "Other Fruits"
        );
        setOtherFruitsData(otherFruitsData);
        setallRiceData(riceGroupData);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    riceData();
  }, []);

  const redirectFoodChart = (dataObject) => {
    if (dataObject) {
      navigate("/price-food-chart", {
        state: {
          data: dataObject && dataObject,
        },
      });
    } else {
      navigate("/all-price-food-charts", {
        state: {
          data: allData,
        },
      });
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

  const renderChart = (item) => {
    const data = item.monthlyPriceAverage.map((entry) =>
      parseFloat(entry.averagePrice)
    );
    const series = [
      {
        name: "Price",
        data: data,
      },
    ];

    return (
      <>
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
      </>
    );
  };

  return (
    <div>
      {loading ? (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
            {allRiceData[0]?.groupName}
          </Typography>
          <Box display="flex" flexWrap="wrap" sx={{}}>
            {allRiceData.length > 0 &&
              allRiceData?.map((item) => (
                <Box marginRight="20px">{renderChart(item)}</Box>
              ))}
          </Box>
          <div style={{ textAlign: "right" }}>
            <Button onClick={() => redirectFoodChart()}>View More..</Button>
          </div>
        </>
      )}
      {loading ? (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
            Fruits
          </Typography>
          <Box display="flex" flexWrap="wrap" fontWeight={"bold"} sx={{}}>
            {otherFruitsData?.length > 0 &&
              otherFruitsData?.map((item) => (
                <Box marginRight="20px">{renderChart(item)}</Box>
              ))}
          </Box>
          <div style={{ textAlign: "right" }}>
            <Button onClick={() => redirectFoodChart()}>View More..</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceLineChart;
