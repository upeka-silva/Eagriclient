import React, { useState } from "react";
import { Button } from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper"
import { useUserAccessValidation } from "../../../hooks/authentication";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../../utils/constants/permission";

import { useNavigate } from "react-router";
import SoilTypeList from "./SoilTypeList";


const SoilType = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedSoilTypes, setSelectedSoilTypes] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleSoilTypesSelect = (component) => {
    setSelectedSoilTypes((current = []) => {
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

  const selectAllSoilTypes = (all = []) => {
    setSelectedSoilTypes(all);
  };

  const resetSelectedSoilTypes = () => {
    setSelectedSoilTypes([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/soil/soil-type-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/soil/soil-type-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedSoilTypes[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/soil/soil-type-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedSoilTypes[0] || {},
      },
    });
  };


  return (
    <div>
      <ActionWrapper>
       <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.SOIL_TYPE}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectedSoilTypes.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_TYPE}`}
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
          {selectedSoilTypes.length === 1 && (
               <PermissionWrapper
               permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.SOIL_TYPE}`}
           >
               <Button
                   variant='contained'
                   color='info'
                   onClick={onView}
                   sx={{ ml: '8px' }}
               >
                   {DEF_ACTIONS.VIEW}
               </Button>
           </PermissionWrapper>
        )}
      </ActionWrapper>
    <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.SOIL_TYPE}`}
      >
        <SoilTypeList
           selectedRows={selectedSoilTypes}
           onRowSelect={toggleSoilTypesSelect}
           selectAll={selectAllSoilTypes}
           unSelectAll={resetSelectedSoilTypes}
        />
      </PermissionWrapper>
    </div>
  );
};

export default SoilType;
