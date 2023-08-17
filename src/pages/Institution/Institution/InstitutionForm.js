import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Box,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { get_GnDivisionList } from "../../../redux/actions/gnDivision/action";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  handleInstitution,
  updateInstitution,
} from "../../../redux/actions/institution/institution/action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Colors } from "../../../utils/constants/Colors";
import { Fonts } from "../../../utils/constants/Fonts";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_InstitutionCatList } from "../../../redux/actions/institution/institutionCategory/action";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";

const InstitutionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [gn, setGn] = useState([]);
  const [instituteCat, setInstituteCat] = useState([]);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/institution");
  };

  useEffect(() => {
    get_GnDivisionList().then(({ dataList = [] }) => {
      setGn(dataList);
    });
  }, []);

  useEffect(() => {
    get_InstitutionCatList().then(({ dataList = [] }) => {
      setInstituteCat(dataList);
    });
  }, []);

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
          await updateInstitution(formData, onSuccess, onError);
        } else {
          await handleInstitution(formData, onSuccess, onError);
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
      <div>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
        <PathName>{getPathName()}</PathName>
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} INSTITUTION
        </FormHeader>
      </div>
      <ButtonWrapper
        style={{
          width: "95%",
          justifyContent: "flex-start",
          margin: "0",
          paddingLeft: "18px",
        }}
      >
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
      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Institution ID</FieldName>
            <TextField
              name="code"
              id="code"
              value={formData?.code || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "code")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Institution Name</FieldName>
            <TextField
              name="institutionName"
              id="institutionName"
              value={formData?.institutionName || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "institutionName")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Institution Type</FieldName>

            <Select
              value={formData?.institutionType || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "institutionType")
              }
              sx={{
                // width: "264px",
                // height: "30px",
                borderRadius: "8px",
                backgroundColor: `${Colors.white}`,
              }}
              size="small"
              fullWidth
            >
              <MenuItem value={"MINISTRY"}>Ministry</MenuItem>
              <MenuItem value={"DEPARTMENT"}>Department</MenuItem>
              <MenuItem value={"DIVISION"}>Division</MenuItem>
              <MenuItem value={"UNIT"}>Unit</MenuItem>
              <MenuItem value={"LAB"}>Lab</MenuItem>
              <MenuItem value={"CORPORATION"}>Corporation</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Institution Category</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={instituteCat}
              value={formData ? formData.institutionCategoryDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.description}`}
              onChange={(event, value) => {
                handleChange(value, "institutionCategoryDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Parent Institution ID</FieldName>
            <TextField
              name="parentInstitutionId"
              id="parentInstitutionId"
              value={formData?.parentInstitutionId || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "parentInstitutionId")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Address 1</FieldName>
            <TextField
              name="address1"
              id="address1"
              value={formData?.address1 || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "address1")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Address 2</FieldName>
            <TextField
              name="address2"
              id="address2"
              value={formData?.address2 || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "address2")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>City</FieldName>
            <TextField
              name="city"
              id="city"
              value={formData?.city || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "city")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Postal Code</FieldName>
            <TextField
              name="postalCode"
              id="postalCode"
              value={formData?.postalCode || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "postalCode")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>
              Grama Niladari
               Division
            </FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={gn}
              value={formData ? formData.gnDivisionDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "gnDivisionDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Contact Person</FieldName>
            <TextField
              name="postalCode"
              id="postalCode"
              value={formData?.postalCode || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "postalCode")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Phone No</FieldName>
            <TextField
              name="phoneNo"
              id="phoneNo"
              value={formData?.phoneNo || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "phoneNo")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
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
                  backgroundColor: `${Colors.white}`,
                },
                "& ::placeholder": {
                  fontSize: 11,
                  fontWeight: 400,
                  color: `${Colors.iconColor}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default InstitutionForm;
