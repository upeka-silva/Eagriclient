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
import { get_CropDiseaseList } from "../../../redux/actions/crop/CropDisease/action";

export default function AddCropDiseaseDialog({
  open,
  handleClose,
  confirmAction,
  formData,
  mode,
  cropId,
}) {
  const [formDataD, setformDataD] = useState({});
  const [isDataFetch, setIsDataFetch] = useState({});
  const [cropDisease, setCropDisease] = useState({});

  useEffect(() => {
    setIsDataFetch(false);
    get_CropDiseaseList().then((data) => {
      setCropDisease(data);
      setIsDataFetch(true);
    });

    setformDataD(formData);
  }, [formData]);

  const handleChange = (value, target) => {
    setformDataD((current = {}) => {
      let newData = { ...current };
      newData[target] = Array.isArray(value) ? value : [value];
      return newData;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-question"
      aria-describedby="add a description to audit forms"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px",
          },
        },
      }}
    >
      <DialogTitle
        id="add-question"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} Crop Diseases
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
                <FieldName>Disease</FieldName>
                <Autocomplete
                  multiple
                  options={cropDisease}
                  value={formData?.id}
                  getOptionLabel={(i) => `${i.diseaseName} - ${i.type}`}
                  onChange={(event, value) => {
                    handleChange(value, "cropDisease");
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
