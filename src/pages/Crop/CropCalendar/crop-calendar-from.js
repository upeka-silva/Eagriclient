import React, { useState } from "react";
import { TextField, Autocomplete, Grid, CircularProgress, Paper } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { useEffect } from "react";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_CropList } from "../../../redux/actions/crop/crop/action";
import { getCropVarietiesByCropId } from "../../../redux/actions/crop/cropVariety/action";
import { get_agroEcoList } from "../../../redux/actions/agroEco/action";
import CalendarActivity from "./calendar-activity";
import {
  createCropCalendar,
  updateCropCalendar,
} from "../../../redux/actions/crop/cropCalendar/action";
import PageHeader from "../../../components/PageHeader/PageHeader";

const CropCalendarForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [saveSuccessful, setSaveSuccessful] = useState(false);

  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [formData, setFormData] = useState(state?.target || {});

  const [crops, setCrops] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [zoneList, setZoneList] = useState([]);

  useEffect(() => {
    get_CropList().then(({ dataList = [] }) => {
      setCrops(dataList);
    });

    get_agroEcoList().then(({ dataList = [] }) => {
      setZoneList(dataList);
    });

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setFormData(state?.target);
    }
  }, [state?.action, state?.target]);

  const getAllVarieties = (crop) => {
    getCropVarietiesByCropId(crop.id).then(({ dataList = [] }) => {
      setVarieties(dataList);
    });
  };

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const goBack = () => {
    navigate("/crop/calendar");
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(prevState => ({ ...prevState, ...state?.target }));
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
    if (state?.action === DEF_ACTIONS.ADD) {
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

    setSaveSuccessful(true);
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
        if (DEF_ACTIONS.ADD === state.action) {
          console.log("Form data ------------>");
          console.log(formData);
          const response = await createCropCalendar(
            {
              ...formData,
            },
            onSuccess,
            onError
          );
          setFormData(prevState => ({ ...prevState, ...response.payload }));
        } else {
          const response = await updateCropCalendar(
            {
              ...formData,
            },
            onSuccess,
            onError
          );
          setFormData(prevState => ({ ...prevState, ...response.payload }));
        }
        setSaving(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <FormWrapper>
        <PageHeader
          saving={saving}
          state={state}
          goBack={goBack}
          formName="Crop Calender"
        />
        <Grid container>
          <Grid item sm={12} md={12} lg={12} sx={{ alignItems: "center" }}>
            <Grid container>
              <Grid item>
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
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>Name</FieldName>
              <TextField
                disabled={state.action === DEF_ACTIONS.VIEW}
                variant="outlined"
                //id={index}
                value={formData?.name || ""}
                onChange={(e) => handleChange(e?.target?.value || "", "name")}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>Description</FieldName>
              <TextField
                disabled={state.action === DEF_ACTIONS.VIEW}
                variant="outlined"
                //id={index}
                value={formData?.description || ""}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "description")
                }
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>Existing Calendar URL</FieldName>
              <TextField
                disabled={state.action === DEF_ACTIONS.VIEW}
                variant="outlined"
                //id={index}
                value={formData?.legacyCalendarUrl || ""}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "legacyCalendarUrl")
                }
                fullWidth
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
              <FieldName>Crop</FieldName>
              <Autocomplete
                disabled={state.action === DEF_ACTIONS.VIEW}
                options={crops}
                value={formData?.crop}
                getOptionLabel={(i) => `${i.cropId} - ${i.description}`}
                onChange={(event, value) => {
                  handleChange(value, "crop");
                  getAllVarieties(value);
                }}
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={8} md={8} lg={8}>
            <FieldWrapper>
              <FieldName>Variety List</FieldName>
              <Autocomplete
                disabled={state.action === DEF_ACTIONS.VIEW}
                multiple={true}
                options={varieties || formData.cropVarieties}
                value={formData?.cropVarieties}
                getOptionLabel={(i) => `${i.varietyId} - ${i.varietyName}`}
                onChange={(event, value) => {
                  handleChange(value, "cropVarieties");
                  //setSelectedGnDevision(value);
                }}
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Agriculture Zone</FieldName>
              <Autocomplete
                disabled={state.action === DEF_ACTIONS.VIEW}
                options={zoneList}
                value={formData?.climateZone}
                getOptionLabel={(i) => `${i.aeZoneId} - ${i.name}`}
                onChange={(event, value) => {
                  handleChange(value, "climateZone");
                  //setSelectedGnDevision(value);
                }}
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={12} md={12} lg={12}>
            <Paper style={{ height: "500px" }}>
              <Grid
                container
                sx={{
                  margin: "15px",
                  width: "97%",
                  borderRadius: "5px",
                }}
              >
                
                <Grid item sm={12} md={12} lg={12}>
                  {!saving ? (
                    <CalendarActivity
                      formMode={state.action}
                      formId={formData?.id}
                      dataList={formData?.activities}
                      onFormSaveSuccess={saveSuccessful}
                    />
                  ) : (
                    <CircularProgress />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};
export default CropCalendarForm;