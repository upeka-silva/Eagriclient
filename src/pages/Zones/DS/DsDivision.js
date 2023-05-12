import React, { useState } from 'react'
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DsDivisionList from "./DsDivisionList"

const DsDivision = () => {

  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedDsDivisions, setSelectedDsDivisions] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleDsDivisionSelect = (component) => {
    setSelectedDsDivisions((current = []) => {
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

  const selectAllDsDivisions = (all = []) => {
    setSelectedDsDivisions(all);
  };

  const resetSelectedDsDivisions = () => {
    setSelectedDsDivisions([]);
  };


  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ga-structure/ds-division-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ga-structure/ds-division-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedDsDivisions[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ga-structure/ds-division-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedDsDivisions[0] || {},
      },
    });
  };


  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.DS_DIVISION}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectedDsDivisions.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DS_DIVISION}`}
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
         {selectedDsDivisions.length === 1 && (
               <PermissionWrapper
               permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DS_DIVISION}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.DS_DIVISION}`}
      >
      <DsDivisionList
          selectedRows={selectedDsDivisions}
          onRowSelect={toggleDsDivisionSelect}
          selectAll={selectAllDsDivisions}
          unSelectAll={resetSelectedDsDivisions}
        />
      </PermissionWrapper>
    </div>
  )
}

export default DsDivision