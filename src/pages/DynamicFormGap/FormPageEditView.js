import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Colors } from "../../utils/constants/Colors";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Fonts } from "../../utils/constants/Fonts";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import Checkbox from "@mui/material/Checkbox";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useHistory } from 'react-router-dom';
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { Add, Edit } from "@mui/icons-material";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import FileUploadDynamic from "./FileUploadDynamic";
import {
  fileUploadForm,
  getFormTemplatesByGapReqId,
  saveGapDataWithValues,
  updateGapDataWithValues,
} from "../../redux/actions/auditForm/action";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../context/SnackBarContext";

export default function FormPageEditView(
  open,
  handleClose,
  confirmAction,
  formData,
  mode,
  addView,
 // uriPath = "internal-audit"
) {
   useUserAccessValidation();
  const { state } = useLocation();
  const [formDataQ, setFormDataQ] = useState({});
  const [saving, setSaving] = useState(false);
  const [fileUploadResponse, setFileUploadResponse] = useState({});
  const [dataListTemplates, setDataListTemplates] = useState([]);
  const [formTemplate, setFormTemplate] = useState({});
  const navigate = useNavigate();
  console.log(state)
  const { addSnackBar } = useSnackBars();
 
  const goBack = ()=>{
    //navigate("/gap-reg-form")
    navigate(-1)
  }

  useEffect(() => {
    getFormTemplatesByGapReqId(state?.formId.formId, state?.uriPath).then(({ data = [] }) => {
      setDataListTemplates(data);
    });
  }, []);

  useEffect(() => {
    if (!state.formData) {
      return;
    }
    const formData = state.formData
    const newOne = {};
    newOne.auditId = formData.auditId;
    newOne.id = formData.id;
    let idKey = "";
    let idAnsKey = "";
    if (formData?.auditAnswers && formData?.auditAnswers?.length > 0) {
      for (const answer of formData?.auditAnswers) {
        idKey = "question_" + answer?.question?.id;
        idAnsKey = "answer_" + answer?.question?.id;
        newOne[idKey] = answer?.question?.questionString;
        newOne[idAnsKey] = answer?.answer;
      }
    }

    setFormDataQ(newOne);
  }, [formData]);

  const handleChange = (value, target) => {
    setFormDataQ((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormDataQ(state?.target || {});
    } else {
      setFormDataQ({});
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

  const afterFileUploadSave = async (qid, fileData) => {
    const formDataFile = new FormData();
    formDataFile.append("file", fileData);
    await fileUploadForm(
      state.formId.formId,
      state?.ADDuriPath,
      formData.id,
      formDataFile,
      qid,
      onSuccessAfterUploadFile,
      onError
    );
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  const onSuccessAfterUploadFile = async (response, qid) => {
    const obj = { ...fileUploadResponse };
    obj[qid] = response.payload;

    setFileUploadResponse(obj);
    setSaving(false);
  };

  const handle = async (event, data, functionMode, fileUploadResponse) => {
    console.log("handle")
    const auditAnswers = [];
    const keysArray = Object.keys(data);
    for (const qKey of keysArray) {
      if (qKey.indexOf("answer_") !== -1) {
        const parts = qKey.split("_");
        const questionId = parts[1];
        const answer = data[qKey];

        const proofDocs = [];

        if (fileUploadResponse && fileUploadResponse[questionId]) {
          const fileRes = fileUploadResponse[questionId];
          if (fileRes) {
            proofDocs.push({
              docUrl: fileRes.storedFileName,
              presignedUrl: fileRes.presignedUrl,
              originalFileName: fileRes.originalFileName,
              presignExpireDate: fileRes.expireDate,
            });
          }
        }

        if (proofDocs.length > 0) {
          auditAnswers.push({
            question: {
              id: questionId,
            },
            answer: answer,
            proofDocs: proofDocs,
          });
        } else {
          auditAnswers.push({
            question: {
              id: questionId,
            },
            answer: answer,
          });
        }
      }
    }

    const saveData = {
      templateId: formTemplate.id,
      auditId: data.auditId,
      gapRequestDto: {
        id: state?.formId.formId,
      },
      auditAnswers: auditAnswers,
    };

    setSaving(true);
    try {
        await updateGapDataWithValues(
            state.formData.id,
            state.formId.formId,
            state.uriPath,
            saveData,
            onSuccess,
            onError
          );
    //   if (functionMode === DEF_ACTIONS.ADD) {
    //     await saveGapDataWithValues(
    //       1,
    //       uriPath,
    //       saveData,
    //       null,
    //       null,
    //       onSuccess,
    //       onError
    //     );
    //   } else if (state.action === DEF_ACTIONS.EDIT) {
    //     await updateGapDataWithValues(
    //       state.formData.id,
    //       1,
    //       uriPath,
    //       saveData,
    //       onSuccess,
    //       onError
    //     );
    //   }
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
    //setOpenCropAreaAddDlg(false);
  };

  const onSuccess = async (response) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully executed !!!",
    });

    getFormTemplatesByGapReqId(state.formId.formId, state.uriPath).then(({ data = [] }) => {
      setDataListTemplates(data);
    });
  };
  return (
    <>
      <ButtonWrapper>
        {/* {state?.action !== DEF_ACTIONS.VIEW && ( */}
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
                  //disabled={!enableSave()}
                  onClick={goBack}
                  size="small"
                  color="success"
                >
                  Back
                </Button>
                <Button
                  variant="outlined"
                  disabled={!enableSave()}
                  onClick={(event) =>
                    handle(event, formDataQ, mode, fileUploadResponse)
                  }
                  size="small"
                  color="success"
                  sx={{ marginLeft: "10px" }}
                >
                  {state?.action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
                </Button>
                <Button
                  onClick={resetForm}
                  color="success"
                  variant="contained"
                  size="small"
                  sx={{ marginLeft: "10px" }}
                  disabled = {state?.action !== DEF_ACTIONS.EDIT}
                >
                  RESET
                </Button>
              </>
            )}
          </ActionWrapper>
        {/* )} */}
      </ButtonWrapper>
      <Box sx={{ display: "flex" }}>
        <Grid
          container
          sx={{
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={5}>
            <FieldWrapper>
              <FieldName>Audit ID</FieldName>
              <TextField
                name="auditId"
                id="auditId"
                value={formDataQ?.auditId || ""}
                disabled={state.action === DEF_ACTIONS.VIEW || state.action === DEF_ACTIONS.EDIT}
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
          {state.formData?.auditAnswers?.map((item, index) => (
            <Grid item lg={6}>
              <FieldWrapper>
                <FieldName>
                  {index + 1}. {item?.question?.questionString} ?{" "}
                </FieldName>

                {item?.question?.questionType === "TEXT" && (
                  <TextField
                    name={"answer_" + item.question.id}
                    id={"answer_" + item.question.id}
                    value={formDataQ["answer_" + item.question.id] || ""}
                    disabled={state.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.value || "",
                        "answer_" + item.question.id
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

                {item?.question?.questionType === "BOOLEAN" && (
                  <Checkbox
                    name={"answer_" + item.question.id}
                    id={"answer_" + item.question.id}
                    value={formDataQ["answer_" + item.question.id]}
                    disabled={state.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.checked || "",
                        "answer_" + item.question.id
                      )
                    }
                    checked={formDataQ["answer_" + item.question.id] === true}
                  />
                )}
                {item.question.proofRequired === true && (
                  <FileUploadDynamic
                    qId={item.question.id}
                    gapId={1}
                    afterSelectedFile={afterFileUploadSave}
                  />
                )}
                {item?.proofDocs &&
                  item?.proofDocs?.length > 0 &&
                  item?.proofDocs?.map((proofDoc, index) => (
                    <FieldName>
                      <a href={proofDoc.presignedUrl} target="_blank">
                        {" "}
                        {proofDoc.originalFileName}{" "}
                      </a>
                    </FieldName>
                  ))}
              </FieldWrapper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
