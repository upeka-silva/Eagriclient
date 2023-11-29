import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";
import {
  handleAuditForm,
  updateAuditForm,
} from "../../redux/actions/auditForm/action";
import CommonQuestionList from "./CommonQuestionList";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";

const CommonAuditForm = ({ auditFormType = "" }) => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  let listPath = "";
  let formHeader = "";
  const dateAdapter = new AdapterDayjs();
  const [formData, setFormData] = useState({
    ...(state?.target || {}),
    activeFrom: state?.target?.activeFrom
      ? dateAdapter.date(state?.target?.activeFrom)
      : null,
  });
  const [questions, setQuestions] = useState(state?.questionList || []);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savedFormId, setSavedFormId] = useState(formData?.id);

  const { addSnackBar } = useSnackBars();

  const populateAttributes = () => {
    if (auditFormType === "SELF_ASSESSMENT") {
      listPath = "self-assessment";
      formHeader = "Self Assessment Form";
    } else if (auditFormType === "INTERNAL_AUDIT") {
      listPath = "internal-audit";
      formHeader = "Internal Audit Form";
    } else if (auditFormType === "EXTERNAL_AUDIT") {
      listPath = "external-audit";
      formHeader = "External Audit Form";
    } else if (auditFormType === "BASIC_ASSESSMENT") {
      listPath = "basic-assessment";
      formHeader = "Basic Assessment Form";
    }
  };

  populateAttributes();

  const goBack = () => {
    navigate("/gap/" + listPath);
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

  const onSuccess = (response) => {
    console.log("response ", response);

    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaveSuccess(true);
    setSavedFormId(response?.payload?.id);
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
      formData.formType = auditFormType;
      let activeFrom = new Date(formData.activeFrom);

      try {
        if (formData?.id) {
          await updateAuditForm(
            {
              ...formData,
              activeFrom: activeFrom.valueOf() || null,
            },
            onSuccess,
            onError
          );
        } else {
          await handleAuditForm(
            {
              ...formData,
              activeFrom: activeFrom.valueOf() || null,
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
      }}
    >
      <div>
        <ActionWrapper isLeft>
          <Button
            startIcon={<ArrowCircleLeftRounded />}
            onClick={goBack}
            color="success"
          >
            Go back to list
          </Button>
        </ActionWrapper>
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} {formHeader}
        </FormHeader>
      </div>
      <ButtonWrapper
        style={{
          width: "95%",
          justifyContent: "flex-start",
        }}
      >
        {state?.action !== DEF_ACTIONS.VIEW && (
          <ActionWrapper>
            {saving ? (
              <Button variant="contained">
                {state?.action === DEF_ACTIONS.ADD
                  ? "ADDING..."
                  : "UPDATING..."}
              </Button>
            ) : (
              <FormButtonGroup
                state={state}
                DEF_ACTIONS={DEF_ACTIONS}
                saving={saving}
                enableSave={enableSave}
                handleFormSubmit={handleFormSubmit}
                resetForm={resetForm}
              />
            )}
          </ActionWrapper>
        )}
      </ButtonWrapper>

      <Grid
        container
        sx={{
          marginTop: "10px",
          marginBottom: "10px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Form ID</FieldName>
            <TextField
              name="formName"
              id="formName"
              value={formData?.formName || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "formName")}
              sx={{
                "& .MuiInputBase-root": {
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
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Form Description</FieldName>
            <TextField
              name="formDescription"
              id="formDescription"
              value={formData?.formDescription || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "formDescription")
              }
              sx={{
                "& .MuiInputBase-root": {
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
        {auditFormType !== "SELF_ASSESSMENT" && (
          <>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Category</FieldName>

                <Select
                  value={formData?.category || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "category")
                  }
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                  fullWidth
                >
                  <MenuItem value={"SL_GAP"}>SL GAP</MenuItem>
                  <MenuItem value={"GAP_B"}>GAP B</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Sub Category</FieldName>

                <Select
                  value={formData?.subcategory || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "subcategory")
                  }
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                  fullWidth
                >
                  <MenuItem value={"VEG"}>Veg</MenuItem>
                  <MenuItem value={"FRUIT"}>Fruit</MenuItem>
                  <MenuItem value={"PADDY"}>Paddy</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
          </>
        )}
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Active From</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="activeFrom"
                id="activeFrom"
                disabled={state?.action === DEF_ACTIONS.VIEW}
                slotProps={{ textField: { size: "small", error: false } }}
                value={formData?.activeFrom || ""}
                onChange={(newValue) =>
                  handleChange(newValue || "", "activeFrom")
                }
                disablePast
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
      </Grid>
      <Paper style={{ height: "500px" }}>
        <Grid
          container
          sx={{
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item sm={12} md={12} lg={12}>
            <CommonQuestionList
              dataList={questions}
              onFormSaveSuccess={saveSuccess}
              formId={savedFormId}
              formMode={state?.action}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CommonAuditForm;
