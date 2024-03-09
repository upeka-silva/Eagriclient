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
import { useNavigate } from "react-router-dom";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { deleteMahaweliAuthority } from "../../../redux/actions/mahaweliAuthority/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import MahaweliAuthorityList from "./MahaweliAuthorityList";
import { Fonts } from "../../../utils/constants/Fonts";

const MahaweliAuthority = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [selectedMahweliAuthority, setSelectedMahweliAuthority] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleMahweliAuthoritySelect = (component) => {
    setSelectedMahweliAuthority((current = []) => {
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

  const selectAllMahweliAuthority = (all = []) => {
    setSelectedMahweliAuthority(all);
  };

  const resetSelectedMahweliAuthority = () => {
    setSelectedMahweliAuthority([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/mahaweli-structure/mahaweli-authority-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/mahaweli-structure/mahaweli-authority-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedMahweliAuthority[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/mahaweli-structure/mahaweli-authority-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedMahweliAuthority[0] || {},
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
        {selectedMahweliAuthority.map((item) => {
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
      for (const provincialDoa of selectedMahweliAuthority) {
        await deleteMahaweliAuthority(provincialDoa.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedMahweliAuthority();
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
      <ListHeader title="Mahaweli Authority" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.MAHAWELI_AUTHORITY}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>

          {selectedMahweliAuthority.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.MAHAWELI_AUTHORITY}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedMahweliAuthority.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.MAHAWELI_AUTHORITY}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedMahweliAuthority.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.MAHAWELI_AUTHORITY}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.MAHAWELI_AUTHORITY}`}
      >
        {loading === false && (
          <MahaweliAuthorityList
            selectedRows={selectedMahweliAuthority}
            onRowSelect={toggleMahweliAuthoritySelect}
            selectAll={selectAllMahweliAuthority}
            unSelectAll={resetSelectedMahweliAuthority}
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

export default MahaweliAuthority;
