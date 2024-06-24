import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import CropInput from "../components/cropInput";
import {
  getTargetCropsByAiAndSeasonAndCropCategory,
  updateCropTarget,
} from "../../../redux/actions/cropLook/cropTarget/actions";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";
import { getDbFieldName } from "../../../utils/appUtils";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";

const CropTargetTab = ({
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

  const [newCropTargets, setNewCropTargets] = useState([]);
  const [savedCropTarget, setSavedCropTarget] = useState([]);

  useEffect(() => {
    getConfigurationById(cropCategoryId).then((data = {}) => {
      setConfigFields(data ? data.targetFields : []);
      checkDataLoadStatus();
    });

    setSavedCropTarget(savedCropCategoryTarget?.cropTargets);
    getTargetCropsByAiAndSeasonAndCropCategory(
      aiRegion.id,
      seasonId,
      cropCategoryId,
      aiRegion.parentType
    ).then(({ dataList = [] }) => {
      setNewCropTargets(dataList);
      checkDataLoadStatus();
    });
  }, []);

  function findNewVarieties(newCropTargets, oldCropTargets) {
    if (oldCropTargets === undefined) {
      oldCropTargets = [];
    }

    newCropTargets.forEach((newCrop) => {
      const oldCrop = oldCropTargets?.find(
        (crop) => crop.cropId === newCrop.cropId
      );

      if (oldCrop) {
        newCrop.varietyTargets.forEach((newVariety) => {
          const existsInOld = oldCrop.varietyTargets.some(
            (oldVariety) => oldVariety.varietyId === newVariety.varietyId
          );
          if (!existsInOld) {
            oldCrop.varietyTargets.push(newVariety);
          }
        });
      } else {
        oldCropTargets.push(newCrop);
      }
    });

    return oldCropTargets;
  }

  const getData = findNewVarieties(newCropTargets, savedCropTarget);

  const checkDataLoadStatus = () => {
    setDataLoaded(true);
  };

  const targetedExtentHandler = (cropIndex, varietyIndex, field, value) => {
    const updatedVarietyTargets = [...getData];
    updatedVarietyTargets[cropIndex].varietyTargets[varietyIndex][field] =
      value;

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

    setSavedCropTarget(updatedVarietyTargets);
    setIsCleared(true);
  };

  const handleCropClear = () => {
    const newCropTargets = [...getData];
    for (const crop of newCropTargets) {
      if (crop.varietyTargets) {
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
    setSavedCropTarget(newCropTargets);
    setIsCleared(false);
  };

  const handleCropUpdate = async () => {
    setSaving(true);
    const payload = {
      id: registrationId,
      cropCategoryTargets: [
        {
          cropCategory: { id: cropCategoryId },
          cropTargets: getData,
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
        <PermissionWrapper
          permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.SEASONAL_CROP_TARGET}`}
        >
          <div style={{ textAlign: "left" }}>
            {/* <Button
              disabled={mode === DEF_ACTIONS.VIEW}
              style={{ marginRight: "10px" }}
              variant="contained"
              color="success"
              size="small"
              onClick={handleCropClear}
              sx={{ marginTop: "10px" }}
            >
              Clear
            </Button> */}

            {saving ? (
              <Button variant="contained" size="small">
                {mode === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
              </Button>
            ) : (
              <Button
                disabled={mode === DEF_ACTIONS.VIEW || !isCleared}
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
        </PermissionWrapper>
      </Grid>
      <Grid item sm={12} md={12} lg={12} sx={{ marginTop: "10px" }}>
        {dataLoaded &&
          getData.map((cropTarget, cropIndex) => (
            <CropInput
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

export default CropTargetTab;
