import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";

import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PathName } from "../../components/FormLayout/PathName";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  updatePrivateCompany,
  handlePrivateCompany,
} from "../../redux/actions/privateCompanies/action";

const PrivateCompaniesForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/private-company");
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
          await updatePrivateCompany(formData, onSuccess, onError);
        } else {
          await handlePrivateCompany(formData, onSuccess, onError);
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
        backgroundColor: `${Colors.formBackgroundColor}`,
        fontFamily: `${Fonts.fontStyle1}`,
      }}
    >
      <div style={{ padding: "0px 18px" }}>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
        <PathName>{getPathName()}</PathName>
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} PRIVATE COMPANY
        </FormHeader>
      </div>
      <Grid container flexDirection="row">
        <Grid flexDirection="column">
          <Grid
            style={{
              border: "1px solid #D2D2D2",
              borderRadius: "10px",
              margin: "20px",
              backgroundColor: `${Colors.formBackgroundColor}`,
            }}
          >
            <FormWrapper
              style={{ backgroundColor: `${Colors.formBackgroundColor}` }}
            >
              <FieldWrapper>
                <FieldName>Business ID</FieldName>
                <TextField
                  name="code"
                  id="code"
                  value={formData?.code || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "code")}
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Business Name</FieldName>
                <TextField
                  name="name"
                  id="name"
                  value={formData?.name || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "name")}
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Owner Name</FieldName>
                <TextField
                  name="ownerName"
                  id="ownerName"
                  value={formData?.ownerName || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "ownerName")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Business Type</FieldName>
                <TextField
                  name="businessType"
                  id="businessType"
                  value={formData?.businessType || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "businessType")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </FormWrapper>
          </Grid>
        </Grid>
        <Grid flexDirection="column">
          <Grid
            style={{
              border: "1px solid #D2D2D2",
              borderRadius: "10px",
              margin: "20px",
              backgroundColor: `${Colors.formBackgroundColor}`,
            }}
          >
            <FormWrapper
              style={{ backgroundColor: `${Colors.formBackgroundColor}` }}
            >
              <FieldWrapper>
                <FieldName>Business Location</FieldName>
                <TextField
                  name="businessLocation"
                  id="businessLocation"
                  value={formData?.businessLocation || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "businessLocation")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Contact Number</FieldName>
                <TextField
                  name="contactNumber"
                  id="contactNumber"
                  value={formData?.contactNumber || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  type="number"
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "contactNumber")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Email Address</FieldName>
                <TextField
                  name="email"
                  id="email"
                  value={formData?.email || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "email")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Website</FieldName>
                <TextField
                  name="website"
                  id="website"
                  value={formData?.website || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "website")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Registration Date</FieldName>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="registrationDate"
                      id="registrationDate"
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      value={formData?.registrationDate || ""}
                      onChange={(newValue) =>
                        handleChange(newValue || "", "registrationDate")
                      }
                      slotProps={{ textField: { size: "small" } }}
                      sx={{
                        width: "264px",
                        "& .MuiInputBase-root": {
                          height: "30px",
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>
                  Name of
                  <br />
                  contact person
                </FieldName>
                <TextField
                  name="contactPerson"
                  id="contactPerson"
                  value={formData?.contactPerson || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "contactPerson")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </FormWrapper>
          </Grid>
        </Grid>
      </Grid>
      <ButtonWrapper style={{ width: "95%" }}>
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
    </div>
  );
};

export default PrivateCompaniesForm;
