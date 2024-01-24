import React from "react";
import { CircularProgress } from "@mui/material";
import { makeCapitalize } from "../PageLayout/ActionWrapper";
import { FormHeader } from "../FormLayout/FormHeader";

function CustFormHeader({ saving, state, formName, isShowAction = true }) {
  return (
    <FormHeader>
      {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
      {isShowAction && <span>{makeCapitalize(state?.action)}</span>} 
      {formName}
    </FormHeader>
  );
}

export default CustFormHeader;
