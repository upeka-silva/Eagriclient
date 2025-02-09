import React, { useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import {
  Add,
  Delete,
  Edit,
  Vrpano,
  CheckCircle,
  Lock,
} from "@mui/icons-material";
import CropLookSeasonList from "./CropLookSeasonList";
import {
  changeStatusCropLookSeason,
  deleteCropLookSeason,
} from "../../../redux/actions/cropLook/season/action";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";

const CropLookSeason = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStatusChageModal, setOpenStatusChageModal] = useState(false);
  const [selectAgriSeason, setSelectAgriSeason] = useState([]);
  const [dialogSelectAgriSeason, setDialogSelectAgriSeason] = useState([]);

  const [seasonStatus, setSeasonStatus] = useState("");
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
    navigate("/crop-look/season-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/crop-look/season-form", {
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
    navigate("/crop-look/season-form", {
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
    setDialogSelectAgriSeason(selectAgriSeason);
  };

  const onChangeStatus = (status) => {
    setOpenStatusChageModal(true);
    setSeasonStatus(status);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectAgriSeason([]);
  };

  const closeStatusChangeModal = () => {
    setOpenStatusChageModal(false);
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

  const onDeleteSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Deleted`,
    });
  };

  const onSuccess = (operationType) => {
    let message = "";
    let formattedType = operationType.trim().toUpperCase();
    console.log("");
    switch (formattedType) {
      case "ENABLED":
        message = "Successfully enabled";
        break;
      case "CLOSED":
        message = "Successfully closed";
        break;
    }

    addSnackBar({
      type: SnackBarTypes.success,
      message: message,
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
      for (const agriSeason of dialogSelectAgriSeason) {
        await deleteCropLookSeason(agriSeason?.id, onDeleteSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedAgriSeason();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onConfirmStatusChange = async () => {
    try {
      setLoading(true);
      for (const agriSeason of selectAgriSeason) {
        await changeStatusCropLookSeason(
          agriSeason?.id,
          seasonStatus,
          () => onSuccess(seasonStatus),
          onError
        );
      }
      setLoading(false);
      closeStatusChangeModal();
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
      <ListHeader title="Crop Look Season" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_LOOK_SEASON}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>
          {selectAgriSeason.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_LOOK_SEASON}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectAgriSeason.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_LOOK_SEASON}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectAgriSeason.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_LOOK_SEASON}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
          {selectAgriSeason.length === 1 &&
            selectAgriSeason[0].status !== "ENABLED" && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_LOOK_SEASON}`}
              >
                <Button onClick={() => onChangeStatus("ENABLED")}>
                  <CheckCircle />
                  Enable
                </Button>
              </PermissionWrapper>
            )}
          {selectAgriSeason.length === 1 &&
            selectAgriSeason[0].status !== "CLOSED" && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_LOOK_SEASON}`}
              >
                <Button onClick={() => onChangeStatus("CLOSED")}>
                  <Lock />
                  Close
                </Button>
              </PermissionWrapper>
            )}
        </ButtonGroup>
      </ActionWrapper>

      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_LOOK_SEASON}`}
      >
        {loading === false && (
          <CropLookSeasonList
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
        setDialogSelectedTypes={setDialogSelectAgriSeason}
        dialogSelectedTypes={dialogSelectAgriSeason}
        propertyId="agriSeason.code"
        propertyDescription="description"
      />

      <DialogBox
        open={openStatusChageModal}
        title={seasonStatus + " Crop Look Season"}
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirmStatusChange}
              sx={{ ml: "8px" }}
            >
              ok
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={closeStatusChangeModal}
              sx={{ ml: "8px" }}
            >
              cancel
            </Button>
          </ActionWrapper>
        }
      >
        <List>
          <ListItemText>
            {selectAgriSeason[0]?.code} - {selectAgriSeason[0]?.description}
          </ListItemText>
        </List>
      </DialogBox>
    </div>
  );
};

export default CropLookSeason;
