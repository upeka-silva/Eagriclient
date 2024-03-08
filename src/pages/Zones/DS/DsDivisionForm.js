import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleDsDivision,
  updateDsDivision,
} from "../../../redux/actions/dsDivision/action";
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

const DsDivisionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  console.log(state);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [mahaweliBlockOptions, setMahaweliBlockOptions] = useState([]);


  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/ga-structure/ds-division");
  };

  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      setDistrictOptions(dataList);
    });
  }, []);
  
  useEffect(() => {
    get_MahaweliBlockList().then(({ dataList = [] }) => {
      setMahaweliBlockOptions(dataList);
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
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateDsDivision(formData, onSuccess, onError);
        } else {
          await handleDsDivision(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
      };

  return (
    <FormWrapper>
      <PageHeader goBack={goBack} saving={saving} state={state} formName="DS Division" />
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
            <FieldName>DS Division Code</FieldName>
            <TextField
              name="code"
              id="code"
              value={formData?.code || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) => handleChange(e?.target?.value || "", "code")}
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
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>DS Division Name</FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "name")}
              sx={{
               
                "& .MuiOutlinedInput-root": {
                 
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>District</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={districtOptions}
              value={formData ? formData.districtDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "districtDTO");
              }}
              sx={{
               
                "& .MuiOutlinedInput-root": {
                 
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
          
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Mahaweli Block</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={mahaweliBlockOptions}
              value={formData ? formData.mahaweliBlockDTO: ""}
              getOptionLabel={(i) => `${i.code} - ${i.description}`}
              onChange={(event, value) => {
                handleChange(value, "mahaweliBlockDTO");
              }}
              sx={{
               
                "& .MuiOutlinedInput-root": {
                 
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
          
        </Grid>
   </Grid>
    </FormWrapper>
      );
};

export default DsDivisionForm;
