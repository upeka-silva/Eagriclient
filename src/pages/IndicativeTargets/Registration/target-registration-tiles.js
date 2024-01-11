import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import CropSingleTile from "./CropSingleTile";

const CropImg = require("../../../assets/images/crop1.jpeg");

const TargetRegistrationTils = ({
  cropList,
  handleSelectedValues,
  isItemDisabled,
}) => {
  return (
    <Grid container spacing={1}>
      <>
        {cropList
          ? cropList.map((crop) => (
              <>
                <Grid item xs={2} key={crop.id} sm={2} md={2} lg={2}>
                  <CropSingleTile
                    key={crop.id}
                    id={crop.id}
                    name={crop.cropId}
                    imageUrl={crop?.originalFileName}
                    onOptionClick={handleSelectedValues}
                    isSelected={crop?.selected || false}
                    isDisabled={isItemDisabled}
                  />
                </Grid>
              </>
            ))
          : null}
      </>
    </Grid>
  );
};

export default TargetRegistrationTils;
