import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Grid,
  Button,
  ButtonGroup,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import {
  handleCropSubCategory,
  updateCropSubCategory,
} from "../../../redux/actions/crop/cropSubCategory/action";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { useEffect } from "react";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { TabButton, TabContent, TabWrapper } from "../../Farm-Land/FarmLandForm";
import {
  createCropRegistration,
  getDDDivisionsByLogedInUser,
  getSeasons,
} from "../../../redux/actions/cropLook/cropRegistration/actions";
import { get_AiRegionList } from "../../../redux/actions/aiRegion/action";
import { createCropTarget } from "../../../redux/actions/cropLook/cropTarget/actions";
import BiWeeklyReportingTab from "./biweekly-reporting-tab";
import { createBiWeeklyReport, getCropLookSeasons } from "../../../redux/actions/cropLook/biWeekReporting/actions";

const BiWeeklyReportingForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [cropCategoryList, setCropCategoryList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedAiRegion, setSelectedAiRegion] = useState(null);
  const [biWeekReportId, setBiWeekReportId] = useState(null);
  const [cropCategoryTarget, setCropCategoryTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [toggleState, setToggleState] = useState(1);
  const [tabEnabled, setTabInabled] = useState(false);

  // start of crop registration code

  useEffect(() => {
    get_AiRegionList().then(({ dataList = [] }) => {
      setOptions(dataList);
      console.log(dataList);
    });

    getCropLookSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
      console.log(dataList);
    });

    get_CategoryList().then(({ dataList = [] }) => {
      setCropCategoryList(dataList);
      console.log(dataList);
    });

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setBiWeekReportId(state?.target?.id);
      setSelectedSeason(state?.target?.season);
      setSelectedAiRegion(state?.target?.aiRegion);
      setSelectedWeek(state?.target?.week);
      setCropCategoryTarget(state?.target?.biWeekCropCategoryReport);
    }
  }, []);

  useEffect(() => {
    if (biWeekReportId) {
      setIsLoading(false);
    }
  }, [biWeekReportId]);

  // end of crop registration code

  const toggleTab = (index) => {
    console.log("toggle state : " + index);
    setToggleState(index);
  };

  const goBack = () => {
    navigate("/crop-look/biweekly-reporting");
  };

  const handleAiRegionChange = (value) => {
    setSelectedAiRegion(value);
  };

  const handlSeasonChange = (value) => {
    setSelectedSeason(value);
  };

  const handlWeekChange = (value) => {
    setSelectedWeek(value);
  }

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
      selectedAiRegion &&
      selectedSeason &&
      !biWeekReportId
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
        const payload = {
          aiRegion: { id: selectedAiRegion.id },
          aiRegionType: selectedAiRegion.parentType,
          season: { id: selectedSeason.id },
          week: {id: selectedWeek.id}
        };

        if (false) {
          await updateCropSubCategory(
            {
              ...formData,
              cropCategoryDTO: { id: formData.cropCategoryDTO.id },
            },
            onSuccess,
            onError
          );
        } else {
          const dataList = await createBiWeeklyReport(
            payload,
            onSuccess,
            onError
          );
          setBiWeekReportId(dataList.dataList.id);
        }
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
          formName="Bi Weekly Report"
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
        <Grid
          container
        >
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>AI Region</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW || state?.action === DEF_ACTIONS.EDIT}
                options={options}
                value={selectedAiRegion}
                getOptionLabel={(i) => `${i.regionId}`}
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
                disabled={state?.action === DEF_ACTIONS.VIEW || state?.action === DEF_ACTIONS.EDIT}
                options={seasons}
                value={selectedSeason}
                getOptionLabel={(i) => `${i.code}`}
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
          {selectedSeason ? <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Week</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW || state?.action === DEF_ACTIONS.EDIT}
                options={selectedSeason?.biWeekDataList}
                value={selectedWeek}
                getOptionLabel={(i) => `${i.weekDescription}`}
                onChange={(event, value) => {
                  handlWeekChange(value);
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
          </Grid> : null}
          <Grid item sx={{ marginTop: "20px" }}>
            <TabWrapper style={{ margin: "0px 0px" }}>
              {cropCategoryList.map((category, index) => (
                <TabButton
                  className={toggleState === index + 1 ? "active-tabs" : ""}
                  onClick={() => toggleTab(index + 1)}
                >
                  {category?.categoryId}
                </TabButton>
              ))}
            </TabWrapper>

            {!isLoading && cropCategoryList.map((category, index) => (
                <TabContent
                  //style={{ marginTop: "10px" }}
                  className={toggleState === index + 1 ? "active-content" : ""}
                >
                  {biWeekReportId ? <BiWeeklyReportingTab
                    registrationId={biWeekReportId}
                    aiRegionId={selectedAiRegion?.id}
                    seasonId={selectedSeason?.id}
                    cropCategoryId={category?.id}
                    mode={state?.action}
                    savedCropCategoryTarget={cropCategoryTarget ? cropCategoryTarget.find(target => target?.cropCategory?.id === category?.id) : null}
                  /> : null}
                </TabContent>
              ))}
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default BiWeeklyReportingForm;
