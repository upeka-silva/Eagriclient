import {
  Autocomplete,
  Button,
  Grid,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VegitableEarlyWarningCarousel from "../VegitableEarlyWarningRanges/Componenets/VegitableEarlyWarningCarousel";
import { Fonts } from "../../../utils/constants/Fonts";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import {get_VegitableEarlyWarningRangeeList} from "../../../redux/actions/cropLook/earlyWarningRegistration/action";


const VegitableEarlyWarningRanges = () => {

  const [vegitableEarlyWarningList, setVegitableEarlyWarningList] = useState([]);


  useEffect(() => {
    debugger;
    get_VegitableEarlyWarningRangeeList().then(({ dataList = [] }) => {
      setVegitableEarlyWarningList(dataList);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <Grid container mt={5} px={5}>
        <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
          Advance Notice for Vegetable Farmers (Price Forecast and Crop
          Selection) – These Two Weeks:
        </Typography>
      </Grid>
      <Grid container mt={5} px={5}>
        <Autocomplete
          //options={locations}
          getOptionLabel={(option) => option.district}
          //onChange={handleLocationChange}
          renderInput={(params) => (
            <InputBase
              {...params.InputProps}
              inputProps={params.inputProps}
              sx={{
                color: "black",
                width: "450px",
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
      </Grid>
      <Grid container mt={1} sx={{ width: "100vw" }}>
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
          <Grid container mt={5} px={5}>
            <Grid item md={8}>
              <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                Best Selection with Best Price
              </Typography>
              <Grid item md={12} mb={5} pl={5}>
                <VegitableEarlyWarningCarousel status={"Best Selection"} />
              </Grid>
              <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                Better Selection with Good Price
              </Typography>
              <Grid item md={12} mb={5} pl={5}>
                <VegitableEarlyWarningCarousel status={"Better Selection"} />
              </Grid>
              <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                Good Selection with General Price
              </Typography>
              <Grid item md={12} mb={5} pl={5}>
                <VegitableEarlyWarningCarousel status={"Good Selection"} />
              </Grid>
              <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                Bad Selection with Worst Price
              </Typography>
              <Grid item md={12} mb={5} pl={5}>
                <VegitableEarlyWarningCarousel status={"Bad Selection"} />
              </Grid>
              <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                Worst Selection with Lower Price
              </Typography>
              <Grid item md={12} mb={5} pl={5}>
                <VegitableEarlyWarningCarousel status={"Worst Selection"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VegitableEarlyWarningRanges;
