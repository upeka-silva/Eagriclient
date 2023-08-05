import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import GnDivisionList from "./GnDivisionList";
import { ActionButton } from "../../../components/ActionButtons/ActionButton";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSnackBars } from "../../../context/SnackBarContext";
import { deleteGnDivision } from "../../../redux/actions/gnDivision/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";

const GnDivision = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedGnDivisions, setSelectedGnDivisions] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleGnDivisionSelect = (component) => {
    setSelectedGnDivisions((current = []) => {
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

  const selectAllGnDivisions = (all = []) => {
    setSelectedGnDivisions(all);
  };

  const resetSelectedGnDivisions = () => {
    setSelectedGnDivisions([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ga-structure/gn-division-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ga-structure/gn-division-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedGnDivisions[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ga-structure/gn-division-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedGnDivisions[0] || {},
      },
    });
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
        {selectedGnDivisions.map((p, key) => {
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
                {p.code} - {p.description}
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
      for (const gnDivision of selectedGnDivisions) {
        await deleteGnDivision(gnDivision?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedGnDivisions();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
      <div>
        <ActionWrapper isLeft>
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.GN_DIVISION}`}
          >
            <ActionButton variant="contained" onClick={onCreate}>
              <AddIcon />
            </ActionButton>
          </PermissionWrapper>

          {selectedGnDivisions.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.GN_DIVISION}`}
            >
              <ActionButton
                variant="contained"
                color="secondary"
                onClick={onEdit}
                sx={{ ml: "8px" }}
              >
                <EditIcon />
              </ActionButton>
            </PermissionWrapper>
          )}
          {selectedGnDivisions.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.GN_DIVISION}`}
            >
              <ActionButton
                variant="contained"
                color="info"
                onClick={onView}
                sx={{ ml: "8px" }}
              >
                <VisibilityIcon />
              </ActionButton>
            </PermissionWrapper>
          )}
          {selectedGnDivisions.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.GN_DIVISION}`}
            >
              <ActionButton
                variant="contained"
                color="error"
                onClick={onDelete}
              >
                <DeleteForeverIcon />
              </ActionButton>
            </PermissionWrapper>
          )}
        </ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.GN_DIVISION}`}
        >
          {loading === false && (
            <GnDivisionList
              selectedRows={selectedGnDivisions}
              onRowSelect={toggleGnDivisionSelect}
              selectAll={selectAllGnDivisions}
              unSelectAll={resetSelectedGnDivisions}
            />
          )}
        </PermissionWrapper>
        <DialogBox
        open={open}
        title="Delete Soil Subtype"
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

export default GnDivision;
