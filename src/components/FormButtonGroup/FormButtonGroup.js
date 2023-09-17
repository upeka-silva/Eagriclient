import { Button } from "@mui/material";
import React from "react";
import { ActionWrapper } from "../PageLayout/ActionWrapper";
import {Add, Circle, Edit} from "@mui/icons-material";
import { ButtonWrapper } from "../FormLayout/ButtonWrapper";
import {FieldWrapper} from "../FormLayout/FieldWrapper";
import {FieldName} from "../FormLayout/FieldName";

const FormButtonGroup = ({
  state,
  DEF_ACTIONS,
  saving,
  enableSave,
  handleFormSubmit,
  resetForm, isVerifiedFunctionality, verifyForm, verifiedStatus
}) => {

  return (
    <ButtonWrapper
      style={{
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
              {isVerifiedFunctionality && (state?.action !== DEF_ACTIONS.ADD) &&
                <Button
                    onClick={verifyForm}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                >
                    {verifiedStatus === false ?
                        <span>VERIFY</span>
                        :
                        <span>NOT VERIFY</span>
                    }
                </Button>
              }
            </>
          )}
        </ActionWrapper>
      )}
    {isVerifiedFunctionality && (state?.action !== DEF_ACTIONS.ADD) &&
        <FieldWrapper style={{
            marginLeft: "auto",
        }}>
            {verifiedStatus === true ?
                <FieldName>Verified <Circle
                    style={{color: 'green', marginBottom: "-6px"}}/>
                </FieldName>
            :
                <FieldName>Not Verified <Circle
                    style={{color: 'yellow', marginBottom: "-6px"}}/>
                </FieldName>
            }

        </FieldWrapper>
    }
    </ButtonWrapper>
  );
};

export default FormButtonGroup;
