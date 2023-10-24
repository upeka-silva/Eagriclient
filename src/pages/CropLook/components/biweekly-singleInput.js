import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Avatar, Button, Chip, Grid } from "@mui/material";
import { DEF_ACTIONS } from "../../../utils/constants/permission";

const BiWeeklySingleInput = ({
  varietyTarget,
  cropIndex,
  varietyIndex,
  targetedExtentHandler,
  mode,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={1}>
        <Chip
          avatar={<Avatar alt="Natacha" src={varietyTarget.imageUrl} />}
          label={varietyTarget.varietyName}
          variant="outlined"
          sx={{ mt: "4px", bgcolor: "#A7E99C", width: "400px" }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input1"
          label="Extent Major (In Ha)"
          value={varietyTarget.targetedExtentMajor}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtentMajor",
              e.target.value
            )
          }
          //style={{ flex: 1, marginRight: 8 }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input2"
          label="Extent Minor (In Ha)"
          value={varietyTarget.targetedExtentMinor}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtentMinor",
              e.target.value
            )
          }
          //style={{ flex: 1, marginRight: 8 }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input3"
          label="Extent Rainfed (In Ha)"
          value={varietyTarget.targetedExtentRainfed}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtentRainfed",
              e.target.value
            )
          }
          //style={{ flex: 1 }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input4"
          label="Extent Irrigate (In Ha)"
          value={varietyTarget.targetedExtentIrrigate}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtentIrrigate",
              e.target.value
            )
          }
          // style={{ flex: 1 }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          id="input5"
          label="Extent (In Ha)"
          value={varietyTarget.targetedExtent}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtent",
              e.target.value
            )
          }
          // style={{ flex: 1 }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          disabled={mode === DEF_ACTIONS.VIEW}
          variant="outlined"
          color="success"
          size="small"
          //onClick={handleCropUpdate}
          sx={{ marginTop: "10px" }}
        >
          Add Damage
        </Button>
      </Grid>
    </Grid>
  );
};

export default BiWeeklySingleInput;
