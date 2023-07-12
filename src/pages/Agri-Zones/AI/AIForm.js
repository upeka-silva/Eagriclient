import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { handleAI } from "../../../redux/actions/aiRegion/action";

import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";

import { get_ASC } from "../../../redux/actions/asc/action";

const AIForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [ascList, setAscList] = useState([]);
  const [parentValue, setParentValue] = useState([]);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/aa-structure/ai-region");
  };

  useEffect(() => {
    get_ASC().then(({ dataList = [] }) => {
      setAscList(dataList);
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
        await handleAI(formData, onSuccess, onError);
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
    console.log(formData);
  }, [formData]);

  return (
    <FormWrapper>
      <ActionWrapper isLeft>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
          Go back to list
        </Button>
      </ActionWrapper>
      <PathName>{getPathName()}</PathName>
      <FormHeader>
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}Add a AI
        Region
      </FormHeader>
      <FieldWrapper>
        <FieldName>Region ID</FieldName>
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
        <FieldName>Description</FieldName>
        <TextField
          name="description"
          id="id"
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
        <FieldName>Parent Type</FieldName>
        <FormControl>
          <Select
            value={formData?.parentType || ""}
            disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "parentType")
            }
            sx={{
              width: "264px",
              height: "30px",
              borderRadius: "8px",
            }}
            size="small"
          >
            <MenuItem value={"PROVINCIAL"}>Provincial</MenuItem>
            <MenuItem value={"INTERPROVINCIAL"}>Inter Provincial</MenuItem>
          </Select>
        </FormControl>
      </FieldWrapper>
      <FieldWrapper>
        <FieldName>Parent Value</FieldName>
        <Autocomplete
          options={parentValue}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => {
            handleChange(value, "");
          }}
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
      <FieldWrapper>
        <FieldName>ASC Region ID</FieldName>
        <Autocomplete
          options={ascList}
          getOptionLabel={(i) => `${i.code} - ${i.name}`}
          onChange={(event, value) => {
            handleChange(value, "");
          }}
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
  );
};

export default AIForm;
