import React, { useEffect, useState } from "react";
import { getFormTemplateByType, saveGapDataWithValues, updateGapDataWithValues } from "../../redux/actions/auditForm/action";
import { useLocation, useNavigate } from "react-router";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { Box, Button, Checkbox, Grid, TextField } from "@mui/material";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Colors } from "../../utils/constants/Colors";
import FileUploadDynamic from "./FileUploadDynamic";
import { useUserAccessValidation } from "../../hooks/authentication";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";

export default function DynamicFormPage({ auditFormType = "", afterSave }) {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [formTemplate, setFormTemplate] = useState({});
  const [newSavedId, setNewSavedId] = useState(null);
  const [fileUploadResponse, setFileUploadResponse] = useState({});

  const { addSnackBar } = useSnackBars();

  let uriPath = "";
  let formHeader = "";

  const goBack = () => {
    navigate(-1)
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

  useEffect(() => {
    getFormTemplateByType(
      state?.auditFormType + "?gapCategory=SL_GAP&cropCategory=VEG"
    ).then(({ data = {} }) => {
      console.log("res ", data);
      setFormTemplate(data);
      console.log("formTemplate11 ", formTemplate);
    });
  }, []);

  const populateAttributes = () => {
    if (state?.auditFormType === "SELF_ASSESSMENT") {
      uriPath = "self-assessments";
      formHeader = "SELF ASSESSMENT FORM";
    } else if (state?.auditFormType === "INTERNAL_AUDIT") {
      uriPath = "internal-audit";
      formHeader = "INTERNAL AUDIT FORM";
    } else if (state?.auditFormType === "EXTERNAL_AUDIT") {
      uriPath = "external-audit";
      formHeader = "EXTERNAL AUDIT FORM";
    } else if (state?.auditFormType === "BASIC_ASSESSMENT") {
      uriPath = "basic-assessments";
      formHeader = "BASIC ASSESSMENT FORM";
    }
  };

  const afterFileUploadSave = async (qid, fileData) => {};

  const handleFormSubmit = async () => {
    console.log('intrnal audit -----> save');
    console.log(enableSave())
    populateAttributes();
    if (enableSave()) {
      if (newSavedId == null) {
        console.log( uriPath);
        const saveData = {
          templateId: formTemplate.id,
          gapRequestDto: {
            id: state.formId, // TODO
          },
        };

        setSaving(true);
        try {
          await saveGapDataWithValues(
            state.formId,
            uriPath,
            saveData,
            null,
            null,
            onSuccessSave,
            onError
          );
          // if (formData?.id) {
          //   console.log("ERRRRRRRRRRR");
          // } else {
          //   await saveGapDataWithValues(
          //     1,
          //     uriPath,
          //     saveData,
          //     null,
          //     null,
          //     onSuccessSave,
          //     onError
          //   );
          // }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("new id from file upload ");
        onSuccessSave(null);
      }
    }
  };

  const onSuccessSave = async (response) => {
    let id = null;
    if (newSavedId == null) {
      setNewSavedId(response?.payload?.id);
      id = response?.payload?.id;
    } else {
      id = newSavedId;
    }
    const auditAnswers = [];
    const keysArray = Object.keys(formData);

    for (const qKey of keysArray) {
      if (qKey.indexOf("question_") !== -1) {
        const parts = qKey.split("_");
        const questionId = parts[1];
        const answer = formData[qKey];

        const proofDocs = [];
        const fileRes = fileUploadResponse[questionId];
        if (fileRes) {
          proofDocs.push({
            docUrl: fileRes.storedFileName,
            presignedUrl: fileRes.presignedUrl,
            originalFileName: fileRes.originalFileName,
            presignExpireDate: fileRes.expireDate,
          });
        }

        auditAnswers.push({
          question: {
            id: questionId,
          },
          answer: answer,
          proofDocs: proofDocs,
        });
      }
    }

    const updateData = {
      id: id,
      templateId: formTemplate.id,
      auditId: formData.auditId,
      gapRequestDto: {
        id: state.formId,
      },
      auditAnswers: auditAnswers,
    };

    try {
      await updateGapDataWithValues(
        id,
        state.formId,
        uriPath,
        updateData,
        onSuccess,
        onError
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  const onSuccess = async (response) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
    //afterSave();
  };

  return (
    <>
      <ButtonWrapper>
        <ActionWrapper>
          <Button
            variant="contained"
            disabled={false}
            onClick={goBack}
            size="small"
            color="success"
          >
            Go Back
          </Button>
          {saving ? (
            <Button variant="contained" size="small">
              {state?.action === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
              ADDING...
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                disabled={false}
                onClick={handleFormSubmit}
              
                size="small"
                color="success"
                style={{ marginLeft: "10px" }}
              >
                {/* {state?.action === DEF_ACTIONS.ADD ? <Add/> : <Edit/>} */}
                {/* <Add/> */}
                Save
              </Button>
              <Button
                //onClick={resetForm}
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
              <FieldName>Audit ID</FieldName>
              <TextField
                name="auditId"
                id="auditId"
                value={formData?.auditId || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "auditId")
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
                  {index + 1}. {item.questionString} ?{" "}
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
                      handleChange(e?.target?.checked, "question_" + item.id)
                    }
                    checked={formData?.["question_" + item.id] === true}
                  />
                )}
                {item.proofRequired === true && (
                  <FileUploadDynamic
                    qId={item.id}
                    gapId={state.formId}
                    auditId={formData.id}
                    auditAPIPath={uriPath}
                    afterSelectedFile={afterFileUploadSave}
                  />
                )}
              </FieldWrapper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
