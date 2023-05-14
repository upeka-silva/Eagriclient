import React, { useState } from "react";
import { Button, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import MahaweliBlockList from "./MahaweliBlockList";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { deleteMahaweliBlock } from "../../../redux/actions/mahaweliSystem/mahaweliBlock/action";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";

const MahaweliBlock = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectMahaweliBlocks, setSelectedMahaweliBlocks] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addSnackBar } = useSnackBars();

  const toggleMahaweliBlockSelect = (component) => {
    setSelectedMahaweliBlocks((current = []) => {
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

  const selectAllMahaweliBlocks = (all = []) => {
    setSelectedMahaweliBlocks(all);
  };

  const resetSelectedMahaweliBlocks = () => {
    setSelectedMahaweliBlocks([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectMahaweliBlocks[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectMahaweliBlocks[0] || {},
      },
    });
  };
  const onDelete = () => {
    setOpen(true);
  }

  const close = () => {
    setOpen(false);
  }


  const renderSelectedItems = () => {
    return (
      <List>
        {
          selectMahaweliBlocks.map((p, key) => {
            return (
              <ListItem>
                <ListItemIcon>
                  {
                    loading ? (
                      <CircularProgress size={16} />
                    ) : (
                      <RadioButtonCheckedIcon color="info" />
                    )
                  }
                </ListItemIcon>
                <ListItemText>{p.code} - {p.name}</ListItemText>
              </ListItem>
            )
          })
        }
      </List>
    )
  }


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
      for (const mahaweliBlock of selectMahaweliBlocks) {
        await deleteMahaweliBlock(mahaweliBlock?.id, onSuccess, onError)
      }
      setLoading(false);
      close();
      resetSelectedMahaweliBlocks()
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectMahaweliBlocks.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
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
        {selectMahaweliBlocks.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
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
        {selectMahaweliBlocks.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
      >
        <MahaweliBlockList
          selectedRows={selectMahaweliBlocks}
          onRowSelect={toggleMahaweliBlockSelect}
          selectAll={selectAllMahaweliBlocks}
          unSelectAll={resetSelectedMahaweliBlocks}
        />
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete Province(s)"
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
          <Typography>Are you sure to delete the following items?</Typography>
          <Divider sx={{ mt: '16px' }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default MahaweliBlock;
