import React, { useState, useCallback } from "react";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { Button } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import theme from "../../utils/theme/theme.json";
import SoilList from "./SoilList";
import { useNavigate } from "react-router-dom";

const Soil = () => {
  const navigation = useNavigate();

  const [selectedSoil, setSelectedSoil] = useState(null);
  const [selectedSoils, setSelectedSoils] = useState([]);
  const [action, setAction] = useState("new");

  const onCreate = useCallback(() => {
    setAction("new");
    navigation("/soil/soil-form")
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
        {selectedSoils.length === 1 ? (
          <PermissionWrapper
            component={<Button variant="container" color="info" />}
          />
        ) : null}
      </ActionWrapper>
      <PermissionWrapper component={<SoilList />} />
    </div>
  );
};

export default Soil;
