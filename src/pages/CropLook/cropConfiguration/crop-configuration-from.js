import React, { useState } from "react";
import { TextField, Autocomplete, Grid, Button } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { updateCropSubCategory } from "../../../redux/actions/crop/cropSubCategory/action";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { useEffect } from "react";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../Farm-Land/FarmLandForm";
import {
  createCropTarget,
  getAllAiAndMahaweliUnits,
} from "../../../redux/actions/cropLook/cropTarget/actions";
import {
  changeStatusOfBiWeekReport,
  createBiWeeklyReport,
  getCropLookSeasons,
} from "../../../redux/actions/cropLook/biWeekReporting/actions";
import { REGION_PARENT_TYPE } from "../../../utils/constants/region-parent-type";
import { BI_WEEK_DATA_STATUS } from "../../../utils/constants/bi-week-data-status";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Add, Remove, Vrpano } from "@mui/icons-material";
import { BI_WEEK_REPORT_STATUS } from "../../../utils/constants/bi-week-report-status";
import { createCropConfig } from "../../../redux/actions/cropLook/cropConfiguration/action";
import {
  CROP_LOOK_FIELD,
  CROP_LOOK_TARGET_FIELDS,
} from "../../../utils/constants/cropLookFields";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Fonts } from "../../../utils/constants/Fonts";

const CropConfigurationForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [isSaving, setIsSaving] = useState(null);
  const [selectedCropCategory, setSelectedCropCategory] = useState(null);

  const [defaultFields] = useState([
    CROP_LOOK_FIELD.EXTENT_MAJOR,
    CROP_LOOK_FIELD.EXTENT_MINOR,
    CROP_LOOK_FIELD.EXTENT_RAINFED,
    CROP_LOOK_FIELD.EXTENT_HIGHLAND_IRRIGATE,
    CROP_LOOK_FIELD.EXTENT_HIGHLAND_RAINFED,
    CROP_LOOK_FIELD.EXTENT_LOWLAND,
    CROP_LOOK_FIELD.EXTENT_HOME_GARDEN,
    CROP_LOOK_FIELD.EXTENT_GREENHOUSE,
    CROP_LOOK_FIELD.NORMAL_SEASON_EXTENT,
    CROP_LOOK_FIELD.INTER_SEASON_EXTENT,
    CROP_LOOK_FIELD.NON_BEARING_HG_REMOVED_EXTENT,
    CROP_LOOK_FIELD.NON_BEARING_COMM_REMOVED_EXTENT,
    CROP_LOOK_FIELD.COMM_REMOVED_EXTENT,
    CROP_LOOK_FIELD.BEARING_HG_REMOVED_EXTENT,
    CROP_LOOK_FIELD.BEARING_COMM_REMOVED_EXTENT,
    CROP_LOOK_FIELD.HG_REPLANTED_EXTENT,
    CROP_LOOK_FIELD.COMM_REPLANTED_EXTENT,
    CROP_LOOK_FIELD.HG_NEWLY_PLANTED_EXTENT,
    CROP_LOOK_FIELD.COMM_NEWLY_PLANTED_EXTENT,
    CROP_LOOK_FIELD.HG_NEWLY_BORNE_EXTENT,
    CROP_LOOK_FIELD.COMM_NEWLY_BORNE_EXTENT,
  ]);

  const [targetDefaultFields] = useState([
    CROP_LOOK_TARGET_FIELDS.TARGET_MAJOR,
    CROP_LOOK_TARGET_FIELDS.TARGET_MINOR,
    CROP_LOOK_TARGET_FIELDS.TARGET_RAINFED,
    CROP_LOOK_TARGET_FIELDS.TARGET_HIGHLAND_IRRIGATED,
    CROP_LOOK_TARGET_FIELDS.TARGET_HIGHLAND_RAINFED,
    CROP_LOOK_TARGET_FIELDS.TARGET_LOWLAND,
    CROP_LOOK_TARGET_FIELDS.TARGET_HOME_GARDEN,
    CROP_LOOK_TARGET_FIELDS.TARGET_GREENHOUSE,
    CROP_LOOK_TARGET_FIELDS.TARGET_EXISTING_EXTENT,
    CROP_LOOK_TARGET_FIELDS.TARGET_REMOVED_EXTENT,
    CROP_LOOK_TARGET_FIELDS.TARGET_NEW_EXTENT,
    CROP_LOOK_TARGET_FIELDS.TARGET_TOTAL_EXTENT,
  ]);

  const [fields, setFields] = useState(defaultFields);

  const [targetFields, setTargetFields] = useState(targetDefaultFields);

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setOptions(dataList);
    });

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setFields(state?.target?.fields);
      setTargetFields(state?.target?.targetFields);
    }
  }, []);

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setOptions(dataList);
    });

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setSelectedCropCategory(state?.target?.cropCategory);
    }
  }, []);

  const goBack = () => {
    navigate("/crop-look/crop-configuration");
  };

  const handleCropCategory = (value) => {
    setSelectedCropCategory(value);
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFields(state?.target?.fields);
      setTargetFields(state?.target?.targetFields);
    } else {
      setFields(defaultFields);
      setTargetFields(targetDefaultFields);
    }
  };

  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (state?.action === DEF_ACTIONS.ADD && selectedCropCategory) {
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
        var payload = {
          cropCategory: { id: selectedCropCategory.id },
          fields: fields,
          targetFields: targetFields,
        };

        const dataList = await createCropConfig(payload, onSuccess, onError);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cropInputFieldsHandler = (index, value, dataList) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;

    // Assuming you want to do something with dataList here
    // For example, logging it:
    console.log(dataList);

    setFields(updatedFields);
  };

  const cropTargetInputFieldsHandler = (index, value, dataList) => {
    const updatedFields = [...targetFields];
    updatedFields[index] = value;

    // Assuming you want to do something with dataList here
    // For example, logging it:
    console.log(dataList);

    setFields(updatedFields);
  };

  const addNewRow = () => {
    const newField = " ";
    const updatedFields = [...fields, newField];
    setFields(updatedFields);
  };

  const RemoveRow = (index) => {
    const updatedFields = [...fields];
    if (index !== -1) {
      updatedFields.splice(index, 1);
      setFields(updatedFields);
    }
  };

  const RemoveTargetRow = (index) => {
    const updatedFields = [...targetFields];
    if (index !== -1) {
      updatedFields.splice(index, 1);
      setTargetFields(updatedFields);
    }
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
          goBack={goBack}
          formName="Field Configuration"
        />
        <Grid container>
          <Grid item sm={10} md={10} lg={10} sx={{ alignItems: "center" }}>
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
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop Category</FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                options={options}
                value={selectedCropCategory}
                getOptionLabel={(i) => `${i.categoryId} - ${i.description}`}
                onChange={(event, value) => {
                  handleCropCategory(value);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={4} lg={4}>
            <FieldWrapper>
              <FieldName>Crop Progress Fields Names</FieldName>
              <Grid container spacing={1} direction="row">
                {fields
                  ? fields.map((field, index) => (
                      <>
                        <Grid item sm={6} md={8} lg={8}>
                          <TextField
                            disabled={true}
                            variant="outlined"
                            id={index}
                            value={field}
                            onChange={(e) =>
                              cropInputFieldsHandler(e.target.value)
                            }
                            sx={{
                              "& .MuiInputBase-root": {
                                borderRadius: "8px",
                                width: "300px",
                              },
                            }}
                            size="small"
                          />
                        </Grid>

                        <Grid item sm={2} md={2} lg={2}>
                          <Button
                            disabled={state.action === DEF_ACTIONS.VIEW}
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => RemoveRow(index)}
                          >
                            <Remove />
                          </Button>
                        </Grid>
                      </>
                    ))
                  : null}
              </Grid>
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={4} lg={4}>
            <FieldWrapper>
              <FieldName>Crop Targets Fields Names</FieldName>
              <Grid container spacing={1} direction="row">
                {targetFields
                  ? targetFields.map((field, index) => (
                      <>
                        <Grid item sm={6} md={8} lg={8}>
                          <TextField
                            disabled={true}
                            variant="outlined"
                            id={index}
                            value={field}
                            onChange={(e) =>
                              cropTargetInputFieldsHandler(e.target.value)
                            }
                            sx={{
                              "& .MuiInputBase-root": {
                                borderRadius: "8px",
                                width: "300px",
                              },
                            }}
                            size="small"
                          />
                        </Grid>

                        <Grid item sm={2} md={2} lg={2}>
                          <Button
                            disabled={state.action === DEF_ACTIONS.VIEW}
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => RemoveTargetRow(index)}
                          >
                            <Remove />
                          </Button>
                        </Grid>
                      </>
                    ))
                  : null}
              </Grid>
            </FieldWrapper>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropConfigurationForm;
