import React, { useEffect, useState } from "react";
import MultiSelectTils from "../../components/MultiSelectTiles/multi-select-tiles";
import { Button, Grid } from "@mui/material";
import { getCropVaritesByCropCategory } from "../../redux/actions/crop/cropVariety/action";
import {
  getCropRegistrationById,
  updateCropRegistrationItems,
} from "../../redux/actions/cropLook/cropRegistration/actions";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";

const CropRegistrationTab = ({ mode, registrationId, cropCategoryId }) => {
  const { addSnackBar } = useSnackBars();

  const [selectedCrops, setSelectedCrops] = useState([]);
  const [cropVarietyList, setCropVarietyList] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleSelectedCrops = (cropId, selected) => {
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
    // load crop varites by crop category id
    getCropVaritesByCropCategory(cropCategoryId).then(({ dataList = [] }) => {
      getCropRegistrationById(registrationId).then(({ data = {} }) => {
        data?.items?.map((item) => {
          if (item?.cropCategory.id == cropCategoryId) {
            var selectedVarity = dataList.find(
              (ele) => ele.id === item?.cropVariety.id
            );
            selectedVarity.selected = true;
          }
        });
        setCropVarietyList(dataList);
      });
    });
  }, []);

  const handleCropUpdate = async () => {
    setSaving(true);
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
      await updateCropRegistrationItems(payload, onSuccess, onError);
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
      <Grid item sm={12} md={12} lg={12} >
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
