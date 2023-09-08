import React, { useState } from "react";
import { Grid, TextField, FormControl, Autocomplete } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { handleArpa, updateArpa } from "../../../redux/actions/arpa/action";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { get_ASC, get_ASCListByComId } from "../../../redux/actions/asc/action";
import { useEffect } from "react";
import { get_DistrictCommList } from "../../../redux/actions/districtComm/action";

const ARPAForm = () => {
  const navigate = useNavigate();

  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [options, setOptions] = useState([]);
  const { addSnackBar } = useSnackBars();

  const [dcomms, setDcomms] = useState([]);
  const [selectedDcomm, setSelectedDcomm] = useState({
    districtCommId: "",
    name: "",
  });
  const [ascDivisions, setAscDivisions] = useState([]);
  const [selectedAscDivision, setSelectedAscDivision] = useState({
    ascId: "",
    name: "",
  });

  const goBack = () => {
    navigate("/zone/agrarian/arpa-division");
  };

  useEffect(() => {
    get_ASC().then(({ dataList = [] }) => {
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
          await updateArpa(formData, onSuccess, onError);
        } else {
          await handleArpa(formData, onSuccess, onError);
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

  useEffect(() => {
    get_DistrictCommList().then(({ dataList = [] }) => {
      setDcomms(dataList);
    });
  }, []);

  const getAscDivisions = (id) => {
    get_ASCListByComId(id).then(({ dataList = [] }) => {
      setAscDivisions(dataList);
    });
  };

  return (
    <FormWrapper>
      <BackToList goBack={goBack} />
      <CustFormHeader saving={saving} state={state} formName="ARPA Division" />
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
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>ARPA Division ID</FieldName>
            <TextField
              name="arpaId"
              id="arpaId"
              value={formData?.arpaId || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) => handleChange(e?.target?.value || "", "arpaId")}
              inputProps={{ style: { textTransform: "uppercase" } }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>ARPA Division Name</FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "name")}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FormControl fullWidth>
              <FieldName>Select District Commissioner</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW}
                options={dcomms}
                value={selectedDcomm}
                getOptionLabel={(i) => `${i.districtCommId} - ${i.name}`}
                onChange={(event, value) => {
                 setSelectedDcomm(value)
                 setSelectedAscDivision({
                  ascId: "",
                  name: "",
                })
                 getAscDivisions(value.id)
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </FormControl>
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FormControl fullWidth>
              <FieldName>Select ASC Division </FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW || selectedDcomm.id == null}
                options={options}
                value={ formData?.ascDto || selectedAscDivision}
                getOptionLabel={(i) => `${i.ascId} - ${i.name}`}
                onChange={(event, value) => {
                  handleChange(value, "ascDto");
                  setSelectedAscDivision(value)
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </FormControl>
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default ARPAForm;
