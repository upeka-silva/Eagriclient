import React, { useState, useEffect } from "react";
import {Button, CircularProgress} from "@mui/material";

import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  getQuestionsByFormId,
  updateAuditFormQuestions,
  deleteAuditFormQuestion,
} from "../../../redux/actions/auditForm/auditFormQuestions/actions";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import DialogBox from "../../../components/PageLayout/DialogBox";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import { useLocation } from "react-router-dom";
import {
  createDamageType,
  deleteDamageType,
  getAllDamageTypes,
} from "../../../redux/actions/crop/cropDamage/action";
import { Add } from "@mui/icons-material";
import AddCalendarActivityDialog from "./AddCalendarActivityDialog";
import {
  createCalendarActivity,
  deleteCalendarActivity,
  getAllCalendarActivities,
  updateCalendarActivity,
} from "../../../redux/actions/crop/cropCalendar/action";
import CalendarActivityList from "./CalendarActivityList";

const CalendarActivity = ({
  dataList = [],
  onFormSaveSuccess = false,
  formId = null,
  formMode = null,
}) => {
  const { state } = useLocation();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [dialogMode, setDialogMode] = useState(null);
  const [openCropActivityAddDialog, setOpenCropActivityAddDialog] =
    useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDataFetch, setIsDataFetch] = useState(true);
  const { addSnackBar } = useSnackBars();

  const [calendarActivities, setCalendarActivities] = useState(dataList);

  // useEffect(() => {
  //   setCalendarActivities(dataList);
  // }, [dataList]);

  const handleDamageTypeAdd = (prop, mode) => (event) => {
    setFormData({});
    setFormData(prop);
    setDialogMode(mode);
    setOpenCropActivityAddDialog(true);
  };    

  const handleCalendarActivityDelete = (prop) => (event) => {
    setDeleteItem(prop);
    setOpen(true);
  };

  const closeCalendarActivityDialog = () => {
    setFormData({});
    setOpenCropActivityAddDialog(false);
  };

  const onSuccess = async (response) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully executed !!!",
    });
    getAllCalendarActivities(formId).then((data) => {
      setCalendarActivities(...dataList, data);
      setIsDataFetch(true);
      // console.log("calendar activities: ",setCalendarActivities(data));
      console.log("data i entered: ",data);
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };

  const handleCalendarActivityAdd = async (event, data, functionMode) => {
    if (functionMode === DEF_ACTIONS.ADD) {
      setIsDataFetch(false);
      const response = await createCalendarActivity(formId, data, onSuccess, onError);
      console.log("form ID: ",formId,data);
      console.log("form response: ",response);
      // setCalendarActivities(...calendarActivities, response);
      console.log("datalist", dataList);
    } else if (functionMode === DEF_ACTIONS.EDIT) {
      setIsDataFetch(false);
      await updateCalendarActivity(data.id, data, onSuccess, onError);
      console.log("form ID: ",formId,data);
    }
    setOpenCropActivityAddDialog(false);
  };

  const addDamageType = () => {
    setFormData({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenCropActivityAddDialog(true);
  };

  const onConfirm = async () => {
    await deleteCalendarActivity(deleteItem?.id, onSuccess, onError);
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
        formName="Crop Activities"
      />
      {((onFormSaveSuccess || formMode === DEF_ACTIONS.ADD) && (
        <Button
          disabled={!onFormSaveSuccess}
          onClick={() => addDamageType()}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginBottom: "15px", marginTop: "20px" }}
        >
          <Add />
        </Button>
      )) || ((onFormSaveSuccess || formMode === DEF_ACTIONS.EDIT) && (
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

      <AddCalendarActivityDialog
        open={openCropActivityAddDialog}
        setConfirmDialog={setOpenCropActivityAddDialog}
        // setConfirmDialog={setOpenDlg}
        confirmAction={handleCalendarActivityAdd}
        handleClose={closeCalendarActivityDialog}
        formId={formData?.id}
        formData={formData}
        mode={dialogMode}
      />

      {
        isDataFetch ?
        <CalendarActivityList 
        data={calendarActivities} 
        currentFormMode ={formMode}
        onEdit={handleDamageTypeAdd} 
        onDelete={handleCalendarActivityDelete}
      /> :
        <CircularProgress/>
      }
      
      <DialogBox
        open={open}
        title={`Delete Calendar Activity`}
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
        </>
      </DialogBox>
    </div>
  );  
};

export default CalendarActivity;

