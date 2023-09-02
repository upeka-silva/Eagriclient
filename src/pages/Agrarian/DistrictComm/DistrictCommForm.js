import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  handleDistrictComm,
  updateDistrictComm,
} from "../../../redux/actions/districtComm/action";
import { get_AgrarDevDeptList } from "../../../redux/actions/agrarDevDept/action";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";

const DistrictCommForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const [agrarDevDepts, setAgrarDevDepts] = useState([]);
  const [selectedAgrarDevDept, setSelectedAgrarDevDept] = useState();

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/agrarian/district-commissioner");
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
          await updateDistrictComm(formData, onSuccess, onError);
        } else {
          await handleDistrictComm(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    get_AgrarDevDeptList().then(({ dataList = [] }) => {
      setAgrarDevDepts(dataList);
      console.log(dataList);
    });
  }, []);

  return (
    <FormWrapper>
      <BackToList goBack={goBack} />
      <CustFormHeader
        saving={saving}
        state={state}
        formName="District Commissioner"
      />
      <FormButtonGroup
        {...{
          state,
          DEF_ACTIONS,
          saving,
          enableSave,
          handleFormSubmit,
          resetForm,
        }}
      />
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
            <FieldName>District Commissioner Id</FieldName>
            <TextField
              name="districtCommId"
              id="districtCommId"
              value={formData?.districtCommId || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "districtCommId")
              }
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
        <Grid item lg={5}>
          <FieldWrapper>
            <FieldName>District Commissioner Name</FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "name")}
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
            <FieldName>Department of Agrarian development</FieldName>
            <Autocomplete
              // disabled={state?.action === DEF_ACTIONS.VIEW}
              options={agrarDevDepts}
              value={selectedAgrarDevDept}
              getOptionLabel={(i) => `${i?.doAgrarianDevelopmentId}-${i?.name}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedAgrarDevDept(value);
                handleChange(value, "doAgrarianDevelopmentDTO");
              }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
                marginRight: "5px",
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default DistrictCommForm;
