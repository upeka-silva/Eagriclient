import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import {
  handleCropVariety,
  updateCropVariety,
} from "../../../redux/actions/crop/cropVariety/action";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { get_CategoryList } from "../../../redux/actions/crop/cropVariety/action";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";
import { get_CropList } from "../../../redux/actions/crop/crop/action";

const CropVarietyForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);

  const goBack = () => {
    navigate("/crop/crop-variety");
  };

  useEffect(() => {
    get_CropList().then(({ dataList = [] }) => {
      setOptions(dataList);
    });
  }, []);

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
    }
  };

  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (
      state?.action === DEF_ACTIONS.ADD &&
      Object.keys(formData || {}).length > 0
    ) {
      return true;
    }
    return false;
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateCropVariety(formData, onSuccess, onError);
        } else {
          await handleCropVariety(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPathName = () => {
    return location.pathname === "/" || !location.pathname
      ? ""
      : location.pathname;
  };

  return (
    <div>
      <FormWrapper>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowCircleLeftRounded />} onClick={goBack} color="success">
            Go back to list
          </Button>
        </ActionWrapper>
        {/* <PathName>{getPathName()}</PathName> */}
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} CROP VARIETY
        </FormHeader>
        <ButtonWrapper
          style={{
            width: "95%",
            justifyContent: "flex-start",
            margin: "0",
            paddingLeft: "18px",
          }}
        >
          {state?.action !== DEF_ACTIONS.VIEW && (
            <ActionWrapper>
              {saving ? (
                <Button variant="contained">
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                    size="small"
                    color="success"
                  >
                    {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />}
                    {/* {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"} */}
                  </Button>
                  <Button
                    onClick={resetForm}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                  >
                    RESET
                  </Button>
                </>
              )}
            </ActionWrapper>
          )}
        </ButtonWrapper>
        <Grid
          container
          sx={{
            // border: "1px solid #bec0c2",
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Variety ID</FieldName>
              <TextField
                name="varietyId"
                id="varietyId"
                value={formData?.varietyId || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "varietyId")
                }
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Variety Name</FieldName>
              <TextField
                name="varietyName"
                id="varietyName"
                value={formData?.varietyName || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "varietyName")
                }
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Scientific Name</FieldName>
              <TextField
                name="scientificName"
                id="scientificName"
                value={formData?.scientificName || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "scientificName")
                }
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Variety Description</FieldName>
              <TextField
                name="varietyDescription"
                id="varietyDescription"
                value={formData?.varietyDescription || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "varietyDescription")
                }
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <FieldName>Crop ID</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW}
                options={options}
                value={formData ? formData.cropDTO : ""}
                getOptionLabel={(i) => `${i.cropId} - ${i.scientificName}`}
                onChange={(event, value) => {
                  handleChange(value, "cropDTO");
                }}
                sx={{
                  // width: "264px",
                  "& .MuiOutlinedInput-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Pericarp Color</FieldName>
              <TextField
                name="pericarpColor"
                id="pericarpColor"
                value={formData?.pericarpColor || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "pericarpColor")
                }
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Grain Size</FieldName>
              <TextField
                name="grainSize"
                id="grainSize"
                value={formData?.grainSize || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "grainSize")
                }
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Image</FieldName>
              <TextField
                name="image"
                id="image"
                value={formData?.image || ""}
                fullWidth
                inputProps={{ multiple: true }}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "image")}
                type="file"
                accept="image/*"
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                size="small"
              ></TextField>
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Average Yield</FieldName>
              <TextField
                name="averageYield"
                id="averageYield"
                type="number"
                value={formData?.averageYield || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "averageYield")
                }
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <FieldName>Maturity Time</FieldName>
              <TextField
                name="maturityTime"
                id="maturityTime"
                type="number"
                value={formData?.maturityTime || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "maturityTime")
                }
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Days</InputAdornment>
                  ),
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropVarietyForm;
