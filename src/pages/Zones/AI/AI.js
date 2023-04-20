import React, { useCallback, useState } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import theme from "../../../utils/theme/theme.json";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AIList from "./AIList";

const AI = () => {
  const navigation = useNavigate();
  const [selectedAi, setSelectedAi] = useState(null);
  const [selectedAiGroup, setSelectedAiGroup] = useState([]);
  const [action, setAction] = useState("new");

  const onCreate = useCallback(() => {
    setAction("new");
    navigation("/zone/ai-region-form");
  }, []);

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          component={
            <Button
              variant="container"
              startIcon={<PlusIcon />}
              sx={{ background: theme.coreColors.secondary }}
              onClick={onCreate}
            >
              ADD
            </Button>
          }
        />
        {selectedAiGroup.length === 1 ? (
          <PermissionWrapper
            component={<Button variant="container" color="info" />}
          />
        ) : null}
        {selectedAiGroup.length === 1 ? (
          <PermissionWrapper
            component={
              <Button
                variant="contained"
                color="info"
                startIcon={<ModeEditIcon />}
                sx={{ ml: "5px" }}
              >
                Update
              </Button>
            }
          />
        ) : null}
      </ActionWrapper>
      <PermissionWrapper component={<AIList />} />
    </div>
  );
};

export default AI;
