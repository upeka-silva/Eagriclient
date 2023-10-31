import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Grid } from "@mui/material";
import SingleInput from "./singleInput";

const CropInput = ({ cropTarget, targetedExtentHandler, mode, cropIndex, configFields }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <p>{cropTarget.cropName}</p>
      </Grid>

      {cropTarget.varietyTargets.map((varietyTarget, varietyIndex) => (
        <Grid item xs={12}>
          <SingleInput
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

export default CropInput;
