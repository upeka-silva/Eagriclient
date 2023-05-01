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
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../../utils/constants/permission";

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


  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          component={
            <Button
              variant="container"
              startIcon={<PlusIcon />}
              sx={{ background: theme.coreColors.secondary }}
   
            >
              ADD
            </Button>
          }
        />
       
      </ActionWrapper>
      <PermissionWrapper component={<AIList />} />
    </div>
  );
};

export default AI;
