import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../context/SnackBarContext";

import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { PathName } from "../../components/FormLayout/PathName";

import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { handleUsers, updateUsers } from "../../redux/actions/users/action";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Add, Edit } from "@mui/icons-material";

const UsersForm = () => {
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
    navigate("/users");
  };

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };

      // Special handling for the "roleDTOs" field to update the "id" value
      if (target === "roleDTOs") {
        newData[target] = [{ id: Number(value) }];
      } else {
        newData[target] = value;
      }

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

      let firstName = new Date(formData.firstName);
      let lastName = new Date(formData.lastName);

      try {
        if (formData?.id) {
          await updateUsers(
            {
              ...formData,
            },
            onSuccess,
            onError
          );
        } else {
          await handleUsers(
            {
              ...formData,
              startDate: firstName.valueOf() || null,
              endDate: lastName.valueOf() || null,
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
    <FormWrapper>
      <ActionWrapper isLeft>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
          Go back to users list
        </Button>
      </ActionWrapper>
      {/* <PathName>{getPathName()}</PathName> */}
      <FormHeader>
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
        {state?.action} New User
      </FormHeader>
      <ButtonWrapper style={{
          width: "95%",
          justifyContent: "flex-start",
          margin: "0",
          paddingLeft: "18px",
        }}>
        {state?.action !== DEF_ACTIONS.VIEW && (
          <ActionWrapper>
            {saving ? (
                <Button variant="contained">
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                    size="small"
                    color="success"
                  >
                    {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />}
                    {/* {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"} */}
                  </Button>
                  <Button
                    onClick={resetForm}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                  >
                    RESET
                  </Button>
                </>
              )}
          </ActionWrapper>
        )}
      </ButtonWrapper>
      <Grid
        container
        sx={{
          // border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item lg={3}>
      <FieldWrapper>
        <FieldName>First name</FieldName>
        <TextField
          name="firstName"
          id="firstName"
          value={formData?.firstName || ""}
          fullWidth
          disabled={
            state?.action === DEF_ACTIONS.VIEW ||
            state?.action === DEF_ACTIONS.EDIT
          }
          onChange={(e) => handleChange(e?.target?.value || "", "firstName")}
          sx={{
            // width: "264px",
            "& .MuiInputBase-root": {
              // height: "30px",
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </FieldWrapper>
      </Grid>
      <Grid item lg={3}>
      <FieldWrapper>
        <FieldName>Last name</FieldName>
        <TextField
          name="lastName"
          id="lastName"
          value={formData?.lastName || ""}
          fullWidth
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "lastName")}
          sx={{
            // width: "264px",
            "& .MuiInputBase-root": {
              // height: "30px",
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </FieldWrapper>
      </Grid>
      <Grid item lg={2}>
      <FieldWrapper>
        <FieldName>Date of Birth</FieldName>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         
            <DatePicker
              name="dob"
              id="dob"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              slotProps={{ textField: { size: "small" } }}
              value={formData?.dob || ""}
              onChange={(newValue) => handleChange(newValue || "", "startDate")}
              in="DD-MM-YYYY"
              sx={{
                // width: "246px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          
        </LocalizationProvider>
      </FieldWrapper>
      </Grid>
      <Grid item lg={3}>
      <FieldWrapper>
        <FieldName>Password</FieldName>
        <TextField
          name="password"
          id="password"
          value={formData?.password || ""}
          fullWidth
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "password")}
          sx={{
            // width: "264px",
            "& .MuiInputBase-root": {
              // height: "30px",
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </FieldWrapper>
      </Grid>
      <Grid item lg={3}>
      <FieldWrapper>
        <FieldName>Verify password</FieldName>
        <TextField
          name="matchingPassword"
          id="matchingPassword"
          value={formData?.matchingPassword || ""}
          fullWidth
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) =>
            handleChange(e?.target?.value || "", "matchingPassword")
          }
          sx={{
            // width: "264px",
            "& .MuiInputBase-root": {
              // height: "30px",
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </FieldWrapper>
      </Grid>
      <Grid item lg={3}>
      <FieldWrapper>
        <FieldName>Email</FieldName>
        <TextField
          name="email"
          id="email"
          value={formData?.email || ""}
          fullWidth
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "email")}
          sx={{
            // width: "264px",
            "& .MuiInputBase-root": {
              // height: "30px",
              borderRadius: "8px",
            },
          }}
          size='small'
        />
      </FieldWrapper>
      </Grid>
      <Grid item lg={5}>
      <FieldWrapper>
        <FieldName>Role</FieldName>
        {/* <FormControl
          component="fieldset"
          fullWidth
          sx={{ width: "264px", borderRadius: "8px"  }}
        > */}
          <RadioGroup
            name="roleDTOs"
            id="roleDTOs"
            value={formData.roleDTOs ? formData.roleDTOs[0].id.toString() : ""}
            onChange={(e) => handleChange(e.target.value, "roleDTOs")}
           row
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="SUPER ADMIN"
              disabled={state?.action === DEF_ACTIONS.VIEW}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="SYSTEM USER"
              disabled={state?.action === DEF_ACTIONS.VIEW}
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="ADMIN"
              disabled={state?.action === DEF_ACTIONS.VIEW}
            />
          </RadioGroup>
        {/* </FormControl> */}
      </FieldWrapper>
      </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default UsersForm;
