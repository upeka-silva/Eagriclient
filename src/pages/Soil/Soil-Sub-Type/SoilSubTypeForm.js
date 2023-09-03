import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Grid,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { useLocation, useNavigate } from "react-router";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  handleSoilSubType,
  updateSoilSubType,
} from "../../../redux/actions/soil/soilSubType/action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { PathName } from "../../../components/FormLayout/PathName";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";

import { get_SoilType } from "../../../redux/actions/soil/soilType/action";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";

const SoilSubTypeForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/soil/soil-sub-type");
  };

  useEffect(() => {
    get_SoilType()
      .then(({ dataList = [] }) => {
        // setOptions(
        //   dataList.map((i) => {
        //     return {
        //       label: `${i.soilTypeCode}-${i.description}`,
        //       value: i.id,
        //     };
        //   })
        // );
        setOptions(dataList);
      })
      .catch(() => {
        setOptions([]);
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
          await updateSoilSubType(formData, onSuccess, onError);
        } else {
          await handleSoilSubType(formData, onSuccess, onError);
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
        <Button
          startIcon={<ArrowCircleLeftRounded />}
          onClick={goBack}
          color="success"
        >
          Go back to list
        </Button>
      </ActionWrapper>
      {/* <PathName>{getPathName()}</PathName> */}
      <FormHeader>
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
        {state?.action} SOIL SUB TYPE
      </FormHeader>
      <ButtonWrapper
        isCenter
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
              <Button>
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
                  {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Soil Sub Type Code</FieldName>
            <TextField
              name="soilSubTypeCode"
              id="soilSubTypeCode"
              value={formData?.soilSubTypeCode || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "soilSubTypeCode")
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
        <Grid item sm={4} md={4} lg={4}>
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Soil Type</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={options}
              value={formData ? formData.soilTypeDTO : ""}
              getOptionLabel={(i) => `${i.soilTypeCode} - ${i.description}`}
              onChange={(event, value) => {
                handleChange(value, "soilTypeDTO");
              }}
              sx={{
                // width: 264,
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

export default SoilSubTypeForm;
