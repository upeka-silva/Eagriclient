import React, { useState } from "react";
import SingleTile from "./SingleTile";
import { Grid } from "@mui/material";
import { DEF_ACTIONS } from "../../utils/constants/permission";

const MultiSelectTils = ({ options, handleSelectedValues, isItemDisabled }) => {

  return (
    <Grid container spacing={1}>
      {options.map((option) => (
        <Grid item xs={2}>
          <SingleTile
            key={option.id}
            id={option.id}
            name={option.varietyId}
            imageUrl={option?.presignedUrl}
            onOptionClick={handleSelectedValues}
            isSelected={option?.selected || false}
            isDisabled={isItemDisabled}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MultiSelectTils;
