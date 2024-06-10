import React, { useState, useEffect } from "react";
import { Button, Divider } from "@mui/material";

import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useSnackBars } from "../../context/SnackBarContext";
import { updateAuditFormQuestions } from "../../redux/actions/auditForm/auditFormQuestions/actions";
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
import DamageTypeList from "./DamageTypeList";
import { useTranslation } from "react-i18next";

const DamageTypes = ({
  dataList = [],
  onFormSaveSuccess = false,
  formId = null,
  formMode = null,
}) => {
  const {t} = useTranslation();
  const { state } = useLocation();
  //eslint-disable-next-line
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [dialogMode, setDialogMode] = useState(null);
  const [openDamageTypeAddDialog, setOpenDamageTypeAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  // eslint-disable-next-line
  const [isDataFetch, setIsDataFetch] = useState(true);
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
      message: t("message.successfullyExecuted"),
    });
    getAllDamageTypes(formId).then((data) => {
      setDamageTypes(data);
      setIsDataFetch(true);
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || t("message.loginFailed"),
    });
  };

  const handleDamageAdd = async (event, data, functionMode) => {
    if (functionMode === DEF_ACTIONS.ADD) {
      setIsDataFetch(false);
      await createDamageType(formId, data, onSuccess, onError);
    } else if (functionMode === DEF_ACTIONS.EDIT) {
      setIsDataFetch(false);
      await updateAuditFormQuestions(formId, data.id, data, onSuccess, onError);
    }
    setOpenDamageTypeAddDialog(false);
  };

  const addDamageType = () => {
    setFormData({});
    console.log({formData});
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
      <CustFormHeader saving={saving} state={state} formName="nav.crop.cropDamages" />
      {((onFormSaveSuccess || formMode === DEF_ACTIONS.ADD) && (
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
      )) ||
        ((onFormSaveSuccess || formMode === DEF_ACTIONS.EDIT) && (
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
        ))}

      {damageTypes ? (
        <DamageTypeList
          data={damageTypes}
          currentFormMode={formMode}
          onEdit={handleDamageTypeAdd}
          onDelete={handleDamageTypeDelete}
        />
      ) : null}

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
        title={t("message.deleteQuestion")}
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ ml: "8px" }}
            >
              {t("action.ok")}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ ml: "8px" }}
            >
              {t("action.cancel")}
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

export default DamageTypes;
