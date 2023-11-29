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
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useSnackBars } from "../../context/SnackBarContext";
import { deleteAuditFormQuestion } from "../../redux/actions/auditForm/auditFormQuestions/actions";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import DialogBox from "../../components/PageLayout/DialogBox";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicFormDialogFarmLand from "./DynamicFormDialogFarmLand";
import {
  getFormTemplateByType,
  getFormTemplatesByFormLandId,
  saveFormDataWithValues,
  updateFormDataWithValues,
} from "../../redux/actions/auditForm/action";
import DynamicFormFarmLand from "./DynamicFormFarmLand";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DynamicFormListFarmLand = ({
  formId ,
  formMode = null,
  auditFormType = "",
  stateData = {},
}) => {

  const navigate = useNavigate();

  const { state } = useLocation();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [dataListTemplates, setDataListTemplates] = useState([]);
  const [dialogMode, setDialogMode] = useState(null);
  const [openCropAreaAddDlg, setOpenCropAreaAddDlg] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const { addSnackBar } = useSnackBars();

  const dateAdapter = new AdapterDayjs();
  
  let uriPath = "";
  let formHeader = "";

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
    getFormTemplatesByFormLandId(formId, uriPath).then(({ data = [] }) => {
      setDataListTemplates(data);
    });
  }, []);

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

    getFormTemplatesByFormLandId(formId, uriPath).then(({ data = [] }) => {
      setDataListTemplates(data);
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };

  const handle = async (event, data, functionMode) => {
    const answerList = [];
    const keysArray = Object.keys(data);

    for (const qKey of keysArray) {
      if (qKey.indexOf("answer_") !== -1) {
        const parts = qKey.split("_");
        const questionId = parts[1];
        const answer = data[qKey];
        answerList.push({
          question: {
            id: questionId,
          },
          answer: answer,
        });
      }
    }

    const saveData = {
      assessmentId: data.assessmentId,
      farmLand: {
        id: formId, // TODO
      },
      answerList: answerList,
    };

    setSaving(true);
    try {
      if (functionMode === DEF_ACTIONS.ADD) {
        await saveFormDataWithValues(formId, uriPath, saveData, onSuccess, onError);
      } else if (functionMode === DEF_ACTIONS.EDIT) {
        await updateFormDataWithValues(
          data.id,
          formId,
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
    getFormTemplateByType(auditFormType).then(({ data = {} }) => {
      setFormData(data);
      setDialogMode(DEF_ACTIONS.ADD);
      setOpenCropAreaAddDlg(true);
    });
  };

  const onConfirm = async () => {
    await deleteAuditFormQuestion(formId, deleteItem?.id, onSuccess, onError);
    close();
  };

  const close = () => {
    setOpen(false);
  };

  const renderSelectedItems = () => {
    return <p>{deleteItem?.questionString}</p>;
  };

  const viewAssessmentForm = (action, row) => {
    if (auditFormType === "SELF_ASSESSMENT") {
      navigate("/farm-land-form/self-assessment", {
        state: {
          auditFormType: auditFormType,
          action: action,
          formId: formId,
          stateData: stateData,
          data: row,
        },
      });
    } else if (auditFormType === "BASIC_ASSESSMENT") {
      navigate("/farm-land-form/basic-assessment", {
        state: {
          auditFormType: auditFormType,
          action: action,
          formId: formId,
          stateData: stateData,
          data: row,
        },
      });
    }
  };

  return (
    <div>
      <CustFormHeader
        isShowAction={false}
        saving={saving}
        state={state}
        formName= {formHeader}
      />

      {(dialogMode === null || dialogMode === DEF_ACTIONS.ADD) && (
        <DynamicFormFarmLand
          auditFormType={auditFormType}
          afterSave={onSuccess}
          formId={formId}
          stateData={stateData}
        />
      )}

      {(dialogMode === DEF_ACTIONS.VIEW || dialogMode === DEF_ACTIONS.EDIT) && (
        <DynamicFormDialogFarmLand
          open={openCropAreaAddDlg}
          setConfirmDialog={setOpenCropAreaAddDlg}
          confirmAction={handle}
          handleClose={closeAddCropArea}
          formData={formData}
          mode={dialogMode}
          addView={addQ}
        />
      )}

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Assessment Name</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataListTemplates.length > 0 &&
              dataListTemplates.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.assessmentId}</TableCell>
                  <TableCell>{row.createdAt ? dateAdapter.date(state?.target?.dob).format('YYYY-MM-DD') : null}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => viewAssessmentForm(DEF_ACTIONS.VIEW, row)}
                      color="success"
                      variant="contained"
                      size="small"
                      sx={{ marginLeft: "10px" }}
                    >
                      VIEW
                    </Button>
                    <Button
                      disabled={formMode === DEF_ACTIONS.VIEW}
                      onClick={() => viewAssessmentForm(DEF_ACTIONS.EDIT, row)}
                      color="success"
                      variant="contained"
                      size="small"
                      sx={{ marginLeft: "10px" }}
                    >
                      EDIT
                    </Button>
                    <Button
                      disabled={formMode === DEF_ACTIONS.VIEW}
                      onClick={handleCropAreaDelete(row)}
                      color="success"
                      variant="contained"
                      size="small"
                      sx={{ marginLeft: "10px" }}
                    >
                      DELETE
                    </Button>
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

export default DynamicFormListFarmLand;
