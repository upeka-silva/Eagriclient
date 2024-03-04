import {
  Grid,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { useUserAccessValidation } from "../../hooks/authentication";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";

import { FieldName } from "../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";

import {
  handleAgriSeason,
  updateAgriSeason,
} from "../../redux/actions/agriSeason/action";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Fonts } from "../../utils/constants/Fonts";

const AgriSeasonForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const { addSnackBar } = useSnackBars();
  const dateAdapter = new AdapterDayjs();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...(state?.target || {}),
    startDate: state?.target?.startDate
      ? dateAdapter.date(state?.target?.startDate)
      : null,
    endDate: state?.target?.endDate
      ? dateAdapter.date(state?.target?.endDate)
      : null,
  });
  const [saving, setSaving] = useState(false);

  const goBack = () => {
    navigate("/agri-season");
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

      let sdate = new Date(formData.startDate);
      let edate = new Date(formData.endDate);

      try {
        if (formData?.id) {
          await updateAgriSeason(
            {
              ...formData,
              startDate: sdate.valueOf() || null,
              endDate: edate.valueOf() || null,
            },
            onSuccess,
            onError
          );
        } else {
          await handleAgriSeason(
            {
              ...formData,
              startDate: sdate.valueOf() || null,
              endDate: edate.valueOf() || null,
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
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      fontFamily: `${Fonts.fontStyle1}`,
      marginTop: "10px",
      height: "90vh",
      overflowY: "scroll",
    }}
    >
    <FormWrapper>
      <PageHeader saving={saving} state={state} formName="Agriculture Season" goBack={goBack}/>
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
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Season ID</FieldName>
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
        <Grid item sm={3} md={3} lg={3}>
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
            <FieldName>Climate Zone</FieldName>

            <Select
              value={formData?.climateZone || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "climateZone")
              }
              sx={{
                borderRadius: "8px",
              }}
              size="small"
              fullWidth
            >
              <MenuItem value={"DRY"}>Dry</MenuItem>
              <MenuItem value={"INTERMEDIATE"}>Intermediate</MenuItem>
              <MenuItem value={"WET"}>Wet</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Start Date</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="startDate"
                id="startDate"
                disabled={state?.action === DEF_ACTIONS.VIEW}
                slotProps={{ textField: { size: "small", error: false } }}
                value={formData?.startDate || ""}
                onChange={(newValue) =>
                  handleChange(newValue || "", "startDate")
                }
                in="DD-MM-YYYY"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>End Date</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="endDate"
                id="endDate"
                disabled={state?.action === DEF_ACTIONS.VIEW}
                value={formData?.endDate || ""}
                onChange={(newValue) => handleChange(newValue || "", "endDate")}
                slotProps={{ textField: { size: "small", error: false } }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
    </div>
  );
};

export default AgriSeasonForm;
