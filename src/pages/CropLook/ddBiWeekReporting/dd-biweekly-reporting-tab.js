import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import CropInput from "../components/cropInput";
import {
  getTargetCropsByAiAndSeasonAndCropCategory,
  getTargetSeasonalRegion,
  updateCropTarget,
} from "../../../redux/actions/cropLook/cropTarget/actions";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import BiweeklyCropInput from "../components/biweekly-cropInput";
import { getAggregateBiWeekReport, updateBiWeekReporting } from "../../../redux/actions/cropLook/biWeekReporting/actions";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";

const DDBiWeeklyReportingTab = ({
  mode,
  registrationId,
  cropCategoryId,
  aiRegion,
  seasonId,
  weekId,
  savedCropCategoryTarget,
}) => {
  const { addSnackBar } = useSnackBars();
  const [cropTargets, setCropTargets] = useState([]);
  const [cropVarietyList, setCropVarietyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configFields, setConfigFields] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [aggregateList, setAggregateList] = useState([]);

  useEffect(() => {
    console.log('saved crop targets -------->');
    console.log(savedCropCategoryTarget?.crop);
    getConfigurationById(cropCategoryId).then((data = {}) => {
      setConfigFields(data ? data.fields : []);
      checkDataLoadStatus();
    });
  }, []);

  const checkDataLoadStatus = () => {
    setDataLoaded(true);
  };

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} sx={{ marginTop: "10px" }}>
        {dataLoaded &&
          savedCropCategoryTarget && savedCropCategoryTarget.crop.map((cropTarget, cropIndex) => (
            <BiweeklyCropInput
              cropTarget={cropTarget}
              //targetedExtentHandler={targetedExtentHandler}
              mode={mode}
              cropIndex={cropIndex}
              configFields={configFields}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default DDBiWeeklyReportingTab;
