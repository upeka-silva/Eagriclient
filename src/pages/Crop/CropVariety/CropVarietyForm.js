import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, Grid, Box, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import {
  handleCropVariety,
  handleCropVarietyImage,
  updateCropVariety,
} from "../../../redux/actions/crop/cropVariety/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_CropList } from "../../../redux/actions/crop/crop/action";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { PhotoCamera } from "@mui/icons-material";

const CropVarietyForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);

  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState(
    state?.target?.presignedUrl || null
  );
  const [form, setForm] = useState();

  const goBack = () => {
    navigate("/crop/crop-variety");
  };

  useEffect(() => {
    get_CropList().then(({ dataList = [] }) => {
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
      setForm(null);
    } else {
      setFormData({});
      setForm(null);
      setSelectedImage(null)
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
    if (enableSave()) {
      setSaving(true);

      try {
        if (form && state?.action === DEF_ACTIONS.ADD) {
          const response = await handleCropVariety(
            formData,
            onSuccess,
            onError
          );
          setFormData(response.payload);
          console.log(response);
          const res = await handleCropVarietyImageUpload(response.payload?.id);
          console.log(res);
          if ((res.httpCode = "200 OK")) {
            const cropImageUrl = res.payload.storedFileName;
            const originalFileName = res.payload.originalFileName;
            const prsignedUrl = res.payload.presignedUrl;
            const presignedExpDate = res.payload.expireDate;

            await updateCropVariety(
              {
                ...formData,
                id: response.payload?.id,
                cropImageUrl: cropImageUrl,
                originalFileName: originalFileName,
                presignedUrl: prsignedUrl,
                presignedExpDate: presignedExpDate,
              },
              onSuccess,
              onError
            );
          }
          return;
        }
        if (form && state?.action === DEF_ACTIONS.EDIT) {
          const res = await handleCropVarietyImageUpload(formData?.id);
          if ((res.httpCode = "200 OK")) {
            const cropImageUrl = res.payload.storedFileName;
            const originalFileName = res.payload.originalFileName;
            const prsignedUrl = res.payload.presignedUrl;
            const presignedExpDate = res.payload.expireDate;

            await updateCropVariety(
              {
                ...formData,
                cropImageUrl: cropImageUrl,
                originalFileName: originalFileName,
                presignedUrl: prsignedUrl,
                presignedExpDate: presignedExpDate,
              },
              onSuccess,
              onError
            );
          }
          return;
        }
        if (formData?.id && state?.action === DEF_ACTIONS.EDIT) {
          await updateCropVariety(
            {
              ...formData,
            },
            onSuccess,
            onError
          );
        } else {
          const response = await handleCropVariety(
            {
              ...formData,
            },
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

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(event?.target?.file);
    console.log(event?.target);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      const form = new FormData();
      form.append("file", file);
      setForm(form);
    } else {
      setSelectedImage(null);
      setForm(null);
    }
  };

  const handleCropVarietyImageUpload = async (id) => {
    try {
      const response = await handleCropVarietyImage(
        id,
        form,
        onSuccess("Success"),
        onError
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <FormWrapper>
        <BackToList goBack={goBack} />
        <CustFormHeader saving={saving} state={state} formName="Crop Variety" />
        <FormButtonGroup
          state={state}
          DEF_ACTIONS={DEF_ACTIONS}
          saving={saving}
          enableSave={enableSave}
          handleFormSubmit={handleFormSubmit}
          resetForm={resetForm}
        />
        <Grid
          container
          sx={{
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={8}>
            <Grid container>
              <Grid item sm={3} md={3} lg={5}>
                <FieldWrapper>
                  <FieldName>Variety ID</FieldName>
                  <TextField
                    name="varietyId"
                    id="varietyId"
                    type="text"
                    value={formData?.varietyId || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "varietyId")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    inputProps={{ style: { textTransform: "uppercase" } }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={3} md={3} lg={7}>
                <FieldWrapper>
                  <FieldName>Variety Name</FieldName>
                  <TextField
                    name="varietyName"
                    id="varietyName"
                    value={formData?.varietyName || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "varietyName")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>

              <Grid item sm={3} md={3} lg={6}>
                <FieldWrapper>
                  <FieldName>Variety Description</FieldName>
                  <TextField
                    name="varietyDescription"
                    id="varietyDescription"
                    value={formData?.varietyDescription || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "varietyDescription")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={2} md={2} lg={6}>
                <FieldWrapper>
                  <FieldName>Crop ID</FieldName>
                  <Autocomplete
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    options={options}
                    value={formData ? formData.cropDTO : ""}
                    getOptionLabel={(i) => `${i.cropId} - ${i.scientificName}`}
                    onChange={(event, value) => {
                      handleChange(value, "cropDTO");
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                    fullWidth
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={3} md={3} lg={3}>
                <FieldWrapper>
                  <FieldName>Pericarp Color</FieldName>
                  <TextField
                    name="pericarpColor"
                    id="pericarpColor"
                    value={formData?.pericarpColor || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "pericarpColor")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={3} md={3} lg={3}>
                <FieldWrapper>
                  <FieldName>Grain Size</FieldName>
                  <TextField
                    name="grainSize"
                    id="grainSize"
                    value={formData?.grainSize || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "grainSize")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={3} md={3} lg={3}>
                <FieldWrapper>
                  <FieldName>Average Yield</FieldName>
                  <TextField
                    name="averageYield"
                    id="averageYield"
                    type="number"
                    value={formData?.averageYield || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "averageYield")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={2} md={2} lg={3}>
                <FieldWrapper>
                  <FieldName>Maturity Time</FieldName>
                  <TextField
                    name="maturityTime"
                    id="maturityTime"
                    type="number"
                    value={formData?.maturityTime || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "maturityTime")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Days</InputAdornment>
                      ),
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={3} md={3} lg={7}>
                <FieldWrapper>
                  <FieldName>Scientific Name</FieldName>
                  <TextField
                    name="scientificName"
                    id="scientificName"
                    value={formData?.scientificName || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "scientificName")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4}>
            <Grid container>
              <Grid item sm={3} md={3} lg={9}>
                <FieldWrapper>
                  
                  <FieldName>Select Crop Variety Image</FieldName>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="profile-picture-input"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />

                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      sx={{ position: "relative" }}
                    >
                      <label
                        htmlFor="profile-picture-input"
                        style={{
                          width: "250px",
                          height: "140px",
                          border: "1px solid #7a879d",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgb(46,125,50,0.1)",
                        }}
                      >
                        <IconButton component="span" style={{ zIndex: "2" }}>
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      {selectedImage && (
                        <div
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            backgroundColor: "rgb(46,125,50,0.1)",
                            width: "250px",
                            height: "140px",
                            borderRadius: "8px",
                          }}
                        >
                          <img
                            src={selectedImage}
                            alt="Profile"
                            style={{
                              width: "250px",
                              height: "140px",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}
                    </Box>
                  </div>
                </FieldWrapper>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropVarietyForm;
