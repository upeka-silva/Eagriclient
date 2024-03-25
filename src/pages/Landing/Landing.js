import {
  Autocomplete,
  Button,
  Grid,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MainLogo from "../../assets/images/DepartmentOfAgricultureLogo.png";
import Cropix from "../../assets/images/cropixLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import Samba from "../../assets/images/sambasample.png";
import LandingCarousal from "../../assets/images/landingcarasol.png";
import CultivateImg from "../../assets/images/cultivate.png";

import WeeklyWeather from "./components/WeatherCard";
import FaoEmergencyMap from "./components/FaoEmergencyMap";
import CustomCard from "./components/CustomCard";
import { useUserAccessValidation } from "../../hooks/authentication";
import PriceLineChart from "./components/PriceLineChart";

function Landing() {
  useUserAccessValidation();
  const defaultLocation = {
    district: "Anuradhapura",
    Longitude: 80.5110764,
    Latitude: 7.2345496,
  };
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

  const data = {
    vegetables: [
      {
        name: "beans",
        yearPrice: {
          2013: 200,
          2014: 500,
          2015: 680,
          2016: 300,
          2017: 500,
          2018: 420,
          2019: 350,
          2020: 780,
          2021: 200,
          2022: 850,
        },
      },
      {
        name: "carrot",
        yearPrice: {
          2013: 150,
          2014: 180,
          2015: 200,
          2016: 220,
          2017: 840,
          2018: 260,
          2019: 380,
          2020: 300,
          2021: 620,
          2022: 340,
        },
      },
      {
        name: "potato",
        yearPrice: {
          2013: 120,
          2014: 430,
          2015: 140,
          2016: 150,
          2017: 560,
          2018: 170,
          2019: 880,
          2020: 190,
          2021: 900,
          2022: 210,
        },
      },
      {
        name: "tomato",
        yearPrice: {
          2013: 250,
          2014: 270,
          2015: 300,
          2016: 320,
          2017: 350,
          2018: 380,
          2019: 400,
          2020: 420,
          2021: 450,
          2022: 470,
        },
      },
      {
        name: "cabbage",
        yearPrice: {
          2013: 180,
          2014: 200,
          2015: 220,
          2016: 280,
          2017: 260,
          2018: 880,
          2019: 300,
          2020: 320,
          2021: 340,
          2022: 960,
        },
      },
    ],
    fruits: [
      {
        name: "apple",
        yearPrice: {
          2013: 200,
          2014: 250,
          2015: 280,
          2016: 300,
          2017: 1000,
          2018: 420,
          2019: 450,
          2020: 480,
          2021: 500,
          2022: 950,
        },
      },
      {
        name: "banana",
        yearPrice: {
          2013: 180,
          2014: 200,
          2015: 220,
          2016: 840,
          2017: 260,
          2018: 280,
          2019: 1000,
          2020: 320,
          2021: 340,
          2022: 160,
        },
      },
      {
        name: "orange",
        yearPrice: {
          2013: 220,
          2014: 240,
          2015: 260,
          2016: 280,
          2017: 300,
          2018: 920,
          2019: 340,
          2020: 360,
          2021: 380,
          2022: 100,
        },
      },
      {
        name: "grape",
        yearPrice: {
          2013: 300,
          2014: 320,
          2015: 340,
          2016: 560,
          2017: 380,
          2018: 400,
          2019: 420,
          2020: 440,
          2021: 460,
          2022: 180,
        },
      },
      {
        name: "watermelon",
        yearPrice: {
          2013: 100,
          2014: 120,
          2015: 140,
          2016: 160,
          2017: 180,
          2018: 5000,
          2019: 220,
          2020: 240,
          2021: 260,
          2022: 1080,
        },
      },
    ],
  };

  const locations = [
    { district: "Ampara", Longitude: 81.5516024, Latitude: 7.2345496 },
    { district: "Anuradhapura", Longitude: 80.5110764, Latitude: 8.39152674 },
    { district: "Badulla", Longitude: 81.042852, Latitude: 7.07422779 },
    { district: "Batticaloa", Longitude: 81.4838626, Latitude: 7.79308559 },
    { district: "Colombo", Longitude: 80.0170921, Latitude: 6.86924986 },
    { district: "Galle", Longitude: 80.2499683, Latitude: 6.22241873 },
    { district: "Gampaha", Longitude: 80.01608, Latitude: 7.12313093 },
    { district: "Hambantota", Longitude: 81.0962892, Latitude: 6.25923555 },
    { district: "Jaffna", Longitude: 80.1142536, Latitude: 9.68737797 },
    { district: "Kalutara", Longitude: 80.1253953, Latitude: 6.57675502 },
    { district: "Kandy", Longitude: 80.7070462, Latitude: 7.27269785 },
    { district: "Kegalle", Longitude: 80.3404847, Latitude: 7.10381372 },
    { district: "Kilinochchi", Longitude: 80.3083568, Latitude: 9.42101421 },
    { district: "Kurunegala", Longitude: 80.234636, Latitude: 7.66434985 },
    { district: "Mannar", Longitude: 80.0873443, Latitude: 8.87752377 },
    { district: "Matale", Longitude: 80.7290545, Latitude: 7.66724793 },
    { district: "Matara", Longitude: 80.5378801, Latitude: 6.14232348 },
    { district: "Monaragala", Longitude: 81.3017283, Latitude: 6.78699684 },
    { district: "Mullaitivu", Longitude: 80.5488834, Latitude: 9.16894939 },
    { district: "Nuwara Eliya", Longitude: 80.7090689, Latitude: 6.97412363 },
    { district: "Polonnaruwa", Longitude: 81.0252443, Latitude: 7.99100564 },
    { district: "Puttalam", Longitude: 79.9123321, Latitude: 7.97558842 },
    { district: "Ratnapura", Longitude: 80.564269, Latitude: 6.58643693 },
    { district: "Trincomalee", Longitude: 81.0901508, Latitude: 8.5547784 },
    { district: "Vavuniya", Longitude: 80.4690992, Latitude: 8.85319951 },
  ];

  const handleLocationChange = (event, value) => {
    setSelectedLocation(value);
    console.log("Selected Location:", value);
  };

  return (
    <div>
      <Grid container  mt={1} sx={{ width: "100vw" }}>
        {/* <Grid
          md={12}
          item
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
            <img width={"30%"} src={Cropix} alt="cropix" />
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
              href="/login"
              color="primary"
            >
              Login
            </Button>
           
          </Grid>
        </Grid> */}

        <Grid
          md={12}
          mt={1}
          mb={1}
          px={5}
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "-160px",
            width: "20vw",
          }}
        >
          <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
            <img width={"210px"} height={"65px"} src={Cropix} alt="cropix" />
            <Typography
              ml={5}
              mt={2}
              fontWeight={"bold"}
              color={"#666666"}
              sx={{ maxWidth: "300px" }} // Limit text width
            >
              Crop Resources, Optimizing Operations <br /> through Precise
              Information, Exchange System
            </Typography>
          </Grid>

          <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
            <img width={"290px"} height={"65px"} src={MainLogo} alt="Logo" />
          </Grid>
        </Grid>

        <Grid md={12}>
          <hr />
        </Grid>

        <Grid
          container
          display={"flex"}
          sx={{ flexDirection: "row", justifyContent: "space-between" }}
          px={5}
        >
          <Grid item mt={5} display={"flex"}>
            <Autocomplete
              options={locations}
              getOptionLabel={(option) => option.district}
              onChange={handleLocationChange}
              renderInput={(params) => (
                <InputBase
                  {...params.InputProps}
                  inputProps={params.inputProps}
                  sx={{
                    color: "black",
                    width: "250px",
                    height: "40px",
                    bgcolor: "#ffffff",
                    borderRadius: "20px",
                    padding: "0px 0px 0px 30px",
                    border: "2px solid #DBDBDB",
                  }}
                  placeholder="Search…"
                  endAdornment={<SearchIcon />}
                />
              )}
            />
            <Grid ml={5}>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {selectedLocation?.district
                  ? selectedLocation?.district
                  : "Ampara"}
                ,Sri Lanka
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "100",
                }}
              >
                Lat:{" "}
                {selectedLocation?.Latitude
                  ? selectedLocation?.Latitude
                  : "7.2345496"}
                -Long:{" "}
                {selectedLocation?.Longitude
                  ? selectedLocation?.Longitude
                  : "81.5516024"}
              </Typography>
            </Grid>
          </Grid>

          <Grid item mt={1}>
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
              href="/login"
              color="primary"
            >
              Login
            </Button>
          </Grid>
        </Grid>

        <Grid container mt={5} px={5}>
          <WeeklyWeather location={selectedLocation} />
        </Grid>
        <Grid container mt={5} spacing={1} px={5}>
          <PriceLineChart data={data} />
        </Grid>
        <Grid container mt={10} px={5}>
          <Grid item md={7}>
            <img src={LandingCarousal} alt="Samba" width={"100%"} />
            <Grid
              mt={17}
              style={{ display: "flex", flexWrap: "wrap", height: "10%" }}
            >
              <CustomCard
                imageUrl={CultivateImg}
                title="Paddy Cultivation Extent"
                extent={"750000 ha"}
              />
              <CustomCard
                imageUrl={CultivateImg}
                title="MAIZE Cultivation Extent"
                extent={"100,000 ha"}
              />
              <CustomCard
                imageUrl={CultivateImg}
                title="Paddy Cultivation Extent"
                extent={"120 mt"}
              />
            </Grid>
          </Grid>

          <Grid item md={3} >
            <Grid sx={{ width: "70%", paddingLeft: "190px" }}>
              <FaoEmergencyMap />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
