import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Avatar, Box, Chip, Grid } from "@mui/material";
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
  useEffect(() => {
    console.log("fields inside single input");
    console.log(configFields);
  }, []);

  return (
    <Grid container>
      <Grid item xs={2}>
        <Chip
          avatar={<Avatar alt="Crop Variety" src={varietyTarget.imageUrl} />}
          label={varietyTarget.varietyName + " (Ha)"}
          variant="outlined"
          sx={{
            mt: "12px",
            bgcolor: "#A7E99C",
            width: "400px",
          }}
        />
      </Grid>
      <Grid item xs={10} sx={{ pl: "5px" }}>
        <Grid container spacing={1}>
          {configFields.map((field) => (
            <Grid item xs={2} sx={{ mt: "10px" }}>
              <TextField
                type="number"
                disabled={mode === DEF_ACTIONS.VIEW}
                variant="outlined"
                id="input1"
                label={field}
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
              label="Total Extent"
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
              //style={{ flex: 1 }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                input: { textAlign: "right" },
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
