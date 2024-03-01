import React, { useState } from "react";
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
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { deleteSoilTests } from "../../../redux/actions/soil & water tests/soil/action";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import SoilTestList from "./SoilTestList";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";

const SoilTest = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars;

  const [selectSoilTest, setSelectSoilTest] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleSoilTestSelect = (component) => {
    setSelectSoilTest((current = []) => {
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

  const selectAllSoilTests = (all = []) => {
    setSelectSoilTest(all);
  };

  const resetSelectedSoilTests = () => {
    setSelectSoilTest([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/tests/soil-test-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/tests/soil-test-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectSoilTest[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/tests/soil-test-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectSoilTest[0] || {},
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
        {selectSoilTest.map((p, key) => {
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

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const soilTests of selectSoilTest) {
        await deleteSoilTests(soilTests?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedSoilTests();
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
      <ListHeader title="Soil Test" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.SOIL_SAMPLE}`}
          >
            <Button onClick={onCreate}><Add/>{DEF_ACTIONS.ADD}</Button>
          </PermissionWrapper>
          {selectSoilTest.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.SOIL_SAMPLE}`}
            >
              <Button onClick={onEdit}><Edit/>{DEF_ACTIONS.EDIT}</Button>
            </PermissionWrapper>
          )}
          {selectSoilTest.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_SAMPLE}`}
            >
              <Button onClick={onView}><Vrpano/>{DEF_ACTIONS.VIEW}</Button>
            </PermissionWrapper>
          )}
          {selectSoilTest.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.SOIL_SAMPLE}`}
            >
              <Button onClick={onDelete}><Delete/>{DEF_ACTIONS.DELETE}</Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.SOIL_SAMPLE}`}
      >
        <SoilTestList
          selectedRows={selectSoilTest}
          onRowSelect={toggleSoilTestSelect}
          selectAll={selectAllSoilTests}
          unSelectAll={resetSelectedSoilTests}
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
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default SoilTest;
