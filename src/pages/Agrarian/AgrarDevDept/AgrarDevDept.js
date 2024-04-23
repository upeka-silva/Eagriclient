import React, { useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
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
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import AgrarDevDeptList from "./AgrarDevDeptList";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { deleteAgrarDevDept } from "../../../redux/actions/agrarDevDept/action";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";

const AgrarDevDept = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [selectedAgrarDevDept, setSelectedAgrarDevDept] = useState([]);
  const [dialogSelectedAgrarDevDept, setDialogSelectedAgrarDevDept] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleAgrarDevDeptSelect = (component) => {
    setSelectedAgrarDevDept((current = []) => {
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

  const selectAllAgrarDevDept = (all = []) => {
    setSelectedAgrarDevDept(all);
  };

  const resetSelectedAgrarDevDept = () => {
    setSelectedAgrarDevDept([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/agrarian/department-of-agrarian-development-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/agrarian/department-of-agrarian-development-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedAgrarDevDept[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/agrarian/department-of-agrarian-development-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedAgrarDevDept[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedAgrarDevDept(selectedAgrarDevDept);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedAgrarDevDept([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedAgrarDevDept.map((item) => {
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {" "}
                {item?.doAgrarianDevelopmentId} - {item?.name}
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
      message: "Successfully deleted",
    });
  };

  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "Failed to delete",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const agrarDevDept of dialogSelectedAgrarDevDept) {
        await deleteAgrarDevDept(agrarDevDept.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedAgrarDevDept();
    } catch (error) {
      setLoading(false);
      console.log(error);
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
      <ListHeader title="Department of Agrarian Development" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.DO_AGRARIAN_DEVELOPMENT}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>

          {selectedAgrarDevDept.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.DO_AGRARIAN_DEVELOPMENT}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedAgrarDevDept.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DO_AGRARIAN_DEVELOPMENT}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedAgrarDevDept.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.DO_AGRARIAN_DEVELOPMENT}`}
            >
              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.DO_AGRARIAN_DEVELOPMENT}`}
      >
        {loading === false && (
          <AgrarDevDeptList
            selectedRows={selectedAgrarDevDept}
            onRowSelect={toggleAgrarDevDeptSelect}
            selectAll={selectAllAgrarDevDept}
            unSelectAll={resetSelectedAgrarDevDept}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedAgrarDevDept}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedAgrarDevDept}
        dialogSelectedTypes={dialogSelectedAgrarDevDept}
        propertyId = "doAgrarianDevelopmentId"
        propertyDescription = "name"
      />
    </div>
  );
};

export default AgrarDevDept;
