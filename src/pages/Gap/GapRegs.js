import React, { useEffect, useState } from "react";
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
import { deleteGapRequest } from "../../redux/actions/gap/action";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import GapRegList from "./GapRegList";
import DialogBox from "../../components/PageLayout/DialogBox";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import { Fonts } from "../../utils/constants/Fonts";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import { getUserPermissionByComponent } from "../../utils/helpers/permission";
import AccessDeniedMsg from "../../components/AccessDeniedMsg/AccessDeniedMsg";

const GapRegs = () => {
  useUserAccessValidation();
  
  useEffect(()=>{
    getUserPermissionByComponent('GAP_REQUEST').then((p)=>{
        if(!p.isEnabled){
          setPermission(false)
        }
    })
  },[])


  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectGapReq, setSelectGapReq] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [permission,setPermission] = useState(true)

  const toggleUsersSelect = (component) => {
    setSelectGapReq((current = []) => {
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

  const selectAllUsers = (all = []) => {
    setSelectGapReq(all);
  };

  const resetSelectedUsers = () => {
    setSelectGapReq([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/gap/gap-reg-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/gap/gap-reg-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: { ...(selectGapReq[0] || {}) },
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/gap/gap-reg-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: { ...(selectGapReq[0] || {}) },
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
        {selectGapReq.map((p, key) => {
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
      for (const gapRequest of selectGapReq) {
        await deleteGapRequest(gapRequest?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedUsers();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography
        variant="h6"
        fontWeight={500}
        mt={1}
        fontFamily={Fonts.fontStyle1}
      >
        Gap Registration
      </Typography>

      {
        permission == false && <AccessDeniedMsg/>
      }

      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.GAP_REQUEST}`}
          >
            <Button onClick={onCreate} title="add">
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectGapReq.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.GAP_REQUEST}`}
            >
              <Button onClick={onEdit} title="edit">
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectGapReq.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.GAP_REQUEST}`}
            >
              <Button onClick={onView} title="view">
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectGapReq.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.GAP_REQUEST}`}
            >
              <Button onClick={onDelete} title="delete">
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.GAP_REQUEST}`}
      >
        {loading === false && (
          <GapRegList
            selectedRows={selectGapReq}
            onRowSelect={toggleUsersSelect}
            selectAll={selectAllUsers}
            unSelectAll={resetSelectedUsers}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Agriculture Season"
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

export default GapRegs;
