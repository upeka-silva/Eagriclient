import React, { useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  handleProvincialDoa,
  updateProvincialDoa,
} from "../../../redux/actions/ProvincialDoa/action";
import { Button, CircularProgress, Grid, TextField, getPaginationItemUtilityClass } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { ActionWrapper, makeCapitalize } from "../../../components/PageLayout/ActionWrapper";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";

const ProvincialDoaForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/provincial-structure/provincial-director");
  };

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
    }
  };

  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (
      state?.action === DEF_ACTIONS.ADD &&
      Object.keys(formData || {}).length > 0
    ) {
      return true;
    }
    return false;
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateProvincialDoa(formData, onSuccess, onError);
        } else {
          await handleProvincialDoa(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormWrapper>
      <ActionWrapper isLeft>
        <Button  startIcon={<ArrowCircleLeftRounded />}
            onClick={goBack}
            color="success">
          Go back to list
        </Button>
      </ActionWrapper>
      {/* <PathName>{}</PathName> */}
      <FormHeader style={{ padding: "0px 15px" }}>
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
        {makeCapitalize(state?.action)} Provincial Director
      </FormHeader>
      <ButtonWrapper isCeneter  style={{
            width: "95%",
            justifyContent: "flex-start",
            margin: "0",
            paddingLeft: "18px",
          }}>
        {state?.action !== DEF_ACTIONS.VIEW && (
          <ActionWrapper>
            {saving ? (
                <Button variant="contained">
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
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
      <Grid
        container
        sx={{
          // border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
          
        }}
      >
        <Grid item lg={4}>
      <FieldWrapper>
        <FieldName>Provincial Level ID</FieldName>
        <TextField
          name="proDirectorId"
          id="proDirectorId"
          value={formData?.proDirectorId || ""}
          fullWidth
          disabled={
            state?.action === DEF_ACTIONS.VIEW ||
            state?.action === DEF_ACTIONS.EDIT
          }
          onChange={(e) => handleChange(e?.target?.value || "", "proDirectorId")}
          sx={{
            // width: "264px",
            "& .MuiInputBase-root": {
              // height: "30px",
              borderRadius: "8px",
            },
          }}
          size="small"

        />
      </FieldWrapper>
      </Grid>
      <Grid item lg={4}>
      <FieldWrapper>
        <FieldName>Description</FieldName>
        <TextField
          name="description"
          id="description"
          value={formData?.description || ""}
          fullWidth
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "description")}
          sx={{
            // width: "264px",
            "& .MuiInputBase-root": {
              // height: "30px",
              borderRadius: "8px",
            },
          }}
          size="small"
        />
      </FieldWrapper>
      </Grid>
      </Grid>
      
    </FormWrapper>
  );
};

export default ProvincialDoaForm;
