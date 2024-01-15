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

const CropSingleTile = ({
  id,
  name,
  imageUrl,
  onOptionClick,
  isSelected,
  isDisabled,
}) => {
  const handleTileClick = () => {
    if (!isDisabled) {
      onOptionClick(id, !isSelected);
    }
  };

  const getSelection = () => {
    if (isSelected) {
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
          style={{ paddingTop: "50%" }}
          image={imageUrl}
          title="Crop Image"
        />
        <CardContent>
          <Typography variant="body1">{name}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>{getSelection()}</CardActions>
    </Card>
  );
};

export default CropSingleTile;
