import React, { useState } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button } from "@mui/material";
import InterProvinceList from "./InterProvinceList";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../../utils/constants/permission";

const InterProvince = () => {

  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedInterProvinceArea, setSelectedInterProvinceArea] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleInterProvinceAreaSelect = (component) => {
    setSelectedInterProvinceArea((current = []) => {
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

  const selectAllInterProvinceArea = (all = []) => {
    setSelectedInterProvinceArea(all);
  };

  const resetSelectedInterProvinceArea = () => {
    setSelectedInterProvinceArea([]);
  }

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/agri-zone/inter-province-area-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/agri-zone/inter-province-area-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedInterProvinceArea[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/agri-zone/inter-province-area-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedInterProvinceArea[0] || {},
      },
    });
  };


  return (
    <div>
      <ActionWrapper>
      <PermissionWrapper withoutPermissions>
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectedInterProvinceArea.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.INTER_PROVINCE_AREA}`}
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
       {selectedInterProvinceArea.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.INTER_PROVINCE_AREA}`}
          // >
          //   <Button
          //     variant="contained"
          //     color="info"
          //     onClick={onView}
          //     sx={{ ml: "8px" }}
          //   >
          //     {DEF_ACTIONS.VIEW}
          //   </Button>
          // </PermissionWrapper>
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.INTER_PROVINCE_AREA}`}
      >
        <ProvinceList
          selectedRows={selectedProvinces}
          onRowSelect={toggleProvinceSelect}
          selectAll={selectAllProvinces}
          unSelectAll={resetSelectedProvinces}
        />
      </PermissionWrapper> */}
      <PermissionWrapper withoutPermissions>
        <InterProvinceList
          selectedRows={selectedInterProvinceArea}
          onRowSelect={toggleInterProvinceAreaSelect}
          selectAll={selectAllInterProvinceArea}
          unSelectAll={resetSelectedInterProvinceArea}
        />
      </PermissionWrapper>
    </div>
  );
};

export default InterProvince;
