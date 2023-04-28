import React, { useState } from "react";
import { Button } from "@mui/material";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper"
import { useUserAccessValidation } from "../../hooks/authentication";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";

import { useNavigate } from "react-router";
import SoilList from "./SoilList";


const Soil = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedSoils, setSelectedSoils] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleSoilsSelect = (component) => {
    setSelectedSoils((current = []) => {
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

  const selectAllSoils = (all = []) => {
    setSelectedSoils(all);
  };

  const resetSelectedSoils = () => {
    setSelectedSoils([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/soil/soil-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/soil/soil-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedSoils[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/soil/soil-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedSoils[0] || {},
      },
    });
  };


  return (
    <div>
      <ActionWrapper>
       {/* <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.SOIL}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper> */}
        <PermissionWrapper withoutPermissions>
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectedSoils.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL}`}
          // >
          //   <Button
          //     variant="contained"
          //     color="secondary"
          //     onClick={onEdit}
          //     sx={{ ml: "8px" }}
          //   >
          //     {DEF_ACTIONS.EDIT}
          //   </Button>
          // </PermissionWrapper>
          <PermissionWrapper withoutPermissions>
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
          {selectedSoils.length === 1 && (
          //      <PermissionWrapper
          //      permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL}`}
          //  >
          //      <Button
          //          variant='contained'
          //          color='info'
          //          onClick={onView}
          //          sx={{ ml: '8px' }}
          //      >
          //          {DEF_ACTIONS.VIEW}
          //      </Button>
          //  </PermissionWrapper>
          <PermissionWrapper withoutPermissions>
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
    {/* <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.SOIL}`}
      >
        <ProvinceList
          selectedRows={selectedProvinces}
          onRowSelect={toggleProvinceSelect}
          selectAll={selectAllProvinces}
          unSelectAll={resetSelectedProvinces}
        />
      </PermissionWrapper> */}
      <PermissionWrapper withoutPermissions>
        <SoilList
          selectedRows={selectedSoils}
          onRowSelect={toggleSoilsSelect}
          selectAll={selectAllSoils}
          unSelectAll={resetSelectedSoils}
        />
      </PermissionWrapper>
    </div>
  );
};

export default Soil;
