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

const BiWeeklyReportingTab = ({
  mode,
  registrationId,
  cropCategoryId,
  aiRegionId,
  seasonId,
  savedCropCategoryTarget,
}) => {
  const { addSnackBar } = useSnackBars();
  const [cropTargets, setCropTargets] = useState([]);
  const [cropVarietyList, setCropVarietyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode === DEF_ACTIONS.VIEW || mode === DEF_ACTIONS.EDIT) {
      // getTargetSeasonalRegion(registrationId).then(({ dataList = [] }) => {
      //   setCropTargets(dataList?.cropTargets);
      // });
      setCropTargets(savedCropCategoryTarget?.cropTargets);
    } else {
      getTargetCropsByAiAndSeasonAndCropCategory(
        aiRegionId,
        seasonId,
        cropCategoryId
      ).then(({ dataList = [] }) => {
        setCropTargets(dataList);
      });
    }
  }, []);

  const targetedExtentHandler = (cropIndex, varietyIndex, field, value) => {
    const updatedVarietyTargets = [...cropTargets];
    updatedVarietyTargets[cropIndex].varietyTargets[varietyIndex][field] =
      value;
    setCropTargets(updatedVarietyTargets);
  };

  const handleCropClear = () => {

    const newCropTargets = [...cropTargets];

    for (const crop of newCropTargets) {
      if (crop.varietyTargets) {
        for (const variety of crop.varietyTargets) {
          if(variety.targetedExtentMajor)
            variety.targetedExtentMajor = 0;
          if(variety.targetedExtentMinor)
            variety.targetedExtentMinor = 0;
          if(variety.targetedExtentRainfed)
            variety.targetedExtentRainfed = 0;
          if(variety.targetedExtentIrrigate)
            variety.targetedExtentIrrigate = 0;
          if(variety.targetedExtent)
            variety.targetedExtent = 0;
        }
      }
    }
    setCropTargets(newCropTargets);
  };

  const handleCropUpdate = async () => {
    setSaving(true);
    const payload = {
      id: registrationId,
      cropCategoryTargets: [
        {
          cropCategory: { id: cropCategoryId },
          cropTargets: cropTargets,
        },
      ],
    };

    try {
      await updateCropTarget(
        registrationId,
        cropCategoryId,
        payload,
        onSuccess,
        onError
      );
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
        <div style={{ textAlign: "right" }}>
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
        {cropTargets &&
          cropTargets.map((cropTarget, cropIndex) => (
            <BiweeklyCropInput
              cropTarget={cropTarget}
              targetedExtentHandler={targetedExtentHandler}
              mode={mode}
              cropIndex={cropIndex}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default BiWeeklyReportingTab;
