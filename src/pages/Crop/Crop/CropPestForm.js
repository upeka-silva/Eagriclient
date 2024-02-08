//my crop pest form

import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { updateCrop } from "../../../redux/actions/crop/crop/action";
import { handleCrop } from "../../../redux/actions/crop/crop/action";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { Colors } from "../../../utils/constants/Colors";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { updateFormDataWithValues, saveFormDataWithValues } from "../../../redux/actions/crop/CropPest/action";

const CropPestForm = (props) => {

  
  
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();

  const [form, setForm] = useState();
  const [toggleState, setToggleState] = useState(1);
  const [cropId, setCropId] = useState(0);

  useEffect(()=>{
    setCropId(location.state.cropId);
  }
  // , [location.state]
  );

  // const cropId = props.cropId;
  console.log("crop id in pest form", cropId);

  const goBack = () => {
    navigate("/crop/crop-form");
  };

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
      setForm(null);
    } else {
      setFormData({});
      setForm(null);
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
    if (state?.action === DEF_ACTIONS.EDIT && form) {
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

    
    // console.log("formId", cropId);
    
    const saveData = {
      formData: formData,
      crop: { id: cropId },
    };

    if (enableSave()) {
      setSaving(true);
  
      try {
        if (form && state?.action === DEF_ACTIONS.ADD) {
          const response = await saveFormDataWithValues(
            saveData,
            // formData,
            onSuccess,
            onError
          );
          // setFormData(response.payload);
          // console.log(response);
          // await updateFormDataWithValues(
          //   saveData,
          //   {
          //     ...formData,
          //     id: response.payload?.id,
          //     crop: { id: state.formId },
          //   },
          //   onSuccess,
          //   onError
          // );
        }
        if (form && state?.action === DEF_ACTIONS.EDIT) {
          await updateFormDataWithValues(
            saveData,
            {
              ...formData,
              crop: { id: cropId },
              
            },
            onSuccess,
            onError
          );
        }
        // if (formData?.id && state?.action === DEF_ACTIONS.EDIT) {
        //   await updateFormDataWithValues(
        //     saveData,
        //     {
        //       ...formData,
        //       crop: { id: state.formId},
        //     },
        //     onSuccess,
        //     onError
        //   );
        // } 
        else {
          const response = await saveFormDataWithValues(
            saveData,
            onSuccess,
            onError
          );
          setFormData(response.payload);
          console.log(response);
        }
        setSaving(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
    
  return (
    <>
    <PageHeader saving={saving} state={state} goBack={goBack} formName=" Crop Pest Form"  />
    <ButtonWrapper>
        <ActionWrapper>
          {saving ? (
            <Button variant="contained" size="small">
              {state?.action === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
              ADDING...
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                disabled={false}
                onClick={handleFormSubmit}
              
                size="small"
                color="success"
                style={{ marginLeft: "10px" }}
              >
                {/* {state?.action === DEF_ACTIONS.ADD ? <Add/> : <Edit/>} */}
                {/* <Add/> */}
                Save
              </Button>
              <Button
                onClick={resetForm}
                color="success"
                variant="contained"
                size="small"
                sx={{ marginLeft: "10px" }}
              >
                RESET
              </Button>
            </>
          )}
        </ActionWrapper>
      </ButtonWrapper>
      {/* <Box sx={{ padding: "20px" }}> */}
        <Grid
          container
          sx={{
            border: "1px solid #bec0c2",
            borderRadius: "5px",
          }}
        >
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>pest Name</FieldName>
              <TextField
                name="pestName"
                id="pestName"
                value={formData?.pestName || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "pestName")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={5}>
          <FieldWrapper>
              <FieldName>Scientific Name</FieldName>
              <TextField
                name="scientificName"
                id="scientificName"
                value={formData?.scientificName || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "scientificName")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
            </Grid>
          <Grid item sm={3} md={3} lg={6}>
          <FieldWrapper>
              <FieldName>Damage Symptom</FieldName>
              <TextField
                name="damageSymptom"
                id="damageSymptom"
                value={formData?.damageSymptom || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "damageSymptom")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
            </Grid>
          <Grid item sm={3} md={3} lg={5}>
          <FieldWrapper>
              <FieldName>Management</FieldName>
              <TextField
                name="management"
                id="management"
                value={formData?.management || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "management")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
            </Grid>
          <Grid item sm={3} md={3} lg={4}>
          <FieldWrapper>
              <FieldName>In Store</FieldName>
              <TextField
                name="inStore"
                id="inStore"
                value={formData?.inStore || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "inStore")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
            </Grid>
          <Grid item sm={3} md={3} lg={6}>
          <FieldWrapper>
              <FieldName>Chemical Control</FieldName>
              <TextField
                name="chemicalControl"
                id="chemicalControl"
                value={formData?.chemicalControl || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "chemicalControl")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
            </Grid>
          <Grid item sm={3} md={3} lg={6}>
          <FieldWrapper>
              <FieldName>In Store Chemical Control</FieldName>
              <TextField
                name="inStoresChemicalControl"
                id="inStoresChemicalControl"
                value={formData?.inStoresChemicalControl || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "inStoresChemicalControl")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
            </Grid>
          <Grid item sm={3} md={3} lg={8}>
          <FieldWrapper>
              <FieldName>Other</FieldName>
              <TextField
                name="other"
                id="other"
                value={formData?.other || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "other")
                }
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
            </FieldWrapper>
            </Grid>
        </Grid>
      {/* </Box> */}
    </>
);


}

export default CropPestForm;