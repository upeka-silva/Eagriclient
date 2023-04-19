import React, { useState, useCallback } from "react";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { Button } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import theme from "../../utils/theme/theme.json";
import SoilList from "./SoilList";

const Soil = () => {
  const [selectedSoil, setSelectedSoil] = useState(null);
  const [selectedSoils, setSelectedSoils] = useState([]);

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          component={
            <Button
              variant="container"
              startIcon={<PlusIcon />}
              sx={{ background: theme.coreColors.secondary }}
              component={Link}
              to="/soil/soil-form"
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
      <PermissionWrapper component={<SoilList 

      />} />
    </div>
  );
};

export default Soil;
