import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Grid } from "@mui/material";

const SingleInput = ({ varietyTarget, cropIndex, varietyIndex, targetedExtentHandler }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={1}>
      
        <InputLabel htmlFor="input-label">
          {varietyTarget.varietyName}
        </InputLabel>
      
      </Grid>
      <Grid item xs={3}>
      <TextField
        //variant="outlined"
        id="input1"
        label="Targeted Extent Rainfed (In Ha)"
        value={varietyTarget.targetedExtentMajor}
        onChange={(e) => targetedExtentHandler(cropIndex, varietyIndex, "targetedExtentMajor", e.target.value)}
        //style={{ flex: 1, marginRight: 8 }}
      />
      </Grid>
      <Grid item xs={3}>
      <TextField
        variant="outlined"
        id="input2"
        label="Targeted Extent Irrigated (In Ha)"
        value={varietyTarget.targetedExtentMinor}
        onChange={(e) => targetedExtentHandler(cropIndex, varietyIndex, "targetedExtentMinor", e.target.value)}
        //style={{ flex: 1, marginRight: 8 }}
      />
      </Grid>
      <Grid item xs={3}>
      <TextField
        variant="outlined"
        id="input3"
        label="TargetedExtent (In Ha)"
        value={varietyTarget.targetedExtentRainfed}
        onChange={(e) => targetedExtentHandler(cropIndex, varietyIndex, "targetedExtentRainfed", e.target.value)}
        //style={{ flex: 1 }}
      />
      </Grid>
    </Grid>
  );
};

export default SingleInput;
