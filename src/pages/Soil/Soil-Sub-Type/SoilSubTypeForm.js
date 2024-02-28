import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleSoilSubType,
  updateSoilSubType,
} from "../../../redux/actions/soil/soilSubType/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";

import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { get_SoilType } from "../../../redux/actions/soil/soilType/action";
import { Fonts } from "../../../utils/constants/Fonts";

const SoilSubTypeForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const [inputCropCategory, setInputCropCategory] = useState("");

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
      message: message || "Save failed",
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
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      fontFamily: `${Fonts.fontStyle1}`,
      marginTop: "10px",
      height: "90vh",
      overflowY: "scroll",
    }}
    >
    <FormWrapper>
      <PageHeader
        saving={saving}
        state={state}
        formName="Soil Sub Type"
        goBack={goBack}
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
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              inputProps={{ style: { textTransform: "uppercase" } }}
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
                "& .MuiInputBase-root": {
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
              key={formData?.soilTypeDTO}
              id="soilTypeDTO"
              isOptionEqualToValue={(option, value) =>
                option.soilTypeCode === value.soilTypeCode
              }
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={options}
              value={formData ? formData.soilTypeDTO : ""}
              getOptionLabel={(i) => `${i.soilTypeCode} - ${i.description}`}
              inputValue={inputCropCategory}
              onInputChange={(event, newInputValue) => {
                setInputCropCategory(newInputValue);
              }}
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
    </div>
  );
};

export default SoilSubTypeForm;
