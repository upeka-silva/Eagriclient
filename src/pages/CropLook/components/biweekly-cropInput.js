import React from "react";
import { Divider, Grid } from "@mui/material";
import BiWeeklySingleInput from "./biweekly-singleInput";

const BiweeklyCropInput = ({ cropTarget, targetedExtentHandler, mode, cropIndex, configFields }) => {

  return (
    <Grid container>
      <Grid item xs={12}>
        <p>{cropTarget.cropName}</p>
        <Divider />
      </Grid>

      {cropTarget.varietyTargets.map((varietyTarget, varietyIndex) => (
        <Grid item xs={12} sx={{mb:"15px"}}>
          <BiWeeklySingleInput
            varietyTarget={varietyTarget}
            targetedExtentHandler={targetedExtentHandler}
            cropIndex={cropIndex}
            varietyIndex={varietyIndex}
            mode={mode}
            configFields={configFields}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BiweeklyCropInput;
