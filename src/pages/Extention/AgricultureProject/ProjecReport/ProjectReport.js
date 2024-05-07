import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import { deleteAgricultureProject } from "../../../../redux/actions/extension/agricultureProject/action";
import { Fonts } from "../../../../utils/constants/Fonts";
import ListHeader from "../../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../../components/PermissionWrapper/PermissionWrapper";
import AgricultureProjectList from "../AgricultureProjectList";
import DialogBox from "../../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../../utils/constants/DeleteMsg";
import ProjectReportForm from "./ProjectReportForm";
import ProjectReportList from "./ProjectReportList";

const ProjectReport = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAgricultureProjects, setSelectedAgricultureProjects] =
    useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [searchData, setSearchData] = useState({
    code: "",
    name: "",
  });
  const [search, setSearch] = useState({});
  const [openProjectReport, setOpenProjectReport] = useState(false);
  const [projectReportData, setProjectReportData] = useState([]);
  const [refreshProjectReport, setRefreshProjectReport] = useState(true);
  const [projecrReportAction, setProjecrReportAction] = useState(
    DEF_ACTIONS.ADD
  );

  const closeSubActivity = () => {
    setOpenProjectReport(false);
  };

  const toggleAgricultureProjectSelect = (component) => {
    setSelectedAgricultureProjects((current = []) => {
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

  const selectAllAgricultureProjects = (all = []) => {
    setSelectedAgricultureProjects(all);
  };

  const resetSelectedAgricultureProjects = () => {
    setSelectedAgricultureProjects([]);
  };

  const onCreate = () => {
    setOpenProjectReport(true);
    setAction(DEF_ACTIONS.ADD);
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    //navigate("/extension/agriculture-project-form", {
    //  state: {
    //   action: DEF_ACTIONS.EDIT,
    //   target: selectedAgricultureProjects[0] || {},
    //  },
    // });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    //navigate("/extension/agriculture-project-form", {
    // state: {
    //    action: DEF_ACTIONS.VIEW,
    //     target: selectedAgricultureProjects[0] || {},
    //   },
    //  });
  };

  const onDelete = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedAgricultureProjects.map((p, key) => {
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
                {p.code} - {p.name}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Deleted`,
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const AgricultureProject of selectedAgricultureProjects) {
        await deleteAgricultureProject(
          AgricultureProject?.id,
          onSuccess,
          onError
        );
      }
      setLoading(false);
      close();
      resetSelectedAgricultureProjects();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
          {selectedAgricultureProjects.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROJECT_REPORT}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedAgricultureProjects.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROJECT_REPORT}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedAgricultureProjects.length > 0 && (
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
            selectedRows={selectedAgricultureProjects}
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
        onChange={handleProjectReportData}
        resetData={resetProjectReportData}
        refresh={refreshProjectReportData}
      />

      <DialogBox
        open={open}
        title="Delete Agriculture Project(s)"
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
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default ProjectReport;
