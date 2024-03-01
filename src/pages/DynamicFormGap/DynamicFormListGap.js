import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { useSnackBars } from "../../context/SnackBarContext";
import {
  deleteAuditFormQuestion,
} from "../../redux/actions/auditForm/auditFormQuestions/actions";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import DialogBox from "../../components/PageLayout/DialogBox";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getFormTemplateByType,
  getFormTemplatesByGapReqId,
  saveGapDataWithValues,
  updateGapDataWithValues,
} from "../../redux/actions/auditForm/action";
import DynamicFormGap from "./DynamicFormGap";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";

const DynamicFormListGap = ({
  formId,
  auditFormType = "",
  gapReqStatus,
  gapData,
  action
}) => {
  const { state } = useLocation();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [dataListTemplates, setDataListTemplates] = useState([]);
  const [dialogMode, setDialogMode] = useState(null);
  const [openCropAreaAddDlg, setOpenCropAreaAddDlg] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const { addSnackBar } = useSnackBars();
  const [formTemplate, setFormTemplate] = useState({});
  let uriPath = "";
  let formHeader = "";
  const navigate = useNavigate();

  const populateAttributes = () => {
    if (auditFormType === "SELF_ASSESSMENT") {
      uriPath = "self-assessments";
      formHeader = "SELF ASSESSMENT FORM";
    } else if (auditFormType === "INTERNAL_AUDIT") {
      uriPath = "internal-audit";
      formHeader = "INTERNAL AUDIT LIST";
    } else if (auditFormType === "EXTERNAL_AUDIT") {
      uriPath = "external-audit";
      formHeader = "EXTERNAL AUDIT LIST";
    } else if (auditFormType === "BASIC_ASSESSMENT") {
      uriPath = "basic-assessments";
      formHeader = "BASIC ASSESSMENT FORM";
    }
  };

  populateAttributes();

  useEffect(() => {
    if(state?.action === DEF_ACTIONS.EDIT || state?.action === DEF_ACTIONS.VIEW) {
      getFormTemplatesByGapReqId(formId, uriPath).then(({ data = [] }) => {
        setDataListTemplates(data);
      });
    }
  }, []);

  const handleCropAreaAdd = (prop, mode, p_action) => (event) => {
    setFormData({});
    setFormData(prop);
    setDialogMode(mode);
    //setOpenCropAreaAddDlg(true);
    navigate("/audit-form-edit-view", {
      state: {
        auditFormType: auditFormType,
        action: mode,
        formData: prop,
        formId: { formId },
        uriPath:uriPath,
        gapData: gapData,
        parentAction: p_action
      },
    });
  };

  const handleCropAreaDelete = (prop) => (event) => {
    setDeleteItem(prop);
    setOpen(true);
  };

  const closeAddCropArea = () => {
    setFormData({});
    setOpenCropAreaAddDlg(false);
  };

  const onSuccess = async (response) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully executed !!!",
    });

    getFormTemplatesByGapReqId(formId, uriPath).then(({ data = [] }) => {
      setDataListTemplates(data);
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };

  const handle = async (event, data, functionMode, fileUploadResponse) => {
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
        id: 1,
      },
      auditAnswers: auditAnswers,
    };

    setSaving(true);
    try {
      if (functionMode === DEF_ACTIONS.ADD) {
        await saveGapDataWithValues(
          1,
          uriPath,
          saveData,
          null,
          null,
          onSuccess,
          onError
        );
      } else if (functionMode === DEF_ACTIONS.EDIT) {
        await updateGapDataWithValues(
          formData.id,
          1,
          uriPath,
          saveData,
          onSuccess,
          onError
        );
      }
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
    setOpenCropAreaAddDlg(false);
  };

  const addQ = () => {
    getFormTemplateByType(
      auditFormType + "?gapCategory=SL_GAP&cropCategory=VEG"
    ).then(({ data = {} }) => {
      setFormData(data);
      setDialogMode(DEF_ACTIONS.ADD);
      setOpenCropAreaAddDlg(true);
    });
  };

  const onConfirm = async () => {
    await deleteAuditFormQuestion(formId, deleteItem?.id, uriPath, onSuccess, onError);
    close();
  };

  const close = () => {
    setOpen(false);
  };

  const renderSelectedItems = () => {
    return <p>{deleteItem?.questionString}</p>;
  };

  return (
    <div>
      <CustFormHeader
        saving={saving}
        state={state}
        formName={formHeader}
        isShowAction={false}
      />

      {(dialogMode === null ||
        dialogMode === DEF_ACTIONS.ADD ||
        dialogMode === DEF_ACTIONS.VIEW ||
        dialogMode === DEF_ACTIONS.EDIT) && (
        <DynamicFormGap
          auditFormType={auditFormType}
          afterSave={onSuccess}
          formId={formId}
          gapReqStatus = { gapReqStatus }
          gapData = {gapData}
        />
      )}

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Audit Id</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataListTemplates.length > 0 &&
              dataListTemplates.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.auditId}</TableCell>
                  <TableCell>
                    <PermissionWrapper
                      permission={
                        auditFormType === "INTERNAL_AUDIT"
                          ? `${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.INTERNAL_AUDIT}`
                          : `${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.EXTERNAL_AUDIT}`
                      }
                    >
                      <Button
                        onClick={handleCropAreaAdd(row, DEF_ACTIONS.VIEW, state?.action)}
                        color="success"
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: "10px" }}
                      >
                        VIEW
                      </Button>
                    </PermissionWrapper>
                    <PermissionWrapper
                      permission={
                        auditFormType === "INTERNAL_AUDIT"
                          ? `${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.INTERNAL_AUDIT}`
                          : `${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.EXTERNAL_AUDIT}`
                      }
                    >
                      <Button
                        onClick={handleCropAreaAdd(row, DEF_ACTIONS.EDIT, state?.action)}
                        color="success"
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: "10px" }}
                        disabled={state?.action === DEF_ACTIONS.VIEW}
                        >
                        EDIT
                      </Button>
                    </PermissionWrapper>
                    <PermissionWrapper
                      permission={
                        auditFormType === "INTERNAL_AUDIT"
                          ? `${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.INTERNAL_AUDIT}`
                          : `${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.EXTERNAL_AUDIT}`
                      }
                    >
                      <Button
                        onClick={handleCropAreaDelete(row)}
                        color="success"
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: "10px" }}
                        disabled={state?.action === DEF_ACTIONS.VIEW}
                        >
                        DELETE
                      </Button>
                    </PermissionWrapper>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogBox
        open={open}
        title={`Delete Question`}
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ ml: "8px" }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ ml: "8px" }}
            >
              Close
            </Button>
          </ActionWrapper>
        }
      >
        <>
          <DeleteMsg />
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default DynamicFormListGap;
