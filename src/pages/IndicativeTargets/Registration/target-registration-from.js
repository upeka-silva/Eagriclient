import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { useEffect } from "react";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { Fonts } from "../../../utils/constants/Fonts";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { getAllDDLevelRegions, saveCropRegistrationItems, updateCropRegistrationItems } from "../../../redux/actions/indicativeTargets/actions";
import { get_CropList } from "../../../redux/actions/crop/crop/action";
import TargetRegistrationTils from "./target-registration-tiles";

const TargetRegistrationForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState({});
  const [selectedDDDivision, setSelectedDDDivision] = useState({});
  const [registrationId, setRegistrationId] = useState(null);

  const [cropList, setCropList] = useState([]);

  // start of crop registration code

  useEffect(() => {
    getAllDDLevelRegions().then(({ dataList = [] }) => {
      setOptions(dataList);
      console.log(dataList);
    });

    get_CropList().then(({ dataList = [] }) => {
      const items = state.target?.items;
      console.log(dataList);
      console.log(items);

      if(items && dataList) {
        console.log('item is available');
        for (var crop of dataList) {
          var isAvailable = items.find(
            (ele) => ele?.crop?.id === crop.id
          );
          if(isAvailable) {
            console.log('crop is available in items');
            crop.selected = true;
          }
        }
      }
      console.log(dataList);
      setCropList([...dataList]);
    });

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      var ddDivision = {
                          id: state.target.regionId,
                          name: state.target.regionName,
                          parentType: state.target.regionType

                        };

      setSelectedDDDivision(ddDivision);
    }
  }, []);

  const goBack = () => {
    navigate("/crop-target/crop-registration");
  };

  const handleDDChange = (value) => {
    setSelectedDDDivision(value);
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
    }
  };

  const  enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      return true;
    }
    if (
      state?.action === DEF_ACTIONS.ADD &&
      selectedDDDivision &&
      selectedSeason &&
      !registrationId
    ) {
      return true;
    }
    return false;
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
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

  const handleFormSubmit = async () => {
    setSaving(true);
    var items = [];
    for (const crop of cropList) {
      if (crop.selected) {
        items.push({
          crop: { id: crop.id }
        });
      }
    }

    const payload = {
      regionId: selectedDDDivision.id,
      regionName: selectedDDDivision.name,
      regionType: selectedDDDivision.parentType,
      items: items,
    };

    if(state.action === DEF_ACTIONS.EDIT) {
      payload.id = state.target.id;

      try {
        await updateCropRegistrationItems(payload, onSuccess, onError);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await saveCropRegistrationItems(payload, onSuccess, onError);
      } catch (error) {
        console.log(error);
      }
    }


  };

  const handleSelectedCrops = (cropId, selected) => {
    cropList.map((crop) => {
      if (crop.id === cropId) {
        crop.selected = selected;
      }
    });
    setCropList([...cropList]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <FormWrapper>
        <PageHeader
          saving={saving}
          state={state}
          goBack={goBack}
          formName="Crop Registration"
        />
        <FormButtonGroup
          {...{
            state,
            DEF_ACTIONS,
            saving,
            enableSave,
            handleFormSubmit,
            resetForm,
          }}
        />
        <Grid container>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Deputy Director Division/ Mahaweli Block</FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                options={options}
                value={selectedDDDivision}
                getOptionLabel={(i) => `${i.name}(${i.parentType})`}
                onChange={(event, value) => {
                  handleDDChange(value);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
              />
            </FieldWrapper>
          </Grid>
          <Grid item sx={{ marginTop: "20px" }} sm={12} md={12} lg={12}>
            {cropList ? (
              <TargetRegistrationTils
                cropList={cropList}
                handleSelectedValues={handleSelectedCrops}
                isItemDisabled={state.action === DEF_ACTIONS.VIEW}
              />
            ) : null}
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default TargetRegistrationForm;
