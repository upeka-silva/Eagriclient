import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Colors } from "../../../utils/constants/Colors";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { Fonts } from "../../../utils/constants/Fonts";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import Checkbox from "@mui/material/Checkbox";
import { getAllCropActivity } from "../../../redux/actions/crop/cropActivity/action";

export default function AddCalendarActivityDialog({
  open,
  handleClose,
  confirmAction,
  formData,
  mode,
}) {
  const [formDataD, setformDataD] = useState({});
  const [cropActions, setCropActions] = useState({});
  const [isDataFetch, setIsDataFetch] = useState({});

  useEffect(() => {
    setIsDataFetch(false);
    getAllCropActivity().then((data) => {
      setCropActions(data);
      setIsDataFetch(true);
    });

    setformDataD(formData);
  }, [formData]);

  const handleChange = (value, target) => {
    setformDataD((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const durations = ["DAYS", "WEEKS", "MONTHS"];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-question"
      aria-describedby="add a description to audit forms"
    >
      <DialogTitle
        id="add-question"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} Crop Calendar Activities
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            sx={{
              margin: "15px",
              width: "97%",
              borderRadius: "5px",
            }}
          >
            <Grid item lg={12} sm={12} sx={12}>
              <FieldWrapper>
                <FieldName>Activity</FieldName>
                <Autocomplete
                  //disabled={selectedDsDevision?.id == null}
                  options={cropActions}
                  value={formData?.cropActivity}
                  getOptionLabel={(i) => `${i.name} - ${i.description}`}
                  onChange={(event, value) => {
                    handleChange(value, "cropActivity");
                    //setSelectedGnDevision(value);
                  }}
                  disableClearable
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Cost
                </FieldName>
                <TextField
                  type="number"
                  name="cost"
                  id="cost"
                  value={formDataD?.cost || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "cost")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Duration
                </FieldName>
                <TextField
                  type="number"
                  name="duration"
                  id="duration"
                  value={formDataD?.duration || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "duration")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item lg={6} sm={6} sx={6}>
              <FieldWrapper>
                <FieldName>Duration Type</FieldName>
                <Autocomplete
                  //disabled={selectedDsDevision?.id == null}
                  options={durations}
                  value={formData?.durationType}
                  getOptionLabel={(i) => `${i}`}
                  onChange={(event, value) => {
                    handleChange(value, "durationType");
                    //setSelectedGnDevision(value);
                  }}
                  disableClearable
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Start of Week
                </FieldName>
                <TextField
                  type="number"
                  name="startOfWeek"
                  id="startOfWeek"
                  value={formDataD?.startOfWeek || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "startOfWeek")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
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
        <Button
          onClick={handleClose}
          autoFocus
          color="info"
          variant="contained"
          size="small"
          sx={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
        <Button
          disabled={mode === DEF_ACTIONS.VIEW}
          onClick={(event) => confirmAction(event, formDataD, mode)}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginLeft: "20px" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
