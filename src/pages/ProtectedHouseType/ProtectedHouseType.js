import React, { useState } from "react";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import {
  Button,
  ButtonGroup,
} from "@mui/material";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import ListHeader from "../../components/ListHeader/ListHeader";
import {
  deleteProtectedHousType,
} from "../../redux/actions/protectedHouseType/action";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ProtectedHouseTypeList from "./ProtectedHouseTypeList";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";

const ProtectedHouseType = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [dataEndPoint, setDataEndPoint] = useState({
    protectedHouseType: "protected-house-types",
  });

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [selectedProtectedHouseType, setSelectedProtectedHouseType] = useState([]);

  const toggleProtectedHouseTypeSelect = (component) => {
    setSelectedProtectedHouseType((current = []) => {
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

  const selectAllProvincialAI = (all = []) => {
    setSelectedProtectedHouseType(all);
  };

  const resetSelectedProvincialAI = () => {
    setSelectedProtectedHouseType([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/protected-house-type-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/protected-house-type-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProtectedHouseType[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/protected-house-type-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProtectedHouseType[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully deleted",
    });
  };

  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "Failed to delete",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const provincialAI of selectedProtectedHouseType) {
        await deleteProtectedHousType(provincialAI.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedProvincialAI();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <ListHeader title="Protected House Type" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROTECTED_HOUSE_TYPE}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>

          {selectedProtectedHouseType.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROTECTED_HOUSE_TYPE}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedProtectedHouseType.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROTECTED_HOUSE_TYPE}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedProtectedHouseType.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROTECTED_HOUSE_TYPE}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROTECTED_HOUSE_TYPE}`}
      >
        {loading === false && (
          <ProtectedHouseTypeList
            selectedRows={selectedProtectedHouseType}
            onRowSelect={toggleProtectedHouseTypeSelect}
            selectAll={selectAllProvincialAI}
            unSelectAll={resetSelectedProvincialAI}
            dataEndPoint={dataEndPoint.protectedHouseType}
          />
        )}
      </PermissionWrapper>
      <DeleteDialog
        open={open}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Delete Protected House Type"
        content="Are you sure you want to delete the selected Protected House Type?"
        loading={loading}
        selectedProtectedHouseType={selectedProtectedHouseType}
      />
    </div>
  );
};

export default ProtectedHouseType;
