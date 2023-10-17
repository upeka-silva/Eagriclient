import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Grid,
  Button,
  ButtonGroup,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import {
  handleCropSubCategory,
  updateCropSubCategory,
} from "../../redux/actions/crop/cropSubCategory/action";
import { get_CategoryList } from "../../redux/actions/crop/cropCategory/action";
import { useEffect } from "react";
import BackToList from "../../components/BackToList/BackToList";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Factory } from "@mui/icons-material";
import MultiSelectTils from "../../components/MultiSelectTiles/multi-select-tiles";
import { TabButton, TabContent, TabWrapper } from "../Farm-Land/FarmLandForm";
import CropRegistrationTab from "./crop-registration-tab";
import {
  createCropRegistration,
  getDDDivisionsByLogedInUser,
  getDDDivisionsByUser,
  getSeasons,
} from "../../redux/actions/cropLook/cropRegistration/actions";

const CropRegistrationForm = () => {
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

  // start of crop registration code

  useEffect(() => {
    getDDDivisionsByLogedInUser().then(({ dataList = [] }) => {
      setOptions(dataList);
      console.log(dataList);
    });

    getSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
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
      if (state?.target?.isProvincial) {
        const provincialDD = state?.target?.provincialDD;
        ddDivision = {
          id: provincialDD.id,
          name: provincialDD.provincialDdId,
          isProvincial: true,
        };
      } else {
        const interProvincialDD = state?.target?.interProvincialDD;
        ddDivision = {
          id: interProvincialDD.id,
          name: interProvincialDD.ddId,
          isProvincial: false,
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

  // end of crop registration code

  const toggleTab = (index) => {
    console.log("toggle state : " + index);
    setToggleState(index);
  };

  const goBack = () => {
    navigate("/crop-look/crop-registration");
  };

  const handleDDChange = (value) => {
    setSelectedDDDivision(value);
  };

  const handlSeasonChange = (value) => {
    setSelectedSeason(value);
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
    if (enableSave()) {
      setIsLoading(true);
      setSaving(true);
      try {
        let payload1 = {};
        if (selectedDDDivision.isProvincial) {
          payload1 = {
            provincialDD: { id: selectedDDDivision.id },
            season: { id: selectedSeason.id },
            isProvincial: true,
          };
        } else {
          payload1 = {
            interProvincialDD: { id: selectedDDDivision.id },
            season: { id: selectedSeason.id },
            isProvincial: false,
          };
        }

        if (false) {
          await updateCropSubCategory(
            {
              ...formData,
              cropCategoryDTO: { id: formData.cropCategoryDTO.id },
            },
            onSuccess,
            onError
          );
        } else {
          const dataList = await createCropRegistration(
            payload1,
            onSuccess,
            onError
          );
          console.log("registration id afte save ");
          console.log(dataList);
          console.log(dataList.dataList.id);
          setRegistrationId(dataList.dataList.id);
          //setSelectedDDDivision(dataList?.provincialDD);
          //setSelectedSeason(dataList?.season);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <FormWrapper>
        <BackToList goBack={goBack} />
        <CustFormHeader
          saving={saving}
          state={state}
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
        <Grid
          container
          //   spacing={1}
          //   sx={{
          //     // border: "1px solid #bec0c2",
          //     margin: "15px",
          //     width: "97%",
          //     borderRadius: "5px",
          //  }}
        >
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Deputy Director Division</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW || state?.action === DEF_ACTIONS.EDIT}
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
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Season</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW || state?.action === DEF_ACTIONS.EDIT}
                options={seasons}
                value={selectedSeason}
                getOptionLabel={(i) => `${i.label}`}
                onChange={(event, value) => {
                  handlSeasonChange(value);
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
          <Grid item sx={{ marginTop: "20px" }}>
            <TabWrapper style={{ margin: "0px 0px" }}>
              {cropCategoryList.map((category, index) => (
                <TabButton
                  className={toggleState === index + 1 ? "active-tabs" : ""}
                  onClick={() => toggleTab(index + 1)}
                >
                  {category?.categoryId}
                </TabButton>
              ))}
            </TabWrapper>

            {!isLoading &&
              cropCategoryList.map((category, index) => (
                <TabContent
                  style={{ marginTop: "10px" }}
                  className={toggleState === index + 1 ? "active-content" : ""}
                >
                  <CropRegistrationTab
                    registrationId={registrationId}
                    cropCategoryId={category?.id}
                    mode={state?.action}
                  />
                </TabContent>
              ))}
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropRegistrationForm;
