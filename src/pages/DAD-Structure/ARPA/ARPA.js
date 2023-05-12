import React, { useState } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button } from "@mui/material";
import ARPAList from "./ARPAList";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";

const ARPA = () => {
  useUserAccessValidation();

  const [selectedArpa, setSelectedArpa] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const navigate = useNavigate();

  const toggleArpaSelect = (component) => {
    setSelectedArpa((current = []) => {
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

  const selectAllArpa = (all = []) => {
    setSelectedArpa(all);
  };

  const resetSelectedArpa = () => {
    setSelectedArpa([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/dad-structure/arpa-area-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/dad-structure/arpa-area-form", {
      state: { action: DEF_ACTIONS.EDIT, target: selectedArpa[0] || {} },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/dad-structure/arpa-area-form", {
      state: { action: DEF_ACTIONS.VIEW, target: selectedArpa[0] || {} },
    });
  };

  return (
    <div>
      <ActionWrapper>
        {/* <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.ARPA}`}
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
        {selectedArpa.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ARPA}`}
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
        {selectedArpa.length === 1 && (
          //      <PermissionWrapper
          //      permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ARPA}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ARPA}`}
      >
        <ProvinceList
          selectedRows={selectedProvinces}
          onRowSelect={toggleProvinceSelect}
          selectAll={selectAllProvinces}
          unSelectAll={resetSelectedProvinces}
        />
      </PermissionWrapper> */}
      <PermissionWrapper withoutPermissions>
        <ARPAList
          selectedRows={selectedArpa}
          onRowSelect={toggleArpaSelect}
          selectAll={selectAllArpa}
          unSelectAll={resetSelectedArpa}
        />
      </PermissionWrapper>
    </div>
  );
};

export default ARPA;
