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
import GnDivisionList from "./GnDivisionList"


const GnDivision = () => {

  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedGnDivisions, setSelectedGnDivisions] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);


  const toggleGnDivisionSelect = (component) => {
    setSelectedGnDivisions((current = []) => {
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

  const selectAllGnDivisions = (all = []) => {
    setSelectedGnDivisions(all);
  };

  const resetSelectedGnDivisions = () => {
    setSelectedGnDivisions([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/gn-division-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/gn-division-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedGnDivisions[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/gn-division-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedGnDivisions[0] || {},
      },
    });
  };

  return (
    <div>
      <ActionWrapper>
      {/* <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.GNDIVISION}`}
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
      {selectedGnDivisions.length === 1 && (
        // <PermissionWrapper
        //   permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.GNDIVISION}`}
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
      {selectedGnDivisions.length === 1 && (
        //      <PermissionWrapper
        //      permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.GNDIVISION}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.GNDIVISION}`}
      >
        <ProvinceList
          selectedRows={selectedProvinces}
          onRowSelect={toggleProvinceSelect}
          selectAll={selectAllProvinces}
          unSelectAll={resetSelectedProvinces}
        />
      </PermissionWrapper> */}
      <PermissionWrapper withoutPermissions>
        <GnDivisionList
          selectedRows={selectedGnDivisions}
          onRowSelect={toggleGnDivisionSelect}
          selectAll={selectAllGnDivisions}
          unSelectAll={resetSelectedGnDivisions}
        />
           </PermissionWrapper>
    </div>
  )
}

export default GnDivision