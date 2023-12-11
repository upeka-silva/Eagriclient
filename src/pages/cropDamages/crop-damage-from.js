import React, { useState } from "react";
import { TextField, Grid, CircularProgress } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { useEffect } from "react";
import BackToList from "../../components/BackToList/BackToList";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import {
  createDamage,
  updateDamage,
} from "../../redux/actions/crop/cropDamage/action";
import { Paper } from "@material-ui/core";
import DamageTypes from "./damage-types";
import PageHeader from "../../components/PageHeader/PageHeader";

const CropDamageForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [isLoading, setIsLoading] = useState(null);

  const [formData, setFormData] = useState(state?.target || {});

  useEffect(() => {
    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setFormData(state?.target);
    }
  }, []);

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const goBack = () => {
    navigate("/crop/damages");
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
    if (state?.action === DEF_ACTIONS.ADD) {
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
      setIsLoading(true);
      setSaving(true);
      try {
        if (DEF_ACTIONS.ADD === state.action) {
          const data = await createDamage(formData, onSuccess, onError);
          setFormData(data);
        } else {
          const data = await updateDamage(formData, onSuccess, onError);
          setFormData(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <FormWrapper>
        <PageHeader saving={saving} state={state} formName="Crop Damage" goBack={goBack} />
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
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Damage Name</FieldName>
              <TextField
                variant="outlined"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={(e) => handleChange(e?.target?.value || "", "name")}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
                fullWidth
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Description</FieldName>
              <TextField
                variant="outlined"
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "description")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
                fullWidth
              />
            </FieldWrapper>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={12} md={12} lg={12}>
            <Paper style={{ height: "500px", padding:"20px", marginRight:"5px" }}>
              {!isLoading ? (
                <DamageTypes
                  formMode={state.action}
                  formId={formData.id}
                  dataList={formData.damageTypes}
                />
              ) : (
                <CircularProgress />
              )}
            </Paper>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropDamageForm;
