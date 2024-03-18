import {
  Button,
  Grid,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import React from "react";
import MainLogo from "../../assets/images/DepartmentOfAgricultureLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import Samba from "../../assets/images/sambasample.png";
import LandingCarousal from "../../assets/images/landingcarasol.png";
import CultivateImg from "../../assets/images/cultivate.png";

import WeeklyWeather from "./components/WeatherCard";
import FaoEmergencyMap from "./components/FaoEmergencyMap";
import CustomCard from "./components/CustomCard";

function Landing() {
  return (
    <div>
      <Grid container px={5} mt={3} sx={{ width: "100vw" }}>
        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid>
            <img width={"30%"} src={MainLogo} alt="Logo" />
          </Grid>
          <Typography fontSize={"25px"}>
            <Button
              sx={{ fontSize: "15px", color: "#000" }}
              href="/login"
              color="primary"
            >
              Login
            </Button>
            <Button
              sx={{ fontSize: "15px", color: "#000" }}
              href="/signup"
              color="primary"
            >
              Sign Up
            </Button>
          </Typography>
        </Grid>
        <Grid container display={"flex"} sx={{ flexDirection: "row" }}>
          <Grid item>
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                mt: 5,
              }}
            >
              CROPIX
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              Battramulla,Sri Lanka
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "100",
              }}
            >
              Lat: 6.8979941-Long: 79.9198707
            </Typography>
          </Grid>
          <Grid item mt={5} ml={5}>
            <InputBase
              sx={{
                color: "black", // set the color to black
                width: "250px",
                height: "40px",
                bgcolor: "#ffffff", // set the background color to white
                borderRadius: "20px",
                padding: "10px 20px 10px 20px",
                border: "2px solid #DBDBDB", // add a black border
              }}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              placeholder="Search…"
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-start" mt={5}>
          <WeeklyWeather />
        </Grid>
        <Grid container mt={5} spacing={3}>
          <Grid item>
            <img src={Samba} alt="Samba" />
          </Grid>
          <Grid item>
            <img src={Samba} alt="Samba" />
          </Grid>
          <Grid item>
            <img src={Samba} alt="Samba" />
          </Grid>
        </Grid>
        <Grid container mt={10}>
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
          
          <Grid item md={3}>
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
