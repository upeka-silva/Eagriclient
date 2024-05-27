import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

//images
import SearchIcon from "@mui/icons-material/Search";
import WeeklyWeather from "./components/WeatherCard";
import FaoEmergencyMap from "./components/FaoEmergencyMap";
import { useUserAccessValidation } from "../../hooks/authentication";
import PriceLineChart from "./components/PriceLineChart";
import LandingCarousel from "./components/LandingCarousel";
import LandingHeader from "./components/LandingHeader";
import { get_vegetable_early_warnings } from "../../redux/actions/vegwarning/action";

function Landing() {
  useUserAccessValidation();
  const defaultLocation = {
    district: "Anuradhapura",
    Longitude: 80.5110764,
    Latitude: 7.2345496,
  };
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

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
  };

  //vegetable early warnings

  const [statusData, setStatusData] = React.useState({
    BestData: [],
    BetterData: [],
    GoodData: [],
    WorstData: [],
  });
  console.log({ statusData });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    get_vegetable_early_warnings().then((response) => {
      const categorizedData = {
        BestData: [],
        BetterData: [],
        GoodData: [],
        WorstData: [],
      };

      response?.dataList?.forEach((item) => {
        console.log({ item });
        switch (item?.vegetableEarlyWarningStatus) {
          case "BEST":
            categorizedData.BestData.push(item);
            break;
          case "BETTER":
            categorizedData.BetterData.push(item);
            break;
          case "GOOD":
            categorizedData.GoodData.push(item);
            break;
          case "WORSE":
            categorizedData.WorstData.push(item);
            break;
          default:
        }
      });

      setStatusData(categorizedData);
    });
    setLoading(false);
  }, []);

  return (
    <div>
      <Grid container mt={1} sx={{ width: "100vw" }}>
        <LandingHeader />

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
              getOptionLabel={(option) => option?.district}
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

        <Grid container mt={5} px={2}>
          <WeeklyWeather location={selectedLocation} />
        </Grid>
        <Grid item mt={5} spacing={1} px={5}>
          <PriceLineChart />
        </Grid>

        <Grid container mt={5} px={5}>
          <Grid item md={8}>
            {loading ? (
              <CircularProgress size={16} />
            ) : (
              <>
                <Grid item md={12} mb={5} pl={5}>
                  <LandingCarousel
                    status={"Best Selection"}
                    data={statusData?.BestData}
                  />
                </Grid>
                <Grid item md={12} mb={5} pl={5}>
                  <LandingCarousel
                    status={"Worst Selection"}
                    data={statusData?.WorstData}
                  />
                </Grid>
              </>
            )}
            {/* <Grid
              mt={5}
              mb={5}
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
            </Grid> */}
          </Grid>

          <Grid item md={4}>
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
