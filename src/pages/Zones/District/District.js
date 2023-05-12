import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import DistrictList from "./DistrictList";

const District = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleDistrictSelect = (component) => {
    setSelectedDistricts((current = []) => {
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

  const selectAllDistricts = (all = []) => {
    setSelectedDistricts(all);
  };

  const resetSelectedDistricts = () => {
    setSelectedDistricts([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ga-structure/district-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ga-structure/district-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedDistricts[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ga-structure/district-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedDistricts[0] || {},
      },
    });
  };

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.DISTRICT}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectedDistricts.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DISTRICT}`}
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
        {selectedDistricts.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DISTRICT}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.DISTRICT}`}
      >
        <DistrictList
          selectedRows={selectedDistricts}
          onRowSelect={toggleDistrictSelect}
          selectAll={selectAllDistricts}
          unSelectAll={resetSelectedDistricts}
        />
      </PermissionWrapper>
    </div>
  );
};

export default District;
