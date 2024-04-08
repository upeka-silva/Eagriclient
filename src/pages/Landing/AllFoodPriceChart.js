import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import RenderChart from "./components/SingleLineChart";
import LandingHeader from "./components/LandingHeader";

function AllFoodPriceChart() {
  const { state } = useLocation();
  const stateData = state?.data;
  console.log({ stateData });

  //rice data
  const riceData = stateData?.filter((item) => item.groupName === "Rice");
  const otherFruitsData = stateData?.filter(
    (item) => item.groupName === "Other Fruits"
  );
  const ConsumerData = stateData?.filter(
    (item) => item.groupName === "Consumer"
  );
  const DriedChillies = stateData?.filter(
    (item) => item.groupName === "Dried Chillies"
  );

  const OnionData = stateData?.filter((item) => item.groupName === "Onion");

  const PotatoData = stateData?.filter((item) => item.groupName === "Potato");

  const Pulses = stateData?.filter((item) => item.groupName === "Pulses");

  const Vegetable = stateData?.filter((item) => item.groupName === "Vegetable");

  const RootCrops = stateData?.filter(
    (item) => item.groupName === "Root Crops"
  );

  return (
    <div style={{ marginRight: "-160px" }}>
      <LandingHeader />
      <hr />
      <Grid
        md={12}
        item
        sx={{ display: "flex", justifyContent: "flex-end" }}
        px={5}
      >
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

      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {riceData[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1} spacing={2}>
          {riceData?.length > 0 &&
            riceData?.map((item) => (
              <Grid item={3}>{RenderChart({ item })}</Grid>
            ))}
        </Grid>
      </Grid>
      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {otherFruitsData[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1}>
          <Grid>
            <Box display="flex" sx={{}}>
              {otherFruitsData?.length > 0 &&
                otherFruitsData?.map((item) => (
                  <Box marginRight="20px">{RenderChart({ item })}</Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {ConsumerData[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1}>
          <Grid>
            <Box display="flex" sx={{}}>
              {ConsumerData?.length > 0 &&
                ConsumerData?.map((item) => (
                  <Box marginRight="20px">{RenderChart({ item })}</Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {DriedChillies[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1}>
          <Grid>
            <Box display="flex" sx={{}}>
              {DriedChillies?.length > 0 &&
                DriedChillies?.map((item) => (
                  <Box marginRight="20px">{RenderChart({ item })}</Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {OnionData[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1}>
          <Grid>
            <Box display="flex" sx={{}}>
              {OnionData?.length > 0 &&
                OnionData?.map((item) => (
                  <Box marginRight="20px">{RenderChart({ item })}</Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {PotatoData[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1}>
          <Grid>
            <Box display="flex" sx={{}}>
              {PotatoData?.length > 0 &&
                PotatoData?.map((item) => (
                  <Box marginRight="20px">{RenderChart({ item })}</Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {Pulses[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1}>
          <Grid>
            <Box display="flex" sx={{}}>
              {Pulses?.length > 0 &&
                Pulses?.map((item) => (
                  <Box marginRight="20px">{RenderChart({ item })}</Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {Vegetable[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1}>
          <Grid>
            <Box display="flex" sx={{}}>
              {Vegetable?.length > 0 &&
                Vegetable?.map((item) => (
                  <Box marginRight="20px">{RenderChart({ item })}</Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid px={3} mt={3}>
        <Grid>
          <Typography variant="h6" mt={6}>
            {RootCrops[0]?.groupName}
          </Typography>
        </Grid>
        <Grid container mt={1}>
          <Grid>
            <Box display="flex" sx={{}}>
              {RootCrops?.length > 0 &&
                RootCrops?.map((item) => (
                  <Box marginRight="20px">{RenderChart({ item })}</Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AllFoodPriceChart;
