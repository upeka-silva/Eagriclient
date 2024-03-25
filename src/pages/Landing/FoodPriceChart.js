import {
  Autocomplete,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useLocation } from "react-router-dom";
import Cropix from "../../assets/images/Cropix.png";

function FoodPriceChart() {
  const { state } = useLocation();

  // Extracting data from the state object
  const { name, yearPrice } = state?.data;
  const fruits = state?.fruits;
  const vegetables = state?.vegetables;

  const [selectedVegetable, setSelectedVegetable] = useState(state?.data);
  const [selectMainCategory, setSelectMainCategory] = useState({
    name: "Vegetables",
    id : 2,
  });

  // Transforming data into ApexCharts format
  const chartData = Object.keys(yearPrice).map((year) => ({
    x: year,
    y: yearPrice[year],
  }));

  // When a different vegetable is selected, update the chart data
  const selectChartData = Object.keys(selectedVegetable?.yearPrice || {}).map(
    (year) => ({
      x: year,
      y: selectedVegetable.yearPrice[year], // Use selected vegetable's data
    })
  );

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
      categories: Object.keys(yearPrice),
      title: {
        text: "Year",
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
      text: ``,
      style: {
        fontFamily: "inherit", // use the font of the parent element
      },
    },
  };

  const mainCategory = [{
    name: "Fruits",
    id : 1,
  }, {
    name: "Vegetables",
    id : 2,
  }]

  return (
    <div style={{ marginRight: "-160px" }}>
      <Grid container px={5} mt={3}>
        <Grid
          md={12}
          item
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
            <img width={"35%"} src={Cropix} alt="cropix" />
            <Typography ml={5} fontWeight={"bold"} color={"#666666"}>
              Crop Resources, Optimizing Operations <br /> through Precise
              Information, Exchange System
            </Typography>
          </Grid>

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
            {/* <Button
            sx={{ 
              fontSize: "12px", 
              color: "#ffff", 
              backgroundColor: "#158FD0", 
              borderRadius: "15px", // adjust this value as needed
              marginLeft: "10px" // adjust this value as needed
            }}
            href="/signup"
            color="primary"
          >
            Sign Up
          </Button> */}
          </Grid>
        </Grid>
        <Grid md={12} mt={1}>
          <hr />
        </Grid>
        <Grid item container md={12} mt={5} spacing={3}>
          <Grid item md={6}>
          <Autocomplete
            options={mainCategory}
            value={selectMainCategory} 
            getOptionLabel={(i) => `${i.name}`}
            onChange={(event, newValue) => {
              setSelectMainCategory(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Vegetable" />
            )}
          />
          </Grid>
          <Grid item md={6}>
          <Autocomplete
            options={vegetables}
            value={selectedVegetable} 
            getOptionLabel={(i) => `${i.name}`}
            onChange={(event, newValue) => {
              setSelectedVegetable(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Vegetable" />
            )}
          />
          </Grid>
          
          
        </Grid>
        <Grid item md={12}>
        <Card
            sx={{
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginTop: "40px",
            }}
          >
            <Typography fontSize={"18px"} fontWeight="bold" gutterBottom>
              {/* Display the name of the selected vegetable */}
              {selectedVegetable && (
                <>Price Trend for {selectedVegetable.name}</>
              )}
            </Typography>
            <Chart
              options={options}
              series={[{ data: selectChartData }]}
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
