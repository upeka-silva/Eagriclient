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
  const toggleDialogObjectSelect = (objItem) => {
    const selectedIndex = dialogSelectedTypes.findIndex(
      (selected) => selected.id === objItem.id
    );
    let newSelected = [...dialogSelectedTypes];

    if (selectedIndex === -1) {
      newSelected.push(objItem);
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setDialogSelectedTypes(newSelected);
  };

  console.log({ propertyId });

  const getPropertyValue = (obj, path) => {
    const properties = path.split(".");
    let value = obj;
    for (let prop of properties) {
      value = value[prop];
      if (value === undefined || value === null) {
        return undefined;
      }
    }
    return value;
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
            Ok
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onClose}
            sx={{ ml: "8px" }}
          >
            Cancel
          </Button>
        </ActionWrapper>
      }
    >
      <>
        <Divider sx={{}} />
        <List>
          {items.map((p, key) => (
            <ListItem key={key}>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <Checkbox
                    checked={dialogSelectedTypes.includes(p)}
                    onChange={() => toggleDialogObjectSelect(p)}
                    color="info"
                  />
                )}
              </ListItemIcon>
              <ListItemText>
                <ListItemText>
                  {getPropertyValue(p, propertyDescription) ||
                  getPropertyValue(p, propertyId)
                    ? `${getPropertyValue(
                        p,
                        propertyId  
                      )} - ${getPropertyValue(p, propertyDescription)}`
                    : "Unknown"}
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
