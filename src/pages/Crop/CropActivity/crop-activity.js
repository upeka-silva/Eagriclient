import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { useSnackBars } from "../../../context/SnackBarContext";

import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import DialogBox from "../../../components/PageLayout/DialogBox";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import { Add } from "@mui/icons-material";
import AddCropActivityDialog from "./add-crop-activity-dialog";
import { createCropActivity, deleteCropActivity, getAllCropActivity, updateCropActivity } from "../../../redux/actions/crop/cropActivity/action";
import { isEmpty } from "../../../utils/helpers/stringUtils";

const CropActivity = () => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [dialogMode, setDialogMode] = useState(null);
  const [openCropActivityAddDialog, setOpenCropActivityAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDataFetch, setIsDataFetch] = useState(true);
  const { addSnackBar } = useSnackBars();

  const [cropActivities, setCropActivities] = useState([]);
  const [formMode, setFormMode] = useState(true);

  useEffect(() => {
    setIsDataFetch(false);
    getAllCropActivity().then((data) => {
      setCropActivities(data);
      setIsDataFetch(true);
    });
    setFormMode(DEF_ACTIONS.ADD);
  }, []);

  const handleCropActivityAdd = (prop, mode) => (event) => {
    setFormData({});
    setFormData(prop);
    setDialogMode(mode);
    setOpenCropActivityAddDialog(true);
  };

  const handleCropActivityDelete = (prop) => (event) => {
    setDeleteItem(prop);
    setOpen(true);
  };

  const closeDamageAddDialog = () => {
    setFormData({});
    setOpenCropActivityAddDialog(false);
  };

  const handleDamageAdd = async (event, data, functionMode) => {
    if (isEmpty(data.name)) {
      addSnackBar({
        type: SnackBarTypes.error,
        message: "Name must have a value",
      });
      return;
    }
    if (isEmpty(data.description)) {
      addSnackBar({
        type: SnackBarTypes.error,
        message: "Description must have a value",
      });
      return;
    }
    if (functionMode === DEF_ACTIONS.ADD) {
      setIsDataFetch(false);
      await createCropActivity(data, onSuccess, onError);
    } else if (functionMode === DEF_ACTIONS.EDIT) {
      setIsDataFetch(false);
      await updateCropActivity(data.id, data, onSuccess, onError);
    }
    setOpenCropActivityAddDialog(false);
  };

  const onSuccess = async (response) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully executed !!!",
    });
    getAllCropActivity().then((data) => {
      setCropActivities(data);
      setIsDataFetch(true);
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };

  const addCropAction = () => {
    setFormData({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenCropActivityAddDialog(true);
  };

  const onConfirm = async () => {
    await deleteCropActivity(deleteItem?.id, onSuccess, onError);
    close();
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <div>
      <CustFormHeader saving={saving} state={{action:'Add'}} formName="Crop Activity" />
      <Button
        disabled={false}
        onClick={() => addCropAction()}
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
            {Array.isArray(cropActivities) && isDataFetch && cropActivities.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={handleCropActivityAdd(row, DEF_ACTIONS.EDIT)}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                    disabled={formMode === DEF_ACTIONS.VIEW}
                  >
                    EDIT
                  </Button>
                  <Button
                    onClick={handleCropActivityDelete(row)}
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

      <AddCropActivityDialog
        open={openCropActivityAddDialog}
        setConfirmDialog={setOpenCropActivityAddDialog}
        // setConfirmDialog={setOpenDlg}
        confirmAction={handleDamageAdd}
        handleClose={closeDamageAddDialog}
        formData={formData}
        mode={dialogMode}
      />
      <DialogBox
        open={open}
        title={`Delete Crop Activity`}
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ mr: "12px" }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ mr: "8px" }}
            >
              Cancel
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

export default CropActivity;