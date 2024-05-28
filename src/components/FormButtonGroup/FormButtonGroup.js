import { Button, useTheme } from "@mui/material";
import React from "react";
import { ActionWrapper } from "../PageLayout/ActionWrapper";
import { Circle } from "@mui/icons-material";
import { ButtonWrapper } from "../FormLayout/ButtonWrapper";
import { FieldWrapper } from "../FormLayout/FieldWrapper";
import { FieldName } from "../FormLayout/FieldName";
import { tokens } from "../../utils/theme/app-theme";
import { useTranslation } from "react-i18next";

const FormButtonGroup = ({
  state,
  DEF_ACTIONS,
  saving,
  enableSave,
  handleFormSubmit,
  resetForm,
  isVerifiedFunctionality,
  verifyForm,
  verifiedStatus,
  isHideResetButton,
  isHideUpdateButton,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  return (
    <ButtonWrapper
      style={{
        justifyContent: "flex-start",
        margin: "0",
        paddingLeft: "10px",
      }}
    >
      {/* <BackToList goBack={""}/> */}
      {state?.action !== DEF_ACTIONS.VIEW && (
        <ActionWrapper>
          {saving ? (
            <Button variant="contained">
              {state?.action === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                disabled={!enableSave()}
                onClick={handleFormSubmit}
                size="small"
                color="success"
                sx={{ display: isHideUpdateButton ? "none" : undefined }}
              >
                {/* {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />} */}
                {state?.action === DEF_ACTIONS.ADD
                  ? t("action").save
                  : t("action").update}
              </Button>
              <Button
                disabled={state?.action === DEF_ACTIONS.VIEW || !enableSave()}
                hidden
                onClick={resetForm}
                color="success"
                variant="contained"
                size="small"
                sx={{
                  marginLeft: "10px",
                  display: isHideResetButton ? "none" : undefined,
                }}
              >
                {t("action").reset}
              </Button>
              {isVerifiedFunctionality && state?.action !== DEF_ACTIONS.ADD && (
                <Button
                  onClick={verifyForm}
                  color="success"
                  variant="contained"
                  size="small"
                  sx={{ marginLeft: "10px" }}
                >
                  <span>{t("action").verify}</span>
                </Button>
              )}
            </>
          )}
        </ActionWrapper>
      )}
      {isVerifiedFunctionality && state?.action !== DEF_ACTIONS.ADD && (
        <FieldWrapper
          style={{
            marginLeft: "auto",
          }}
        >
          {verifiedStatus === true ? (
            <FieldName>
              Verified{" "}
              <Circle
                style={{ color: colors.green[400], marginBottom: "-6px" }}
              />
            </FieldName>
          ) : (
            <FieldName>
              Not Verified{" "}
              <Circle
                style={{ color: colors.yellow[100], marginBottom: "-6px" }}
              />
            </FieldName>
          )}
        </FieldWrapper>
      )}
    </ButtonWrapper>
  );
};

export default FormButtonGroup;
