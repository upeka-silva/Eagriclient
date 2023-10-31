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
import { updateBiWeekReporting } from "../../../redux/actions/cropLook/biWeekReporting/actions";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";

const BiWeeklyReportingTab = ({
  mode,
  registrationId,
  cropCategoryId,
  aiRegion,
  seasonId,
  savedCropCategoryTarget,
}) => {
  const { addSnackBar } = useSnackBars();
  const [cropTargets, setCropTargets] = useState([]);
  const [cropVarietyList, setCropVarietyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configFields, setConfigFields] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getConfigurationById(cropCategoryId).then((data = {}) => {
      console.log("data fields");
      console.log(data);
      setConfigFields(data ? data.fields : []);
      checkDataLoadStatus();
    });

    console.log("inside tab ========>");
    if (
      (mode === DEF_ACTIONS.VIEW || mode === DEF_ACTIONS.EDIT) &&
      savedCropCategoryTarget?.biWeekCropReport
    ) {
      setCropTargets(savedCropCategoryTarget?.biWeekCropReport);
    } else {
      getTargetCropsByAiAndSeasonAndCropCategory(
        aiRegion.id,
        seasonId,
        cropCategoryId,
        aiRegion.parentType
      ).then(({ dataList = [] }) => {
        setCropTargets(dataList);
        checkDataLoadStatus();
      });
    }
  }, []);

  const checkDataLoadStatus = () => {
    //if (configFields.length > 0 && cropTargets.length > 0) {
    setDataLoaded(true);
    //}
  };

  const targetedExtentHandler = (cropIndex, varietyIndex, field, value) => {
    const updatedVarietyTargets = [...cropTargets];

    updatedVarietyTargets[cropIndex].varietyTargets[varietyIndex][field] =
      value;

    const existingTotal =
      updatedVarietyTargets[cropIndex].varietyTargets[varietyIndex][
        "totalExtent"
      ];
    updatedVarietyTargets[cropIndex].varietyTargets[varietyIndex][
      "totalExtent"
    ] = parseFloat(existingTotal ? existingTotal : 0) + parseFloat(value);

    setCropTargets(updatedVarietyTargets);
  };

  const handleCropClear = () => {
    const newCropTargets = [...cropTargets];

    for (const crop of newCropTargets) {
      if (crop.varietyTargets) {
        for (const variety of crop.varietyTargets) {
          if (variety.targetedExtentMajor) variety.targetedExtentMajor = 0;
          if (variety.targetedExtentMinor) variety.targetedExtentMinor = 0;
          if (variety.targetedExtentRainfed) variety.targetedExtentRainfed = 0;
          if (variety.targetedExtentIrrigate)
            variety.targetedExtentIrrigate = 0;
          if (variety.targetedExtent) variety.targetedExtent = 0;
        }
      }
    }
    setCropTargets(newCropTargets);
  };

  const handleCropUpdate = async () => {
    setSaving(true);
    const payload = {
      id: registrationId,
      biWeekCropCategoryReport: [
        {
          cropCategory: { id: cropCategoryId },
          biWeekCropReport: cropTargets,
        },
      ],
    };

    try {
      const dataList = await updateBiWeekReporting(
        registrationId,
        cropCategoryId,
        payload,
        onSuccess,
        onError
      );
      console.log("after saving biweek crop report------------>");
      console.log(dataList.dataList.biWeekCropReport);
      setCropTargets(dataList?.dataList?.biWeekCropReport);
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        mode === DEF_ACTIONS.ADD
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

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12}>
        <div style={{ textAlign: "left" }}>
          <Button
            disabled={mode === DEF_ACTIONS.VIEW}
            style={{ marginRight: "10px" }}
            variant="contained"
            color="success"
            size="small"
            onClick={handleCropClear}
            sx={{ marginTop: "10px" }}
          >
            Clear
          </Button>

          {saving ? (
            <Button variant="contained" size="small">
              {mode === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
            </Button>
          ) : (
            <Button
              disabled={mode === DEF_ACTIONS.VIEW}
              variant="outlined"
              color="success"
              size="small"
              onClick={handleCropUpdate}
              sx={{ marginTop: "10px" }}
            >
              Update
            </Button>
          )}
        </div>
      </Grid>
      <Grid item sm={12} md={12} lg={12} sx={{ marginTop: "10px" }}>
        {dataLoaded &&
          cropTargets.map((cropTarget, cropIndex) => (
            <BiweeklyCropInput
              cropTarget={cropTarget}
              targetedExtentHandler={targetedExtentHandler}
              mode={mode}
              cropIndex={cropIndex}
              configFields={configFields}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default BiWeeklyReportingTab;
