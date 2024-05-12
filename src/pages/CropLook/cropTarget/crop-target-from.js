import React, { useState } from "react";
import { TextField, Autocomplete, Grid } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { useEffect } from "react";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import CropTargetTab from "./crop-target-tab";
import { getSeasons } from "../../../redux/actions/cropLook/cropRegistration/actions";
import {
  createCropTarget,
  getAllAiAndMahaweliUnits,
} from "../../../redux/actions/cropLook/cropTarget/actions";
import { REGION_PARENT_TYPE } from "../../../utils/constants/region-parent-type";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../../components/TabButtons/TabButtons";

const CropTargetForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [cropCategoryList, setCropCategoryList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedAiRegion, setSelectedAiRegion] = useState(null);
  const [cropTargetId, setCropTargetId] = useState(null);
  const [cropCategoryTarget, setCropCategoryTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [toggleState, setToggleState] = useState(1);

  useEffect(() => {
    getAllAiAndMahaweliUnits().then(({ dataList = [] }) => {
      setOptions(dataList);
    });

    getSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
    });

    get_CategoryList().then(({ dataList = [] }) => {
      setCropCategoryList(dataList);
    });

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setCropTargetId(state?.target?.id);
      setSelectedSeason(state?.target?.season);
      var region = state?.target?.aiRegion
        ? state?.target?.aiRegion
        : state?.target?.mahaweliBlock || {};

      if (
        state?.target?.parentType !== null &&
        state?.target?.parentType !== undefined
      ) {
        region.parentType = state.target.parentType;
      }

      setSelectedAiRegion(region);
      setCropCategoryTarget(state?.target?.cropCategoryTargets);
    }
  }, []);

  useEffect(() => {
    if (cropTargetId) {
      setIsLoading(false);
    }
  }, [cropTargetId]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const goBack = () => {
    navigate("/crop-look/crop-target");
  };

  const handleAiRegionChange = (value) => {
    setSelectedAiRegion(value);
  };

  const handlSeasonChange = (value) => {
    setSelectedSeason(value);
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
      setSelectedSeason({});
      setSelectedAiRegion({});
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
      selectedAiRegion &&
      selectedSeason &&
      !cropTargetId
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
      setIsLoading(true);
      setSaving(true);
      try {
        var payload = {};
        if (selectedAiRegion.parentType === REGION_PARENT_TYPE.MAHAWELI) {
          payload = {
            mahaweliBlock: { id: selectedAiRegion.id },
            aiRegionType: selectedAiRegion.parentType,
            season: { id: selectedSeason.id },
          };
        } else {
          payload = {
            aiRegion: { id: selectedAiRegion.id },
            aiRegionType: selectedAiRegion.parentType,
            season: { id: selectedSeason.id },
          };
        }
        const dataList = await createCropTarget(payload, onSuccess, onError);
        setCropTargetId(dataList.dataList.id);
        setCropCategoryTarget();
      } catch (error) {}
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
          formName="Crop Target"
          goBack={goBack}
        />
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
        <Grid container>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>AI Region/Mahaweli Block</FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                options={options}
                value={selectedAiRegion}
                getOptionLabel={(i) =>
                  (i.code !== undefined || i.regionId !== undefined) &&
                  i.description !== undefined
                    ? `${i.code || i.regionId} - ${i.description}`
                    : ""
                }
                onChange={(event, value) => {
                  handleAiRegionChange(value);
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
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Season</FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                options={seasons}
                value={selectedSeason}
                getOptionLabel={(i) =>
                  (i.code !== undefined ? `${i.code} - ` : "") +
                  (i.description !== undefined ? `${i.description}` : "")
                }
                onChange={(event, value) => {
                  handlSeasonChange(value);
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
          <Grid item sx={{ marginTop: "20px" }}>
            <TabWrapper style={{ margin: "0px 0px" }}>
              {cropCategoryList.map((category, index) => (
                <TabButton
                  className={toggleState === index + 1 ? "active-tabs" : ""}
                  onClick={() => toggleTab(index + 1)}
                >
                  {category?.description}
                </TabButton>
              ))}
            </TabWrapper>

            {!isLoading &&
              cropCategoryList.map((category, index) => (
                <TabContent
                  style={{ marginTop: "10px" }}
                  className={toggleState === index + 1 ? "active-content" : ""}
                >
                  {toggleState === index + 1 && cropTargetId ? (
                    <CropTargetTab
                      registrationId={cropTargetId}
                      aiRegion={selectedAiRegion}
                      seasonId={selectedSeason?.id}
                      cropCategoryId={category?.id}
                      mode={state?.action}
                      savedCropCategoryTarget={
                        cropCategoryTarget
                          ? cropCategoryTarget.find(
                              (target) =>
                                target?.cropCategory?.id === category?.id
                            )
                          : null
                      }
                    />
                  ) : null}
                </TabContent>
              ))}
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropTargetForm;
