import React, { useState } from "react";
import RolesList from "./RolesList";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";

export default function Permission() {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [searchData, setSearchData] = useState({
    code: "",
    name: "",
  });
  const [search, setSearch] = useState({});

  const togglePermissionSelect = (component) => {
    console.log(component);
    setSelectedPermission((current = []) => {
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

  const selectAllProvinces = (all = []) => {
    setSelectedPermission(all);
  };

  const resetSelectedProvinces = () => {
    setSelectedPermission([]);
  };

  const onCreate = () => {
    navigate("/app-settings/permissions-by-role", {
      state: { action: DEF_ACTIONS.ADD, data: selectedPermission },
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
        {selectedPermission.map((p, key) => {
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
                {p.code} - {p.name}
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

  return (
    <div>
      <ListHeader title="Permissions" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <Box sx={{ height: "20px" }}>
            {selectedPermission.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.FARM_LAND}`}
              >
                <Button onClick={onCreate}>Permissions</Button>
              </PermissionWrapper>
            )}
          </Box>
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCE}`}
      >
        {loading === false && (
          <RolesList
            selectedRows={selectedPermission}
            onRowSelect={togglePermissionSelect}
            selectAll={selectAllProvinces}
            unSelectAll={resetSelectedProvinces}
            advancedSearchData={search}
          />
        )}
      </PermissionWrapper>
    
    </div>
  );
}
