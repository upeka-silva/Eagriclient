import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";
import { Avatar, Box, Chip, Select } from "@mui/material";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";
import { Done, Face, SelectAllRounded } from "@mui/icons-material";

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
      return "red";
    } else {
      return "blue";
    }
  };

  return (
    <div>
      <Card
        style={{ backgroundColor: getStyle(), display: "flex" }}
        sx={{ display: "flex" }}
        onClick={handleTileClick}
      >
        {/* <CardMedia
          sx={{ height: "140px" }}
          component="img"
          alt={name}
          image="https://source.unsplash.com/random"
        /> */}

        <CardContent style={{ alignContent: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* <Avatar
              alt="Remy Sharp"
              src="https://source.unsplash.com/random"
              sx={{ height: "100px", width: "100px" }}
            /> */}
            <Typography variant="h6">{name}</Typography>
            {isSelected ? <Done /> : <div></div>}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleTile;
