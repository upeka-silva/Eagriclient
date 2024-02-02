import { PhotoCamera } from "@mui/icons-material";
import { 
  Autocomplete, 
  Box, 
  CircularProgress, 
  Grid, 
  IconButton, 
  TextField,
 } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { get_CropList } from "../../../redux/actions/crop/crop/action";
import {
  handleCropVariety,
  handleCropVarietyImage,
  updateCropVariety,
} from "../../../redux/actions/crop/cropVariety/action";
import { get_itemNames } from "../../../redux/actions/HARTIItems/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

const CropVarietyForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [options, setOptions] = useState([]);
  const [itemNames, setItemNames] = useState([]);

  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState(
    state?.target?.presignedUrl || null
  );
  const [form, setForm] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    navigate("/crop/crop-variety");
  };

  useEffect(() => {
    get_CropList().then(({ dataList = [] }) => {
      setOptions(dataList);
      console.log("data",dataList);
    });

    setIsLoading(false);

    get_itemNames().then(({ dataList = [] }) => {
      setItemNames(dataList);
      setIsLoading(true);
      console.log("item names",dataList);
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
      setSelectedImage(null);
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
        <PageHeader saving={saving} state={state} goBack={goBack} formName="Crop Variety" />
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
              <Grid item sm={3} md={3} lg={4}>
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
              <Grid item sm={3} md={3} lg={8}>
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
            </Grid>
            <Grid container>
              <Grid item sm={12} md={12} lg={12}>
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
            </Grid>
            <Grid container>
              <Grid item sm={2} md={2} lg={6}>
                <FieldWrapper>
                  <FieldName>Crop ID</FieldName>
                  <Autocomplete
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    options={options}
                    value={formData ? formData.cropDTO : ""}
                    getOptionLabel={(i) => `${i.cropId} - ${i.description}`}
                    onChange={(event, value) => {
                      handleChange(value, "cropDTO");
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      }
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
              <Grid item sm={2} md={2} lg={6}>
                <FieldWrapper>
                  <FieldName>Commodity</FieldName>
                  { isLoading ?
                      <Autocomplete
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      options={itemNames}
                      value={formData ? formData?.hartiItemsDTO : ""}
                      getOptionLabel={(i) => `${i.itemName}`}
                      onChange={(event, value) => {
                        handleChange(value, "hartiItemsDTO");
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
                    /> :
                        <CircularProgress/>
                  }
                
                </FieldWrapper>
              </Grid>

              <Grid item sm={2} md={2} lg={3}>
                <FieldWrapper>
                  <FieldName>Duration To Harvest</FieldName>
                  <TextField
                    name="bearingPeriodInDays"
                    id="bearingPeriodInDays"
                    type="number"
                    value={formData?.bearingPeriodInDays || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "bearingPeriodInDays")
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
              <Grid item sm={2} md={2} lg={3}>
                <FieldWrapper>
                  <FieldName>Duration Between Two Picks</FieldName>
                  <TextField
                    name="durationBetweenTwoPicks"
                    id="durationBetweenTwoPicks"
                    type="number"
                    value={formData?.durationBetweenTwoPicks || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "durationBetweenTwoPicks")
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
              <Grid item sm={3} md={3} lg={8}>
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
              <Grid item sm={3} md={3} lg={3}>
                <FieldWrapper>
                  <FieldName>Seed Requirement</FieldName>
                  <TextField
                    name="seedRequirement"
                    id="seedRequirement"
                    value={formData?.seedRequirement || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "seedRequirement")
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
                  <FieldName>Released Year</FieldName>
                  <TextField
                    name="releasedYear"
                    id="releasedYear"
                    value={formData?.releasedYear || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "releasedYear")
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
                  <FieldName>Spacing</FieldName>
                  <TextField
                    name="spacing"
                    id="spacing"
                    value={formData?.spacing || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "spacing")
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
              <Grid item sm={3} md={3} lg={5}>
                <FieldWrapper>
                  <FieldName>Plant Growth</FieldName>
                  <TextField
                    name="plantGrowth"
                    id="plantGrowth"
                    value={formData?.plantGrowth || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "plantGrowth")
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
              <Grid item sm={3} md={3} lg={12}>
                <FieldWrapper>
                  <FieldName>Edible Part Shape</FieldName>
                  <TextField
                    name="ediblePartShape"
                    id="ediblePartShape"
                    value={formData?.ediblePartShape || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "ediblePartShape")
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