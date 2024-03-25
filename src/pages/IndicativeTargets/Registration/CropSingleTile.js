import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";

const sampleCropImg = require("../../../assets/images/cropPlaceholder.png");

const CropSingleTile = ({ crop, onOptionClick, isDisabled }) => {
  const handleTileClick = () => {
    if (!isDisabled) {
      onOptionClick(crop?.id, !crop?.selected);
    }
  };

  const getSelection = () => {
    if (crop?.selected) {
      return <Chip label="Selected" color="success" variant="filled" />;
    } else {
      return <Chip label="Not Selected" color="success" variant="outlined" />;
    }
  };

  return (
    <Card
      variant="outlined"
      style={{
        borderColor: "black",
        alignItems: "center",
      }}
      onClick={handleTileClick}
    >
      <CardActionArea>
        <CardMedia
          style={{ paddingTop: "55%", margin: "5px" }}
          image={crop?.prsignedUrl ? crop?.prsignedUrl : sampleCropImg}
          title="Crop Image"
        />
        <CardContent>
          <Typography variant="body1">
            {crop?.name} - {crop?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>{getSelection()}</CardActions>
    </Card>
  );
};

export default CropSingleTile;
