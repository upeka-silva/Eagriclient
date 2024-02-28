import React, { useState } from "react";
import { TextField, Autocomplete, Grid, Button } from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import DialogBox from "../../../components/PageLayout/DialogBox";
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
import BiWeeklyReportingTab from "./biweekly-reporting-tab";
import {
  changeStatusOfBiWeekReport,
  createBiWeeklyReport,
  getCropLookSeasons,
} from "../../../redux/actions/cropLook/biWeekReporting/actions";
import { REGION_PARENT_TYPE } from "../../../utils/constants/region-parent-type";
import { BI_WEEK_DATA_STATUS } from "../../../utils/constants/bi-week-data-status";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Vrpano } from "@mui/icons-material";
import { BI_WEEK_REPORT_STATUS } from "../../../utils/constants/bi-week-report-status";
import PageHeader from "../../../components/PageHeader/PageHeader";

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
  const [openConfApprove, setOpenConfApprove] = useState(false);
 

  useEffect(() => {
    getAllAiAndMahaweliUnits().then(({ dataList = [] }) => {
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
      var region = state?.target?.aiRegion
        ? state?.target?.aiRegion
        : state?.target?.mahaweliUnit;
      region.parentType = state?.target?.parentType;
      setSelectedAiRegion(region);
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
        var payload = {};
        if (selectedAiRegion.parentType === REGION_PARENT_TYPE.MAHAWELI) {
          payload = {
            mahaweliBlock: { id: selectedAiRegion.id },
            parentType: selectedAiRegion.parentType,
            season: { id: selectedSeason.id },
            week: { id: selectedWeek.id },
          };
        } else {
          payload = {
            aiRegion: { id: selectedAiRegion.id },
            parentType: selectedAiRegion.parentType,
            season: { id: selectedSeason.id },
            week: { id: selectedWeek.id },
          };
        }
        const dataList = await createBiWeeklyReport(
          payload,
          onSuccess,
          onError
        );
        setBiWeekReportId(dataList.dataList.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filterBiWeekList = (biWeekList) => {
    return biWeekList.filter(
      (data) => data.status === BI_WEEK_DATA_STATUS.ENABLED
    );
  };

  const approveBiWeekReport = () => {
    changeStatusOfBiWeekReport(
      biWeekReportId,
      BI_WEEK_REPORT_STATUS.APPROVED,
      onSuccessStatusChange,
      onErrorStatusChange
    );
  };

  const onSuccessStatusChange = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Approved",
    });
    setSaving(false);
  };

  const onErrorStatusChange = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  return (
    <div>
      <FormWrapper>
        <PageHeader saving={saving} state={state} goBack={goBack} formName="Bi Weekly Report" />
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
              <Grid item sx={{ pt: "8px" }}>
                <PermissionWrapper
                  permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
                >
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => setOpenConfApprove(true)}
                    sx={{ ml: "8px" }}
                    size="small"
                  >
                    Approve
                  </Button>
                </PermissionWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>AI Region</FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                options={options}
                value={selectedAiRegion}
                getOptionLabel={(i) =>
                  `${i.code || i.regionId} - ${i.description}`
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
          {selectedSeason ? (
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>Week</FieldName>
                <Autocomplete
                  disabled={
                    state?.action === DEF_ACTIONS.VIEW ||
                    state?.action === DEF_ACTIONS.EDIT
                  }
                  options={filterBiWeekList(selectedSeason?.biWeekDataList)}
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
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
            </Grid>
          ) : null}
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

            {!isLoading &&
              cropCategoryList.map((category, index) => (
                <TabContent
                  //style={{ marginTop: "10px" }}
                  className={toggleState === index + 1 ? "active-content" : ""}
                >
                  {biWeekReportId ? (
                    <BiWeeklyReportingTab
                      registrationId={biWeekReportId}
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
          <DialogBox
        open={openConfApprove}
        title="Approve Bi Weekly Report"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={approveBiWeekReport}
              sx={{ ml: "8px" }}
            >
             OK
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenConfApprove(false)}
              sx={{ ml: "8px" }}
            >
              Cancel
            </Button>
            </ActionWrapper>
        }
      >
        <>
        Do you want to approve?
        
       </>
      </DialogBox>
          
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default BiWeeklyReportingForm;
