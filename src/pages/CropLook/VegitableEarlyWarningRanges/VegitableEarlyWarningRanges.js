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
import { get_VegitableEarlyWarningRangeeList } from "../../../redux/actions/cropLook/earlyWarningRegistration/action";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const VegitableEarlyWarningRanges = () => {
  const [vegitableEarlyWarningList, setVegitableEarlyWarningList] = useState(
    []
  );
  const [bestVegitableEarlyWarningList, setBestVegitableEarlyWarningList] =
    useState([]);
  const [betterVegitableEarlyWarningList, setBetterVegitableEarlyWarningList] =
    useState([]);
  const [goodVegitableEarlyWarningList, setGoodVegitableEarlyWarningList] =
    useState([]);
  const [badVegitableEarlyWarningList, setBadVegitableEarlyWarningList] =
    useState([]);
  const [worstVegitableEarlyWarningList, setWorstVegitableEarlyWarningList] =
    useState([]);

  useEffect(() => {
    debugger;
    get_VegitableEarlyWarningRangeeList().then(({ dataList = [] }) => {
      setVegitableEarlyWarningList(dataList);
      setData();
    });
  }, []);

  const setData = () => {
    setBestVegitableEarlyWarningList(
      vegitableEarlyWarningList.filter(
        (a) => a.vegetableEarlyWarningStatus === "BEST"
      )
    );
    setBetterVegitableEarlyWarningList(
      vegitableEarlyWarningList.filter(
        (a) => a.vegetableEarlyWarningStatus === "BETTER"
      )
    );
    setGoodVegitableEarlyWarningList(
      vegitableEarlyWarningList.filter(
        (a) => a.vegetableEarlyWarningStatus === "GOOD"
      )
    );
    setBadVegitableEarlyWarningList(
      vegitableEarlyWarningList.filter(
        (a) => a.vegetableEarlyWarningStatus === "BAD"
      )
    );
    setWorstVegitableEarlyWarningList(
      vegitableEarlyWarningList.filter(
        (a) => a.vegetableEarlyWarningStatus === "WORST"
      )
    );
  };

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
      <Grid display='flex'>
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
        <Grid   px={30} >
       <FilterAltIcon></FilterAltIcon>
       </Grid>
       </Grid>
      </Grid>
      <Grid container mt={1} sx={{ width: "120vw" }}>
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
              <Grid visibility={bestVegitableEarlyWarningList && bestVegitableEarlyWarningList.length}>
                <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                  Best Selection with Best Price
                </Typography>
                <Grid item md={12} mb={5} pl={5}>
                  <VegitableEarlyWarningCarousel
                    status={"Best Selection"}
                    dataList={bestVegitableEarlyWarningList}
                  />
                </Grid>
              </Grid>
              <Grid visibility={betterVegitableEarlyWarningList && betterVegitableEarlyWarningList.length}>
                <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                  Better Selection with Good Price
                </Typography>
                <Grid item md={12} mb={5} pl={5}>
                  <VegitableEarlyWarningCarousel
                    status={"Better Selection"}
                    dataList={betterVegitableEarlyWarningList}
                  />
                </Grid>
              </Grid>
              <Grid visibility={goodVegitableEarlyWarningList && goodVegitableEarlyWarningList.length}>
                <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                  Good Selection with General Price
                </Typography>
                <Grid item md={12} mb={5} pl={5}>
                  <VegitableEarlyWarningCarousel
                    status={"Good Selection"}
                    dataList={goodVegitableEarlyWarningList}
                  />
                </Grid>
              </Grid>
              <Grid visibility={badVegitableEarlyWarningList && badVegitableEarlyWarningList.length}>
                <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                  Bad Selection with Worst Price
                </Typography>
                <Grid item md={12} mb={5} pl={5}>
                  <VegitableEarlyWarningCarousel
                    status={"Bad Selection"}
                    dataList={badVegitableEarlyWarningList}
                  />
                </Grid>
              </Grid>
              <Grid visibility={worstVegitableEarlyWarningList && worstVegitableEarlyWarningList.length}>
                <Typography fontSize={"15px"} fontWeight={"bold"} mb={2}>
                  Worst Selection with Lower Price
                </Typography>
                <Grid item md={12} mb={5} pl={5}>
                  <VegitableEarlyWarningCarousel
                    status={"Worst Selection"}
                    dataList={worstVegitableEarlyWarningList}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VegitableEarlyWarningRanges;
