import React, { useState } from "react";
import SingleTile from "./SingleTile";
import { Grid } from "@mui/material";

const MultiSelectTils = ({ options, handleSelectedValues }) => {
  const handleOptionClick = (optionId, selected) => {
    handleSelectedValues(optionId, selected);
  };

  return (
    <Grid container spacing={1}>
      {options.map((option) => (
        <Grid item xs={2}>
          <SingleTile
            key={option.id}
            id={option.id}
            name={option.name}
            imageUrl={option.imageUrl}
            onOptionClick={handleOptionClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MultiSelectTils;
