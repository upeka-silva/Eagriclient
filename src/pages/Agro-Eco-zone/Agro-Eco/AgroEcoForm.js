import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { handleAgroEco, updateAgroEco } from "../../../redux/actions/agroEco/action";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";

import { get_SoilType } from "../../../redux/actions/soil/soilType/action";
import { useEffect } from "react";

const AgroEcoForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const [options, setOptions] = useState([])

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/ez-structure/agro-eco-zone");
  };

  useEffect(() => {
    get_SoilType().then(({ dataList = [] }) => {
      setOptions(dataList)
    })
  }, [])

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
        if (formData.id) {
          await updateAgroEco(formData, onSuccess, onError);
        } else {
          await handleAgroEco(formData, onSuccess, onError);
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
    <div>
      <FormWrapper>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
        <PathName>{getPathName()}</PathName>
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}{state?.action} AGRO ECO ZONE
        </FormHeader>
        <FieldWrapper>
          <FieldName>AEZ ID</FieldName>
          <TextField
            name="aeZoneId"
            id="aeZoneId"
            value={formData?.aeZoneId || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW || state?.action === DEF_ACTIONS.EDIT}
            onChange={(e) => handleChange(e?.target?.value || "", "aeZoneId")}
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
          <FieldName>AEZ Name</FieldName>
          <TextField
            name="name"
            id="name"
            value={formData?.name || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "name")}
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
        <FieldName>Climate Zone</FieldName>
        <FormControl>
          <Select
            value={formData?.climateZone || ""}
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "climateZone")
            }
            sx={{
              width: "264px",
              height: "30px",
              borderRadius: "8px",
            }}
            size="small"
          >
            <MenuItem value={"DRY"}>Dry</MenuItem>
            <MenuItem value={"INTERMEDIATE"}>Intermediate</MenuItem>
            <MenuItem value={"WET"}>Wet</MenuItem>
          </Select>
        </FormControl>
      </FieldWrapper>
        <FieldWrapper>
          <FieldName>Avg Rainfall</FieldName>
          <TextField
            name="averageRainfall"
            id="averageRainfall"
            value={formData?.averageRainfall || ""}
            type="number"
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "averageRainfall")
            }
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
          <FieldName>Avg Temp</FieldName>
          <TextField
            name="averageTemperature"
            id="averageTemperature"
            value={formData?.averageTemperature || ""}
            fullWidth
            type="number"
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "averageTemperature")}
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
          <FieldName>Avg Humidity</FieldName>
          <TextField
            name="averageHumidity"
            id="averageHumidity"
            value={formData?.averageHumidity || ""}
            fullWidth
            type="number"
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "averageHumidity")
            }
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
          <FieldName>Soil Type</FieldName>
          <Autocomplete
            options={options}
            value={formData ? formData.soilTypeDTO : ""}
            onChange={(event, value) => {
              handleChange(value, "soilTypeDTO");
            }}
            getOptionLabel={(i) => `${i.soilTypeCode} - ${i.description}`}
            sx={{
              width: "264px",
              "& .MuiOutlinedInput-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
               
                disabled={state?.action === DEF_ACTIONS.VIEW}
              />
            )}
          />
        </FieldWrapper>
        <ButtonWrapper>
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
      </FormWrapper>
    </div>
  );
};

export default AgroEcoForm;
