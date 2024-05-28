import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Download } from "@mui/icons-material";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import PermissionWrapper from "../PermissionWrapper/PermissionWrapper";
import { useTranslation } from "react-i18next";

const ExportButton = ({ onDownload }) => {
  const { t } = useTranslation();

  return (
    <ButtonGroup
      variant="outlined"
      disableElevation
      size="small"
      aria-label="export button group"
      color="success"
    >
      <PermissionWrapper>
        <Button
          onClick={onDownload}
          title={t("buttontooltip")["export"]}
          color="success"
        >
          <Download />
          {DEF_ACTIONS.EXPORT}
        </Button>
      </PermissionWrapper>
    </ButtonGroup>
  );
};

export default ExportButton;
