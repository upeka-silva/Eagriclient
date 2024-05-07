import { CardMedia, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import MainLogo from "../../../assets/images/DepartmentOfAgricultureLogo.png";
import Cropix from "../../../assets/images/cropixLogo.png";
import FAOLogo from "../../../assets/images/FAObluetransparent.png";

function LandingHeader() {
  return (
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
        width: "100vw",
      }}
    >
      <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
        <img
          width={"210px"}
          height={"65px"}
          src={Cropix}
          alt="cropix"
          style={{ marginLeft: "20px" }}
        />

        <Typography
          ml={5}
          mt={2}
          fontWeight={"bold"}
          color={"#666666"}
          minWidth={"300px"}
        >
          Crop Resources, Optimizing Operations <br /> through Precise
          Information, Exchange System
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          style={{ height: "auto", margin: "0 20px 0px 5px", width: "4px" }}
        />
        <Grid>
          <img width={"290px"} height={"65px"} src={MainLogo} alt="Logo" />
        </Grid>

      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CardMedia
          component="img"
          height={70}
          image={FAOLogo}
          title="Fao Logo"
        />
      </Grid>
    </Grid>
  );
}

export default LandingHeader;
