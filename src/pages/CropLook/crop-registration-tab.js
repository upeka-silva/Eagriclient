import React, { useEffect, useState } from "react";
import MultiSelectTils from "../../components/MultiSelectTiles/multi-select-tiles";
import { Button, Grid } from "@mui/material";
import {
  getCropVaritesByCropCategory,
  getCropsByCropCategory,
} from "../../redux/actions/crop/cropVariety/action";
import {
  getCropRegistrationById,
  updateCropRegistrationItems,
} from "../../redux/actions/cropLook/cropRegistration/actions";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";

const CropRegistrationTab = ({ mode, registrationId, cropCategoryId }) => {
  const { addSnackBar } = useSnackBars();

  const [cropVarietyList, setCropVarietyList] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleSelectedCrops = (varietyId, selected, cropId) => {
    cropVarietyList.map((crop) => {
      if (crop.id === cropId) {
        var cropToUpdate = crop.varietyList.find(
          (variety) => variety.id === varietyId
        );
        cropToUpdate.selected = selected;
      }
    });
    setCropVarietyList([...cropVarietyList]);
  };

  useEffect(() => {
    getCropsByCropCategory(cropCategoryId).then(({ dataList = [] }) => {
      getCropRegistrationById(registrationId).then(({ data = {} }) => {
        data?.items?.map((item) => {
          if (item?.cropCategory.id == cropCategoryId) {
            dataList.map((crop) => {
              if (crop.varietyList) {
                var selectedVarity = crop?.varietyList.find(
                  (ele) => ele.id === item?.cropVariety.id
                );
                if (selectedVarity) {
                  selectedVarity.selected = true;
                }
              }
            });
          }
        });
        setCropVarietyList(dataList);
      });
    });
  }, []);

  const handleCropUpdate = async () => {
    setSaving(true);
    var items = [];
    for (const crop of cropVarietyList) {
      for (const variety of crop.varietyList) {
        if (variety.selected) {
          items.push({
            cropCategory: { id: cropCategoryId },
            crop: { id: crop.id},
            cropVariety: { id: variety?.id },
          });
        }
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
      <Grid item sm={11} md={11} lg={11}>
        <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_REGISTRATION_ITEM}`}
        >
        <div style={{ textAlign: "right", paddingBottom: "10px" }}>
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
        </PermissionWrapper>
      </Grid>
      <Grid item sm={12} md={12} lg={12}>
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
