import React from "react";
import { Grid } from "@mui/material";
import SingleInput from "./singleInput";
import BiWeeklySingleInput from "./biweekly-singleInput";

const BiweeklyCropInput = ({ cropTarget, targetedExtentHandler, mode, cropIndex }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <p>{cropTarget.cropName}</p>
        <hr/>
      </Grid>

      {cropTarget.varietyTargets.map((varietyTarget, varietyIndex) => (
        <Grid item xs={12} sx={{mb:"15px"}}>
          <BiWeeklySingleInput
            varietyTarget={varietyTarget}
            targetedExtentHandler={targetedExtentHandler}
            cropIndex={cropIndex}
            varietyIndex={varietyIndex}
            mode={mode}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BiweeklyCropInput;
