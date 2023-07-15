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
          {state?.action} USER TYPE
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
                <FieldName>First Name</FieldName>
                <TextField
                  name="firstName"
                  id="firstName"
                  value={formData?.firstName || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "firstName")
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
                <FieldName>Last Name</FieldName>
                <TextField
                  name="lastName"
                  id="lastName"
                  value={formData?.lastName || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "lastName")
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
                <FieldName>User Name</FieldName>
                <TextField
                  name="userName"
                  id="userName"
                  value={formData?.userName || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "userName")
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
                <FieldName>Email</FieldName>
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
            </FormWrapper>
          </Grid>
        </Grid>
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
              <FieldName>Phone</FieldName>
              <TextField
                name="phone"
                id="phone"
                value={formData?.phone || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "phone")}
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
              <FieldName>Address</FieldName>
              <TextField
                name="address"
                id="address"
                value={formData?.address || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "address")
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
              <FieldName>Date of Birth</FieldName>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData?.dateOfBirth || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "dateOfBirth")
                    }
                    in="DD-MM-YYYY"
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FieldWrapper>
            <FieldWrapper>
        <FieldName>Gender</FieldName>
        <FormControl>
          <Select
            value={formData?.gender || ""}
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "gender")
            }
            sx={{
              width: "264px",
              height: "30px",
              borderRadius: "8px",
              backgroundColor: `${Colors.white}`,
            }}
            size="small"
          >
            <MenuItem value={"MALE"}>Male</MenuItem>
            <MenuItem value={"FEMALE"}>Female</MenuItem>
            <MenuItem value={"CUSTOM"}>Custom</MenuItem>
          </Select>
        </FormControl>
      </FieldWrapper>
          </FormWrapper>
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

export default UserTypeForm;
