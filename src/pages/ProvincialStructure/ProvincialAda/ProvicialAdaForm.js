import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  get_ProvincialDoaList,
  handleProvincialDoa,
  updateProvincialDoa,
} from "../../../redux/actions/ProvincialDoa/action";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  TextField,
  getPaginationItemUtilityClass,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import {
  ActionWrapper,
  makeCapitalize,
} from "../../../components/PageLayout/ActionWrapper";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";
import {
  get_ProvincialDdoaList,
  handleProvincialDdoa,
  updateProvincialDdoa,
} from "../../../redux/actions/provincialDdoa/action";
import {
  handleProvincialAda,
  updateProvincialAda,
} from "../../../redux/actions/provincialAda/action";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";

const ProvincialAdaForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const [proDeputyDirectorLevels, setProDeputyDirectorLevels] = useState([]);
  const [selectedProDirectorLevel, setSelectedProDirectorLevel] = useState();

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/provincial-structure/provincial-deputy-director");
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
          await updateProvincialAda(formData, onSuccess, onError);
        } else {
          await handleProvincialAda(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    get_ProvincialDdoaList().then(({ dataList = [] }) => {
      setProDeputyDirectorLevels(dataList);
      console.log(dataList);
    });
  }, []);

  return (
    <FormWrapper>
      <BackToList goBack={goBack} />
      <CustFormHeader
        saving={saving}
        state={state}
        formName="Provincial ADA Segment"
      />
      <FormButtonGroup
        state={state}
        DEF_ACTIONS={DEF_ACTIONS}
        saving={saving}
        enableSave={enableSave}
        handleFormSubmit={handleFormSubmit}
        resetForm={resetForm}
      />
      <Grid
        container
        sx={{
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item lg={3} sm={6} xs={12}>
          <FieldWrapper>
            <FieldName>Province Segment Id</FieldName>
            <TextField
              name="provinceSegmentId"
              id="provinceSegmentId"
              value={formData?.provinceSegmentId || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "provinceSegmentId")
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
        <Grid item lg={4} sm={6} xs={12}>
          <FieldWrapper>
            <FieldName>Description</FieldName>
            <TextField
              name="description"
              id="description"
              value={formData?.description || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "description")
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
        <Grid item lg={4} sm={6} xs={12}>
          <FieldWrapper>
            <FieldName>Provincial Deputy Director Level</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={proDeputyDirectorLevels}
              value={
                formData.proDeputyDirectorLevelDTO || selectedProDirectorLevel
              }
              getOptionLabel={(i) => `${i?.provincialDdId}- ${i?.description} `}
              onChange={(event, value) => {
                console.log(value);
                setSelectedProDirectorLevel(value);
                handleChange(value, "proDeputyDirectorLevelDTO");
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

export default ProvincialAdaForm;
