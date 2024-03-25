import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleEarlyWarningRegistartion,
  updateEarlyWarningRegistartion,
} from "../../../redux/actions/cropLook/earlyWarningRegistration/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";

import { useEffect } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { get_DistrictList } from "../../../redux/actions/district/action";
import { get_MahaweliBlockList } from "../../../redux/actions/mahaweliBlock/action";

const CropLookEarlyWarningRangesForm = () => {
  //useUserAccessValidation();
  const { state } = useLocation();
  //const location = useLocation();
  console.log(state);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  // const [districtOptions, setDistrictOptions] = useState([]);
  // const [mahaweliBlockOptions, setMahaweliBlockOptions] = useState([]);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/crop-look/early-warning-registration");
  };

  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      //setDistrictOptions(dataList);
    });
  }, []);

  useEffect(() => {
    get_MahaweliBlockList().then(({ dataList = [] }) => {
      //setMahaweliBlockOptions(dataList);
    });
  }, []);

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
    debugger;
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateEarlyWarningRegistartion(formData, onSuccess, onError);
        } else {
          await handleEarlyWarningRegistartion(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormWrapper>
      <PageHeader
        goBack={goBack}
        saving={saving}
        state={state}
        formName=" Early Warning Registration"
      />
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
              <Button variant="contained" color="success" size="small">
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
                  {state?.action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
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
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Two Week Recommendation</FieldName>
            <TextField
              name="twoWeekRecommendation"
              id="twoWeekRecommendation"
              value={formData?.twoWeekRecommendation || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "twoWeekRecommendation")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              inputProps={{ style: { textTransform: "uppercase" } }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Green Upper</FieldName>
            <TextField
              name="greenUpper"
              id="greenUpper"
              value={formData?.greenUpper || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "greenUpper")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Light Green Lower</FieldName>
            <TextField
              name="lightGreenLower"
              id="lightGreenLower"
              value={formData?.lightGreenLower || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "lightGreenLower")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Light Green Lower</FieldName>
            <TextField
              name="lightGreenUpper"
              id="lightGreenUpper"
              value={formData?.lightGreenUpper || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "lightGreenUpper")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Yellow Lower</FieldName>
            <TextField
              name="yellowLower"
              id="yellowLower"
              value={formData?.yellowLower || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "yellowLower")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Yellow Upper</FieldName>
            <TextField
              name="yellowUpper"
              id="yellowUpper"
              value={formData?.yellowUpper || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "yellowUpper")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Orange Lower</FieldName>
            <TextField
              name="orangeLower"
              id="orangeLower"
              value={formData?.orangeLower || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "orangeLower")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Orange Upper</FieldName>
            <TextField
              name="orangeUpper"
              id="orangeUpper"
              value={formData?.orangeUpper || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "orangeUpper")
              }
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Red Lower</FieldName>
            <TextField
              name="redLower"
              id="redLower"
              value={formData?.redLower || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "redLower")}
              sx={{
                "& .MuiInputBase-root": {
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

export default CropLookEarlyWarningRangesForm;
