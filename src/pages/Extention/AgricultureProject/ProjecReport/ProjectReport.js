import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Button, ButtonGroup, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../../utils/constants/permission";
import { SnackBarTypes } from "../../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../../utils/constants/apiMessages";
import { Fonts } from "../../../../utils/constants/Fonts";
import ListHeader from "../../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../../components/PermissionWrapper/PermissionWrapper";
import ProjectReportForm from "./ProjectReportForm";
import ProjectReportList from "./ProjectReportList";
import ConfirmationDialog from "../../../../components/ConfirmationDialog/ConfirmationDialog";
import {
  deleteProjectReport,
  getAllProjectDetailsByProjectId,
  handleProjectReport,
} from "../../../../redux/actions/extension/agricultureProject/ProjectReport/action";
import ReportList from "./components/ReportList";
import { FieldWrapper } from "../../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../../components/FormLayout/FieldName";
import { get_AgricultureProjectAllList } from "../../../../redux/actions/extension/agricultureProject/action";

const ProjectReport = () => {
  useUserAccessValidation();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [selectedProjectReport, setSelectedProjectReport] = useState([]);
  const [openProjectReport, setOpenProjectReport] = useState(false);
  const [projectReportData, setProjectReportData] = useState([]);
  console.log({ projectReportData });
  const [refreshProjectReport, setRefreshProjectReport] = useState(true);
  const [projecrReportAction, setProjecrReportAction] = useState(
    DEF_ACTIONS.ADD
  );
  const [allProjectData, setAllAgricultureProjectsData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  //delete handlers
  const [openDeleteProjectReport, setOpenDeleteProjectReport] = useState(false);
  const [
    dialogSelectedProjectReportTypes,
    setDialogSelectedProjectReportTypes,
  ] = useState([]);

  console.log({ projectReportData });

  const closeSubActivity = () => {
    setOpenProjectReport(false);
  };

  const toggleAgricultureProjectSelect = (component) => {
    const selectedIndex = selectedProjectReport?.findIndex(
      (selected) => selected.id === component.id
    );

    let newSelected = [...selectedProjectReport];

    if (selectedIndex === -1) {
      newSelected.push(component);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedProjectReport(newSelected);
  };

  const selectAllAgricultureProjects = (all = []) => {
    setSelectedProjectReport(all);
  };

  const resetSelectedAgricultureProjects = () => {
    setSelectedProjectReport([]);
  };

  const onCreate = () => {
    setProjectReportData([]);
    setOpenProjectReport(true);
    setProjecrReportAction(DEF_ACTIONS.ADD);
  };

  const onEdit = () => {
    setProjecrReportAction(DEF_ACTIONS.EDIT);
    setProjectReportData(selectedProjectReport[0]);
    setOpenProjectReport(true);
  };

  const onView = () => {
    setOpenProjectReport(true);
    setProjecrReportAction(DEF_ACTIONS.VIEW);
    setProjectReportData(selectedProjectReport[0]);
  };

  const onDelete = () => {
    setOpenDeleteProjectReport(true);
    setDialogSelectedProjectReportTypes(selectedProjectReport);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
  };



  const handleProjectReportData = (value, target) => {
    allDataFetch(value);
    setProjectReportData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const resetProjectReportData = () => {
    setProjectReportData([]);
  };

  const refreshProjectReportData = () => {
    setRefreshProjectReport(!refreshProjectReport);
  };

  const closeProjecrReportDelete = () => {
    setOpenDeleteProjectReport(false);
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Deleted`,
    });
  };

  const onConfirmDeleteProjectReport = async () => {
    try {
      setLoading(true);
      for (const id of dialogSelectedProjectReportTypes) {
        await deleteProjectReport(id?.id, onSuccessDelete, onError);
      }
      setLoading(false);
      closeProjecrReportDelete();
      resetSelectedAgricultureProjects();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getProjectList = async () => {
      await get_AgricultureProjectAllList().then((res) => {
        setProjectData(res?.dataList);
        allDataFetch(res?.dataList[0]?.id);
      });
    };

    getProjectList();
  }, []);

  const allDataFetch = async (id) => {
    await getAllProjectDetailsByProjectId(id).then((response) => {
      setAllAgricultureProjectsData(response?.payload);
      console.log({ response });
    });
  };
  

  useEffect(() => {
    projectReportData && allDataFetch();


  }, []);

  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
        paddingRight: "10px",
      }}
    >
      <ListHeader title="Report A Project" />

      <Grid container spacing={2} mt={3}>
        <Grid item sm={6} md={3} lg={3}>
        <FieldName>Select Project</FieldName>
          <Select
            name="projectId"
            id="projectId"
            value={projectReportData?.projectId || ""}
            disabled={projecrReportAction === DEF_ACTIONS.VIEW}
            onChange={(e) => {
              handleProjectReportData(e?.target?.value, "projectId");
            }}
            fullWidth
            sx={{
              borderRadius: "8px",
            }}
            size="small"
          >
            {projectData?.map((item) => (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.description}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={9} display="flex" justifyContent="flex-end">
          {/* Your second item */}
          {/* <Button variant="contained" color="success" onClick={saveReportData}>
            save
          </Button> */}
        </Grid>
      </Grid>
      {/* <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROJECT_REPORT}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>
          {selectedProjectReport.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROJECT_REPORT}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedProjectReport.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROJECT_REPORT}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedProjectReport.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROJECT_REPORT}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper> */}
      {/* <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGRICULTURE_PROJECT}`}
      > */}
      {loading === false && (
        <PermissionWrapper
          permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROJECT_REPORT}`}
        >
          {/* <ProjectReportList
            selectedRows={selectedProjectReport}
            onRowSelect={toggleAgricultureProjectSelect}
            selectAll={selectAllAgricultureProjects}
            unSelectAll={resetSelectedAgricultureProjects}
            advancedSearchData={search}
            refresh={refreshProjectReport}
          /> */}
        </PermissionWrapper>
      )}
      {/* </PermissionWrapper> */}

      <Grid mt={4}>
        <ReportList
          allProjectData={allProjectData}
          //saveReportData={saveReportData}
        />
      </Grid>

      <ProjectReportForm
        open={openProjectReport}
        //ProjectActivityData={selectActivityData}
        setOpenActivity={setOpenProjectReport}
        action={projecrReportAction}
        onClose={closeSubActivity}
        // farmLandData={formData}
        data={projectReportData}
        setProjectReportData={setProjectReportData}
        onChange={handleProjectReportData}
        resetData={resetProjectReportData}
        refresh={refreshProjectReportData}
      />

      <ConfirmationDialog
        open={openDeleteProjectReport}
        title="Do you want to delete?"
        items={selectedProjectReport}
        loading={loading}
        onClose={closeProjecrReportDelete}
        onConfirm={onConfirmDeleteProjectReport}
        setDialogSelectedTypes={setDialogSelectedProjectReportTypes}
        dialogSelectedTypes={dialogSelectedProjectReportTypes}
        propertyId="reportId"
        propertyDescription="reportValue"
      />
    </div>
  );
};

export default ProjectReport;
