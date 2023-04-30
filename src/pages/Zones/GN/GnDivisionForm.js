import React, { useState } from "react";
import { TextField, Button, CircularProgress, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { handleGnDivision } from "../../../redux/actions/gnDivision/action";
import { Colors } from "../../../utils/constants/Colors";
import { Fonts } from "../../../utils/constants/Fonts";

import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { PathName } from "../../../components/FormLayout/PathName";

import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";

const GnDivisionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/gn-division");
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
        await handleGnDivision(formData, onSuccess, onError);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPathName = () => {
    return location.pathname === "/" || !location.pathname
      ? ""
      : location.pathname;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", backgroundColor: `${Colors.white}`, padding: "18px 12px", fontFamily: `${Fonts.fontStyle1}`, justifyContent: "space-between" }}>
      <ActionWrapper isLeft>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
          Go back to list
        </Button>
      </ActionWrapper>
      <PathName>{getPathName()}</PathName>
      <FormHeader>
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}Add a Grama
        Niladari Division
      </FormHeader>
      <Grid direction="row" container>
      <FormWrapper style={{padding: "18px 0px"}}>
        <FieldWrapper>
          <FieldName>Division ID</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Division <br /> Name</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Divisional <br /> Secretariats <br /> Division ID</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Agro <br /> ecological <br /> zone ID</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Mahaweli <br /> Block ID</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>AI Region</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
      </FormWrapper>
      <FormWrapper>
        <FieldWrapper>
          <FieldName>Total <br /> Households</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Total <br /> Population</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Male <br /> Population</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Female <br /> Population</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
      </FormWrapper>
      <FormWrapper>
        <FieldWrapper>
          <FieldName>Land Area</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Agriculture <br /> Land Area</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Non - <br /> Agriculture <br /> Land Area</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>Crop Area</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
      </FormWrapper>
      </Grid>
      <ButtonWrapper style={{width: "100%"}}>
      {state?.action !== DEF_ACTIONS.VIEW && (
          <ActionWrapper>
            {saving ? (
              <AddButton variant="contained" disabled>
                {state?.action === DEF_ACTIONS.ADD
                  ? "ADDING..."
                  : "UPDATING..."}
              </AddButton>
            ) : (
              <>
                <AddButton
                  variant="contained"
                  disabled={!enableSave()}
                  onClick={handleFormSubmit}
                >
                  {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
                </AddButton>
                <ResetButton onClick={resetForm}>RESET</ResetButton>
              </>
            )}
          </ActionWrapper>
        )}
      </ButtonWrapper>
    </div>
  );
};

export default GnDivisionForm;
