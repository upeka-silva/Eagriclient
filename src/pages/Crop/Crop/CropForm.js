import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  Grid,
  Button,
  Box,
  IconButton,
  Paper,
  Typography,
  Card,
  Switch,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import DialogBox from "../../../components/PageLayout/DialogBox";
import styled from "styled-components";
import { Colors } from "../../../utils/constants/Colors";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import {
  handleCrop,
  handleCropImage,
  updateCrop,
} from "../../../redux/actions/crop/crop/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_SubCategoryList } from "../../../redux/actions/crop/cropSubCategory/action";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { PhotoCamera } from "@mui/icons-material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Add, Delete } from "@mui/icons-material";
import CropPestList from "../CropPest/CropPestList";
import CropDiseaseList from "../CropDisease/CropDiseaseList";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import AddCropPestDialog from "../CropPest/AddCropPestDialog";
import AddCropDiseaseDialog from "../CropDisease/AddCropDiseaseDialog";
import {
  assignCropPest,
  deletePestFromCrop,
} from "../../../redux/actions/crop/CropPest/action";
import {
  assignCropDisease,
  deleteDiseaseFromCrop,
} from "../../../redux/actions/crop/CropDisease/action";
import { get_SoilType } from "../../../redux/actions/soil/soilType/action";
import { Fonts } from "../../../utils/constants/Fonts";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../../components/TabButtons/TabButtons";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { useTranslation } from "react-i18next";
import { TranslateActions } from "../../../utils/constants/CrudActionTranslation";
const CropForm = ({
  dataList = [],
  onFormSaveSuccess = false,
  formId = null,
  formMode = null,
}) => {
  useUserAccessValidation();
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(state?.target || {});
  const [formDataD, setFormDataD] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();

  const [subOptions, setSubOptions] = useState([]);
  const [soilOptions, setSoilOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    state?.target?.prsignedUrl || null
  );
  const [form, setForm] = useState();
  const [toggleState, setToggleState] = useState(1);
  const [tabEnabled, setTabEnabled] = useState(state?.target?.id !== undefined);
  const [selectCropPest, setSelectCropPest] = useState([]);
  const [selectCropDisease, setSelectCropDisease] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openCropPestAddDialog, setOpenCropPestAddDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState(null);
  const [openCropDiseaseAddDialog, setOpenCropDiseaseAddDialog] =
    useState(false);
  const [cropId, setCropId] = useState(null);
  const [pestUrl, setPestUrl] = useState(null);
  const [diseaseUrl, setDiseaseUrl] = useState(null);
  const [action, setAction] = useState(null);

  const [dialogSelectedCropPetsTypes, setDialogSelectedCropPets] = useState([]);
  const [dialogSelectedCropDieasesTypes, setDialogSelectedCropDieases] =
    useState([]);

  useEffect(() => {
    const cropId = formData.id;
    setPestUrl(`crop/crop-pests/${cropId}/pests`);
    setDiseaseUrl(`crop/crop-diseases/${cropId}/diseases`);
    //eslint-disable-next-line
  }, []);

  const goBack = () => {
    navigate("/crop/crop");
  };
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const onAddPest = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setCropId(formData.id);
    }
    setFormDataD({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenCropPestAddDialog(true);
  };

  const onAddDisease = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setCropId(formData.id);
    }
    setFormDataD({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenCropDiseaseAddDialog(true);
  };

  const toggleCropPestSelect = (component) => {
    setSelectCropPest((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };

  const handleCropPestAdd = async (event, formDataD, functionMode) => {
    console.log({ formDataD });
    setLoading(true);
    try {
      await assignCropPest(cropId, formDataD);
      setLoading(false);
      setOpenCropPestAddDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCropDiseaseAdd = async (event, formDataD, functionMode) => {
    setLoading(true);
    try {
      await assignCropDisease(cropId, formDataD);
      setLoading(false);
      setOpenCropDiseaseAddDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCropDiseaseSelect = (component) => {
    setSelectCropDisease((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };

  const selectAllCropPest = (all = []) => {
    setSelectCropPest(all);
  };

  const selectAllCropDisease = (all = []) => {
    setSelectCropDisease(all);
  };

  const close = () => {
    setOpen(false);
  };

  const onDeleteCropPets = () => {
    setAction("DELETE_CROPPEST");
    setCropId(formData.id);
    setDialogSelectedCropPets(selectCropPest);
    setOpen(true);
  };

  const onDeleteCropdDisease = () => {
    setAction("DELETE_CROPDISEASE");
    setCropId(formData.id);
    setDialogSelectedCropDieases(selectCropDisease);
    setOpen(true);
  };

  const onConfirm = async () => {
    if (toggleState === 2) {
      try {
        setLoading(true);
        for (const cropPest of dialogSelectedCropPetsTypes) {
          await deletePestFromCrop(cropId, cropPest?.id, onSuccess, onError);
        }
        setLoading(false);
        close();
        resetSelectedCropPest();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        for (const cropDisease of dialogSelectedCropDieasesTypes) {
          await deleteDiseaseFromCrop(
            cropId,
            cropDisease?.id,
            onSuccess,
            onError
          );
        }
        setLoading(false);
        close();
        resetSelectedCropDisease();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const resetSelectedCropPest = () => {
    setSelectCropPest([]);
  };

  const resetSelectedCropDisease = () => {
    setSelectCropDisease([]);
  };

  useEffect(() => {
    if (location.state && location.state.tabIndex) {
      setToggleState(location.state.tabIndex);
    }
  }, [location.state]);

  useEffect(() => {
    get_SubCategoryList().then(({ dataList = [] }) => {
      setSubOptions(dataList);
    });
  }, []);

  useEffect(() => {
    get_SoilType().then(({ dataList = [] }) => {
      setSoilOptions(dataList);
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

  const closeCropPestAddDialog = () => {
    setFormDataD({});
    setOpenCropPestAddDialog(false);
  };

  const closeCropDiseaseAddDialog = () => {
    setFormDataD({});
    setOpenCropDiseaseAddDialog(false);
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
        ? t("message.successfullyAdded")
        : t("message.successfullyUpdated"),
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || t("message.loginFailed"),
    });
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      try {
        if (form && state?.action === DEF_ACTIONS.ADD) {
          const response = await handleCrop(formData, onSuccess, onError);
          setFormData(response.payload);
          setCropId(response?.payload?.id);
          console.log(response);
          const res = await handleCropImageUpload(response.payload?.id);
          console.log(res);
          if ((res.httpCode = "200 OK")) {
            const cropImageUrl = res.payload.storedFileName;
            const originalFileName = res.payload.originalFileName;
            const prsignedUrl = res.payload.presignedUrl;
            const presignedExpDate = res.payload.expireDate;

            await updateCrop(
              {
                ...formData,
                id: response.payload?.id,
                cropImageUrl: cropImageUrl,
                originalFileName: originalFileName,
                prsignedUrl: prsignedUrl,
                presignedExpDate: presignedExpDate,
              },
              onSuccess,
              onError
            );
          }
          return;
        }
        if (form && state?.action === DEF_ACTIONS.EDIT) {
          const res = await handleCropImageUpload(formData?.id);
          if ((res.httpCode = "200 OK")) {
            const cropImageUrl = res.payload.storedFileName;
            const originalFileName = res.payload.originalFileName;
            const prsignedUrl = res.payload.presignedUrl;
            const presignedExpDate = res.payload.expireDate;

            await updateCrop(
              {
                ...formData,
                cropImageUrl: cropImageUrl,
                originalFileName: originalFileName,
                prsignedUrl: prsignedUrl,
                presignedExpDate: presignedExpDate,
              },
              onSuccess,
              onError
            );
          }
          return;
        }
        if (formData?.id && state?.action === DEF_ACTIONS.EDIT) {
          await updateCrop(
            {
              ...formData,
            },
            onSuccess,
            onError
          );
        } else {
          const response = await handleCrop(
            {
              ...formData,
            },
            onSuccess,
            onError
          );
          setFormData(response.payload);
          console.log(response);
          setCropId(response?.payload?.id);
        }
        setSaving(false);
        setTabEnabled(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
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

  const handleCropImageUpload = async (id) => {
    try {
      const response = await handleCropImage(
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

  const toggleDialogObjectSelect = (objItem, action) => {
    if (objItem != null) {
      if (action === "DELETE_CROPPEST") {
        const updatedCropPest = selectCropPest.filter(
          (item) => item.id !== objItem.id
        );
        setSelectCropPest(updatedCropPest);
        if (updatedCropPest.length === 0) {
          setOpen(false);
        }
      } else {
        const updatedCropDisease = selectCropDisease.filter(
          (item) => item.id !== objItem.id
        );
        setSelectCropDisease(updatedCropDisease);
        if (updatedCropDisease.length === 0) {
          setOpen(false);
        }
      }
    }
  };

  return (
    <Box
      sx={{
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
          goBack={goBack}
          state={state}
          formName="nav.crop.name"
        />
        <TabContent
          style={{
            display: "flex",
          }}
        >
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

          <PaperWrapper>
            <Box sx={{ padding: "20px" }}>
              <Grid container sx={{ marginBottom: "10px" }}>
                <Grid item lg={8}>
                  <Grid container spacing={1}>
                    <Grid item sm={3} md={3} lg={4}>
                      <FieldWrapper>
                        <FieldName>{t("cropPage.cropId")}</FieldName>
                        <TextField
                          name="cropId"
                          id="cropId"
                          type="text"
                          value={formData?.cropId || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "cropId")
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
                    <Grid item sm={4} md={4} lg={8}>
                      <FieldWrapper>
                        <FieldName>{t("cropPage.description")}</FieldName>
                        <TextField
                          name="description"
                          id="description"
                          value={formData?.description || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "description")
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
                    <Grid item sm={3} md={3} lg={4}>
                      <FieldWrapper>
                        <FieldName>{t("cropPage.subCategoryId")}</FieldName>
                        <Autocomplete
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          options={subOptions}
                          value={formData?.cropSubCategoryDTO || null}
                          getOptionLabel={(i) =>
                            `${i.subCategoryId} - ${i.description}`
                          }
                          onChange={(event, value) => {
                            handleChange(value, "cropSubCategoryDTO");
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

                    <Grid item sm={2} md={2} lg={4}>
                      <FieldWrapper>
                        <FieldName>{t("cropPage.cropType")}</FieldName>
                        <Select
                          name="cropType"
                          id="cropType"
                          value={formData?.cropType || ""}
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "cropType")
                          }
                          fullWidth
                          sx={{
                            borderRadius: "8px",
                          }}
                          size="small"
                        >
                          <MenuItem value={"ANNUAL"}>Annual</MenuItem>
                          <MenuItem value={"PERENNIAL"}>Perennial</MenuItem>
                          <MenuItem value={"SEASONAL"}>Seasonal</MenuItem>
                        </Select>
                      </FieldWrapper>
                    </Grid>
                    <Grid item sm={2} md={2} lg={4}>
                      <FieldWrapper>
                        <FieldName>{t("cropPage.family")}</FieldName>
                        <Select
                          name="family"
                          id="family"
                          value={formData?.family || ""}
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "family")
                          }
                          fullWidth
                          sx={{
                            borderRadius: "8px",
                          }}
                          size="small"
                        >
                          <MenuItem value={"POACEAE"}>Poaceae</MenuItem>
                          <MenuItem value={"AMARYLLIDACEAE"}>
                            Amaryllidaceae
                          </MenuItem>
                          <MenuItem value={"SOLANACEAE"}>Solanaceae</MenuItem>
                          <MenuItem value={"FABACEAE"}>Fabaceae</MenuItem>
                          <MenuItem value={"PEDALIACEAE"}>Pedaliaceae</MenuItem>
                          <MenuItem value={"ZINGIBERACEAE"}>
                            Zingiberaceae
                          </MenuItem>
                          <MenuItem value={"CUCURBITACEAE"}>
                            Cucurbitaceae
                          </MenuItem>
                          <MenuItem value={"MORINGACEAE"}>Moringaceae</MenuItem>
                          <MenuItem value={"MALVACEAE"}>Malvaceae</MenuItem>
                          <MenuItem value={"CHENOPODIACEAE"}>
                            Chenopodiaceae
                          </MenuItem>
                          <MenuItem value={"BRASSICACEAE"}>
                            Brassicaceae
                          </MenuItem>
                          <MenuItem value={"ALLIACEAE"}>Alliaceae</MenuItem>
                          <MenuItem value={"LAMIACEAE"}>Lamiaceae</MenuItem>
                          <MenuItem value={"ARACEAE"}>Araceae</MenuItem>
                          <MenuItem value={"EUPHORBIACEAE"}>
                            Euphorbiaceae
                          </MenuItem>
                          <MenuItem value={"CONVOLVULACEAE"}>
                            Convolvulaceae
                          </MenuItem>
                          <MenuItem value={"DIOSCOREACEAE"}>
                            Dioscoreaceae
                          </MenuItem>
                          <MenuItem value={"AMARANTHACEAE"}>
                            Amaranthaceae
                          </MenuItem>
                          <MenuItem value={"AIZOACEAE"}>Aizoaceae</MenuItem>
                          <MenuItem value={"APIACEAE"}>Apiaceae</MenuItem>
                          <MenuItem value={"ANNONACEAE"}>Annonaceae</MenuItem>
                          <MenuItem value={"LAURACEAE"}>Lauraceae</MenuItem>
                          <MenuItem value={"MUSACEAE"}>Musaceae</MenuItem>
                          <MenuItem value={"CACTACEAE"}>Cactaceae</MenuItem>
                          <MenuItem value={"VITACEAE"}>Vitaceae</MenuItem>
                          <MenuItem value={"MYRTACEAE"}>Myrtaceae</MenuItem>
                          <MenuItem value={"RUTACEAE"}>Rutaceae</MenuItem>
                          <MenuItem value={"ANACARDIACEAE"}>
                            Anacardiaceae
                          </MenuItem>
                          <MenuItem value={"CLUSIACEAE"}>Clusiaceae</MenuItem>
                          <MenuItem value={"PHYLLANTHACEAE"}>
                            Phyllanthaceae
                          </MenuItem>
                          <MenuItem value={"CARICACEAE"}>Caricaceae</MenuItem>
                          <MenuItem value={"PASSIFLORACEAE"}>
                            Passifloraceae
                          </MenuItem>
                          <MenuItem value={"ROSACEAE"}>Rosaceae</MenuItem>
                          <MenuItem value={"BROMELIACEAE"}>
                            Bromeliaceae
                          </MenuItem>
                          <MenuItem value={"LYTHRACEAE"}>Lythraceae</MenuItem>
                          <MenuItem value={"SAPINDACEAE"}>Sapindaceae</MenuItem>
                        </Select>
                      </FieldWrapper>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item sm={3} md={3} lg={6}>
                        <FieldWrapper>
                          <FieldName>{t("cropPage.scientificName")}</FieldName>
                          <TextField
                            name="scientificName"
                            id="scientificName"
                            value={formData?.scientificName || ""}
                            fullWidth
                            disabled={state?.action === DEF_ACTIONS.VIEW}
                            onChange={(e) =>
                              handleChange(
                                e?.target?.value || "",
                                "scientificName"
                              )
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

                      <Grid item sm={4} md={4} lg={4} spacing={0}>
                        <FieldWrapper>
                          <FieldName>{t("cropPage.plantationCrop")}</FieldName>
                          <Switch
                            name="isPlantationCrop"
                            id="isPlantationCrop"
                            value={formData?.isPlantationCrop || ""}
                            disabled={state?.action === DEF_ACTIONS.VIEW}
                            onChange={(e) =>
                              handleChange(
                                e?.target?.checked || "",
                                "isPlantationCrop"
                              )
                            }
                            checked={formData?.isPlantationCrop}
                            aria-label="Switch demo"
                          />
                        </FieldWrapper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={3} md={3} lg={4}>
                  <Grid container spacing={1}>
                    <Grid item sm={3} md={3} lg={9}>
                      <FieldWrapper>
                        <FieldName>{t("cropPage.selectCropImage")}</FieldName>
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
                            disabled={state?.action === DEF_ACTIONS.VIEW}
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
                                width: "182px",
                                height: "182px",
                                border: "1px solid #7a879d",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgb(46,125,50,0.1)",
                              }}
                            >
                              <IconButton
                                component="span"
                                style={{ zIndex: "2" }}
                              >
                                <PhotoCamera />
                              </IconButton>
                            </label>
                            {selectedImage && (
                              <div
                                style={{
                                  position: "absolute",
                                  zIndex: "1",
                                  backgroundColor: "rgb(46,125,50,0.1)",
                                  width: "182px",
                                  height: "182px",
                                  borderRadius: "8px",
                                }}
                              >
                                <img
                                  src={selectedImage}
                                  alt="Crop"
                                  style={{
                                    width: "182px",
                                    height: "182px",
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
            </Box>
          </PaperWrapper>
        </TabContent>

        <PaperWrapper>
          <TabContentWrapper>
            <TabWrapper>
              <TabButton
                variant="contained"
                className={toggleState === 1 ? "active-tabs" : ""}
                onClick={() => toggleTab(1)}
                disabled={!tabEnabled}
              >
                {t("cropPage.general")}
              </TabButton>
              <TabButton
                variant="contained"
                className={toggleState === 2 ? "active-tabs" : ""}
                onClick={() => toggleTab(2)}
                disabled={!tabEnabled}
              >
                {t("cropPage.pest")}
              </TabButton>
              <TabButton
                variant="contained"
                className={toggleState === 3 ? "active-tabs" : ""}
                onClick={() => toggleTab(3)}
                disabled={!tabEnabled}
              >
                {t("cropPage.disease")}
              </TabButton>
            </TabWrapper>

            <TabContent className={toggleState === 1 ? "active-content" : ""}>
              <ActionWrapper isLeft>
                <Grid container spacing={1}>
                  <Grid item sm={12} md={12} lg={6}>
                    <Grid container spacing={1}>
                      <Grid item sm={12} md={3} lg={6}>
                        <Card
                          sx={{
                            borderRadius: 1,
                            border: 1,
                            padding: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h6">
                            {t("cropPage.climaticRequirements")}
                          </Typography>
                          <Grid item sm={12} md={12} lg={12}>
                            <FieldWrapper>
                              <FieldName>{t("cropPage.optimumTemperature")}</FieldName>
                              <TextField
                                name="optimumTemperature"
                                id="optimumTemperature"
                                value={formData?.optimumTemperature || ""}
                                fullWidth
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                  handleChange(
                                    e?.target?.value || "",
                                    "optimumTemperature"
                                  )
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
                              <FieldName>{t("cropPage.annualRainfall")}</FieldName>
                              <TextField
                                name="annualRainfall"
                                id="annualRainfall"
                                value={formData?.annualRainfall || ""}
                                fullWidth
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                  handleChange(
                                    e?.target?.value || "",
                                    "annualRainfall"
                                  )
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
                          <Grid item sm={12} md={12} lg={12}>
                            <FieldWrapper>
                              <FieldName>{t("cropPage.altitude")}</FieldName>
                              <TextField
                                name="altitude"
                                id="altitude"
                                value={formData?.altitude || ""}
                                fullWidth
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                  handleChange(
                                    e?.target?.value || "",
                                    "altitude"
                                  )
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
                        </Card>
                      </Grid>
                      <Grid item sm={12} md={3} lg={6}>
                        <Card
                          sx={{
                            borderRadius: 1,
                            border: 1,
                            padding: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h6">{t("cropPage.soil")}</Typography>
                          <Grid item sm={12} md={12} lg={12}>
                            <FieldWrapper>
                              <FieldName>{t("cropPage.soilType")}</FieldName>
                              <Autocomplete
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                options={soilOptions}
                                value={formData?.soilTypeDTO || null}
                                getOptionLabel={(i) =>
                                  `${i.soilTypeCode} - ${i.description}`
                                }
                                onChange={(event, value) => {
                                  handleChange(value, "soilTypeDTO");
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
                          <Grid item sm={12} md={12} lg={12}>
                            <FieldWrapper>
                              <FieldName>{t("cropPage.soilCharacteristics")}</FieldName>
                              <TextField
                                name="soilCharacteristics"
                                id="soilCharacteristics"
                                value={formData?.soilCharacteristics || ""}
                                fullWidth
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                  handleChange(
                                    e?.target?.value || "",
                                    "soilCharacteristics"
                                  )
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
                          <Grid item sm={12} md={12} lg={12}>
                            <FieldWrapper>
                              <FieldName>{t("cropPage.soilPhRange")}</FieldName>
                              <TextField
                                name="soilPhRange"
                                id="soilPhRange"
                                value={formData?.soilPhRange || ""}
                                fullWidth
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                  handleChange(
                                    e?.target?.value || "",
                                    "soilPhRange"
                                  )
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
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} md={3} lg={6}>
                    <Grid container spacing={1}>
                      <Grid item sm={12} md={3} lg={6}>
                        <Card
                          sx={{
                            borderRadius: 1,
                            border: 1,
                            padding: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h6">{t("cropPage.other")}</Typography>
                          <Grid item sm={12} md={12} lg={12}>
                            <FieldWrapper>
                              <FieldName>{t("cropPage.harvesting")}</FieldName>
                              <TextField
                                name="harvesting"
                                id="harvesting"
                                value={formData?.harvesting || ""}
                                fullWidth
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                  handleChange(
                                    e?.target?.value || "",
                                    "harvesting"
                                  )
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
                          <Grid item sm={12} md={12} lg={12}>
                            <FieldWrapper>
                              <FieldName>{t("cropPage.suitableCultivationAreas")}</FieldName>
                              <TextField
                                name="suitableCultivationAreas"
                                id="suitableCultivationAreas"
                                value={formData?.suitableCultivationAreas || ""}
                                fullWidth
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                  handleChange(
                                    e?.target?.value || "",
                                    "suitableCultivationAreas"
                                  )
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
                          <Grid item sm={12} md={12} lg={12}>
                            <FieldWrapper>
                              <FieldName>
                                {t("cropPage.nurseryEstablishmentPeriod")}
                              </FieldName>
                              <TextField
                                name="nurseryEstablishmentPeriod"
                                id="nurseryEstablishmentPeriod"
                                value={
                                  formData?.nurseryEstablishmentPeriod || ""
                                }
                                fullWidth
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                  handleChange(
                                    e?.target?.value || "",
                                    "nurseryEstablishmentPeriod"
                                  )
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
                        </Card>
                      </Grid>
                    </Grid>

                    {/* <Grid item sm={3} md={3} lg={5}>
                      <FieldWrapper>
                        <FieldName>Nursery Management</FieldName>
                        <TextField
                          name="nurseryManagement"
                          id="nurseryManagement"
                          value={formData?.nurseryManagement || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(
                              e?.target?.value || "",
                              "nurseryManagement"
                            )
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
                    <Grid item sm={3} md={3} lg={7}>
                      <FieldWrapper>
                        <FieldName>Land Preparation</FieldName>
                        <TextField
                          name="landPreparation"
                          id="landPreparation"
                          value={formData?.landPreparation || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(
                              e?.target?.value || "",
                              "landPreparation"
                            )
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
                        <FieldName>Seeding/ Transplanting/ Planting</FieldName>
                        <TextField
                          name="seedingTransplantingPlanting"
                          id="seedingTransplantingPlanting"
                          value={formData?.seedingTransplantingPlanting || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(
                              e?.target?.value || "",
                              "seedingTransplantingPlanting"
                            )
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
                        <FieldName>Planting Time</FieldName>
                        <TextField
                          name="plantingTime"
                          id="plantingTime"
                          value={formData?.plantingTime || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "plantingTime")
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
                    <Grid item sm={3} md={3} lg={4}>
                      <FieldWrapper>
                        <FieldName>Seed or Cutting Requirement</FieldName>
                        <TextField
                          name="seedOrCuttingRequirement"
                          id="seedOrCuttingRequirement"
                          value={formData?.seedOrCuttingRequirement || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(
                              e?.target?.value || "",
                              "seedOrCuttingRequirement"
                            )
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
                    <Grid item sm={3} md={3} lg={4}>
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
                    <Grid item sm={3} md={3} lg={3}>
                      <FieldWrapper>
                        <FieldName>Thinning Out</FieldName>
                        <TextField
                          name="thinningOut"
                          id="thinningOut"
                          value={formData?.thinningOut || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "thinningOut")
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
                    <Grid item sm={3} md={3} lg={4}>
                      <FieldWrapper>
                        <FieldName>Training</FieldName>
                        <TextField
                          name="training"
                          id="training"
                          value={formData?.training || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "training")
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
                        <FieldName>Water Supply</FieldName>
                        <TextField
                          name="waterSupply"
                          id="waterSupply"
                          value={formData?.waterSupply || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "waterSupply")
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
                        <FieldName>Weed Control</FieldName>
                        <TextField
                          name="weedControl"
                          id="weedControl"
                          value={formData?.weedControl || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "weedControl")
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
                        <FieldName>Earthing Up</FieldName>
                        <TextField
                          name="earthingUp"
                          id="earthingUp"
                          value={formData?.earthingUp || ""}
                          fullWidth
                          disabled={state?.action === DEF_ACTIONS.VIEW}
                          onChange={(e) =>
                            handleChange(e?.target?.value || "", "earthingUp")
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              borderRadius: "8px",
                            },
                          }}
                          size="small"
                        />
                      </FieldWrapper>
                    </Grid> */}
                  </Grid>
                </Grid>
              </ActionWrapper>
            </TabContent>

            <TabContent className={toggleState === 2 ? "active-content" : ""}>
              <ActionWrapper isLeft>
                <ButtonGroup
                  variant="outlined"
                  disableElevation
                  size="small"
                  aria-label="action button group"
                  color="success"
                >
                  <Button
                    onClick={onAddPest}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                  >
                    <Add />
                    {TranslateActions(t, DEF_ACTIONS.ADD)}
                  </Button>
                  <AddCropPestDialog
                    open={openCropPestAddDialog}
                    setConfirmDialog={setOpenCropPestAddDialog}
                    confirmAction={handleCropPestAdd}
                    handleClose={closeCropPestAddDialog}
                    formId={formDataD?.id}
                    formData={formDataD}
                    mode={dialogMode}
                    cropId={cropId}
                  />
                  {selectCropPest.length > 0 && (
                    <Button onClick={onDeleteCropPets}>
                      <Delete />
                      {TranslateActions(t, DEF_ACTIONS.DELETE)}
                    </Button>
                  )}
                </ButtonGroup>
              </ActionWrapper>
              {loading === false && (
                <CropPestList
                  url={pestUrl}
                  onRowSelect={toggleCropPestSelect}
                  selectedRows={selectCropPest}
                  selectAll={selectAllCropPest}
                  unSelectAll={resetSelectedCropPest}
                />
              )}
            </TabContent>
            <TabContent className={toggleState === 3 ? "active-content" : ""}>
              <ActionWrapper isLeft>
                <ButtonGroup
                  variant="outlined"
                  disableElevation
                  size="small"
                  aria-label="action button group"
                  color="success"
                >
                  <Button
                    onClick={onAddDisease}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                  >
                    <Add />
                    {TranslateActions(t, DEF_ACTIONS.ADD)}
                  </Button>
                  <AddCropDiseaseDialog
                    open={openCropDiseaseAddDialog}
                    setConfirmDialog={setOpenCropDiseaseAddDialog}
                    confirmAction={handleCropDiseaseAdd}
                    handleClose={closeCropDiseaseAddDialog}
                    formId={formDataD?.id}
                    formData={formDataD}
                    mode={dialogMode}
                    cropId={cropId}
                  />
                  {selectCropDisease.length > 0 && (
                    <Button onClick={onDeleteCropdDisease}>
                      <Delete />
                      {TranslateActions(t, DEF_ACTIONS.DELETE)}
                    </Button>
                  )}
                </ButtonGroup>
              </ActionWrapper>
              {loading === false && (
                <CropDiseaseList
                  url={diseaseUrl}
                  onRowSelect={toggleCropDiseaseSelect}
                  selectedRows={selectCropDisease}
                  selectAll={selectAllCropDisease}
                  unSelectAll={resetSelectedCropDisease}
                />
              )}
            </TabContent>
          </TabContentWrapper>
        </PaperWrapper>

        {action === "DELETE_CROPPEST" ? (
          <ConfirmationDialog
            open={open}
            title="doYouWantToDelete"
            items={selectCropPest}
            loading={loading}
            onClose={close}
            onConfirm={onConfirm}
            setDialogSelectedTypes={setDialogSelectedCropPets}
            dialogSelectedTypes={dialogSelectedCropPetsTypes}
            propertyId="pestName"
            propertyDescription="scientificName"
          />
        ) : (
          <ConfirmationDialog
            open={open}
            title="doYouWantToDelete"
            items={selectCropDisease}
            loading={loading}
            onClose={close}
            onConfirm={onConfirm}
            setDialogSelectedTypes={setDialogSelectedCropDieases}
            dialogSelectedTypes={dialogSelectedCropDieasesTypes}
            propertyId="diseaseName"
            propertyDescription="type"
          />
        )}
      </FormWrapper>
    </Box>
  );
};

export default CropForm;

export const PaperWrapper = styled(Paper)`
  && {
    margin-bottom: 10px;
    border: 1px solid ${Colors.borderColor};
  }
`;

export const TabContentWrapper = styled(Box)`
  && {
    padding: 10px;
  }
`;
