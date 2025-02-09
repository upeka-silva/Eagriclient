import React, { useState } from "react";
import { TextField, Autocomplete, Grid, Button, Chip } from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { useEffect } from "react";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { getAllAiAndMahaweliUnits } from "../../../redux/actions/cropLook/cropTarget/actions";
import BiWeeklyReportingTab from "./biweekly-reporting-tab";
import {
  changeStatusOfBiWeekReport,
  createBiWeeklyReport,
  getCropLookSeasons,
} from "../../../redux/actions/cropLook/biWeekReporting/actions";
import { REGION_PARENT_TYPE } from "../../../utils/constants/region-parent-type";
import { BI_WEEK_DATA_STATUS } from "../../../utils/constants/bi-week-data-status";
import { BI_WEEK_REPORT_STATUS } from "../../../utils/constants/bi-week-report-status";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../../components/TabButtons/TabButtons";

const BiWeeklyReportingForm = () => {
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
    });

    getCropLookSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
    });

    get_CategoryList().then(({ dataList = [] }) => {
      setCropCategoryList(dataList);
    });

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setBiWeekReportId(state?.target?.id);
      setSelectedSeason(state?.target?.season);
      var region = state?.target?.aiRegion
        ? state?.target?.aiRegion
        : state?.target?.mahaweliBlock || {};
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
      setSelectedWeek(state?.target ? state?.target?.week : null);
      setSelectedSeason(state?.target ? state?.target?.season : null);
      setSelectedAiRegion(state?.target ? state?.target?.aiRegion : null);
    } else {
      setSelectedWeek(null);
      setSelectedSeason(null);
      setSelectedAiRegion(null);
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
        if (selectedAiRegion?.parentType === REGION_PARENT_TYPE.MAHAWELI) {
          payload = {
            mahaweliBlock: { id: selectedAiRegion?.id },
            parentType: selectedAiRegion?.parentType,
            season: { id: selectedSeason?.id },
            week: { id: selectedWeek?.id },
          };
        } else {
          payload = {
            aiRegion: { id: selectedAiRegion?.id },
            parentType: selectedAiRegion?.parentType,
            season: { id: selectedSeason?.id },
            week: { id: selectedWeek?.id },
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
      BI_WEEK_REPORT_STATUS.AI_COMPLETED,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <FormWrapper>
        <PageHeader
          saving={saving}
          state={state}
          goBack={goBack}
          formName="Biweekly Report"
        />
        <Grid container>
          <Grid item sm={10} md={10} lg={11} sx={{ alignItems: "center" }}>
            <Grid container sx={{ justifyContent: "space-between" }}>
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
              <Grid item>
                {state?.target?.week?.statusLabel ? (
                  <Chip
                    label={state?.target?.week?.statusLabel}
                    variant="filled"
                    style={{
                      marginTop: "5px",
                      alignSelf: "flex-end",
                      position: "absolute",
                      right: "50px",
                      backgroundColor: "green",
                      color: "white",
                      width: "100px",
                    }}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
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
                getOptionLabel={(i) => `${i?.code} - ${i?.description}`}
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
          <Grid item container sx={{ marginTop: "20px" }}>
            <Grid md={12}>
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
            </Grid>

            {!isLoading &&
              cropCategoryList.map((category, index) => (
                <TabContent
                  className={toggleState === index + 1 ? "active-content" : ""}
                >
                  {toggleState === index + 1 && biWeekReportId ? (
                    <BiWeeklyReportingTab
                      registrationId={biWeekReportId}
                      aiRegion={selectedAiRegion}
                      seasonId={selectedSeason?.id}
                      cropCategoryId={category?.id}
                      status={state}
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
            title="Approve Biweekly Report"
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
            <>Do you want to approve?</>
          </DialogBox>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default BiWeeklyReportingForm;
