import React, { useState } from "react";
import { Button, TextField, CircularProgress, Autocomplete } from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { useLocation, useNavigate } from "react-router";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { handleSoilSubType } from "../../../redux/actions/soil/soilSubType/action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";

import { get_SoilType } from "../../../redux/actions/soil/soilType/action";


const SoilSubTypeForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/soil/soil-sub-type");
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
        await handleSoilSubType(formData, onSuccess, onError);
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
    <ActionWrapper isLeft>
      <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
        Go back to list
      </Button>
    </ActionWrapper>
    <PathName>{getPathName()}</PathName>
    <FormHeader>
      {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}Add a Soil
      sub type
    </FormHeader>
    <FieldWrapper>
      <FieldName>Soil Sub Type Code</FieldName>
      <TextField
        name="soilSubTypeCode"
        id="soilSubTypeCode"
        value={formData?.soilSubTypeCode || ""}
        fullWidth
        disabled={state?.action === DEF_ACTIONS.VIEW}
        onChange={(e) => handleChange(e?.target?.value || "", "soilSubTypeCode")}
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
        onChange={(e) => handleChange(e?.target?.value || "", "description")}
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
        <FieldName>District Name</FieldName>
        <Autocomplete
          disabled
          open={open}
          disablePortal
          options={get_SoilType}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: "264px",
                "& .MuiInputBase-root": {
                  textAlign: "center",
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
            />
          )}
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
              <AddButton disabled={!enableSave()} onClick={handleFormSubmit}>
                {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
              </AddButton>
              <ResetButton onClick={resetForm}>RESET</ResetButton>
            </>
          )}
        </ActionWrapper>
      )}
    </ButtonWrapper>
  </FormWrapper>
  )
}

export default SoilSubTypeForm