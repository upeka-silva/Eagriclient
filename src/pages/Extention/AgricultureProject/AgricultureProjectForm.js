import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  TextField,
  Chip,
  Divider,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
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
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
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
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import CropList from "../../Crop/Crop/CropList";
import DialogBox from "../../../components/PageLayout/DialogBox";
// import {
//   TabButton,
//   TabWrapper,
// } from "../../components/TabButtons/TabButtons";

import { TabButton } from "../../../components/TabButtons/TabButtons";
import { TabWrapper } from "../../../components/TabButtons/TabButtons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProjectActivityList from "./ProjectActivity/ProjectActivityList";
import ProjectActivityForm from "./ProjectActivity/ProjectActivityForm";
import { deleteProjectActivity, get_ActivityListByProjectId } from "../../../redux/actions/extension/agricultureProject/ProjectActivity/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";

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
  // const [openActivity, setOpenActivity] = useState(false);
  const [openDeleteActivity, setOpenDeleteActivity] = useState(false);
  const [openActivity, setOpenActivity] = useState(false);
  const [activityData, setActivityData] = useState();
  const [selectedActivity, setSelectedActivity] = useState([]);
  console.log({selectedActivity})
  const [activityDataList, setActivityDataList] = useState([]);
  console.log({ activityDataList });
  const [activityAction, setActivityAction] = useState(DEF_ACTIONS.ADD);
  const [tabEnabled, setTabEnabled] = useState(state?.target?.id !== undefined);
  // const [ActivityDataList, setActivityDataList] = useState([]);
  const [selectedProjectActivity, setSelectedProjectActivity] = useState([]);
  // const [fLOAction, setFlOAction] = useState(DEF_ACTIONS.ADD);
  const [toggleState, setToggleState] = useState(1);
  const dateAdapter = new AdapterDayjs();
  const [refreshActivity, setRefreshActivity] = useState(true);
  

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/extension/agriculture-project");
  };
  const onCreateActivityData = () => {
    setOpenActivity(true);
  };

  const onEditActivityData = () => {
    const data = activityDataList.filter(
      (item) => item?.id === selectedProjectActivity[0]
    );
    console.log(data[0]);
    const dateFrom = dateAdapter.date(data[0].dateFrom);
    const dateUntil = dateAdapter.date(data[0].dateUntil);

    setActivityAction(DEF_ACTIONS.EDIT);
    setActivityData({ ...data[0], dateFrom: dateFrom, dateUntil: dateUntil });
    setOpenActivity(true);
  };
  const onDeleteActivityData = () => {
    setOpenDeleteActivity(true);
    //setOpenFlO(true);
  };
  const closeActivity = () => {
    setOpenActivity(false);
  };
  const handleFlOData = (value, target) => {
    setActivityData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const onViewActivityData = () => {
    const data = activityDataList;

    console.log("ggs", data[0]);

    setActivityAction(DEF_ACTIONS.VIEW);
    setActivityData({ ...data[0] });
    setOpenActivity(true);
  };

  const toggleActivitySelect = (component) => {
    console.log({component});
    setSelectedProjectActivity(component);
  };
  const resetData = () => {
    setActivityData({});
  };
  const refreshActivityList = () => {
    setRefreshActivity(!refreshActivity);
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
    } catch (error) {}
  };
  const onDelete = () => {
    setProjectId(formData.id);

    setOpen(true);
  };

  const closeActivityDelete = () => {
    setOpenDeleteActivity(false);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedProjectActivity.map((p, key) => {
          console.log(p);
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {p.actionId} - {p.description}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
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

  const resetSelectedActivity = () => {
    setSelectedProjectActivity([]);
    refreshActivityList();
  };


  const onConfirmDeleteActivity = async () => {
    try {
      setLoading(true);
      for (const id of selectedProjectActivity) {
        await deleteProjectActivity(id, onSuccessDelete, onError);
      }
      setLoading(false);
      closeActivityDelete();
      resetSelectedActivity();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Deleted`,
    });
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    formData?.id &&
      get_ActivityListByProjectId(formData?.id).then(({ dataList = [] }) => {
        console.log(dataList);
        setActivityDataList(dataList);
      });
  }, [refreshActivity]);

  const setSubmitted1 = async () => {
    try {
      if (formData?.id) {
        const resValue = await changeStatus(
          formData.id,
          "ONGOING",
          onSuccess,
          onError
        );
        setFormData(resValue);
      }
    } catch (error) {}
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
    } catch (error) {}
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
          setTabEnabled(true);
        }
      } catch (error) {}
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
            {state?.action !== DEF_ACTIONS.VIEW && (
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

      <TabWrapper>
        <TabButton
          variant="contained"
          className={toggleState === 1 ? "active-tabs" : ""}
          onClick={() => toggleTab(1)}
        >
          Crops
        </TabButton>
        <TabButton
          variant="contained"
          className={toggleState === 2 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
          disabled={!tabEnabled}
        >
          Activity
        </TabButton>

        {/* <TabButton
          variant="contained"
          className={toggleState === 4 ? "active-tabs" : ""}
          onClick={() => toggleTab(4)}
          disabled={!tabEnabled}
        >
          
        </TabButton>

        <TabButton
          variant="contained"
          className={toggleState === 5 ? "active-tabs" : ""}
          onClick={() => toggleTab(5)}
          disabled={!tabEnabled}
        >
          
        </TabButton> */}
      </TabWrapper>

      <TabContent className={toggleState === 1 ? "active-content" : ""}>
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
                formData?.id == undefined || state?.action === DEF_ACTIONS.VIEW
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

        {loading === false && (
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
      </TabContent>

      <TabContent className={toggleState === 2 ? "active-content" : ""}>
        <ActionWrapper isLeft>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <Button onClick={onCreateActivityData}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>

            {selectedProjectActivity.length === 1 && (
              <Button onClick={onEditActivityData}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            )}

            {selectedProjectActivity.length === 1 && (
              <Button onClick={onViewActivityData}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            )}

            {selectedProjectActivity.length > 0 && (
              <Button onClick={onDeleteActivityData}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            )}
          </ButtonGroup>
        </ActionWrapper>

        <ProjectActivityForm
          open={openActivity}
          ProjectActivityData={formData}
          setOpenActivity={setOpenActivity}
          action={activityAction}
          onClose={closeActivity}
          // farmLandData={formData}
          data={activityData}
          onChange={handleFlOData}
          resetData={resetData}
          refresh={refreshActivityList}
        />

        <ProjectActivityList
          onRowSelect={toggleActivitySelect}
          data={activityDataList}
        />
      </TabContent>
      <Box>
        <DialogBox
          open={openDeleteActivity}
          title="Delete Project Activity"
          actions={
            <ActionWrapper>
              <Button
                variant="contained"
                color="info"
                onClick={ onConfirmDeleteActivity}
                sx={{ ml: "8px" }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={closeActivityDelete}
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
      </Box>

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
