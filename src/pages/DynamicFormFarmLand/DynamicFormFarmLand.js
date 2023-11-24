import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  Box,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
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
  getFormTemplateByType,
  handleAuditForm,
  saveFormDataWithValues,
  updateAuditForm,
} from "../../redux/actions/auditForm/action";
import CommonQuestionList from "./../../pages/AuditForm/CommonQuestionList";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DataGrid } from "@mui/x-data-grid";
import {
  handleFarmLand,
  updateFarmLand,
} from "../../redux/actions/farmLand/action";
import Checkbox from "@mui/material/Checkbox";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";

const DynamicFormFarmLand = ({ auditFormType = "", afterSave, formId, stateData }) => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  let uriPath = "";
  let formHeader = "";

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [formTemplate, setFormTemplate] = useState({});
  const [toggleState, setToggleState] = useState(1);

  const { addSnackBar } = useSnackBars();

  const toggleTab = (index) => {
    setToggleState(index);
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
    afterSave();
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  const populateAttributes = () => {
    if (auditFormType === "SELF_ASSESSMENT") {
      uriPath = "self-assessments";
      formHeader = "SELF ASSESSMENT FORM";
    } else if (auditFormType === "INTERNAL_AUDIT") {
      uriPath = "internal-audit";
      formHeader = "INTERNAL AUDIT FORM";
    } else if (auditFormType === "EXTERNAL_AUDIT") {
      uriPath = "external-audit";
      formHeader = "EXTERNAL AUDIT FORM";
    } else if (auditFormType === "BASIC_ASSESSMENT") {
      uriPath = "basic-assessments";
      formHeader = "BASIC ASSESSMENT FORM";
    }
  };

  populateAttributes();

  useEffect(() => {
    getFormTemplateByType(auditFormType).then(({ data = {} }) => {
      //setDistrict(dataList);
      console.log("res ", data);
      setFormTemplate(data);
      console.log("formTemplate ", formTemplate);
    });
  }, []);

  const goAssessmentForm = () => {
    if (auditFormType === "SELF_ASSESSMENT") {
      navigate("/farm-land-form/self-assessment", {
        state: {
          auditFormType: auditFormType,
          action: DEF_ACTIONS.ADD,
          formId: formId,
          stateData: stateData,
        },
      });
    } else if (auditFormType === "BASIC_ASSESSMENT") {
      navigate("/farm-land-form/basic-assessment", {
        state: {
          auditFormType: auditFormType,
          action: DEF_ACTIONS.ADD,
          formId: formId,
          stateData: stateData,
        },
      });
    }
  };

  return (
    <>
      <Grid container>
        <Grid item lg={4}>
          <ButtonWrapper>
            {state?.action !== DEF_ACTIONS.VIEW && (
              <ActionWrapper>
                <PermissionWrapper
                  permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.BASIC_ASSESSMENT}`}
                >
                  <Button
                    variant="outlined"
                    disabled={false}
                    onClick={goAssessmentForm}
                    size="small"
                    color="success"
                    style={{ marginTop: "10px" }}
                  >
                    <Add />
                  </Button>
                </PermissionWrapper>
              </ActionWrapper>
            )}
          </ButtonWrapper>
        </Grid>
      </Grid>
    </>
  );
};

export default DynamicFormFarmLand;
