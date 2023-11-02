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

import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useSnackBars } from "../../context/SnackBarContext";
import {
  getQuestionsByFormId,
  updateAuditFormQuestions,
  deleteAuditFormQuestion,
} from "../../redux/actions/auditForm/auditFormQuestions/actions";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import DialogBox from "../../components/PageLayout/DialogBox";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import { useLocation } from "react-router-dom";
import AddDamageTypeDialog from "./AddDamageTypeDialog";
import {
  createDamageType,
  deleteDamageType,
  getAllDamageTypes,
} from "../../redux/actions/crop/cropDamage/action";
import { Add } from "@mui/icons-material";

const DamageTypes = ({
  dataList = [],
  onFormSaveSuccess = false,
  formId = null,
  formMode = null,
}) => {
  const { state } = useLocation();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [dialogMode, setDialogMode] = useState(null);
  const [openDamageTypeAddDialog, setOpenDamageTypeAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const { addSnackBar } = useSnackBars();

  const [damageTypes, setDamageTypes] = useState([]);

  useEffect(() => {
    setDamageTypes(dataList);
  }, [dataList]);

  const handleDamageTypeAdd = (prop, mode) => (event) => {
    setFormData({});
    setFormData(prop);
    setDialogMode(mode);
    setOpenDamageTypeAddDialog(true);
  };

  const handleDamageTypeDelete = (prop) => (event) => {
    setDeleteItem(prop);
    setOpen(true);
  };

  const closeDamageAddDialog = () => {
    setFormData({});
    setOpenDamageTypeAddDialog(false);
  };

  const onSuccess = async (response) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully executed !!!",
    });

    getAllDamageTypes(formId).then(({ dataList = [] }) => {
      setDamageTypes(dataList);
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };

  const handleDamageAdd = async (event, data, functionMode) => {
    if (functionMode === DEF_ACTIONS.ADD) {
      await createDamageType(formId, data, onSuccess, onError);
    } else if (functionMode === DEF_ACTIONS.EDIT) {
      await updateAuditFormQuestions(formId, data.id, data, onSuccess, onError);
    }
    setOpenDamageTypeAddDialog(false);
  };

  const addDamageType = () => {
    setFormData({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenDamageTypeAddDialog(true);
  };

  const onConfirm = async () => {
    await deleteDamageType(formId, deleteItem?.id, onSuccess, onError);
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
      <CustFormHeader saving={saving} state={state} formName="Damage Types" />
      {/* {(onFormSaveSuccess || formMode === DEF_ACTIONS.EDIT) && ( */}
      <Button
        disabled={!formId}
        onClick={() => addDamageType()}
        color="success"
        variant="contained"
        size="small"
        sx={{ marginBottom: "15px", marginTop: "20px" }}
      >
        <Add />
      </Button>
      {/* )} */}

      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="Audit Question Table"
          variant="variant"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {damageTypes && damageTypes.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={handleDamageTypeAdd(row, DEF_ACTIONS.EDIT)}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                    disabled={formMode === DEF_ACTIONS.VIEW}
                  >
                    EDIT
                  </Button>
                  <Button
                    onClick={handleDamageTypeDelete(row)}
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

      <AddDamageTypeDialog
        open={openDamageTypeAddDialog}
        setConfirmDialog={setOpenDamageTypeAddDialog}
        // setConfirmDialog={setOpenDlg}
        confirmAction={handleDamageAdd}
        handleClose={closeDamageAddDialog}
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

export default DamageTypes;
