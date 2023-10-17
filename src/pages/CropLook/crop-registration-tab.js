import React, { useEffect, useState } from "react";
import MultiSelectTils from "../../components/MultiSelectTiles/multi-select-tiles";
import { Factory } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { getCropVaritesByCropCategory } from "../../redux/actions/crop/cropVariety/action";
import {
  createCropRegistration,
  getCropRegistrationById,
  updateCropRegistrationItems,
} from "../../redux/actions/cropLook/cropRegistration/actions";
import { DEF_ACTIONS } from "../../utils/constants/permission";

const CropRegistrationTab = ({ mode, registrationId, cropCategoryId }) => {
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [cropVarietyList, setCropVarietyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectedCrops = (cropId, selected) => {
    setIsLoading(true);
    if (selected) {
      var cropToUpdate = cropVarietyList.find((crop) => crop.id === cropId);
      cropToUpdate.selected = true;
      setCropVarietyList([...cropVarietyList]);
      setSelectedCrops([...selectedCrops, cropId]);
    } else {
      var cropToUpdate = cropVarietyList.find((crop) => crop.id === cropId);
      cropToUpdate.selected = false;
      setCropVarietyList([...cropVarietyList]);
      setSelectedCrops(selectedCrops.filter((id) => id !== cropId));
    }
  };

  useEffect(() => {
    console.log(
      "registration id: " +
        registrationId +
        " | crop category id: " +
        cropCategoryId
    );
    // load crop varites by crop category id
    getCropVaritesByCropCategory(cropCategoryId).then(({ dataList = [] }) => {
      getCropRegistrationById(registrationId).then(({ data = {} }) => {
        console.log("data for registration id " + registrationId);
        console.log(data);
        data?.items?.map((item) => {
          if (item?.cropCategory.id == cropCategoryId) {
            var selectedVarity = dataList.find(
              (ele) => ele.id === item?.cropVariety.id
            );
            console.log("selected varty ");
            console.log(selectedVarity);
            selectedVarity.selected = true;
          }
        });
        console.log("data list in each tab -----------");
        console.log(dataList);
        setCropVarietyList(dataList);
      });
    });
  }, []);

  const handleCropClear = () => {
    cropVarietyList.map((varity) => {
      varity.selected = false;
    });
    console.log("inside crop clear");
    setCropVarietyList([]);
    setCropVarietyList(cropVarietyList);
  };

  const handleCropUpdate = async () => {
    console.log("registration id ------->");
    console.log(registrationId);

    console.log("all crop varieties to update ------->");
    console.log(selectedCrops);

    // const items = cropVarietyList.map((variety) => {
    //   if(variety.selected) {
    //     return {
    //       cropCategory: { id: cropCategoryId },
    //       cropVariety: { id: variety },
    //     }
    //   }
    // });

    var items = [];
    for (const variety of cropVarietyList) {
      if (variety.selected) {
        items.push({
          cropCategory: { id: cropCategoryId },
          cropVariety: { id: variety?.id },
        });
      }
    }

    const payload = {
      id: registrationId,
      categoryId: cropCategoryId,
      items: items,
    };

    try {
      await updateCropRegistrationItems(payload);
    } catch (error) {
      console.log(error);
    }
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
        <MultiSelectTils
          options={cropVarietyList}
          handleSelectedValues={handleSelectedCrops}
          isItemDisabled={mode === DEF_ACTIONS.VIEW}
        />
      </Grid>
    </Grid>
  );
};

export default CropRegistrationTab;
