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
  ListItemText,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";

import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
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
import { TabButton } from "../../../components/TabButtons/TabButtons";
import { TabWrapper } from "../../../components/TabButtons/TabButtons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProjectActivityList from "./ProjectActivity/ProjectActivityList";
import ProjectActivityForm from "./ProjectActivity/ProjectActivityForm";
import {
  deleteProjectActivity,
  get_ActivityByActivityId,
  get_ActivityListByProjectId,
} from "../../../redux/actions/extension/agricultureProject/ProjectActivity/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import ProjectSubActivityForm from "./projectSubActivity/projectSubActivityForm";
import ProjectSubActivityList from "./projectSubActivity/ProjectSubActivityList";
import {
  deleteProjectSubActivity,
  get_SubActivityByActivityId,
} from "../../../redux/actions/extension/agricultureProject/ProjectSubActivity/action";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { Colors } from "../../../utils/constants/Colors";
import { get_ProvinceList } from "../../../redux/actions/province/action";
import ProjectIndicatorForm from "./ProjectIndicator/ProjectIndicatorForm";
import ProjectIndicatorList from "./ProjectIndicator/ProjectIndicatorList";
import { deleteProjectIndicator } from "../../../redux/actions/extension/agricultureProject/projectIndicator/action";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";

const AgricultureProjectForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  console.log({ formData });

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


  //delete handlers
  const [openDeleteActivity, setOpenDeleteActivity] = useState(false);
  const [openDeleteSubActivity, setOpenDeleteSubActivity] = useState(false);
  const [openDeleteIndicator, setOpenDeleteIndicator] = useState(false);

  //set delete dialog box handlers
  const [dialogSelectedSubActivityTypes, setDialogSelectedSubActivityTypes] =
    useState([]);
  const [dialogSelectedIndicatorTypes, setDialogSelectedIndicatorTypes] =
    useState([]);

  //open a dialog box for activity
  const [openActivity, setOpenActivity] = useState(false);
  const [openSubActivity, setOpenSubActivity] = useState(false);
  const [openIndicator, setOpenIndicator] = useState(false);
  console.log({ openIndicator });

  //set data
  const [activityData, setActivityData] = useState();
  const [subActivityData, setSubActivityData] = useState();
  const [indicatorData, setIndicatorData] = useState();

  console.log({ subActivityData });
  const [selectedActivity, setSelectedActivity] = useState([]);
  console.log({ selectedActivity });
  const [activityDataList, setActivityDataList] = useState([]);
  const [subActivityDataList, setSubActivityDataList] = useState([]);
  console.log({ subActivityDataList });
  const [selectActivityData, setSelectActivityData] = useState([]);
  console.log({ selectActivityData });
  console.log({ activityDataList });

  //set actions
  const [activityAction, setActivityAction] = useState(DEF_ACTIONS.ADD);
  const [subactivityAction, setSubActivityAction] = useState(DEF_ACTIONS.ADD);
  const [indicatorAction, setIndicatorAction] = useState(DEF_ACTIONS.ADD);

  const [tabEnabled, setTabEnabled] = useState(state?.target?.id !== undefined);

  //selected useStates
  const [selectedProjectActivity, setSelectedProjectActivity] = useState([]);
  const [selectedProjectSubActivity, setSelectProjectedSubActivity] = useState(
    []
  );
  const [selectedSubActivityAllData, setSelectedSubActivityAllData] = useState(
    []
  );
  const [selectedIndicatorAllData, setSelectedIndicatorAllData] = useState([]);

  console.log({ selectedIndicatorAllData });

  console.log({ selectedSubActivityAllData });
  // const [fLOAction, setFlOAction] = useState(DEF_ACTIONS.ADD);
  const [toggleState, setToggleState] = useState(1);
  const dateAdapter = new AdapterDayjs();
  const [refreshActivity, setRefreshActivity] = useState(true);
  const [refreshSubActivity, setRefreshSubActivity] = useState(true);
  const [refreshIndicator, setRefreshIndicator] = useState(true);

  const [provinceList, setProvinceList] = useState([]);
  console.log({ provinceList });

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/extension/create-project");
  };
  const onCreateActivityData = () => {
    setOpenActivity(true);
  };

  const onCreateSubActivityData = () => {
    setOpenSubActivity(true);
    setSubActivityData([]);
    setSubActivityAction(DEF_ACTIONS.ADD);
  };

  const onCreateIndicatorData = () => {
    setOpenIndicator(true);
    setIndicatorData([]);
    setIndicatorAction(DEF_ACTIONS.ADD);
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

  //delete functions
  const onDeleteSubActivityData = () => {
    setOpenDeleteSubActivity(true);
    setDialogSelectedSubActivityTypes(selectedSubActivityAllData);
  };

  const onDeleteIndicatorData = () => {
    setOpenDeleteIndicator(true);
    setDialogSelectedIndicatorTypes(selectedIndicatorAllData);
  };

  //close dialog boxes
  const closeActivity = () => {
    setOpenActivity(false);
  };
  const closeSubActivity = () => {
    setOpenSubActivity(false);
  };

  const closeIndicator = () => {
    setOpenIndicator(false);
  };

  const onEditSubActivityData = () => {
    setSubActivityData(selectedSubActivityAllData[0]);

    setSubActivityAction(DEF_ACTIONS.EDIT);
    //setSubActivityData({ ...data[0], dateFrom: dateFrom, dateUntil: dateUntil });
    setOpenSubActivity(true);
  };

  const onEditIndicatorData = () => {
    setIndicatorData(selectedIndicatorAllData[0]);

    setIndicatorAction(DEF_ACTIONS.EDIT);
    //setSubActivityData({ ...data[0], dateFrom: dateFrom, dateUntil: dateUntil });
    setOpenIndicator(true);
  };

  const handleFlOData = (value, target) => {
    setActivityData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const handleSubActivityData = (value, target) => {
    setSubActivityData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const handleIndicatorData = (value, target) => {
    setIndicatorData((current = {}) => {
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

  const onViewSubActivityData = () => {
    setSubActivityData(selectedSubActivityAllData[0]);
    setSubActivityAction(DEF_ACTIONS.VIEW);

    setOpenSubActivity(true);
  };

  const onViewIndicatorData = () => {
    setIndicatorData(selectedIndicatorAllData[0]);
    setIndicatorAction(DEF_ACTIONS.VIEW);

    setOpenIndicator(true);
  };

  const toggleActivitySelect = (component) => {
    console.log({ component });
    setSelectedProjectActivity(component);
  };
  const resetData = () => {
    setActivityData({});
  };

  //toggle functions
  const toggleSubActivitySelect = (component) => {
    console.log({ component });
    const selectedIndex = selectedSubActivityAllData.findIndex(
      (selected) => selected.id === component.id
    );

    let newSelected = [...selectedSubActivityAllData];

    if (selectedIndex === -1) {
      newSelected.push(component);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedSubActivityAllData(newSelected);
  };

  //active sub activity
  const activeSubActivity = () => {
    setToggleState(2);

    //set activity data by activity id
    const activityId = selectedProjectActivity[0];
    console.log({ activityId });

    get_ActivityByActivityId(activityId).then(({ dataList = [] }) => {
      console.log("newly", dataList);
      setSelectActivityData(dataList);
      fetchDataForSubActivityByActivityId(activityId);
    });
  };

  //toggle indicator select
  const toggleIndicatorSelect = (component) => {
    console.log({ component });
    const selectedIndex = selectedIndicatorAllData?.findIndex(
      (selected) => selected.id === component.id
    );

    let newSelected = [...selectedIndicatorAllData];

    if (selectedIndex === -1) {
      newSelected.push(component);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedIndicatorAllData(newSelected);
  };

  const activeIndicator = () => {
    setToggleState(3);
  };

  const resetSubActivityData = () => {};

  const resetIndicatorData = () => {};

  const refreshActivityList = () => {
    setRefreshActivity(!refreshActivity);
  };

  const refreshSubActivityList = () => {
    setRefreshSubActivity(!refreshSubActivity);
  };

  const refreshIndicatorList = () => {
    setRefreshIndicator(!refreshIndicator);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const projectId = formData.id;
    setCropUrl(`geo-data/crops/${projectId}/crops`);
  });

  useEffect(() => {
    const fetchProvince = async () => {
      await get_ProvinceList().then((res) => {
        setProvinceList(res?.dataList);
      });
    };

    fetchProvince();
  }, []);

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

  //close delete handlers
  const closeSubActivityDelete = () => {
    setOpenDeleteSubActivity(false);
  };

  const closeIndicatorDelete = () => {
    setOpenDeleteIndicator(false);
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

  const resetSelectedSubActivity = () => {
    setSelectProjectedSubActivity([]);
    refreshSubActivityList();
  };

  const resetSelectedIndicator = () => {
    setSelectedIndicatorAllData([]);
    refreshIndicatorList();
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

  //delete confirm functions
  const onConfirmDeleteSubActivity = async () => {
    try {
      setLoading(true);
      for (const id of dialogSelectedSubActivityTypes) {
        await deleteProjectSubActivity(id?.id, onSuccessDelete, onError);
      }
      setLoading(false);
      closeSubActivityDelete();
      resetSelectedSubActivity();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onConfirmDeleteIndicators = async () => {
    try {
      setLoading(true);
      for (const id of dialogSelectedIndicatorTypes) {
        await deleteProjectIndicator(id?.id, onSuccessDelete, onError);
      }
      setLoading(false);
      closeIndicatorDelete();
      resetSelectedIndicator();
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

  useEffect(() => {
    selectActivityData?.id &&
      fetchDataForSubActivityByActivityId(selectActivityData?.id);
  }, [refreshSubActivity]);

  const fetchDataForSubActivityByActivityId = (activityId) => {
    get_SubActivityByActivityId(activityId).then(({ dataList = [] }) => {
      console.log(dataList);
      setSubActivityDataList(dataList);
    });
  };

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
            <FieldName>Project Type</FieldName>
            <Select
              name="agricultureProjectType"
              id="agricultureProjectType"
              value={formData?.agricultureProjectType || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "agricultureProjectType")
              }
              fullWidth
              sx={{
                borderRadius: "8px",
                backgroundColor: `${Colors.white}`,
              }}
              size="small"
            >
              <MenuItem value={"CENTRAL_GOVERNMENT"}>
                Central Government
              </MenuItem>
              <MenuItem value={"PROVINCIAL"}>Provincial</MenuItem>
              <MenuItem value={"MAHAWELI"}>Mahaweli</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>

        {formData?.agricultureProjectType === "PROVINCIAL" && (
          <>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>Project Type Value</FieldName>
                <Select
                  name="agricultureProjectTypeValue"
                  id="agricultureProjectTypeValue"
                  value={formData?.agricultureProjectTypeValue || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "agricultureProjectTypeValue"
                    )
                  }
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                >
                  {provinceList?.map((item) => (
                    <MenuItem value={item?.name}>{item?.name}</MenuItem>
                  ))}
                </Select>
              </FieldWrapper>
            </Grid>
          </>
        )}
      </Grid>

      <TabWrapper>
        <TabButton
          variant="contained"
          className={toggleState === 1 ? "active-tabs" : ""}
          onClick={() => toggleTab(1)}
          disabled={false}
        >
          Activity
        </TabButton>

        <TabButton
          variant="contained"
          className={toggleState === 2 ? "active-tabs" : ""}
          //onClick={() => toggleTab(3)}
          // disabled={!tabEnabled}
        >
          Sub Activity
        </TabButton>

        <TabButton
          variant="contained"
          className={toggleState === 3 ? "active-tabs" : ""}
          //onClick={() => toggleTab(3)}
        >
          Indicator
        </TabButton>

        <TabButton
          variant="contained"
          className={toggleState === 4 ? "active-tabs" : ""}
          onClick={() => toggleTab(4)}
        >
          Crops
        </TabButton>
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
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
            sx={{ marginLeft: "10px" }}
          >
            {selectedProjectActivity.length === 1 && (
              <Button onClick={() => activeSubActivity()}>Sub Activity</Button>
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

      <TabContent className={toggleState === 2 ? "active-content" : ""}>
        <h1>Sub Activity</h1>
        <ActionWrapper isLeft>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROJECT_SUB_ACTIVITY}`}
            >
              <Button onClick={onCreateSubActivityData}>
                <Add />
                {DEF_ACTIONS.ADD}
              </Button>
            </PermissionWrapper>

            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROJECT_SUB_ACTIVITY}`}
            >
              {selectedSubActivityAllData?.length === 1 && (
                <Button onClick={onEditSubActivityData}>
                  <Edit />
                  {DEF_ACTIONS.EDIT}
                </Button>
              )}
            </PermissionWrapper>

            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROJECT_SUB_ACTIVITY}`}
            >
              {selectedSubActivityAllData?.length === 1 && (
                <Button onClick={onViewSubActivityData}>
                  <Vrpano />
                  {DEF_ACTIONS.VIEW}
                </Button>
              )}
            </PermissionWrapper>

            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROJECT_SUB_ACTIVITY}`}
            >
              {selectedSubActivityAllData?.length > 0 && (
                <Button onClick={onDeleteSubActivityData}>
                  <Delete />
                  {DEF_ACTIONS.DELETE}
                </Button>
              )}
            </PermissionWrapper>
          </ButtonGroup>

          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.INDICATOR}`}
          >
            <ButtonGroup
              variant="outlined"
              disableElevation
              size="small"
              aria-label="action button group"
              color="success"
              sx={{ marginLeft: "10px" }}
            >
              {selectedSubActivityAllData.length === 1 && (
                <Button onClick={() => activeIndicator()}>Indicators</Button>
              )}
            </ButtonGroup>
          </PermissionWrapper>
        </ActionWrapper>

        <ProjectSubActivityForm
          open={openSubActivity}
          ProjectActivityData={selectActivityData}
          setOpenActivity={setOpenSubActivity}
          action={subactivityAction}
          onClose={closeSubActivity}
          // farmLandData={formData}
          data={subActivityData}
          onChange={handleSubActivityData}
          resetData={resetSubActivityData}
          refresh={refreshSubActivityList}
        />

        <ProjectSubActivityList
          onRowSelect={toggleSubActivitySelect}
          selectedRows={selectedSubActivityAllData}
          // data={subActivityDataList}
          activityDataId={selectActivityData?.id}
          refresh={refreshSubActivity}
        />
      </TabContent>

      <TabContent className={toggleState === 3 ? "active-content" : ""}>
        <h1>Indicator</h1>
        <ActionWrapper isLeft>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.INDICATOR}`}
            >
              <Button onClick={onCreateIndicatorData}>
                <Add />
                {DEF_ACTIONS.ADD}
              </Button>
            </PermissionWrapper>

            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.INDICATOR}`}
            >
              {selectedIndicatorAllData?.length === 1 && (
                <Button onClick={onEditIndicatorData}>
                  <Edit />
                  {DEF_ACTIONS.EDIT}
                </Button>
              )}
            </PermissionWrapper>

            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.INDICATOR}`}
            >
              {selectedIndicatorAllData?.length === 1 && (
                <Button onClick={onViewIndicatorData}>
                  <Vrpano />
                  {DEF_ACTIONS.VIEW}
                </Button>
              )}
            </PermissionWrapper>

            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.INDICATOR}`}
            >
              {selectedIndicatorAllData?.length > 0 && (
                <Button onClick={onDeleteIndicatorData}>
                  <Delete />
                  {DEF_ACTIONS.DELETE}
                </Button>
              )}
            </PermissionWrapper>
          </ButtonGroup>
        </ActionWrapper>

        <ProjectIndicatorForm
          open={openIndicator}
          ProjectSubActivityData={selectedSubActivityAllData[0]}
          setOpenActivity={setOpenIndicator}
          action={indicatorAction}
          onClose={closeIndicator}
          // farmLandData={formData}
          data={indicatorData}
          onChange={handleIndicatorData}
          resetData={resetIndicatorData}
          refresh={refreshIndicatorList}
        />

        <ProjectIndicatorList
          onRowSelect={toggleIndicatorSelect}
          selectedRows={selectedIndicatorAllData}
          // data={subActivityDataList}
          subActivityDataId={selectedSubActivityAllData[0]}
          refresh={refreshIndicator}
        />
      </TabContent>

      <TabContent className={toggleState === 4 ? "active-content" : ""}>
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

      {/* dialog boxes for delete */}
      <ConfirmationDialog
        open={openDeleteSubActivity}
        title="Do you want to delete?"
        items={selectedSubActivityAllData}
        loading={loading}
        onClose={closeSubActivityDelete}
        onConfirm={onConfirmDeleteSubActivity}
        setDialogSelectedTypes={setDialogSelectedSubActivityTypes}
        dialogSelectedTypes={dialogSelectedSubActivityTypes}
        propertyId="subActivityId"
        propertyDescription="description"
      />

      <ConfirmationDialog
        open={openDeleteIndicator}
        title="Do you want to delete?"
        items={selectedIndicatorAllData}
        loading={loading}
        onClose={closeIndicatorDelete}
        onConfirm={onConfirmDeleteIndicators}
        setDialogSelectedTypes={setDialogSelectedIndicatorTypes}
        dialogSelectedTypes={dialogSelectedIndicatorTypes}
        propertyId="indicatorId"
        propertyDescription="description"
      />

      <Box>
        <DialogBox
          open={openDeleteActivity}
          title="Delete Project Activity"
          actions={
            <ActionWrapper>
              <Button
                variant="contained"
                color="info"
                onClick={onConfirmDeleteActivity}
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
