import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleEarlyWarningRegistartion,
  updateEarlyWarningRegistartion,
} from "../../../redux/actions/cropLook/earlyWarningRegistration/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";

import { useEffect } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { get_SubCategoryById } from "../../../redux/actions/crop/crop/action";
import { get_CropById } from "../../../redux/actions/crop/cropVariety/action";

const CropLookEarlyWarningRangesForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  console.log(state);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [cropyOptions, setCropyOptions] = useState([]);
  const [category, setCategory] = useState({ categoryId: "", description: "" });
  const [subCategory, setSubCategory] = useState({
    subCategoryId: "",
    description: "",
  });

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/crop-look/early-warning-ranges");
  };

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setCategoryOptions(dataList);
    });
  }, []);

  const getSubCategories = (id) => {
    debugger;
    get_SubCategoryById(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setSubCategoryOptions(dataList);
    });
  };

  const getCrops = (id) => {
    debugger;
    get_CropById(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setCropyOptions(dataList);
    });
  };

  const handleChange = (value, target) => {
    debugger;
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      console.log(formData);
      return newData;
    });
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
      setSubCategory({ subCategoryId: "", description: "" });
      setCategory({ categoryId: "", description: "" });
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
    debugger;
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateEarlyWarningRegistartion(formData, onSuccess, onError);
        } else {
          await handleEarlyWarningRegistartion(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormWrapper>
      <PageHeader
        goBack={goBack}
        saving={saving}
        state={state}
        formName=" Early Warning Registration"
      />
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
              <Button variant="contained" color="success" size="small">
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
                  {state?.action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
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
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid
          item
          sm={3}
          md={3}
          lg={2}
          display={state?.action !== DEF_ACTIONS.ADD ? "none" : ""}
        >
          <FieldWrapper>
            <FieldName>Crop Category</FieldName>
            <Autocomplete
              options={categoryOptions}
              //disabled={selectedDdoa?.id == null}
              getOptionLabel={(i) =>
                i.categoryId ? `${i.categoryId} - ${i.description}` : ""
              }
              value={category || null}
              onChange={(event, value) => {
                getSubCategories(value?.id);
                setCategory(value);
                setSubCategory({ subCategoryId: "", description: "" });
                handleChange("", "crop");
              }}
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid
          item
          sm={3}
          md={3}
          lg={2}
          display={state?.action !== DEF_ACTIONS.ADD ? "none" : ""}
        >
          <FieldWrapper>
            <FieldName>Crop Sub Category</FieldName>
            <Autocomplete
              options={subCategoryOptions}
              disabled={category.categoryId === ""}
              getOptionLabel={(i) => `${i.subCategoryId} - ${i.description}`}
              value={subCategory || null}
              onChange={(event, value) => {
                getCrops(value?.id);
                setSubCategory(value);
                handleChange("", "crop");
              }}
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={2}>
          <FieldWrapper>
            <FieldName>Crop</FieldName>
            <Autocomplete
              options={cropyOptions}
              disabled={subCategory.subCategoryId === ""}
              getOptionLabel={(i) => `${i?.cropId} - ${i?.description}`}
              value={formData.cropDTO || null}
              onChange={(event, value) => {
                handleChange(value || "", "cropDTO");
              }}
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={12} md={12} lg={12}></Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Two Week Recommendation</FieldName>
            <TextField
              name="twoWeekRecommendation"
              id="twoWeekRecommendation"
              type="number"
              value={formData?.twoWeekRecommendation || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "twoWeekRecommendation")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              inputProps={{ style: { textTransform: "uppercase" } }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Green Upper</FieldName>
            <TextField
              name="greenUpper"
              id="greenUpper"
              value={formData?.greenUpper || ""}
              type="number"
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "greenUpper")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Light Green Lower</FieldName>
            <TextField
              name="lightGreenLower"
              id="lightGreenLower"
              value={formData?.lightGreenLower || ""}
              type="number"
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "lightGreenLower")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Light Green Lower</FieldName>
            <TextField
              name="lightGreenUpper"
              id="lightGreenUpper"
              value={formData?.lightGreenUpper || ""}
              type="number"
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "lightGreenUpper")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Yellow Lower</FieldName>
            <TextField
              name="yellowLower"
              id="yellowLower"
              value={formData?.yellowLower || ""}
              type="number"
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "yellowLower")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Yellow Upper</FieldName>
            <TextField
              name="yellowUpper"
              id="yellowUpper"
              value={formData?.yellowUpper || ""}
              type="number"
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "yellowUpper")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Orange Lower</FieldName>
            <TextField
              name="orangeLower"
              id="orangeLower"
              value={formData?.orangeLower || ""}
              type="number"
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "orangeLower")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Orange Upper</FieldName>
            <TextField
              name="orangeUpper"
              id="orangeUpper"
              value={formData?.orangeUpper || ""}
              type="number"
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "orangeUpper")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Red Lower</FieldName>
            <TextField
              name="redLower"
              id="redLower"
              value={formData?.redLower || ""}
              type="number"
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "redLower")}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default CropLookEarlyWarningRangesForm;
