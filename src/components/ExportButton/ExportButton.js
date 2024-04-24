import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Download } from "@mui/icons-material";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { downloadCropExcel } from "../../redux/actions/crop/crop/action";
import PermissionWrapper from "../PermissionWrapper/PermissionWrapper";


const ExportButton = () => {
  const onDownload = async () => {
    try {
      await downloadCropExcel();
    } catch (error) {
      console.error(error);
    }
  };

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
