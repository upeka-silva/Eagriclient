import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  TextField,
  Chip,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";

import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {
  changeStatus,
  handleAgricultureProject,
  updateAgricultureProject,
} from "../../../redux/actions/extension/agricultureProject/action";
import { TabContent } from "../../../components/TabButtons/TabButtons";
import AddCropDialog from "../../Crop/Crop/AddCropDialog";
import {
  assignCrop,
  deleteCropFromProject,
  get_CropList,
} from "../../../redux/actions/crop/crop/action";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { Add, Delete } from "@mui/icons-material";
import CropList from "../../Crop/Crop/CropList";
import DialogBox from "../../../components/PageLayout/DialogBox";

const AgricultureProjectForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  
  const [saving, setSaving] = useState(false);
  const [projectId, setProjectId] = useState(null);
  
  const [formDataD, setFormDataD] = useState(state?.target || {});
  const [isDataFetch, setIsDataFetch] = useState(true);
  const [cropUrl, setCropUrl] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);
  const [openCropAddDialog, setOpenCropAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectCrop, setSelectCrop] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [pestUrl, setPestUrl] = useState(null);
  
  

  

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/extension/agriculture-project");
  };

  useEffect(() => {
    const projectId = formData.id;
    setCropUrl(`geo-data/crops/${projectId}/crops`);
  });

  const onAddCrop = () => {
    setProjectId(formData?.id);
  
    setFormDataD({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenCropAddDialog(true);
    setIsDataFetch(false);
    setCropUrl(`geo-data/crops/${projectId}/crops`);
  };
  const selectAllCrop = (all = []) => {
    setSelectCrop(all);
  };
  const resetSelectedCrop = () => {
    setSelectCrop([]);
  };
  const handleCropDelete = (prop) => (event) => {
    setDeleteItem(prop);
    setOpen(true);
  };

  const handleCropAdd = async (onSuccess, formDataD, onError) => {
   
    setLoading(true);
    try {
      await assignCrop(projectId, formDataD);
      setLoading(false);
      setOpenCropAddDialog(false);
    } catch (error) {
 
    }
  };
  const onDelete = () => {
    setProjectId(formData.id);
    
    setOpen(true);
  };

  const toggleCropSelect = (component) => {
    setSelectCrop((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };
  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const closeCropAddDialog = () => {
    setFormDataD({});
    setOpenCropAddDialog(false);
  };

  const close = () => {
    setOpen(false);
  };

  const setSubmitted1 = async () => {
    try {
      if (formData?.id) {
        const resValue = await changeStatus(
          formData.id,
          "ONGOING",
          onSuccess,
          onError,
      
        );
        setFormData(resValue);
      }
    } catch (error) {
      
    }
  };

  const setSubmitted2 = async () => {
    try {
      if (formData?.id) {
        const resValue = await changeStatus(
          formData.id,
          "CLOSED",
          onSuccess,
          onError
        );
      }
    } catch (error) {
    
    }
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const crop of selectCrop) {
        await deleteCropFromProject(projectId, crop?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedCrop();
    } catch (error) {
   
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
    }
  };

  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (
      state?.action === DEF_ACTIONS.ADD &&
      Object.keys(formData || {}).length > 0
    ) {
      return true;
    }
    return false;
  };

  const onSuccess = () => {
   

    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateAgricultureProject(formData, onSuccess, onError);
        } else {
          const response = await handleAgricultureProject(
            formData,
            onSuccess,
            onError
          );
          setFormData({
            ...formData,
            id: response?.payload?.id,
          });
        }
      } catch (error) {
  
      }
    }
  };

  return (
    <FormWrapper>
      <PageHeader
        goBack={goBack}
        saving={saving}
        state={state}
        formName="Agriculture Project"
      />
      <FormButtonGroup
        state={state}
        DEF_ACTIONS={DEF_ACTIONS}
        saving={saving}
        enableSave={enableSave}
        handleFormSubmit={handleFormSubmit}
        resetForm={resetForm}
      />
      <Grid
        container
        sx={{
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
          marginTop: "0px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Project Id</FieldName>
            <TextField
              name="projectId"
              id="projectId"
              value={formData?.projectId || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "projectId")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              inputProps={{ style: { textTransform: "uppercase" } }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={8} md={8} lg={8}>
          <FieldWrapper>
            <FieldName>Description</FieldName>
            <TextField
              name="description"
              id="description"
              value={formData?.description || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "description")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
          {formData?.statusType ? (
            <Chip
              label={` ${formData?.statusType}`}
              variant="filled"
              style={{
                position: "absolute",
                top: "100px",
                right: "10px",
                color: "#ffffff",
                backgroundColor: "#2aaf70",
                zIndex: 999, // Ensure the chip is above other content
              }}
            />
          ) : null}

          <div style={{ position: "fixed", top: 110, left: 450 }}>
            {state?.action !== DEF_ACTIONS.VIEW && (
              <>
                <Button
                  onClick={setSubmitted1}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  color="success"
                  variant="outlined"
                  size="small"
                  sx={{ marginLeft: "10px" }}
                >
                  Start
                </Button>
              </>
            )}
          </div>

          <div style={{ position: "fixed", top: 110, left: 520 }}>
            {state?.action !== DEF_ACTIONS.VIEW &&
               (
                <>
                  <Button
                    onClick={setSubmitted2}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    color="success"
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                  >
                    Close
                  </Button>
                </>
              )}
          </div>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Created Date</FieldName>
            <TextField
              name="createdDate"
              id="createdDate"
              value={
                formData?.createdDate
                  ? new Date(formData?.createdDate).toLocaleDateString()
                  : ""
              }
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.ADD ||
                state?.action === DEF_ACTIONS.EDIT ||
                state?.action === DEF_ACTIONS.VIEW
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "createdDate")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Modified Date</FieldName>
            <TextField
              name="modifiedDate"
              id="modifiedDate"
              value={
                formData?.modifiedDate
                  ? new Date(formData?.modifiedDate).toLocaleDateString()
                  : ""
              }
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.ADD ||
                state?.action === DEF_ACTIONS.EDIT ||
                state?.action === DEF_ACTIONS.VIEW
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "modifiedDate")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Created By</FieldName>
            <TextField
              name="createdBy"
              id="createdBy"
              value={`${formData?.createdByUser?.firstName || ""} ${
                formData?.createdByUser?.lastName || ""
              }`}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.ADD ||
                state?.action === DEF_ACTIONS.EDIT ||
                state?.action === DEF_ACTIONS.VIEW
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "createdBy")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Modified By</FieldName>
            <TextField
              name="modifiedBy"
              id="modifiedBy"
              value={`${formData?.modifiedByUser?.firstName || ""} ${
                formData?.modifiedByUser?.lastName || ""
              }`}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.ADD ||
                state?.action === DEF_ACTIONS.EDIT ||
                state?.action === DEF_ACTIONS.VIEW
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "modifiedBy")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
      </Grid>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ActionWrapper isLeft>
              <ButtonGroup
                variant="outlined"
                disableElevation
                size="small"
                aria-label="action button group"
                color="success"
              >
                <Button
                  onClick={onAddCrop}
                  disabled={
                    formData?.id == undefined ||
                    state?.action === DEF_ACTIONS.VIEW
                  }
                >
                  <Add />
                  {DEF_ACTIONS.ADD}
                </Button>

                <AddCropDialog
                  open={openCropAddDialog}
                  setConfirmDialog={setOpenCropAddDialog}
                  confirmAction={handleCropAdd}
                  handleClose={closeCropAddDialog}
                  formId={formDataD?.id}
                  formData={formDataD}
                  mode={dialogMode}
                  projectId={projectId}
                />
                {selectCrop.length > 0 && (
                  <Button onClick={onDelete}>
                    <Delete />
                    {DEF_ACTIONS.DELETE}
                  </Button>
                )}
              </ButtonGroup>
            </ActionWrapper>
          </Grid>
          <Grid item xs={12}>
            {!loading && (
              <CropList
                url={cropUrl}
                dataEndPoint={cropUrl}
                onRowSelect={toggleCropSelect}
                selectedRows={selectCrop}
                selectAll={selectAllCrop}
                unSelectAll={resetSelectedCrop}
                onDelete={handleCropDelete}
                projectId={projectId}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <DialogBox
        open={open}
        title="Delete Crop"
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
      />
    </FormWrapper>
  );
};

export default AgricultureProjectForm;
