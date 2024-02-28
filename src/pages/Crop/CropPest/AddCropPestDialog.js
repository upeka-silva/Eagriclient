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
import { get_CropPestList } from "../../../redux/actions/crop/CropPest/action";
import {CircularProgress} from "@mui/material";
import { assignCropPest } from "../../../redux/actions/crop/CropPest/action";

export default function AddCropPestDialog({
  open,
  handleClose,
  formData,
  mode,
  confirmAction,
}) {
  const [formDataD, setformDataD] = useState({});
  const [isDataFetch, setIsDataFetch] = useState({});
  const [cropPests, setCropPests] = useState({});

  useEffect(() => {
    setIsDataFetch(false);
    get_CropPestList().then((data) => {
      setCropPests(data);
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
      aria-labelledby="add-pest"
      aria-describedby="add a pest to crop"
    >
      <DialogTitle
        id="add-pest"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} Crop Pests
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
                <FieldName>Pest</FieldName>
                {
                isDataFetch ?
                <Autocomplete
                  multiple
                  options={cropPests}
                  value={formData?.id}
                  getOptionLabel={(i) => `${i.pestName} - ${i.scientificName}`}
                  onChange={(event, value) => {
                    handleChange(value, "cropPest");
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
                /> : <CircularProgress/>}
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
