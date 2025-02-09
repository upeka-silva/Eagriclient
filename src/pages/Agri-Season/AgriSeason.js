import React, { useState } from "react";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { deleteAgriSeason } from "../../redux/actions/agriSeason/action";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import AgriSeasonList from "./AgriSeasonList";
import DialogBox from "../../components/PageLayout/DialogBox";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../components/ListHeader/ListHeader";
import { Fonts } from "../../utils/constants/Fonts";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../components/CrudActionButton/CrudActionButton";

const AgriSeason = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectAgriSeason, setSelectAgriSeason] = useState([]);
  const [dialogSelectedAgriSeason, setDialogSelectedAgriSeason] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleAgriSeasonSelect = (component) => {
    setSelectAgriSeason((current = []) => {
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

  const selectAllAgriSeason = (all = []) => {
    setSelectAgriSeason(all);
  };

  const resetSelectedAgriSeason = () => {
    setSelectAgriSeason([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/agri-season-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/agri-season-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: {
          ...(selectAgriSeason[0] || {}),
          startDate: selectAgriSeason[0]?.startDate
            ? new Date(selectAgriSeason[0]?.startDate)
            : null,
          endDate: selectAgriSeason[0]?.endDate
            ? new Date(selectAgriSeason[0]?.endDate)
            : null,
        },
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/agri-season-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: {
          ...(selectAgriSeason[0] || {}),
          startDate: selectAgriSeason[0]?.startDate
            ? new Date(selectAgriSeason[0]?.startDate)
            : null,
          endDate: selectAgriSeason[0]?.endDate
            ? new Date(selectAgriSeason[0]?.endDate)
            : null,
        },
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedAgriSeason(selectAgriSeason);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedAgriSeason([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectAgriSeason.map((p, key) => {
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
      message: message || "Something went wrong.",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const agriSeason of dialogSelectedAgriSeason) {
        await deleteAgriSeason(agriSeason?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedAgriSeason();
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
      <ListHeader title="Agriculture Season" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>
          {selectAgriSeason.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectAgriSeason.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectAgriSeason.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGRICULTURE_SEASON}`}
      >
        {loading === false && (
          <AgriSeasonList
            selectedRows={selectAgriSeason}
            onRowSelect={toggleAgriSeasonSelect}
            selectAll={selectAllAgriSeason}
            unSelectAll={resetSelectedAgriSeason}
          />
        )}
      </PermissionWrapper>
     
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectAgriSeason}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedAgriSeason}
        dialogSelectedTypes={dialogSelectedAgriSeason}
        propertyId="code"
        propertyDescription="description"
      />
    </div>
  );
};

export default AgriSeason;
