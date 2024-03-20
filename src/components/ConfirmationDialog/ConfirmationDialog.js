import React, { useState } from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import DialogBox from "../PageLayout/DialogBox";
import { ActionWrapper } from "../PageLayout/ActionWrapper";

const ConfirmationDialog = ({
  open,
  title,
  items,
  loading,
  onClose,
  onConfirm,
  setDialogSelectedTypes,
  dialogSelectedTypes,
  propertyId,
  propertyDescription,
}) => {
  
   console.log({items})
  const toggleDialogSoilTypeSelect = (soilType) => {
    const selectedIndex = dialogSelectedTypes.findIndex(
      (selected) => selected.id === soilType.id
    );
    let newSelected = [...dialogSelectedTypes];

    if (selectedIndex === -1) {
      newSelected.push(soilType);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setDialogSelectedTypes(newSelected);
  };

  return (
    <DialogBox
      open={open}
      title={title && title}
      actions={
        <ActionWrapper>
          <Button
            variant="contained"
            color="info"
            onClick={onConfirm}
            sx={{ ml: "8px" }}
          >
            ok
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onClose}
            sx={{ ml: "8px" }}
          >
            cancel
          </Button>
        </ActionWrapper>
      }
    >
      <>
        <Divider sx={{  }} />
        <List>
          {items.map((p, key) => (
            <ListItem key={key}>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <Checkbox
                    checked={dialogSelectedTypes.includes(p)}
                    onChange={() => toggleDialogSoilTypeSelect(p)}
                    color="info"
                  />
                )}
              </ListItemIcon>
              <ListItemText>
                <ListItemText>
                    {p[propertyId]} - {p[propertyDescription]}
                </ListItemText>
              </ListItemText>
            </ListItem>
          ))}
        </List>    
      </>
    </DialogBox>
  );
};

export default ConfirmationDialog;
