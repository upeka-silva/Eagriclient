import React, { useCallback, useState } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import theme from "../../../utils/theme/theme.json";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AIList from "./AIList";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";

const AI = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedAI, setSelectedAI] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleAISelect = (component) => {
    setSelectedAI((current = []) => {
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

  const selectAllAI = (all = []) => {
    setSelectedAI(all);
  };

  const resetSelectedAI = () => {
    setSelectedAI([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/aa-structure/ai-region-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/aa-structure/ai-region-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedAI[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/aa-structure/ai-region-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedAI[0] || {},
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

        {selectedAI.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.AI}`}
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
          {selectedAI.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AI}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AI}`}
      >
        <ProvinceList
          selectedRows={selectedProvinces}
          onRowSelect={toggleProvinceSelect}
          selectAll={selectAllProvinces}
          unSelectAll={resetSelectedProvinces}
        />
      </PermissionWrapper> */}
      <PermissionWrapper withoutPermissions>
        <AIList
          selectedRows={selectedAI}
          onRowSelect={toggleAISelect}
          selectAll={selectAllAI}
          unSelectAll={resetSelectedAI}
        />
      </PermissionWrapper>
    </div>
  );
};

export default AI;
