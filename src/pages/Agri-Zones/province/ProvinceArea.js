import React, { useState, useCallback } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button, Typography } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import theme from "../../../utils/theme/theme.json";
import ProvinceAreaList from "./ProvinceAreaList";
import ProvinceAreaForm from "./ProvinceAreaForm";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";

const ProvinceArea = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedProvinceArea, setSelectedProvinceArea] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleProvinceAreaSelect = (component) => {
    setSelectedProvinceArea((current = []) => {
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

  const selectAllProvinceArea = (all = []) => {
    setSelectedProvinceArea(all);
  };

  const resetSelectedProvinceArea = () => {
    setSelectedProvinceArea([]);
  };



  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/agri-zone/province-area-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/agri-zone/province-area-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvinceArea[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/agri-zone/province-area-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvinceArea[0] || {},
      },
    });
  };



  return (
    <div>
      <ActionWrapper>
      <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROVINCE_AREA}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>

        {selectedProvinceArea.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROVINCE_AREA}`}
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
       {selectedProvinceArea.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROVINCE_AREA}`}
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
      </ActionWrapper>
       <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCE_AREA}`}
      >
       <ProvinceAreaList
          selectedRows={selectedProvinceArea}
          onRowSelect={toggleProvinceAreaSelect}
          selectAll={selectAllProvinceArea}
          unSelectAll={resetSelectedProvinceArea}
        />
      </PermissionWrapper>
     
    </div>
  );
};

export default ProvinceArea;
