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
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { useSnackBars } from "../../../context/SnackBarContext";

import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import DialogBox from "../../../components/PageLayout/DialogBox";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import { Add } from "@mui/icons-material";
import AddCropActivityDialog from "./add-crop-activity-dialog";
import {
  createCropActivity,
  deleteCropActivity,
  getAllCropActivity,
  updateCropActivity,
} from "../../../redux/actions/crop/cropActivity/action";
import { isEmpty } from "../../../utils/helpers/stringUtils";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";

const CropActivity = () => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [dialogMode, setDialogMode] = useState(null);
  const [openCropActivityAddDialog, setOpenCropActivityAddDialog] =
    useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDataFetch, setIsDataFetch] = useState(true);
  const { addSnackBar } = useSnackBars();

  const [cropActivities, setCropActivities] = useState([]);
  const [formMode, setFormMode] = useState(true);

  const [loading, setLoading] = useState(false);
  const [dialogSelectedCropActivity, setDialogSelectedCropActivity] = useState(
    []
  );

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
      <CustFormHeader
        saving={saving}
        state={{ action: "Add" }}
        formName="Crop Activity"
      />
      <PermissionWrapper
        permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_ACTIVITY}`}
      >
        <Button
          onClick={() => addCropAction()}
          color="success"
          variant="outlined"
          size="small"
          sx={{ marginTop: "20px" }}
        >
          <Add />
          {DEF_ACTIONS.ADD}
        </Button>
      </PermissionWrapper>

      {/* )} */}

      <TableContainer sx={{ marginTop: "15px" }}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="Audit Question Table"
          variant="variant"
        >
          <TableHead sx={{ backgroundColor: "#40a845", height: "40px" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff", fontSize: "13px" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontSize: "13px" }}>
                Activity Description
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontSize: "13px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(cropActivities) &&
              isDataFetch &&
              cropActivities.map((row, index) => (
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
      {/* <DialogBox
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
      </DialogBox> */}
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={cropActivities}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedCropActivity}
        dialogSelectedTypes={dialogSelectedCropActivity}
        propertyId="soilTypeCode"
        propertyDescription="description"
      />
    </div>
  );
};

export default CropActivity;
