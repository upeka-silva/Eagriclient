import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Autocomplete,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  handleDsDivision,
  updateDsDivision,
} from "../../../redux/actions/dsDivision/action";

import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { PathName } from "../../../components/FormLayout/PathName";

import {
  ActionWrapper,
  makeCapitalize,
} from "../../../components/PageLayout/ActionWrapper";
import { get_DistrictList } from "../../../redux/actions/district/action";
import { useEffect } from "react";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";

const DsDivisionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [options, setOptions] = useState([]);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/ga-structure/ds-division");
  };

  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      setOptions(dataList);
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

  const getPathName = () => {
    return location.pathname === "/" || !location.pathname
      ? ""
      : location.pathname;
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
      {/* <PathName >{getPathName()}</PathName> */}
      <FormHeader >
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
        {makeCapitalize(state?.action)} DS Division
      </FormHeader>
      <ButtonWrapper style={{
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
        <Grid item lg={3}>
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
            <FieldName>DS Division Name</FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "name")}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
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
            <FieldName>District Name</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={options}
              value={formData ? formData.districtDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "districtDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
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
