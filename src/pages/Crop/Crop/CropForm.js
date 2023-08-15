import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
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
  handleCrop,
  updateCrop,
} from "../../../redux/actions/crop/crop/action";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { get_SubCategoryList } from "../../../redux/actions/crop/crop/action";

const CropForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();

  const [subOptions, setSubOptions] = useState([]);

  const goBack = () => {
    navigate("/crop/crop");
  };

  useEffect(() => {
    get_SubCategoryList().then(({ dataList = [] }) => {
      setSubOptions(dataList);
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
          await updateCrop(formData, onSuccess, onError);
        } else {
          await handleCrop(formData, onSuccess, onError);
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
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
        <PathName>{getPathName()}</PathName>
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} CROP
        </FormHeader>
        <FieldWrapper>
          <FieldName>Sub Category ID</FieldName>
          <Autocomplete
            disabled={state?.action === DEF_ACTIONS.VIEW}
            options={subOptions}
            value={formData ? formData.cropSubCategoryDTO : ""}
            getOptionLabel={(i) => `${i.subCategoryId} - ${i.description}`}
            onChange={(event, value) => {
              handleChange(value, "cropSubCategoryDTO");
            }}
            sx={{
              width: "264px",
              "& .MuiOutlinedInput-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Crop ID</FieldName>
          <TextField
            name="cropId"
            id="cropId"
            type="number"
            value={formData?.cropId || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "cropId")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Description</FieldName>
          <TextField
            name="description"
            id="description"
            value={formData?.description || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "description")
            }
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Crop Image</FieldName>
          <TextField
            name="cropImage"
            id="cropImage"
            value={formData?.cropImage || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "cropImage")}
            type="file"
            accept="image/*"
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          ></TextField>
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Crop Type</FieldName>
          <Select
            name="cropType"
            id="cropType"
            value={formData?.cropType || ""}
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "cropType")}
            fullWidth
            sx={{
              width: "264px",
              height: "30px",
              borderRadius: "8px",
            }}
          >
            <MenuItem value={"Annual"}>Annual</MenuItem>
            <MenuItem value={"Perennial"}>Perennial</MenuItem>
            <MenuItem value={"Seasonal"}>Seasonal</MenuItem>
          </Select>
        </FieldWrapper>
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
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <ButtonWrapper>
          {state?.action !== DEF_ACTIONS.VIEW && (
            <ActionWrapper>
              {saving ? (
                <AddButton variant="contained" disabled>
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </AddButton>
              ) : (
                <>
                  <AddButton
                    variant="contained"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                  >
                    {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
                  </AddButton>
                  <ResetButton onClick={resetForm}>RESET</ResetButton>
                </>
              )}
            </ActionWrapper>
          )}
        </ButtonWrapper>
      </FormWrapper>
    </div>
  );
};

export default CropForm;
