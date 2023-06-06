import React, { useState } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ARPAList from "./ARPAList";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { useSnackBars } from "../../../context/SnackBarContext";
import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { deleteARPA } from "../../../redux/actions/arpa/action"
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";


const ARPA = () => {
  useUserAccessValidation();
  const { addSnackBar } = useSnackBars();

  const [selectedArpa, setSelectedArpa] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleArpaSelect = (component) => {
    setSelectedArpa((current = []) => {
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

  const selectAllArpa = (all = []) => {
    setSelectedArpa(all);
  };

  const resetSelectedArpa = () => {
    setSelectedArpa([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/dad-structure/arpa-area-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/dad-structure/arpa-area-form", {
      state: { action: DEF_ACTIONS.EDIT, target: selectedArpa[0] || {} },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/dad-structure/arpa-area-form", {
      state: { action: DEF_ACTIONS.VIEW, target: selectedArpa[0] || {} },
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
        {selectedArpa.map((p, key) => {
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
                {p.arpaId} - {p.name}
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
      for (const arpa of selectedArpa) {
        await deleteARPA(arpa?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedArpa();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.ARPA}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>

        {selectedArpa.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ARPA}`}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={onEdit}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.EDIT}
            </Button>
          </PermissionWrapper>
        )}
        {selectedArpa.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ARPA}`}
          >
            <Button
              variant="contained"
              color="info"
              onClick={onView}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.VIEW}
            </Button>
          </PermissionWrapper>
        )}
        {selectedArpa.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.ARPA}`}
          >
            <Button
              variant="contained"
              color="error"
              onClick={onDelete}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.DELETE}
            </Button>
          </PermissionWrapper>

        )}
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ARPA}`}
      >
        {loading === false && (
          <ARPAList
            selectedRows={selectedArpa}
            onRowSelect={toggleArpaSelect}
            selectAll={selectAllArpa}
            unSelectAll={resetSelectedArpa}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete ARPA Area"
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
          <Divider sx={{ mt: '16px' }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default ARPA;
