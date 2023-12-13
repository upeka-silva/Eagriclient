import {
  Autocomplete,
  Grid,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleMahaweliBlock,
  updateMahaweliBlock,
} from "../../../redux/actions/mahaweliBlock/action";
import { get_MahaweliSystemList } from "../../../redux/actions/mahaweliSystem/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

const MahaweliBlockForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  console.log(state);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const [mahaweliSystems, setMahaweliSystems] = useState([]);
  const [selectedMahaweliSystem, setSelectedMahaweliSystem] = useState();

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/mahaweli-structure/mahaweli-block");
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
          await updateMahaweliBlock(formData, onSuccess, onError);
        } else {
          await handleMahaweliBlock(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    get_MahaweliSystemList().then(({ dataList = [] }) => {
      setMahaweliSystems(dataList);
      console.log(dataList);
    });
  }, []);

  return (
    <FormWrapper>
      <PageHeader saving={saving} state={state} formName="Mahaweli Block" goBack={goBack} />
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
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Code</FieldName>
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
              size="small"
            />
          </FieldWrapper>
        </Grid>

        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>Mahweli System </FieldName>
            <Autocomplete
              options={mahaweliSystems}
              value={formData.mahaweliSystemDTO || selectedMahaweliSystem}
              getOptionLabel={(i) => `${i?.systemId}- ${i?.description} `}
              onChange={(event, value) => {
                console.log(value);
                setSelectedMahaweliSystem(value);
                handleChange(value, "mahaweliSystemDTO");
              }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                marginRight: "5px",
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
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
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Land Area</FieldName>
            <TextField
              name="landArea"
              id="landArea"
              value={formData?.landArea || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) => handleChange(e?.target?.value || "", "landArea")}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Cultivated Area</FieldName>
            <TextField
              name="cultivatedArea"
              id="cultivatedArea"
              value={formData?.cultivatedArea || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "cultivatedArea")
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
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Irrigated Area</FieldName>
            <TextField
              name="irrigatedArea"
              id="irrigatedArea"
              value={formData?.irrigatedArea || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "irrigatedArea")
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
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Non Irrigated Area</FieldName>
            <TextField
              name="nonIrrigatedArea"
              id="nonIrrigatedArea"
              value={formData?.nonIrrigatedArea || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "nonIrrigatedArea")
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
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Soil Texture</FieldName>
            <Select
              name="soilTexture"
              id="soilTexture"
              value={formData?.soilTexture || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "soilTexture")
              }
              fullWidth
              sx={{
                borderRadius: "8px",
              }}
              size="small"
            >
              <MenuItem value={"SANDY"}> SANDY</MenuItem>
              <MenuItem value={"LOAM"}>LOAM</MenuItem>
              <MenuItem value={"CLAY"}> CLAY</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default MahaweliBlockForm;
