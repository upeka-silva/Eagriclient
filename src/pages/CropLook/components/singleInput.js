import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Grid } from "@mui/material";
import { DEF_ACTIONS } from "../../../utils/constants/permission";

const SingleInput = ({
  varietyTarget,
  cropIndex,
  varietyIndex,
  targetedExtentHandler,
  mode
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <InputLabel htmlFor="input-label">
          {varietyTarget.varietyName}
        </InputLabel>
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input1"
          label="Targeted Extent Major (In Ha)"
          value={varietyTarget.targetedExtentMajor}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtentMajor",
              e.target.value
            )
          }
          style={{ flex: 1, marginRight: 8 }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input2"
          label="Targeted Extent Minor (In Ha)"
          value={varietyTarget.targetedExtentMinor}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtentMinor",
              e.target.value
            )
          }
          style={{ flex: 1, marginRight: 8 }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input3"
          label="Targeted Extent Rainfed (In Ha)"
          value={varietyTarget.targetedExtentRainfed}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtentRainfed",
              e.target.value
            )
          }
          style={{ flex: 1 }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input4"
          label="Targeted Extent Irrigate (In Ha)"
          value={varietyTarget.targetedExtentIrrigate}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtentIrrigate",
              e.target.value
            )
          }
          style={{ flex: 1 }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input5"
          label="Targeted Extent (In Ha)"
          value={varietyTarget.targetedExtent}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtent",
              e.target.value
            )
          }
          style={{ flex: 1 }}
        />
      </Grid>
    </Grid>
  );
};

export default SingleInput;
