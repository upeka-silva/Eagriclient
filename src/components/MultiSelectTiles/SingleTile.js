import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";
import { Avatar, Box, Chip, Select } from "@mui/material";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";
import { Done, Face, SelectAllRounded } from "@mui/icons-material";

const CropImg = require("../../assets/images/crop1.jpeg");

const useStyles = makeStyles({
  selectedCard: {
    backgroundColor: "red",
  },
  normalCard: {
    backgroundColor: "blue",
  },
});

const SingleTile = ({ id, name, imageUrl, onOptionClick, isSelected, isDisabled }) => {

  const handleTileClick = () => {
    if(!isDisabled) {
      onOptionClick(id, !isSelected);
    }
  };

  const getStyle = () => {
    if (isSelected) {
      return "#A7E99C";
    } else {
      return "white";
    }
  };

  return (
    <div>
      <Card
        style={{ backgroundColor: getStyle(), borderColor: "#A7E99C", alignItems: "center" }}
        sx={{ display: "flex" }}
        onClick={handleTileClick}
        
      >
        <CardContent style={{ alignContent: "center" }}>
          <Box sx={{ flexDirection: "column", pl: "25px"}}>
            <Avatar
              alt="Remy Sharp"
              src={imageUrl ? imageUrl : CropImg}
              sx={{ height: "100px", width: "100px"}}
            />
            <Typography pt={1} variant="body2">{name}</Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleTile;
