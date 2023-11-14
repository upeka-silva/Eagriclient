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
import BiWeeklyReportingTab from "./dd-biweekly-reporting-tab";
import {
  changeStatusOfBiWeekReport,
  createBiWeeklyReport,
  getAggregateBiWeekReport,
  getCropLookSeasons,
} from "../../../redux/actions/cropLook/biWeekReporting/actions";
import { REGION_PARENT_TYPE } from "../../../utils/constants/region-parent-type";
import { BI_WEEK_DATA_STATUS } from "../../../utils/constants/bi-week-data-status";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { Vrpano } from "@mui/icons-material";
import { BI_WEEK_REPORT_STATUS } from "../../../utils/constants/bi-week-report-status";
import DDBiWeeklyReportingTab from "./dd-biweekly-reporting-tab";

const DDBiWeeklyReportingForm = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const [aggregateList, setAggregateList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    get_CategoryList().then(({ dataList = [] }) => {
      setCropCategoryList(dataList);
    });

    getAggregateBiWeekReport(state.target.seasonId, state.target.weekId).then(
      (dataList = []) => {
        const groupedData = [];
        dataList.forEach((item) => {
          const { cropCategoryId, cropId, varietyId } = item;

          if (!groupedData[cropCategoryId]) {
            groupedData[cropCategoryId] = {
              cropCategoryId: cropCategoryId,
              crop: [],
            };
          }

          if (!groupedData[cropCategoryId].crop[cropId]) {
            groupedData[cropCategoryId].crop[cropId] = {
              id: cropId,
              cropName: item.cropName,
              varietyTargets: [],
            };
          }

          if (
            !groupedData[cropCategoryId].crop[cropId].varietyTargets[varietyId]
          ) {
            groupedData[cropCategoryId].crop[cropId].varietyTargets[varietyId] = 
              {
                varietyId: varietyId,
                varietyName: item.varietyName,
                targetedExtentMajor: item.totalTargetedExtentMajor,
                targetedExtentMinor: item.totalTargetedExtentMinor,
                targetedExtentRainfed: item.totalTargetedExtentRainfed,
                targetedExtentIrrigate: item.totalTargetedExtentIrrigate,
              };
          } else {
            const variety =
              groupedData[cropCategoryId].crop[cropId].varietyTargets[
                varietyId
              ];

            variety.targetedExtentMajor +=
              item.totalTargetedExtentMajor || 0;
            variety.targetedExtentMinor +=
              item.totalTargetedExtentMinor || 0;
            variety.targetedExtentRainfed +=
              item.totalTargetedExtentRainfed || 0;
            variety.targetedExtentIrrigate +=
              item.totalTargetedExtentIrrigate || 0;
          }

          // Add other properties like totalTargetedExtentRainfed and totalTargetedExtentIrrigate if needed

          // Remove the properties from the top-level object
          // delete item.cropCategoryId;
          // delete item.cropName;
          // delete item.cropId;
          // delete item.varietyId;
          // delete item.varietyName;

          // Copy the remaining properties to the variety object
          //Object.assign(variety, item);
        });

        const result = Object.values(groupedData);
        console.log("group data");
        console.log(result);
        setAggregateList(result);
        setIsLoading(false);
      }
    );
  }, []);

  const goBack = () => {
    navigate("/crop-look/dd-biweekly-reporting");
  };

  const toggleTab = (index) => {
    console.log("toggle state : " + index);
    setToggleState(index);
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
        <Grid container>
          <Grid item sm={10} md={10} lg={10} sx={{ alignItems: "center" }}>
            <Grid container>
              <Grid item sx={{ pt: "8px", pb: "15px" }}>
                <PermissionWrapper
                  permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
                >
                  <Button
                    variant="outlined"
                    color="success"
                    //onClick={approveBiWeekReport}
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
              <TextField
                id="outlined-basic"
                label="Season"
                variant="outlined"
                value={state.target.seasonName}
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <TextField
                id="outlined-basic"
                label="Week"
                variant="outlined"
                value={state.target.weekName}
              />
            </FieldWrapper>
          </Grid>
          <Grid item sx={{ marginTop: "20px" }}>
            <TabWrapper style={{ margin: "0px 0px" }}>
              {!isLoading &&
                cropCategoryList.map((category, index) => (
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
                  {!isLoading ? (
                    <DDBiWeeklyReportingTab
                      seasonId={state.target.seasonId}
                      weekId={state.target.weekId}
                      registrationId={biWeekReportId}
                      aiRegion={selectedAiRegion}
                      cropCategoryId={category?.id}
                      mode={state?.action}
                      savedCropCategoryTarget={
                        aggregateList
                          ? aggregateList.find(
                              (target) =>
                                target?.cropCategoryId === category?.id
                            )
                          : null
                      }
                    />
                  ) : (
                    <CircularProgress />
                  )}
                </TabContent>
              ))}
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default DDBiWeeklyReportingForm;
