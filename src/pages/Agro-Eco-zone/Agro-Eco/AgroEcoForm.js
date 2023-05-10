import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
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
import { handleAgroEco } from "../../../redux/actions/agroEco/action";
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
    navigate("/agro-eco-zone");
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
        await handleAgroEco(formData, onSuccess, onError);
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
            name="id"
            id="id"
            value={formData?.id || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW || state?.action === DEF_ACTIONS.EDIT}
            onChange={(e) => handleChange(e?.target?.value || "", "id")}
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
          <FieldName>Climate Zone Id</FieldName>
          <TextField
            name="climateZoneId"
            id="climateZoneId"
            value={formData?.climateZoneId || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "climateZoneId")
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
          <FieldName>Avg Rainfall</FieldName>
          <TextField
            name="avgRainfall"
            id="avgRainfall"
            value={formData?.avgRainfall || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "avgRainfall")
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
            name="avgTemp"
            id="avgTemp"
            value={formData?.avgTemp || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => handleChange(e?.target?.value || "", "avgTemp")}
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
            name="avgHumidity"
            id="avgHumidity"
            value={formData?.avgHumidity || ""}
            fullWidth
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "avgHumidity")
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
            getOptionLabel={(i) => `${i.soilTypeCode} - ${i.description}`}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
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
