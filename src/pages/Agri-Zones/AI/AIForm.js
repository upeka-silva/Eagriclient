import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, CircularProgress, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { handleAI } from "../../../redux/actions/aiRegion/action";

import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton"
import { ResetButton } from "../../../components/FormLayout/ResetButton"


const AIForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false)

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/ai-region");
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
        await handleAI(formData, onSuccess, onError);
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <FormWrapper>
      <ActionWrapper isLeft>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
          Go back to list
        </Button>
      </ActionWrapper>
      <PathName>{getPathName()}</PathName>
      <FormHeader>
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}Add a AI
        Region
      </FormHeader>
      <FieldWrapper>
        <FieldName>
          Region ID
        </FieldName>
        <TextField
          name="id"
          id="id"
          value={formData?.id || ""}
          fullWidth
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "id")}
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
        <FieldName>
          Description
        </FieldName>
        <TextField
          name="description"
          id="id"
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
        <FieldName>Parent Type</FieldName>
        <Autocomplete
          disabled
          open={open}
          disablePortal
          options={""}
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
      <FieldWrapper>
        <FieldName>Parent Value</FieldName>
        <Autocomplete
          disabled
          open={open}
          disablePortal
          options={""}
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
      <FieldWrapper>
        <FieldName>ASC Region ID</FieldName>
        <Autocomplete
          disabled
          open={open}
          disablePortal
          options={""}
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
  );
};

export default AIForm;
