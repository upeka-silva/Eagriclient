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

const CropRegistrationForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);

  const [toggleState, setToggleState] = useState(1);
  const [tabEnabled, setTabInabled] = useState(false);

  // start of crop registration code

  // end of crop registration code

  const toggleTab = (index) => {
    console.log("toggle state : " + index);
    setToggleState(index);
  };

  const goBack = () => {
    navigate("/crop-look/crop-registration");
  };

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setOptions(dataList);
    });
  }, []);

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
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
      Object.keys(formData || {}).length > 0
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
      setSaving(true);
      try {
        if (formData?.id) {
          await updateCropSubCategory(
            {
              ...formData,
              cropCategoryDTO: { id: formData.cropCategoryDTO.id },
            },
            onSuccess,
            onError
          );
        } else {
          await handleCropSubCategory(
            {
              ...formData,
              cropCategoryDTO: { id: formData.cropCategoryDTO.id },
            },
            onSuccess,
            onError
          );
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
              <FieldName>Category ID</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW}
                options={options}
                value={formData ? formData.cropCategoryDTO : ""}
                getOptionLabel={(i) => `${i.categoryId} - ${i.description}`}
                onChange={(event, value) => {
                  handleChange(value, "cropCategoryDTO");
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
              <FieldName>Category ID</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW}
                options={options}
                value={formData ? formData.cropCategoryDTO : ""}
                getOptionLabel={(i) => `${i.categoryId} - ${i.description}`}
                onChange={(event, value) => {
                  handleChange(value, "cropCategoryDTO");
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
              <TabButton
                className={toggleState === 1 ? "active-tabs" : ""}
                onClick={() => toggleTab(1)}
              >
                General
              </TabButton>
              <TabButton
                disabled={tabEnabled}
                className={toggleState === 2 ? "active-tabs" : ""}
                onClick={() => toggleTab(2)}
              >
                Crop Details
              </TabButton>
              <TabButton
                disabled={tabEnabled}
                className={toggleState === 3 ? "active-tabs" : ""}
                onClick={() => toggleTab(3)}
              >
                Land Details
              </TabButton>
              <TabButton
                disabled={tabEnabled}
                className={toggleState === 4 ? "active-tabs" : ""}
                onClick={() => toggleTab(4)}
              >
                Internal Audit
              </TabButton>
              <TabButton
                disabled={tabEnabled}
                className={toggleState === 5 ? "active-tabs" : ""}
                onClick={() => toggleTab(5)}
              >
                External Audit
              </TabButton>
            </TabWrapper>

            <TabContent
              style={{ marginTop: "10px" }}
              className={toggleState === 1 ? "active-content" : ""}
            >
              <CropRegistrationTab />
            </TabContent>

            <TabContent
              style={{ marginTop: "10px" }}
              className={toggleState === 2 ? "active-content" : ""}
            >
              <CropRegistrationTab />
            </TabContent>
            <TabContent
              style={{ marginTop: "10px" }}
              className={toggleState === 3 ? "active-content" : ""}
            >
              <CropRegistrationTab />
            </TabContent>

            <TabContent
              style={{ marginTop: "10px" }}
              className={toggleState === 4 ? "active-content" : ""}
            >
              <CropRegistrationTab />
            </TabContent>
            <TabContent
              style={{ marginTop: "10px" }}
              className={toggleState === 5 ? "active-content" : ""}
            >
              <CropRegistrationTab />
            </TabContent>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropRegistrationForm;
