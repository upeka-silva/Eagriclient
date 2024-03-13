import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Chip, Select, Tooltip } from "@mui/material";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";
import { Done, Face, SelectAllRounded } from "@mui/icons-material";

const CropImg = require("../../assets/images/crop1.jpeg");

const SingleTile = ({
  id,
  name,
  imageUrl,
  onOptionClick,
  isSelected,
  isDisabled,
  cropId,
}) => {
  const handleTileClick = () => {
    if (!isDisabled) {
      onOptionClick(id, !isSelected, cropId);
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
      <Tooltip title={name} placement="top">
        <Card
          style={{
            backgroundColor: getStyle(),
            borderColor: "#A7E99C",
            alignItems: "center",
          }}
          sx={{ display: "flex",height:"40px" }}
          onClick={handleTileClick}
        >
          <CardContent style={{ alignContent: "center" }}>
            <Box sx={{ flexDirection: "column" }}>
              <Typography pt={1} variant="body2">
                {name.length > 18 ? `${name.slice(0, 16)}..` : name}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Tooltip>
    </div>
  );
};

export default SingleTile;
