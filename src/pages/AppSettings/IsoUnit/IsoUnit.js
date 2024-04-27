import { useNavigate } from "react-router";
import { useUserAccessValidation } from "../../../hooks/authentication";
import IsoUnitList from "./IsoUnitList";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useState } from "react";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../../utils/constants/permission";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import { Button, ButtonGroup, CircularProgress, List, ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { Fonts } from "../../../utils/constants/Fonts";
import { deleteIsoUnit } from "../../../redux/actions/app_settings/roles/isoUnit/action";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const IsoUnit = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectIsoUnit, setSelectIsoUnit] = useState([]);
  const [dialogSelectedIsoUnit, setDialogSelectedIsoUnit] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleIsoUnitSelect = (component) => {
    setSelectIsoUnit((current = []) => {
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

  const selectAllIsoUnit = (all = []) => {
    setSelectIsoUnit(all);
  };

  const resetSelectedIsoUnit = () => {
    setSelectIsoUnit([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/app-settings/iso-unit-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/app-settings/iso-unit-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectIsoUnit[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/app-settings/iso-unit-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectIsoUnit[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedIsoUnit(selectIsoUnit);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedIsoUnit([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectIsoUnit.map((p, key) => {
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
                {p.unitCode} - {p.description}
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
      for (const isoUnit of dialogSelectedIsoUnit) {
        await deleteIsoUnit(isoUnit?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedIsoUnit();
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
      <ListHeader title="ISO Unit" />
      <ActionWrapper isLeft>
        <Stack direction="row" spacing={1} sx={{ paddingTop: "2px" }}>
          {/* <ExportButton onDownload={onDownload} /> */}
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.ISO_UNIT}`}
            >
              <Button onClick={onCreate} title="add">
                <Add />
                {DEF_ACTIONS.ADD}
              </Button>
            </PermissionWrapper>
            {selectIsoUnit.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.ISO_UNIT}`}
              >
                <Button onClick={onEdit} title="edit">
                  <Edit />
                  {DEF_ACTIONS.EDIT}
                </Button>
              </PermissionWrapper>
            )}
            {selectIsoUnit.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ISO_UNIT}`}
              >
                <Button onClick={onView} title="view">
                  <Vrpano />
                  {DEF_ACTIONS.VIEW}
                </Button>
              </PermissionWrapper>
            )}
            {selectIsoUnit.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.ISO_UNIT}`}
              >
                <Button onClick={onDelete} title="delete">
                  <Delete />
                  {DEF_ACTIONS.DELETE}
                </Button>
              </PermissionWrapper>
            )}
          </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ISO_UNIT}`} 
      >
        {loading === false && (
            <IsoUnitList
                selectedRows={selectIsoUnit}
                onRowSelect={toggleIsoUnitSelect}
                selectAll={selectAllIsoUnit}
                unSelectAll={resetSelectedIsoUnit}
             />
        )}
      </PermissionWrapper>

      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectIsoUnit}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedIsoUnit}
        dialogSelectedTypes={dialogSelectedIsoUnit}
        propertyId="unitCode"
        propertyDescription="description"
      />
    </div>
  );
};

export default IsoUnit;
