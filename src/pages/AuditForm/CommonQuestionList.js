import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
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
        formName="Audit Form Questions"
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

      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="Audit Question Table"
          variant="variant"
        >
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Question Type</TableCell>
              <TableCell>Complience Group</TableCell>
              <TableCell>Item Group</TableCell>
              <TableCell>Proof Doc Req.</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataListQuestions.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell>{row.questionString}</TableCell>
                <TableCell>{row.questionTypeLabel}</TableCell>
                <TableCell>{row.complianceGroupLabel}</TableCell>
                <TableCell>{row.itemGroupDescription}</TableCell>
                <TableCell>
                  <Switch
                    color="success"
                    checked={row.proofRequired}
                  />
                </TableCell>
                <TableCell>{row.order}</TableCell>
                <TableCell>
                  <Button
                    onClick={handleCropAreaAdd(row, DEF_ACTIONS.VIEW)}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                  >
                    VIEW
                  </Button>
                  <Button
                    onClick={handleCropAreaAdd(row, DEF_ACTIONS.EDIT)}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                    disabled={formMode === DEF_ACTIONS.VIEW}
                  >
                    EDIT
                  </Button>
                  <Button
                    onClick={handleCropAreaDelete(row)}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                    disabled={formMode === DEF_ACTIONS.VIEW}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default CommonQuestionList;
