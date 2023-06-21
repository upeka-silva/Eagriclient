import React, { useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import AgroEcoList from "./AgroEcoList";

const AgroEco = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectedAgroEco, setSelectedAgroEco] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleAgroEcoSelect = (component) => {
    setSelectedAgroEco((current = []) => {
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

  const selectAllAgroEco = (all = []) => {
    setSelectedAgroEco(all);
  };

  const resetSelectedAgroEco = () => {
    setSelectedAgroEco([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ez-structure/agro-eco-zone-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ez-structure/agro-eco-zone-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedAgroEco[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ez-structure/agro-eco-zone-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedAgroEco[0] || {},
      },
    });
  };

  return (
    <div>
      <ActionWrapper isLeft>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.AGRO_ECO_ZONE}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectedAgroEco.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.AGRO_ECO_ZONE}`}
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
         {selectedAgroEco.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AGRO_ECO_ZONE}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGRO_ECO_ZONE}`}
      >
        <AgroEcoList
          selectedRows={selectedAgroEco}
          onRowSelect={toggleAgroEcoSelect}
          selectAll={selectAllAgroEco}
          unSelectAll={resetSelectedAgroEco}
        />
      </PermissionWrapper>
     
    </div>
  );
};

export default AgroEco;
