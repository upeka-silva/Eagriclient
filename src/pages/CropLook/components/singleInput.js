import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Avatar, Chip, Grid } from "@mui/material";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { CROP_LOOK_FIELD } from "../../../utils/constants/cropLookFields";

const SingleInput = ({
  varietyTarget,
  cropIndex,
  varietyIndex,
  targetedExtentHandler,
  mode,
  configFields,
}) => {
  useEffect(() => {
    console.log("fields inside single input");
    console.log(configFields);
  }, []);

  const getDbFieldName = (field) => {
    if (field === CROP_LOOK_FIELD.EXTENT_MAJOR) {
      return "targetedExtentMajor";
    } else if (field === CROP_LOOK_FIELD.EXTENT_MINOR) {
      return "targetedExtentMinor";
    } else if (field === CROP_LOOK_FIELD.EXTENT_RAINFED) {
      return "targetedExtentRainfed";
    } else if (field === CROP_LOOK_FIELD.EXTENT_IRRIGATE) {
      return "targetedExtentIrrigate";
    } else {
      return "na";
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <Chip
          avatar={<Avatar alt="Natacha" src={varietyTarget.imageUrl} />}
          label={varietyTarget.varietyName}
          variant="outlined"
          sx={{ mt: "4px", bgcolor: "#A7E99C", width: "400px" }}
        />
      </Grid>

      {configFields.map((field) => (
        <Grid item xs={2}>
          <TextField
            type="number"
            disabled={mode === DEF_ACTIONS.VIEW}
            variant="outlined"
            id="input1"
            label={"Targated " + field + " (In Ha)"}
            value={varietyTarget[getDbFieldName(field)]}
            onChange={(e) =>
              targetedExtentHandler(
                cropIndex,
                varietyIndex,
                getDbFieldName(field),
                e.target.value
              )
            }
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
              },
            }}
            size="small"
          />
        </Grid>
      ))}

      <Grid item xs={2}>
        <TextField
          type="number"
          disabled={true}
          variant="outlined"
          id="input5"
          label="Total Extent (In Ha)"
          value={varietyTarget['totalExtent'] || 0}
          onChange={(e) =>
            targetedExtentHandler(
              cropIndex,
              varietyIndex,
              "targetedExtent",
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
    </Grid>
  );
};

export default SingleInput;
