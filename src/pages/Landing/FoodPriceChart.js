import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import { useLocation } from "react-router-dom";
import LandingHeader from "./components/LandingHeader";
import { Fonts } from "../../utils/constants/Fonts";

function FoodPriceChart() {
  const { state } = useLocation();

  // Extracting data from the state object
  const stateData = state?.data;

  const priceData = stateData?.monthlyPriceAverage.map((entry) =>
    parseFloat(entry.averagePrice)
  );

  const dateData = stateData?.monthlyPriceAverage.map((entry) => entry.date);

  // ApexCharts options
  const options = {
    chart: {
      id: "food-price-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "category", // Changed from "line" to "category"
      categories: dateData,
      title: {
        text: "Month",
        style: {
          fontFamily: "inherit", // use the font of the parent element
        },
      },
    },
    yaxis: {
      title: {
        text: "Price",
        style: {
          fontFamily: "inherit", // use the font of the parent element
        },
      },
    },
    title: {
      text: `Price`,
      style: {
        fontFamily: "inherit", // use the font of the parent element
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "5px",
        height: "100vh",
      }}
    >
      <LandingHeader />
      <hr />
      <Grid container px={5} mt={2}>
        <Grid md={12} item sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Grid>
            <Button
              sx={{
                fontSize: "12px",
                color: "#ffff",
                backgroundColor: "#158FD0",
                borderRadius: "25px", // adjust this value as needed
                ":hover": {
                  backgroundColor: "#158FD0", // same as normal state
                  color: "#ffff", // same as normal state
                },
              }}
              href="/"
              color="primary"
            >
              Back
            </Button>
          </Grid>
        </Grid>
        <Grid md={12} mt={1}></Grid>
        <Grid item container md={12} mt={2} spacing={3}>
          <Grid item md={6}></Grid>
        </Grid>
        <Grid item md={12}>
          <Card
            sx={{
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "5px",
            }}
          >
            <Typography fontSize={"18px"} fontWeight="400" gutterBottom>
              {/* Display the name of the selected vegetable */}
            </Typography>
            <Chart
              options={options}
              series={[{ data: priceData }]}
              type="line"
              height={350}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default FoodPriceChart;
