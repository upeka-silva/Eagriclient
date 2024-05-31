import React from "react";
import { CircularProgress } from "@mui/material";
import { makeCapitalize } from "../PageLayout/ActionWrapper";
import { FormHeader } from "../FormLayout/FormHeader";
import { useTranslation } from "react-i18next";

function CustFormHeader({ saving, state, formName, isShowAction = true }) {
  const { t } = useTranslation();
  return (
    <FormHeader>
      {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
      {isShowAction && (
        <span>{t("action")[makeCapitalize(state?.action)]}</span>
      )}{" "}
      - {t(formName)}
    </FormHeader>
  );
}

export default CustFormHeader;
