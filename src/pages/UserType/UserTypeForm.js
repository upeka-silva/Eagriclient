import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { useLocation, useNavigate } from "react-router";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { PathName } from "../../components/FormLayout/PathName";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import {
  handleUserType,
  updateUserType,
} from "../../redux/actions/userType/action";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BackToList from "../../components/BackToList/BackToList";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";

const UserTypeForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/user-type");
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
          await updateUserType(formData, onSuccess, onError);
        } else {
          await handleUserType(formData, onSuccess, onError);
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
    <FormWrapper>
      <BackToList goBack={goBack} />
      <CustFormHeader saving={saving} state={state} formName="User Type" />
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
      <Grid container flexDirection="row">
        <Grid flexDirection="column">
          <FieldWrapper>
            <FieldName>User Type ID</FieldName>
            <TextField
              name="userTypeId"
              id="userTypeId"
              value={formData?.userTypeId || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "userTypeId")
              }
              inputProps={{ style: { textTransform: "uppercase" } }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid flexDirection="column" sm={6} lg={6} xl={6}>
          <FieldWrapper>
            <FieldName>Description</FieldName>
            <TextField
              name="description"
              id="description"
              value={formData?.description || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
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
        <Grid flexDirection="column" sm={3} lg={3} xl={3}>
          <FieldWrapper>
            <FieldName>User Type Format</FieldName>
            <Select
              value={formData?.userTypeFunction || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "userTypeFunction")
              }
              sx={{
                borderRadius: "8px",
              }}
              size="small"
              fullWidth
            >
              <MenuItem value={"FARMER"}>Farmer</MenuItem>
              <MenuItem value={"OFFICER"}>Officer</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default UserTypeForm;
