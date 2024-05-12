import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Button,
  ButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
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
import { deleteProjectReport } from "../../../../redux/actions/extension/agricultureProject/ProjectReport/action";

const ProjectReport = () => {
  useUserAccessValidation();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [selectedProjectReport, setSelectedProjectReport] = useState([]);

  console.log({ selectedProjectReport });

  const [search, setSearch] = useState({});
  const [openProjectReport, setOpenProjectReport] = useState(false);
  const [projectReportData, setProjectReportData] = useState([]);
  const [refreshProjectReport, setRefreshProjectReport] = useState(true);
  const [projecrReportAction, setProjecrReportAction] = useState(
    DEF_ACTIONS.ADD
  );

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <ListHeader title="Report A Project" />
      <ActionWrapper isLeft>
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
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectedProjectReport.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROJECT_REPORT}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedProjectReport.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROJECT_REPORT}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedProjectReport.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROJECT_REPORT}`}
            >
              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      {/* <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGRICULTURE_PROJECT}`}
      > */}
      {loading === false && (
        <PermissionWrapper
          permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROJECT_REPORT}`}
        >
          <ProjectReportList
            selectedRows={selectedProjectReport}
            onRowSelect={toggleAgricultureProjectSelect}
            selectAll={selectAllAgricultureProjects}
            unSelectAll={resetSelectedAgricultureProjects}
            advancedSearchData={search}
            refresh={refreshProjectReport}
          />
        </PermissionWrapper>
      )}
      {/* </PermissionWrapper> */}

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
