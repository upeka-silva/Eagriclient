import React, { useState} from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button } from "@mui/material";
import ASCList from "./ASCList";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";

const ASC = () => {
  useUserAccessValidation();

  const [selectedAsc, setSelectedAsc] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const navigate = useNavigate();

  const toggleAscSelect = (component) => {
    setSelectedAsc((current = []) => {
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

  const selectAllAsc = (all = []) => {
    setSelectedAsc(all);
  };

  const resetSelectedAsc = () => {
    setSelectedAsc([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/dad-structure/asc-area-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/dad-structure/asc-area-form", {
      state: { action: DEF_ACTIONS.EDIT, target: selectedAsc[0] || {} },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/dad-structure/asc-area-form", {
      state: { action: DEF_ACTIONS.VIEW, target: selectedAsc[0] || {} },
    });
  };

  return (
    <div>
      <ActionWrapper>
        {/* <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.ASC}`}
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

        {selectedAsc.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ASC}`}
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
          {selectedAsc.length === 1 && (
          //      <PermissionWrapper
          //      permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.ASC}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCE}`}
      >
        <ProvinceList
          selectedRows={selectedProvinces}
          onRowSelect={toggleProvinceSelect}
          selectAll={selectAllProvinces}
          unSelectAll={resetSelectedProvinces}
        />
      </PermissionWrapper> */}
      <PermissionWrapper withoutPermissions>
        <ASCList
          selectedRows={selectedAsc}
          onRowSelect={toggleAscSelect}
          selectAll={selectAllAsc}
          unSelectAll={resetSelectedAsc}
        />
      </PermissionWrapper>
    </div>
  );
};

export default ASC;
