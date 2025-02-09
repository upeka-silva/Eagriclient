import React, { useState } from "react";
import { TextField, Autocomplete, Grid } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { get_CategoryList } from "../../redux/actions/crop/cropCategory/action";
import { useEffect } from "react";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import CropRegistrationTab from "./crop-registration-tab";
import {
  createCropRegistration,
  getDDDivisionsByLogedInUser,
  getSeasons,
} from "../../redux/actions/cropLook/cropRegistration/actions";
import { REGION_PARENT_TYPE } from "../../utils/constants/region-parent-type";
import { Fonts } from "../../utils/constants/Fonts";
import PageHeader from "../../components/PageHeader/PageHeader";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../components/TabButtons/TabButtons";

const CropRegistrationForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
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
      if (state?.target?.parentType === REGION_PARENT_TYPE.PROVINCIAL) {
        const provincialDD = state?.target?.provincialDD;
        ddDivision = {
          id: provincialDD.id,
          name: provincialDD.provincialDdId,
          description: provincialDD.description,
          parentType: REGION_PARENT_TYPE.PROVINCIAL,
        };
      } else if (
        state?.target?.parentType === REGION_PARENT_TYPE.INTER_PROVINCIAL
      ) {
        const interProvincialDD = state?.target?.interProvincialDD;
        ddDivision = {
          id: interProvincialDD.id,
          name: interProvincialDD.ddId,
          description: interProvincialDD.description,
          parentType: REGION_PARENT_TYPE.INTER_PROVINCIAL,
        };
      } else {
        const mahaweliSystem = state?.target?.mahaweliSystem;
        ddDivision = {
          id: mahaweliSystem.id,
          name: mahaweliSystem.systemId,
          description: mahaweliSystem.description,
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
      setSelectedSeason({});
      setSelectedDDDivision({});
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
        if (selectedDDDivision.parentType === REGION_PARENT_TYPE.PROVINCIAL) {
          payload1 = {
            provincialDD: { id: selectedDDDivision.id },
            season: { id: selectedSeason.id },
            parentType: REGION_PARENT_TYPE.PROVINCIAL,
          };
        } else if (
          selectedDDDivision.parentType === REGION_PARENT_TYPE.INTER_PROVINCIAL
        ) {
          payload1 = {
            interProvincialDD: { id: selectedDDDivision.id },
            season: { id: selectedSeason.id },
            parentType: REGION_PARENT_TYPE.INTER_PROVINCIAL,
          };
        } else {
          payload1 = {
            mahaweliSystem: { id: selectedDDDivision.id },
            season: { id: selectedSeason.id },
            parentType: REGION_PARENT_TYPE.MAHAWELI,
          };
        }
        const dataList = await createCropRegistration(
          payload1,
          onSuccess,
          onError
        );
        setRegistrationId(dataList.dataList.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
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
              <FieldName>Deputy Director Division/ Mahaweli System</FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                options={options}
                value={selectedDDDivision}
                getOptionLabel={(i) =>
                  (i.name !== undefined ? `${i?.name} - ` : "") +
                  (i.description !== undefined ? `${i?.description}` : "")
                }
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
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                options={seasons}
                value={selectedSeason}
                getOptionLabel={(i) =>
                  (i.code !== undefined ? `${i.code} - ` : "") +
                  (i.description !== undefined ? `${i.description}` : "")
                }
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
          <Grid item container sx={{ marginTop: "20px" }}>
          <Grid md={12}>
            <TabWrapper style={{ margin: "0px 0px" }}>
              {cropCategoryList.map((category, index) => (
                <TabButton
                  className={toggleState === index + 1 ? "active-tabs" : ""}
                  onClick={() => toggleTab(index + 1)}
                >
                  {category?.description}
                </TabButton>
              ))}
            </TabWrapper>
            </Grid>

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
