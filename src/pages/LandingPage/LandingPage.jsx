// LandingPage.js

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Farmer from "../../assets/images/farmer.png";
import { CardWrapper } from "../../components/PageLayout/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ServiceCard from "./ServiceCard"; // Import the ServiceCard component

import { Routes } from "../../routes/routes";
import { get_DataList } from "../../redux/actions/list/list";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });
console.log("asdas");
// const productsData = {
//   products: [
//     {
//       name: "GAP SERVICE",
//       image_source_url: Farmer,
//       description: "Description of Service 1",
//       path: "/gap-service",
//       service: "gap",
//     },
//     {
//       name: "BASIC DATA SERVICE",
//       image_source_url: Farmer,
//       description: "Description of Service 1",
//       path: "/basic-data-service",
//       service: "basic-data",
//     },
//     {
//       name: "SEED CERTIFICATION",
//       image_source_url: Farmer,
//       description: "Description of Service 1",
//       path: "/seed-certification",
//       service: "seed-certification",
//     },
//     {
//       name: "SERVICE 4",
//       image_source_url: Farmer,
//       description: "Description of Service 1",
//       path: "/service-4",
//       service: "service-4",
//     },
//     // Add other products here
//   ],
// };

const LandingPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get_DataList("app-services");
        setServices(response.dataList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CardWrapper>
        <h1>
          <strong>Hi Dinidu!</strong>
        </h1>
        <Typography variant="h4">
          PLEASE SELECT AN AGRICULTURAL SERVICE
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceCard
                service={service}
                // onClick={() => handleCardClick(product.path)}
              />
            </Grid>
          ))}
        </Grid>
      </CardWrapper>
    </ThemeProvider>
  );
};

export default LandingPage;
