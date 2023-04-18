import React, { useState, useCallback } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Button, Typography } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import theme from "../../../utils/theme/theme.json";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CustomDialog from "../../../components/PageLayout/Dialog";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { Link } from "react-router-dom";
import ASCList from "./ASCList";

const ASC = () => {
  const [selectedAsc, setSelectedAsc] = useState(null);
  const [selectedAscGroup, setSelectedAscGroup] = useState([]);
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
              to="/zone/asc-area-form"
            >
              ADD
            </Button>
          }
        />
        {selectedAscGroup.length === 1 ? (
          <PermissionWrapper
            component={<Button variant="container" color="info" />}
          />
        ) : null}
        {selectedAscGroup.length === 1 ? (
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
      <PermissionWrapper
      component={
        <ASCList />
      }
      />
    </div>
  );
};

export default ASC;
