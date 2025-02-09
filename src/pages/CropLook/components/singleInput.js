import React from "react";
import TextField from "@mui/material/TextField";
import { Avatar, Chip, Grid } from "@mui/material";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { getDbFieldName } from "../../../utils/appUtils";

const SingleInput = ({
  varietyTarget,
  cropIndex,
  varietyIndex,
  targetedExtentHandler,
  mode,
  configFields,
}) => {
  const removeTarget = (field) => {
    let prefix = "Target ";

    if (field.startsWith(prefix)) {
      let result = field.substring(prefix.length) + " (Ha)";
      return result;
    } else {
      return field;
    }
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <Chip
          avatar={<Avatar alt="Crop Variety" src={varietyTarget.imageUrl} />}
          label={varietyTarget.varietyName + " (Ha)"}
          variant="outlined"
          sx={{
            justifyContent: "flex-start",
            mt: "12px",
            bgcolor: "#A7E99C",
            width: "400px",
          }}
        />
      </Grid>
      <Grid item xs={10} sx={{ pl: "5px" }}>
        <Grid container spacing={1}>
          {configFields.map((field, index) => (
            <Grid item xs={2} sx={{ mt: "10px" }}>
              <TextField
                type="number"
                disabled={mode === DEF_ACTIONS.VIEW}
                variant="outlined"
                id={`input_${varietyTarget.varietyName}_${index}`}
                label={removeTarget(field)}
                value={varietyTarget[getDbFieldName(field)]}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue) && inputValue >= 0) {
                    targetedExtentHandler(
                      cropIndex,
                      varietyIndex,
                      getDbFieldName(field),
                      e.target.value
                    );
                  }
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "5px",
                  },
                  input: { textAlign: "right" },
                }}
                fullWidth
                size="small"
              />
            </Grid>
          ))}

          <Grid item xs={1} sx={{ mt: "10px" }}>
            <TextField
              type="number"
              disabled={true}
              variant="outlined"
              id="input5"
              label="Total Target"
              value={varietyTarget["totalExtent"] || 0}
              fullWidth
              onChange={(e) =>
                targetedExtentHandler(
                  cropIndex,
                  varietyIndex,
                  "targetedExtent",
                  e.target.value
                )
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                input: { textAlign: "right" },
                color: "green",
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#33b858",

                  borderRadius: "8px",
                },
                "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#33b858",
                  borderWidth: "2px",
                },
                "& .MuiFormLabel-root.Mui-disabled": {
                  color: "#33b858",
                },
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleInput;
