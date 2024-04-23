import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Stack, Typography } from "@mui/material";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { getTargetCropsByAiAndSeasonAndCropCategory } from "../../../redux/actions/cropLook/cropTarget/actions";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import BiweeklyCropInput from "../components/biweekly-cropInput";
import {
  changeStatusOfBiWeekCropCategoryReport,
  updateBiWeekReporting,
} from "../../../redux/actions/cropLook/biWeekReporting/actions";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";
import { getDbFieldName } from "../../../utils/appUtils";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { BI_WEEK_REPORT_STATUS } from "../../../utils/constants/bi-week-report-status";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";

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
  const [saving, setSaving] = useState(false);
  const [configFields, setConfigFields] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [cropTargetId, setCropTargetId] = useState(savedCropCategoryTarget?.id);

  useEffect(() => {
    getConfigurationById(cropCategoryId).then((data = {}) => {
      console.log("data fields");
      console.log(data);
      setConfigFields(data ? data.fields : []);
      checkDataLoadStatus();
    });
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

    // Calculate total target
    let total = 0;
    if (configFields.length > 0) {
      let target =
        updatedVarietyTargets[cropIndex].varietyTargets[varietyIndex];
      configFields.forEach((field) => {
        total += parseFloat(
          target[getDbFieldName(field)] ? target[getDbFieldName(field)] : 0
        );
      });
    }

    updatedVarietyTargets[cropIndex].varietyTargets[varietyIndex][
      "totalExtent"
    ] = total;

    setCropTargets(updatedVarietyTargets);
    setIsCleared(false);
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

        for (const variety of crop.varietyTargets) {
          Object.keys(variety).forEach((key) => {
            if (
              key === "varietyId" ||
              key === "varietyName" ||
              key === "imageUrl" ||
              key === "id"
            ) {
              return;
            }
            if (variety[key]) {
              variety[key] = 0;
            }
          });
        }
      }
    }
    setCropTargets(newCropTargets);
    setIsCleared(true);
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
      setCropTargets(dataList?.dataList?.biWeekCropReport);
      setCropTargetId(dataList?.dataList?.id);
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

  const onSuccessForApproval = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        mode === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
    setOpenDialog(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  const approveCategoryReport = () => {
    changeStatusOfBiWeekCropCategoryReport(
      savedCropCategoryTarget?.id,
      BI_WEEK_REPORT_STATUS.AI_COMPLETED,
      onSuccessForApproval,
      onError
    );
  };

  return (
    <>
      <Grid container>
        <Grid item sm={12} md={12} lg={12}>
          <div style={{ textAlign: "left" }}>
            <Stack direction="row" spacing={1}>
              <ButtonGroup size="small" aria-label="Small button group">
                <Grid item sx={{ pt: "8px" }}>
                  <Button
                    disabled={mode === DEF_ACTIONS.VIEW}
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={handleCropClear}
                  >
                    Clear
                  </Button>
                </Grid>
                {saving ? (
                  <Button variant="contained" size="small">
                    {mode === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
                  </Button>
                ) : (
                  <PermissionWrapper
                    permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.BI_WEEK_CROP_CATEGORY_REPORT}`}
                  >
                    <Grid item sx={{ pt: "8px" }}>
                      <Button
                        disabled={mode === DEF_ACTIONS.VIEW || isCleared}
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={handleCropUpdate}
                      >
                        Update
                      </Button>
                    </Grid>
                  </PermissionWrapper>
                )}
              </ButtonGroup>

              {cropTargetId && (
                <Grid item sx={{ pt: "8px" }}>
                  <PermissionWrapper
                    permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.BI_WEEK_REPORT}`}
                  >
                    <Button
                      disabled={!cropTargetId}
                      variant="outlined"
                      color="success"
                      onClick={() => setOpenDialog(true)}
                      size="small"
                    >
                      Complete
                    </Button>
                  </PermissionWrapper>
                </Grid>
              )}
            </Stack>
          </div>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
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
      <DialogBox
        open={openDialog}
        title="Submit Reporting"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={approveCategoryReport}
              sx={{ ml: "8px" }}
            >
              OK
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDialog(false)}
              sx={{ ml: "8px" }}
            >
              Cancel
            </Button>
          </ActionWrapper>
        }
      >
        <Typography>Do you want to submit your reporting?</Typography>
      </DialogBox>
    </>
  );
};

export default BiWeeklyReportingTab;
