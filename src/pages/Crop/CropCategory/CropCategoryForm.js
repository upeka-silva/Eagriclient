import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useLocation, useNavigate } from "react-router-dom";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleCropCategory,
  updateCropCategory,
} from "../../../redux/actions/crop/cropCategory/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";


const CropCategoryForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const goBack = () => {
    navigate("/crop/category");
  };

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

  const handleFormSubmit = handleSubmit(async (data) => {
    if (enableSave()) {
       setSaving(true);
       try {
         if (data.id) {
           await updateCropCategory(data, onSuccess, onError);
         } else {
           await handleCropCategory(data, onSuccess, onError);
         }
       } catch (error) {
         console.log(error);
       }
    }
   });

  return (
    <>
      <FormWrapper>
        <PageHeader saving={saving} state={state} formName="Crop Category" goBack={goBack}/>
        <FormButtonGroup
          state={state}
          DEF_ACTIONS={DEF_ACTIONS}
          saving={saving}
          enableSave={enableSave}
          handleFormSubmit={handleFormSubmit}
          resetForm={resetForm}
        />

        <Grid
          container
          sx={{
            width: "97%",
          }}
        >
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Category Code</FieldName>
              <TextField
                name="categoryId"
                id="categoryId"
                value={formData?.categoryId || ""}
                fullWidth
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "categoryId")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                inputProps={{style: {textTransform: 'uppercase'},
                ...register("categoryId", {
                  pattern: {
                    value: /^[A-Za-z0-9]*$/,
                    message: 'Invalid Category Code'
                  },
                  required: "Category Code is required",
                })
              }}
                size="small"
              />
               {errors.categoryId && <p style={{ color: "red", fontSize: "10px" }}>{errors.categoryId.message}</p>}
            </FieldWrapper>
          </Grid>
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Description</FieldName>
              <TextField
                name="name"
                id="name"
                value={formData?.description || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "description")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                inputProps={{...register("description", {
                  required: "Description is required",
                })
              }}
                size="small"
              />
              {errors.description && <p style={{ color: "red", fontSize: "10px" }}>{errors.description.message}</p>}
            </FieldWrapper>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};

export default CropCategoryForm;
