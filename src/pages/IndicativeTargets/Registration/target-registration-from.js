import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Grid,
  Button,
  ButtonGroup,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { useEffect } from "react";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../Farm-Land/FarmLandForm";
import CropRegistrationTab from "./target-registration-tab";
import {
  createCropRegistration,
  getDDDivisionsByLogedInUser,
  getSeasons,
} from "../../../redux/actions/cropLook/cropRegistration/actions";
import { REGION_PARENT_TYPE } from "../../../utils/constants/region-parent-type";
import { Fonts } from "../../../utils/constants/Fonts";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { getAllDDLevelRegions, updateCropRegistrationItems } from "../../../redux/actions/indicativeTargets/actions";
import { get_CropList } from "../../../redux/actions/crop/crop/action";
import MultiSelectTils from "../../../components/MultiSelectTiles/multi-select-tiles";
import TargetRegistrationTils from "./target-registration-tiles";

const TargetRegistrationForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [cropCategoryList, setCropCategoryList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState({});
  const [selectedDDDivision, setSelectedDDDivision] = useState({});
  const [registrationId, setRegistrationId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [toggleState, setToggleState] = useState(1);
  const [tabEnabled, setTabInabled] = useState(false);

  const [cropList, setCropList] = useState([]);

  // start of crop registration code

  useEffect(() => {
    getAllDDLevelRegions().then(({ dataList = [] }) => {
      setOptions(dataList);
      console.log(dataList);
    });

    get_CropList().then(({ dataList = [] }) => {
      setCropList(dataList);
      console.log(dataList);
      console.log(dataList);
    });

    get_CategoryList().then(({ dataList = [] }) => {
      setCropCategoryList(dataList);
      console.log(dataList);
    });

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setRegistrationId(state?.target?.id);
      setSelectedSeason(state?.target?.season);

      var ddDivision = {};
      if (state?.target?.parentType === REGION_PARENT_TYPE.PROVINCIAL) {
        const provincialDD = state?.target?.provincialDD;
        ddDivision = {
          id: provincialDD.id,
          name: provincialDD.provincialDdId,
          parentType: REGION_PARENT_TYPE.PROVINCIAL,
        };
      } else if (
        state?.target?.parentType === REGION_PARENT_TYPE.INTER_PROVINCIAL
      ) {
        const interProvincialDD = state?.target?.interProvincialDD;
        ddDivision = {
          id: interProvincialDD.id,
          name: interProvincialDD.ddId,
          parentType: REGION_PARENT_TYPE.INTER_PROVINCIAL,
        };
      } else {
        const mahaweliBlock = state?.target?.mahaweliBlock;
        ddDivision = {
          id: mahaweliBlock.id,
          name: mahaweliBlock.code,
          parentType: REGION_PARENT_TYPE.MAHAWELI,
        };
      }
      setSelectedDDDivision(ddDivision);
    }
  }, []);

  useEffect(() => {
    console.log("in second use effect registration id: " + registrationId);
    if (registrationId) {
      setIsLoading(false);
    }
  }, [registrationId]);

  const goBack = () => {
    navigate("/crop-look/crop-registration");
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

  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
        return true;
      }
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

    try {
      await updateCropRegistrationItems(payload, onSuccess, onError);
    } catch (error) {
      console.log(error);
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
                getOptionLabel={(i) => `${i.name}`}
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
