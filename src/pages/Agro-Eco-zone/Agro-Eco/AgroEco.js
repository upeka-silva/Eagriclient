import React, { useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import AgroEcoList from "./AgroEcoList";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { deleteAgroEco } from "../../../redux/actions/agroEco/action";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { useSnackBars } from "../../../context/SnackBarContext";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const AgroEco = () => {
  useUserAccessValidation();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedAgroEco, setSelectedAgroEco] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [open, setOpen] = useState(false);
  const { addSnackBar } = useSnackBars();

  const toggleAgroEcoSelect = (component) => {
    setSelectedAgroEco((current = []) => {
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

  const selectAllAgroEco = (all = []) => {
    setSelectedAgroEco(all);
  };

  const resetSelectedAgroEco = () => {
    setSelectedAgroEco([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ez-structure/agro-eco-zone-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ez-structure/agro-eco-zone-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedAgroEco[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ez-structure/agro-eco-zone-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedAgroEco[0] || {},
      },
    });
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

  const onDelete = () => {
    setOpen(true);
  };


  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const agro of selectedAgroEco) {
        await deleteAgroEco(agro?.id, onSuccess, onError)
      }
      setLoading(false);
      close();
      resetSelectedAgroEco()
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const close = () => {
    setOpen(false);
  }

  const renderSelectedItems = () => {
    return (
      <List>
        {
          selectedAgroEco.map((p, key) => {
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
                <ListItemText>{p.aeZoneId} - {p.name}</ListItemText>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectedAgroEco.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
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
         {selectedAgroEco.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
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
          {selectedAgroEco.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGRO_ECOLOGICAL_ZONE}`}
      >
        {loading === false && (
          <AgroEcoList
          selectedRows={selectedAgroEco}
          onRowSelect={toggleAgroEcoSelect}
          selectAll={selectAllAgroEco}
          unSelectAll={resetSelectedAgroEco}
        />
        )}
        
      </PermissionWrapper>
     <DialogBox
        open={open}
        title="Delete Agro ECO Zone"
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

export default AgroEco;
