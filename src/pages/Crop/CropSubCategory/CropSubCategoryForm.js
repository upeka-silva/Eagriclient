import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import {
  handleCropSubCategory,
  updateCropSubCategory,
} from "../../../redux/actions/crop/cropSubCategory/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useTranslation } from "react-i18next";

const CropSubCategoryForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);
  const {t} = useTranslation();
  const goBack = () => {
    navigate("/crop/sub-category");
  };

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setOptions(dataList);
    });
  }, []);

  const handleChange = (value, target) => {
    const pattern = /^[a-zA-Z0-9]*$/;
    if (target === "subCategoryId") {
      if (!pattern.test(value)) {
        return;
      }
    }
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
          ? t("message.successfullyAdded")
          : t("message.successfullyUpdated"),
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
                        cropCategoryDTO: { id: formData?.cropCategoryDTO?.id },
                    },
                    onSuccess,
                    onError
                );
            } else {
                await handleCropSubCategory(
                    {
                        ...formData,
                        cropCategoryDTO: { id: formData?.cropCategoryDTO?.id },
                    },
                    onSuccess,
                    onError
                );
            }
        } catch (error) {
            console.error(error);
            onError(error.message || "An error occurred while saving the form.");
        }
    }
};


  return (
    <div>
      <FormWrapper>
        <PageHeader saving={saving} goBack={goBack} formName="cropSubCategory" state={state} />
        <FormButtonGroup
          {...{
            state,
            DEF_ACTIONS,
            saving,
            enableSave,
            handleFormSubmit,
            resetForm,
          }}
        />
        <Grid
          container
          sx={{
            // border: "1px solid #bec0c2",
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>{t("cropSubCategoryPage.cropSubCategory")}</FieldName>
              <TextField
                name="subCategoryId"
                id="subCategoryId"
                value={formData?.subCategoryId || ""}
                fullWidth
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "subCategoryId")
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
          <Grid item sm={4} md={4} lg={4}>
            <FieldWrapper>
              <FieldName>{t("cropSubCategoryPage.description")}</FieldName>
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
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={4} md={4} lg={4}>
            <FieldWrapper>
              <FieldName>{t("cropSubCategoryPage.categoryId")}</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW}
                options={options}
                value={formData?.cropCategoryDTO || ""}
                getOptionLabel={(i) => i.categoryId ? `${i.categoryId} - ${i.description}` : ""}
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
