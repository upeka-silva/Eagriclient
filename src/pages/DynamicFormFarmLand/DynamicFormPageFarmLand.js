import {
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { useSnackBars } from "../../context/SnackBarContext";
import { useUserAccessValidation } from "../../hooks/authentication";
import {
  getFormTemplateByType,
  saveFormDataWithValues,
} from "../../redux/actions/auditForm/action";
import { Colors } from "../../utils/constants/Colors";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";

const DynamicFormPageFarmLand = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();
  let uriPath = "";
  let formHeader = "";

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [formTemplate, setFormTemplate] = useState({});

  const { addSnackBar } = useSnackBars();

  useEffect(() => {
  
    if(state?.action === DEF_ACTIONS.EDIT || state?.action === DEF_ACTIONS.VIEW) {
      var ansListData = {assessmentId: state?.data?.assessmentId,id :  state?.data?.id };
      for(const ans of state?.data?.answerList) {
        const questionId = ans?.question?.id;
        ansListData['question_' + questionId] = ans?.answer;
      }

      setFormData(ansListData);
    }

    setFormTemplate()
  }, []);

  const goBack = () => {
    let tabIndex = 1;

    if (state.auditFormType === "SELF_ASSESSMENT") {
      tabIndex = 4;
    } else if (state.auditFormType === "BASIC_ASSESSMENT") {
      tabIndex = 5;
    }

    navigate("/farm-land-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: state?.stateData,
        tabIndex: tabIndex,
      },
    });
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
    goBack();
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
      console.log("form ", formData);

      const answerList = [];
      const keysArray = Object.keys(formData);

      for (const qKey of keysArray) {
        console.log(qKey);
        if (qKey.indexOf("question_") !== -1) {
          const parts = qKey.split("_");
          const questionId = parts[1];
          const answer = formData[qKey];
          answerList.push({
            question: {
              id: questionId,
            },
            answer: answer,
          });
        }
      }

      const saveData = {
        assessmentId: formData.assessmentId,
        id:formData.id,
        farmLand: {
          id:  state.formId,
        },
        answerList: answerList,
      };

      setSaving(true);
      try {
        if (formData?.id) {
          await saveFormDataWithValues(
            state.formId,
            uriPath,
            saveData,
            onSuccess,
            onError
          );
        } else {
          await saveFormDataWithValues(
            state.formId,
            uriPath,
            saveData,
            onSuccess,
            onError
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const populateAttributes = () => {
    if (state.auditFormType === "SELF_ASSESSMENT") {
      uriPath = "self-assessments";
      formHeader = "SELF ASSESSMENT FORM";
    } else if (state.auditFormType === "INTERNAL_AUDIT") {
      uriPath = "internal-audit";
      formHeader = "INTERNAL AUDIT FORM";
    } else if (state.auditFormType === "EXTERNAL_AUDIT") {
      uriPath = "external-audit";
      formHeader = "EXTERNAL AUDIT FORM";
    } else if (state.auditFormType === "BASIC_ASSESSMENT") {
      uriPath = "basic-assessments";
      formHeader = "BASIC ASSESSMENT FORM";
    }
  };

  populateAttributes();

  useEffect(() => {
    getFormTemplateByType( state?.auditFormType).then(({ data = {} }) => {
      //setDistrict(dataList);
      console.log("res ", data);
      setFormTemplate(data);
      console.log("formTemplate ", formTemplate);
    });
  }, []);

  return (
    <>
      <PageHeader saving={saving} state={state} goBack={goBack} formName={formHeader}  />
      <ButtonWrapper>
        <ActionWrapper>
          {saving ? (
            <Button variant="contained" size="small">
              {state?.action === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
              ADDING...
            </Button>
          ) : (
            <>
              {state?.action === DEF_ACTIONS.ADD ||
                state?.action === DEF_ACTIONS.EDIT ? (
                <>
                  <Button
                    variant="outlined"
                    disabled={false}
                    onClick={handleFormSubmit}
                    size="small"
                    color="success"
                    style={{ marginLeft: "10px" }}
                  >
                    Save
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
              ) : null}
            </>
          )}
        </ActionWrapper>
      </ButtonWrapper>
      <Box sx={{ padding: "20px" }}>
        <Grid
          container
          sx={{
            border: "1px solid #bec0c2",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={5}>
            <FieldWrapper>
              <FieldName>Assessment Name</FieldName>
              <TextField
                name="assessmentId"
                id="assessmentId"
                value={formData?.assessmentId || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "assessmentId")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={7}></Grid>
          {formTemplate?.questionDTOS?.map((item, index) => (
            <Grid item lg={6}>
              <FieldWrapper>
                <FieldName>
                  {index + 1}. {item.questionString} ? 
                </FieldName>

                {item.questionType === "TEXT" && (
                  <TextField
                    name={"question_" + item.id}
                    id={"question_" + item.id}
                    value={formData?.["question_" + item.id] || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.value || "",
                        "question_" + item.id
                      )
                    }
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                )}

                {item.questionType === "BOOLEAN" && (
                  <Checkbox
                    name={"question_" + item.id}
                    id={"question_" + item.id}
                    value={formData?.["question_" + item.id]}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.checked || "",
                        "question_" + item.id
                      )
                    }
                    checked={formData?.["question_" + item.id] === true || formData?.["question_" + item.id] === "true"}
                  />
                )}
              </FieldWrapper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default DynamicFormPageFarmLand;
