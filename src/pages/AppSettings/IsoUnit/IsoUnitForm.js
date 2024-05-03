import { Grid, InputAdornment, MenuItem, Select, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  handleIsoUnit,
  updateIsoUnit,
} from "../../../redux/actions/app_settings/roles/isoUnit/action";

const IsoUnitForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/app-settings/iso-unit");
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

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateIsoUnit(formData, onSuccess, onError);
        } else {
          await handleIsoUnit(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <FormWrapper>
        <PageHeader
          saving={saving}
          state={state}
          formName="ISO Unit"
          goBack={goBack}
        />
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
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>Unit Code</FieldName>
              <TextField
                name="unitCode"
                id="unitCode"
                value={formData?.unitCode || ""}
                fullWidth
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "unitCode")
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
          <Grid item sm={6} md={6} lg={6}>
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
              <FieldName>Base Unit</FieldName>
              <TextField
                name="baseUnit"
                id="baseUnit"
                value={formData?.baseUnit || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "baseUnit")
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
              <FieldName>ISO Unit Type</FieldName>
              <Select
                name="unitType"
                id="unitType"
                value={formData?.unitType || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "unitType")
                }
                fullWidth
                sx={{
                  borderRadius: "8px",
                }}
                size="small"
              >
                <MenuItem value={"NOT_USED"}>Not Used</MenuItem>
                <MenuItem value={"WEIGHT"}>Weight</MenuItem>
                <MenuItem value={"VOLUME"}>Volume</MenuItem>
                <MenuItem value={"LENGTH"}>Length</MenuItem>
                <MenuItem value={"TEMPERATURE"}>Temperature</MenuItem>
                <MenuItem value={"DISCRETE"}>Discrete</MenuItem>
                <MenuItem value={"DENSITY"}>Density</MenuItem>
                <MenuItem value={"TIME"}>Time</MenuItem>
                <MenuItem value={"MASS"}>Mass</MenuItem>
                <MenuItem value={"ELECTRIC_CURRENT"}>Electric Current</MenuItem>
                <MenuItem value={"THERMODYNAMIC_TEMPERATURE"}>
                  Thermodynamic Temperature
                </MenuItem>
                <MenuItem value={"AMOUNT_OF_SUBSTANCE"}>
                  Amount Of Substance
                </MenuItem>
                <MenuItem value={"LUMINOUS_INTENSITY"}>
                  Luminous Intensity
                </MenuItem>
              </Select>
            </FieldWrapper>
          </Grid>
          <Grid item sm={12} md={3} lg={2}>
            <FieldWrapper>
              <FieldName>Multiplication Factor</FieldName>
              <TextField
                name="multiFactor"
                id="multiFactor"
                type="number"
                value={formData?.multiFactor || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "multiFactor")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end" />,
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>Dividing Factor</FieldName>
              <TextField
                name="divFactor"
                id="divFactor"
                type="number"
                value={formData?.divFactor || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "divFactor")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end" />,
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>10 To The Power</FieldName>
              <TextField
                name="tenPower"
                id="tenPower"
                type="number"
                value={formData?.tenPower || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "tenPower")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end" />,
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={4} md={4} lg={4} spacing={0}>
            <FieldWrapper>
              <FieldName>User Defined</FieldName>
              <Switch
                name="userDefined"
                id="userDefined"
                value={formData?.userDefined || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.checked || "", "userDefined")
                }
                checked={formData?.userDefined}
                aria-label="Switch demo"
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};

export default IsoUnitForm;
