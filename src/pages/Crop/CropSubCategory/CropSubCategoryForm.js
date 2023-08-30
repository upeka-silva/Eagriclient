import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Grid,
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
  handleCropSubCategory,
  updateCropSubCategory,
} from "../../../redux/actions/crop/cropSubCategory/action";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { useEffect } from "react";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";

const CropSubCategoryForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);

  const goBack = () => {
    navigate("/crop/sub-category");
  };

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
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
          await updateCropSubCategory(
            {
              ...formData,
              cropCategoryDTO: { id: formData.cropCategoryDTO.id },
            },
            onSuccess,
            onError
          );
        } else {
          await handleCropSubCategory(
            {
              ...formData,
              cropCategoryDTO: { id: formData.cropCategoryDTO.id },
            },
            onSuccess,
            onError
          );
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
          <Button
            startIcon={<ArrowCircleLeftRounded />}
            onClick={goBack}
            color="success"
          >
            Go back to list
          </Button>
        </ActionWrapper>
        {/* <PathName>{getPathName()}</PathName> */}
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} CROP SUB CATEGORY
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
                <Button>
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
                    {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
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
              <FieldName>Sub Category Code</FieldName>
              <TextField
                name="code"
                id="code"
                value={formData?.code || ""}
                fullWidth
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                onChange={(e) => handleChange(e?.target?.value || "", "code")}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={4}>
            <FieldWrapper>
              <FieldName>Sub Category Name</FieldName>
              <TextField
                name="name"
                id="name"
                value={formData?.name || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "name")}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={4}>
            <FieldWrapper>
              <FieldName>Category ID</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW}
                options={options}
                value={formData ? formData.cropCategoryDTO : ""}
                getOptionLabel={(i) => `${i.categoryId} - ${i.description}`}
                onChange={(event, value) => {
                  handleChange(value, "cropCategoryDTO");
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropSubCategoryForm;
