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

  const [calendarActivities, setcalendarActivities] = useState([]);

  useEffect(() => {
    setcalendarActivities(dataList);
  }, [dataList]);

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
      setcalendarActivities(data);
      setIsDataFetch(true);
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
      await createCalendarActivity(formId, data, onSuccess, onError);
    } else if (functionMode === DEF_ACTIONS.EDIT) {
      setIsDataFetch(false);
      await updateCalendarActivity(data.id, data, onSuccess, onError);
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
      {(onFormSaveSuccess || formMode === DEF_ACTIONS.EDIT) && (
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
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Duration Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calendarActivities &&
              isDataFetch &&
              calendarActivities.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row?.cropActivity?.name}</TableCell>
                  <TableCell>{row?.cropActivity?.description}</TableCell>
                  <TableCell>{row?.cost}</TableCell>
                  <TableCell>{row?.duration}</TableCell>
                  <TableCell>{row?.durationType}</TableCell>
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
                      onClick={handleCalendarActivityDelete(row)}
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

      <AddCalendarActivityDialog
        open={openCropActivityAddDialog}
        setConfirmDialog={setOpenCropActivityAddDialog}
        // setConfirmDialog={setOpenDlg}
        confirmAction={handleCalendarActivityAdd}
        handleClose={closeCalendarActivityDialog}
        formData={formData}
        mode={dialogMode}
      />
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
