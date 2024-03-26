import React from "react";
import { Grid } from "@mui/material";
import CropSingleTile from "./CropSingleTile";

const TargetRegistrationTils = ({
  cropList,
  handleSelectedValues,
  isItemDisabled,
}) => {
  return (
    <Grid container spacing={1}>
      <>
        {cropList
          ? cropList?.map((crop) => (
              <>
                <Grid item xs={2} key={crop.id} sm={12} md={4} lg={2}>
                  <CropSingleTile
                    key={crop.id}
                    crop={crop}
                    onOptionClick={handleSelectedValues}
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
