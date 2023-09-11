import { Button } from "@mui/material";
import React from "react";
import { ActionWrapper } from "../PageLayout/ActionWrapper";
import { Add, Edit } from "@mui/icons-material";
import { ButtonWrapper } from "../FormLayout/ButtonWrapper";

const FormButtonGroup = ({
  state,
  DEF_ACTIONS,
  saving,
  enableSave,
  handleFormSubmit,
  resetForm,
}) => {
  return (
    <ButtonWrapper
      style={{
        width: "95%",
        justifyContent: "flex-start",
        margin: "0",
        paddingLeft: "18px",
      }}
    >
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
              >
                {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />}
                {/* {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"} */}
              </Button>
              <Button
                onClick={resetForm}
                color="success"
                variant="contained"
                size="small"
                sx={{ marginLeft: "10px" }}
              >
                RESET
              </Button>
            </>
          )}
        </ActionWrapper>
      )}
    </ButtonWrapper>
  );
};

export default FormButtonGroup;
