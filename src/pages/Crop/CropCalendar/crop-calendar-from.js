import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { useEffect } from "react";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import {
  createDamage,
  updateDamage,
} from "../../../redux/actions/crop/cropDamage/action";
import { Paper } from "@material-ui/core";
import DamageTypes from "./calendar-activity";
import { get_CropList } from "../../../redux/actions/crop/crop/action";
import { getCropVarietiesByCropId } from "../../../redux/actions/crop/cropVariety/action";
import { get_agroEcoList } from "../../../redux/actions/agroEco/action";
import CalendarActivity from "./calendar-activity";
import {
  createCropCalendar,
  updateCropCalendar,
} from "../../../redux/actions/crop/cropCalendar/action";

const CropCalendarForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [isLoading, setIsLoading] = useState(null);

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
  }, []);

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
      setIsLoading(true);
      setSaving(true);
      try {
        if (DEF_ACTIONS.ADD === state.action) {
          console.log("Form data ------------>");
          console.log(formData);
          const data = await createCropCalendar(formData, onSuccess, onError);
          setFormData(data);
        } else {
          const data = await updateCropCalendar(formData, onSuccess, onError);
          setFormData(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <FormWrapper>
        <BackToList goBack={goBack} />
        <CustFormHeader
          saving={saving}
          state={state}
          formName="Crop Configuration"
        />
        <Grid container spacing={2}>
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
                //disabled={true}
                variant="outlined"
                //id={index}
                value={formData.name || ""}
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
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>Description</FieldName>
              <TextField
                //disabled={true}
                variant="outlined"
                //id={index}
                value={formData.description || ""}
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
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>Existing Calendar URL</FieldName>
              <TextField
                //disabled={true}
                variant="outlined"
                //id={index}
                value={formData.legacyCalendarUrl || ""}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "legacyCalendarUrl")
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
          <Grid item lg={2} sm={2} sx={2}>
            <FieldWrapper>
              <FieldName>Crop</FieldName>
              <Autocomplete
                //disabled={selectedDsDevision?.id == null}
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
          <Grid item lg={8} sm={8} sx={8}>
            <FieldWrapper>
              <FieldName>Variety List</FieldName>
              <Autocomplete
                //disabled={selectedDsDevision?.id == null}
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
          <Grid item lg={2} sm={2} sx={2}>
            <FieldWrapper>
              <FieldName>Agriculture Zone</FieldName>
              <Autocomplete
                //disabled={selectedDsDevision?.id == null}
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
                  {!isLoading ? (
                    <CalendarActivity
                      formMode={state.action}
                      formId={formData.id}
                      dataList={formData.activities}
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
