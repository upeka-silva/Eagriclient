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
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { ActionButton } from "../../../components/ActionButtons/ActionButton";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ProvincialDoaList from "./ProvincialDoaList";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { deleteProvincialDoa } from "../../../redux/actions/ProvincialDoa/action";

const ProvincialDoa = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [selectedProvincialDoa, setSelectedProvincialDoa] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleProvincialDoaSelect = (component) => {
    setSelectedProvincialDoa((current = []) => {
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

  const selectAllProvincialDoa = (all = []) => {
    setSelectedProvincialDoa(all);
  };

  const resetSelectedProvincialDoa = () => {
    setSelectedProvincialDoa([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/provincial-structure/provincial-doa-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/provincial-structure/provincial-doa-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvincialDoa[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/provincial-structure/provincial-doa-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvincialDoa[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedProvincialDoa.map((item) => {
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
                {item?.proDirectorId} - {item?.description}
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
      for (const provincialDoa of selectedProvincialDoa) {
        await deleteProvincialDoa(provincialDoa.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedProvincialDoa();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <ActionWrapper isLeft>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>

        {selectedProvincialDoa.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
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
        {selectedProvincialDoa.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
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
        {selectedProvincialDoa.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
          >
            <ActionButton
              variant="contained"
              color="error"
              onClick={onDelete}
              sx={{ ml: "8px" }}
            >
              <DeleteForeverIcon />
            </ActionButton>
          </PermissionWrapper>
        )}
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
      >
        {loading === false && (
          <ProvincialDoaList
            selectedRows={selectedProvincialDoa}
            onRowSelect={toggleProvincialDoaSelect}
            selectAll={selectAllProvincialDoa}
            unSelectAll={resetSelectedProvincialDoa}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Provincial Level"
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
              onClick={onClose}
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

export default ProvincialDoa;
