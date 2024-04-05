import React, { useEffect, useState } from "react";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { useNavigate } from "react-router";
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
import CropLookEarlyWarningRangesList from "./CropLookEarlyWarningRangesList";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { deleteDsDivision } from "../../../redux/actions/dsDivision/action";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, RestartAlt, Vrpano } from "@mui/icons-material";
import { get_EarlyWarningRangeeList } from "../../../redux/actions/cropLook/earlyWarningRegistration/action";
import { get_DistrictListByProvinceId } from "../../../redux/actions/district/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { deleteEarlyWarningRange } from "../../../redux/actions/cropLook/earlyWarningRegistration/action";
import DialogBox from "../../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";


const CropLookEarlyWarningRanges = () => {

    useUserAccessValidation();
    const navigate = useNavigate();
    const { addSnackBar } = useSnackBars();
  
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    // const [dataEndPoint, setDataEndPoint] = useState("crop/early-warning-ranges");
  
    const [selectedEarlyWarningRanges, setSelectedEarlyWarningRanges] = useState([]);
    const [dialogSelectedEarlyWarningRanges, setDialogSelectedEarlyWarningRanges] = useState([]);
    const [action, setAction] = useState(DEF_ACTIONS.ADD);
  

  
    const toggleEarlyWarningRangeSelect = (component) => {
        setSelectedEarlyWarningRanges((current = []) => {
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
  
    const selectAllEarlyWarningRanges = (all = []) => {
        setSelectedEarlyWarningRanges(all);
    };
  
    const resetSelectedEarlyWarningRanges = () => {
        setSelectedEarlyWarningRanges([]);
    };

    const renderSelectedItems = () => {
      return (
        <List>
          {selectedEarlyWarningRanges.map((p, key) => {
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
                  {p.id} - {p.cropDTO?.cropId}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      );
    };
  
    const onCreate = () => {
      setAction(DEF_ACTIONS.ADD);
      navigate("/early-warning-ranges-form", {
        state: { action: DEF_ACTIONS.ADD },
      });
    };
  
    const onEdit = () => {
      setAction(DEF_ACTIONS.EDIT);
      navigate("/early-warning-ranges-form", {
        state: {
          action: DEF_ACTIONS.EDIT,
          target: selectedEarlyWarningRanges[0] || {},
        },
      });
    };
  
    const onView = () => {
      setAction(DEF_ACTIONS.VIEW);
      navigate("/early-warning-ranges-form", {
        state: {
          action: DEF_ACTIONS.VIEW,
          target: selectedEarlyWarningRanges[0] || {},
        },
      });
    };
  
    const onDelete = () => {
      setOpen(true);
      setDialogSelectedEarlyWarningRanges(selectedEarlyWarningRanges);
    };
  
    const close = () => {
      setOpen(false);
      setDialogSelectedEarlyWarningRanges([]);
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
        for (const earlyWaringRange of dialogSelectedEarlyWarningRanges) {
          await deleteEarlyWarningRange(earlyWaringRange?.id, onSuccess, onError);
        }
        setLoading(false);
        close();
        resetSelectedEarlyWarningRanges();
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
        <ListHeader title="Early Warning Ranges" />
        <ActionWrapper isLeft>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.EARLY_WARNING_RANGES}`}
            >
              <Button onClick={onCreate}>
                <Add />
                {DEF_ACTIONS.ADD}
              </Button>
            </PermissionWrapper>
            {selectedEarlyWarningRanges.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.EARLY_WARNING_RANGES}`}
              >
                <Button onClick={onEdit}>
                  <Edit />
                  {DEF_ACTIONS.EDIT}
                </Button>
              </PermissionWrapper>
            )}
            {selectedEarlyWarningRanges.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.EARLY_WARNING_RANGES}`}
              >
                <Button onClick={onView}>
                  <Vrpano />
                  {DEF_ACTIONS.VIEW}
                </Button>
              </PermissionWrapper>
            )}
            {selectedEarlyWarningRanges.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.EARLY_WARNING_RANGES}`}
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
          permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.EARLY_WARNING_RANGES}`}
        >
          {loading === false && (
            <CropLookEarlyWarningRangesList
              selectedRows={selectedEarlyWarningRanges}
              onRowSelect={toggleEarlyWarningRangeSelect}
              selectAll={selectAllEarlyWarningRanges}
              unSelectAll={resetSelectedEarlyWarningRanges}
              // dataEndPoint={dataEndPoint}
            />
          )}
        </PermissionWrapper>
      <DialogBox
        open={open}
        title="Do you want to delete?"
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
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
      </div>
    );
  };

export default CropLookEarlyWarningRanges
