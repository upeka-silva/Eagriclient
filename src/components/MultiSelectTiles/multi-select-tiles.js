import React, { useState } from "react";
import SingleTile from "./SingleTile";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const CropImg = require("../../assets/images/crop1.jpeg");

const MultiSelectTils = ({ options, handleSelectedValues, isItemDisabled }) => {
  return (
    <>
      {options.map((option) => (
        <>
          <Grid container spacing={4}>
            <Grid item  key={option.id}>
              <Card
                style={{
                  backgroundColor: "#A7E99C",
                  borderColor: "#A7E99C",
                  alignItems: "center",
                }}
                sx={{ display: "flex",height:"140px"}}
              >
                <CardContent style={{ alignContent: "center" }}>
                  <Box sx={{ flexDirection: "column" }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={CropImg}
                      sx={{ 
                        height: "100px", 
                        width: "100px" 
                      }}
                    />
                    <Typography sx={{textAlign:'center'}} pt={1} variant="body2">
                      {option.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                {option.varietyList.map((variety) => (

                  <Grid item xs={2} key={variety.id}>
                    <SingleTile
                      key={variety.id}
                      id={variety.id}
                      name={variety.varietyName}
                      imageUrl={variety?.presignedUrl}
                      onOptionClick={handleSelectedValues}
                      isSelected={variety?.selected || false}
                      isDisabled={isItemDisabled}
                      cropId={option.id}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <hr />
        </>
      ))}
    </>
  );
};

export default MultiSelectTils;
