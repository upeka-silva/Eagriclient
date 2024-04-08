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
import { get_CropList } from "../../../redux/actions/crop/crop/action";

export default function AddCropDialog({
  open,
  handleClose,
  formData,
  mode,
  confirmAction,
}) {
  const [formDataD, setformDataD] = useState([]);
  console.log({formDataD})
  const [isDataFetch, setIsDataFetch] = useState({});
  const [crops, setCrops] = useState([]);
  console.log({crops})
  // const [isDataFetch, setIsDataFetch] = useState({});

  useEffect(() => {
    setIsDataFetch(false);
    get_CropList().then((data) => {
      setCrops(data?.dataList);
      setIsDataFetch(true);
      console.log({data});
    });

    setformDataD(formData);
  }, [formData]);
  
  const handleChange = (value, target) => {
    console.log({value});
    console.log({target})
    setformDataD((current = {}) => {
      let newData = { ...current };
      newData[target] = Array.isArray(value) ? value : [value];
      return newData;
    });
  };


  const payloadDto = [
    {
        "id": 1,
        "cropId": "02",
        "description": "CROP 02",
        "cropType": "PERENNIAL",
        "scientificName": "AAAAAJ",
        "family": "CHENOPODIACEAE",
        
    },
    {
        "id": 2,
        "cropId": "01",
        "description": "CROP 01",
        "cropType": "ANNUAL",
        "scientificName": "SCSCSC",
        "family": "CHENOPODIACEAE",
       
    },
    {
        "id": 3,
        "cropId": "03",
        "description": "CSCSCS",
        "cropType": "ANNUAL",
        "scientificName": "SCSC",
        "family": "CHENOPODIACEAE",
       
    }
];


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-crop"
      aria-describedby="add a crop to agriculture project"
    >
      <DialogTitle
        id="add-crop"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} crops
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
                <FieldName>Crop</FieldName>
                {
                isDataFetch ?
                <Autocomplete
                  multiple
                  options={crops}
                  //value={formDataD?.id}
                  getOptionLabel={(i) => `${i?.cropId
                  } - ${i?.description}`}
                  onChange={(event, value) => {
                    handleChange(value, "crops");
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
