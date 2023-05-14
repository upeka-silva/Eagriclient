import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
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

import { updateMahaweliBlock, handleMahaweliBlock } from "../../../redux/actions/mahaweliSystem/mahaweliBlock/action";

const MahaweliBlockForm = () => {
  useUserAccessValidation();

  const { state } = useLocation();
  const location = useLocation();

  const [options, setOptions] = useState([])

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/mahaweli-structure/mahaweli-block");
  };

  useEffect(() => {
    get_SoilType().then(({ dataList = [] }) => {
      setOptions(dataList);
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

  const getPathName = () => {
    return location.pathname === "/" || !location.pathname
      ? ""
      : location.pathname;
  };

  return (
    <FormWrapper>
      <ActionWrapper isLeft>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
          Go back to list
        </Button>
      </ActionWrapper>
      <PathName>{getPathName()}</PathName>
      <FormHeader>
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
        {state?.action} MAHAWELI BLOCK
      </FormHeader>
      <FieldWrapper>
        <FieldName>Block ID</FieldName>
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
            width: "264px",
            "& .MuiInputBase-root": {
              height: "30px",
              borderRadius: "8px",
            },
          }}
        />
      </FieldWrapper>
      <FieldWrapper>
        <FieldName>Block Name</FieldName>
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
        <FieldName>Mahaweli System</FieldName>
        <FormControl>
          <Select
            value={formData?.mahaweliSystem || ""}
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "mahaweliSystem")
            }
            sx={{
              width: "264px",
              height: "30px",
              borderRadius: "8px",
            }}
            size="small"
          >
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
            <MenuItem value={"D"}>D</MenuItem>
            <MenuItem value={"G"}>G</MenuItem>
            <MenuItem value={"H"}>H</MenuItem>
            <MenuItem value={"L"}>L</MenuItem>
            <MenuItem value={"HURULUWEWA"}>Huruluwewa</MenuItem>
            <MenuItem value={"UDAWALAWA"}>Udawalawa</MenuItem>
            <MenuItem value={"E"}>E</MenuItem>
            <MenuItem value={"RAMBAKENOYA"}>Rambakenoya</MenuItem>
          </Select>
        </FormControl>
      </FieldWrapper>
      <FieldWrapper>
        <FieldName>Description</FieldName>
        <TextField
          name="description"
          id="description"
          value={formData?.description || ""}
          fullWidth
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "description")}
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
        <FieldName>Land Area</FieldName>
        <TextField
          name="landArea"
          id="landArea"
          value={formData?.landArea || ""}
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "landArea")}
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
        <FieldName>Cultivated Area</FieldName>
        <TextField
          name="cultivatedArea"
          id="cultivatedArea"
          value={formData?.cultivatedArea || ""}
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "cultivatedArea")}
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
        <FieldName>Irrigated Area</FieldName>
        <TextField
          name="irrigatedArea"
          id="irrigatedArea"
          value={formData?.irrigatedArea || ""}
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "irrigatedArea")}
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
        <FieldName>Non Irrigated Area</FieldName>
        <TextField
          name="nonIrrigatedArea"
          id="nonIrrigatedArea"
          value={formData?.nonIrrigatedArea || ""}
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          disabled={state?.action === DEF_ACTIONS.VIEW}
          onChange={(e) => handleChange(e?.target?.value || "", "nonIrrigatedArea")}
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
        <FormControl>
          <Select
            value={formData?.soilTexture || ""}
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "soilTexture")
            }
            sx={{
              width: "264px",
              height: "30px",
              borderRadius: "8px",
            }}
            size="small"
          >
            <MenuItem value={"SANDY "}>Sandy</MenuItem>
            <MenuItem value={"LOAM"}>Loam</MenuItem>
            <MenuItem value={"CLAY"}>Clay</MenuItem>
          </Select>
        </FormControl>
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
  );
};

export default MahaweliBlockForm;
