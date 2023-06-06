import React, { useState } from "react";
import {
  Button,
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
import { deleteWaterTests } from "../../../redux/actions/soil & water tests/water/action";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import WaterTestList from "./WaterTestList";

const WaterTest = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars;

  const [selectWaterTest, setSelectWaterTest] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleWaterTestSelect = (component) => {
    setSelectWaterTest((current = []) => {
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

  const selectAllWaterTests = (all = []) => {
    setSelectWaterTest(all);
  };

  const resetSelectedWaterTests = () => {
    setSelectWaterTest([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/tests/Water-test-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/tests/Water-test-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectWaterTest[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/tests/Water-test-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectWaterTest[0] || {},
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
        {selectWaterTest.map((p, key) => {
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
      message: message || "Something went wrong.",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const WaterTests of selectWaterTest) {
        await deleteWaterTests(WaterTests?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedWaterTests();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.WATER_TEST}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectWaterTest.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.WATER_TEST}`}
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
        {selectWaterTest.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.WATER_TEST}`}
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
        {selectWaterTest.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.WATER_TEST}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.WATER_TEST}`}
      >
        <WaterTestList
          selectedRows={selectWaterTest}
          onRowSelect={toggleWaterTestSelect}
          selectAll={selectAllWaterTests}
          unSelectAll={resetSelectedWaterTests}
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

export default WaterTest;
