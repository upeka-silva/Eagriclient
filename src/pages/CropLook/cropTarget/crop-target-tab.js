import React, { useEffect, useState } from "react";
import MultiSelectTils from "../../../components/MultiSelectTiles/multi-select-tiles";
import { Button, Grid } from "@mui/material";
import { getCropVaritesByCropCategory } from "../../../redux/actions/crop/cropVariety/action";
import {
  createCropRegistration,
  getCropRegistrationById,
  updateCropRegistrationItems,
} from "../../../redux/actions/cropLook/cropRegistration/actions";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import CropInput from "../components/cropInput";
import { getTargetCropsByAiAndSeasonAndCropCategory } from "../../../redux/actions/cropLook/cropTarget/actions";

const CropTargetTab = ({ mode, registrationId, cropCategoryId, aiRegionId, seasonId }) => {
  const [cropTargets, setCropTargets] = useState([]);
  const [cropVarietyList, setCropVarietyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectedCrops = (cropId, selected) => {

  };

  useEffect(() => {

    getTargetCropsByAiAndSeasonAndCropCategory(aiRegionId, seasonId, cropCategoryId).then(({ dataList = [] }) => {
      setCropTargets(dataList);
    });
  }, []);

  const targetedExtentHandler = (cropIndex, varietyIndex, field, value) => {
    const updatedVarietyTargets = [...cropTargets];
    updatedVarietyTargets[cropIndex].varietyTargets[varietyIndex][field] = value;
    setCropTargets(updatedVarietyTargets);
  };

  const handleCropClear = () => {
    // cropVarietyList.map((varity) => {
    //   varity.selected = false;
    // });
    // console.log("inside crop clear");
    // setCropVarietyList([]);
    // setCropVarietyList(cropVarietyList);
  };

  const handleCropUpdate = async () => {
    console.log('crop targets ------------->');
    console.log(cropTargets);

    // const items = cropVarietyList.map((variety) => {
    //   if(variety.selected) {
    //     return {
    //       cropCategory: { id: cropCategoryId },
    //       cropVariety: { id: variety },
    //     }
    //   }
    // });

    // var items = [];
    // for (const variety of cropVarietyList) {
    //   if (variety.selected) {
    //     items.push({
    //       cropCategory: { id: cropCategoryId },
    //       cropVariety: { id: variety?.id },
    //     });
    //   }
    // }

    // const payload = {
    //   id: registrationId,
    //   categoryId: cropCategoryId,
    //   items: items,
    // };

    // try {
    //   await updateCropRegistrationItems(payload);
    // } catch (error) {
    //   console.log(error);
    // }
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
          <Button
            disabled={mode === DEF_ACTIONS.VIEW}
            variant="contained"
            color="success"
            size="small"
            onClick={handleCropUpdate}
            sx={{ marginTop: "10px" }}
          >
            Update
          </Button>
        </div>
      </Grid>
      <Grid item sm={12} md={12} lg={12} sx={{ marginTop: "10px" }}>
        {cropTargets.map((cropTarget, cropIndex) => (
          <CropInput
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

export default CropTargetTab;
