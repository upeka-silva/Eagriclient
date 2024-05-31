import { Box } from "@mui/material";
import React from "react";
import CustFormHeader from "../FormHeader/CustFormHeader";
import BackToList from "../BackToList/BackToList";
import { useTranslation } from "react-i18next";

const PageHeader = ({ saving, state, formName, goBack }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <CustFormHeader saving={saving} state={state} formName={formName} />
      <BackToList goBack={goBack} />
    </Box>
  );
};

export default PageHeader;
