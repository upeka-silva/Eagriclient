import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Download } from "@mui/icons-material";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import PermissionWrapper from "../PermissionWrapper/PermissionWrapper";

const ExportButton = ({ onDownload }) => {
  return (
    <ButtonGroup
      variant="outlined"
      disableElevation
      size="small"
      aria-label="export button group"
      color="success"
    >
      <PermissionWrapper>
        <Button onClick={onDownload} title="export" color="success">
          <Download />
          {DEF_ACTIONS.EXPORT}
        </Button>
      </PermissionWrapper>
    </ButtonGroup>
  );
};

export default ExportButton;
