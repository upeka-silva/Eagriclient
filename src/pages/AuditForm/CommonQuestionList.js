import React, { useState, useEffect } from "react";
import {
  Button,
  Divider
} from "@mui/material";

import AddQuestionDialog from "./AddQuestionDialog";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useSnackBars } from "../../context/SnackBarContext";
import {
  getQuestionsByFormId,
  handleAuditFormQuestions,
  updateAuditFormQuestions,
  deleteAuditFormQuestion,
} from "../../redux/actions/auditForm/auditFormQuestions/actions";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import DialogBox from "../../components/PageLayout/DialogBox";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import { useLocation } from "react-router-dom";
import CommonQuestionListGrid from "./CommonQuestionListGrid";

const CommonQuestionList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  dataList = [],
  onFormSaveSuccess = false,
  formId = null,
  formMode = null,
}) => {
  const { state } = useLocation();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [dataListQuestions, setDataListQuestions] = useState([]);
  const [dialogMode, setDialogMode] = useState(null);
  const [openCropAreaAddDlg, setOpenCropAreaAddDlg] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const { addSnackBar } = useSnackBars();

  useEffect(() => {
    setDataListQuestions(dataList);
  }, [dataList]);

  const handleCropAreaAdd = (prop, mode) => (event) => {
    setFormData({});
    setFormData(prop);
    setDialogMode(mode);
    setOpenCropAreaAddDlg(true);
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

    getQuestionsByFormId(formId).then(({ dataList = [] }) => {
      setDataListQuestions(dataList);
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };

  const handle = async (event, data, functionMode) => {
    if (functionMode === DEF_ACTIONS.ADD) {
      await handleAuditFormQuestions(formId, data, onSuccess, onError);
    } else if (functionMode === DEF_ACTIONS.EDIT) {
      await updateAuditFormQuestions(formId, data, onSuccess, onError);
    }
    setOpenCropAreaAddDlg(false);
  };

  const addQ = () => {
    setFormData({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenCropAreaAddDlg(true);
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

  return (
    <div>
      <CustFormHeader
        saving={saving}
        state={state}
        formName="Form Questions"
      />
      {(onFormSaveSuccess || formMode === DEF_ACTIONS.EDIT) && (
        <Button
          onClick={() => addQ()}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginBottom: "10px" }}
        >
          ADD Questions
        </Button>
      )}

      <CommonQuestionListGrid data={dataListQuestions} 
      currentFormMode ={formMode}
      onEdit={handleCropAreaAdd} 
      onDelete={handleCropAreaDelete}/>

      <AddQuestionDialog
        open={openCropAreaAddDlg}
        setConfirmDialog={setOpenCropAreaAddDlg}
        // setConfirmDialog={setOpenDlg}
        confirmAction={handle}
        handleClose={closeAddCropArea}
        formData={formData}
        mode={dialogMode}
      />
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
              Ok
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ ml: "8px" }}
            >
              Cancel
            </Button>
          </ActionWrapper>
        }
      >
        <>
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default CommonQuestionList;
