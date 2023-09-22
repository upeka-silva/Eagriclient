import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Colors } from "../../utils/constants/Colors";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Fonts } from "../../utils/constants/Fonts";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import Checkbox from "@mui/material/Checkbox";
import CropSelectDropDown from "./CropSelectDropDown";

export default function AddCropDetailsDialog({
  open,
  handleClose,
  confirmAction,
  formData,
  mode,
}) {
  const [formDataQ, setFormDataQ] = useState({});

  useEffect(() => {
    setFormDataQ(formData);
  }, [formData]);

  const handleChange = (value, target) => {
    setFormDataQ((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-question"
      aria-describedby="delete-description"
    >
      <DialogTitle
        id="delete-question"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} Crop Details
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            sx={{
              // border: "1px solid #bec0c2",
              margin: "15px",
              width: "97%",
              borderRadius: "5px",
            }}
          >
            <CropSelectDropDown></CropSelectDropDown>

            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Season
                </FieldName>

                <Select
                  name="questionType"
                  id="questionType"
                  value={formDataQ?.season || ""}
                  //disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "season")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                >
                  <MenuItem value={"1"}>Current Season</MenuItem>
                  <MenuItem value={"2"}>Next Season</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
  
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Plot Number
                </FieldName>
                <TextField
                  name="questionString"
                  id="questionString"
                  value={formDataQ?.plotNumber || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "plotNumber")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Extent
                </FieldName>
                <TextField
                  name="order"
                  id="order"
                  value={formDataQ?.extent || ""}
                  //disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "extent")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          disabled={mode === DEF_ACTIONS.VIEW}
          onClick={(event) => confirmAction(event, formDataQ, mode)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
