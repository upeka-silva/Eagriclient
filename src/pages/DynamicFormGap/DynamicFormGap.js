import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
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
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { Add, Edit } from "@mui/icons-material";
import {
  fileUploadForm,
  getFormTemplateByType,
  getFormTemplatesByGapReqId,
  handleAuditForm,
  saveFormDataWithValues,
  saveGapDataWithValues,
  updateAuditForm,
  updateGapDataWithValues,
} from "../../redux/actions/auditForm/action";
import Checkbox from "@mui/material/Checkbox";
import FileUploadDynamic from "./FileUploadDynamic";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";

const DynamicFormGap = ({ auditFormType = "", afterSave, formId }) => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  let uriPath = "";
  let formHeader = "";
  console.log(formId);
  console.log(state?.action);
  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [formTemplate, setFormTemplate] = useState({});
  const [toggleState, setToggleState] = useState(1);
  const [newSavedId, setNewSavedId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadResponse, setFileUploadResponse] = useState({});
  const [selectedQid, setSelectedQid] = useState(null);

  const { addSnackBar } = useSnackBars();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const goBack = () => {
    navigate("/farm-land");
  };

  const goIntAudit = () => {
    navigate("/audit-form", {
      state: {
        auditFormType: auditFormType,
        action: DEF_ACTIONS.ADD,
        formId: formId,
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

  const onSuccessSaveWithFile = async (response, qid, fileData) => {
    setNewSavedId(response?.payload?.id);
    setSelectedQid(qid);
    setSelectedFile(fileData);
    const formDataFile = new FormData();
    formDataFile.append("file", fileData);
    await fileUploadForm(
      formId,
      uriPath,
      response?.payload?.id,
      formDataFile,
      qid,
      onSuccessAfterUploadFile,
      onError
    );
  };

  const onSuccessAfterUploadFile = async (response, qid) => {
    const obj = { ...fileUploadResponse };
    obj[qid] = response.payload;

    setFileUploadResponse(obj);
    setSaving(false);
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
        id: 1,
      },
      auditAnswers: auditAnswers,
    };

    try {
      await updateGapDataWithValues(
        id,
        1,
        uriPath,
        updateData,
        onSuccess,
        onError
      );
    } catch (error) {
      console.log(error);
    }
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
    afterSave();
  };

  const afterFileUploadSave = async (qid, fileData) => {
    const newFile = { ...fileData };
    setSelectedFile(newFile);
    setSelectedQid(qid);

    if (newSavedId == null) {
      const saveData = {
        templateId: formTemplate.id,
        gapRequestDto: {
          id: 1, // TODO
        },
      };

      setSaving(true);
      try {
        if (formData?.id) {
          console.log("N/A");
        } else {
          await saveGapDataWithValues(
            1,
            uriPath,
            saveData,
            fileData,
            qid,
            onSuccessSaveWithFile,
            onError
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("elseeeeeeeeeeeeeeeee");
      const formDataFile = new FormData();
      formDataFile.append("file", fileData);
      await fileUploadForm(
        1,
        uriPath,
        newSavedId,
        formDataFile,
        qid,
        onSuccessAfterUploadFile,
        onError
      );
    }
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
      if (newSavedId == null) {
        console.log("new id create without file ");
        const saveData = {
          templateId: formTemplate.id,
          gapRequestDto: {
            id: 1, // TODO
          },
        };

        setSaving(true);
        try {
          await saveGapDataWithValues(
            1,
            uriPath,
            saveData,
            null,
            null,
            onSuccessSave,
            onError
          );
          if (formData?.id) {
            console.log("ERRRRRRRRRRR");
          } else {
            await saveGapDataWithValues(
              1,
              uriPath,
              saveData,
              null,
              null,
              onSuccessSave,
              onError
            );
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("new id from file upload ");
        onSuccessSave(null);
      }
    }
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
    getFormTemplateByType(
      auditFormType + "?gapCategory=SL_GAP&cropCategory=VEG"
    ).then(({ data = {} }) => {
      console.log("res ", data);
      setFormTemplate(data);
      console.log("formTemplate11 ", formTemplate);
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName
              style={
                {
                  // width: "100%",
                }
              }
            >
              Select Type
            </FieldName>
            <Select
              name="type"
              id="type"
              //value={formData?.irrigationMethod || "OTHER"}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "irrigationMethod")
              }
              fullWidth
              sx={{
                borderRadius: "8px",
                backgroundColor: `${Colors.white}`,
              }}
              size="small"
            >
              <MenuItem value={"VEG"}>Veg</MenuItem>
              <MenuItem value={"FRUIT"}> Fruit</MenuItem>
              <MenuItem value={"PADDY"}>Paddy</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>

        <Grid item lg={4}>
          <ButtonWrapper>
            {state?.action !== DEF_ACTIONS.VIEW && (
              <ActionWrapper>
                <PermissionWrapper
                  permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.INTERNAL_AUDIT}`}
                >
                  <Button
                    variant="outlined"
                    disabled={false}
                    onClick={goIntAudit}
                    size="small"
                    color="success"
                    style={{ marginTop: "30px" }}
                  >
                    <Add />
                  </Button>
                </PermissionWrapper>
              </ActionWrapper>
            )}
          </ButtonWrapper>
        </Grid>
      </Grid>
      {/* <Box sx={{ padding: "20px" }}>
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
                    gapId={1}
                    auditId={formData.id}
                    auditAPIPath={uriPath}
                    afterSelectedFile={afterFileUploadSave}
                  />
                )}
              </FieldWrapper>
            </Grid>
          ))}
        </Grid>
      </Box>  */}
    </>
  );
};

export default DynamicFormGap;
