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
  Stack,
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
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
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
const CropForm = ({
  dataList = [],
  onFormSaveSuccess = false,
  formId = null,
  formMode = null,
}) => {
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();

  const [subOptions, setSubOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState(
    state?.target?.prsignedUrl || null
  );
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
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
  const [isDataFetch, setIsDataFetch] = useState(true);
  const [deleteItem, setDeleteItem] = useState(null);
  const [cropId, setCropId] = useState(null);
  const [pestUrl, setPestUrl] = useState(null);
  const [diseaseUrl, setDiseaseUrl] = useState(null);

  useEffect(() => {
    const cropId = formData.id;
    setPestUrl(`crop/crop-pests/${cropId}/pests`);
    setDiseaseUrl(`crop/crop-diseases/${cropId}/diseases`);
  });

  const goBack = () => {
    navigate("/crop/crop");
  };

  const handleCropPestDelete = (prop) => (event) => {
    setDeleteItem(prop);
    setOpen(true);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const onAddPest = () => {
    setCropId(formData.id);
    setFormData({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenCropPestAddDialog(true);
    setIsDataFetch(false);
    setPestUrl(`crop/crop-pests/${cropId}/pests`);
  };

  const onAddDisease = () => {
    setCropId(formData.id);
    setFormData({});
    setDialogMode(DEF_ACTIONS.ADD);
    setOpenCropDiseaseAddDialog(true);
    setIsDataFetch(false);
    setDiseaseUrl(`crop/crop-diseases/${cropId}/diseases`);
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

  const handleCropPestAdd = async (
    event,
    formDataD,
    functionMode,
    onSuccess,
    onError
  ) => {
    try {
      await assignCropPest(cropId, formDataD, onSuccess, onError);
      setOpenCropPestAddDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCropDiseaseAdd = async (event, formDataD, functionMode) => {
    try {
      await assignCropDisease(cropId, formDataD);
      setOpenCropDiseaseAddDialog(false);
    } catch (error) {
      console.log(error);
    }
    console.log("form data is: ", formDataD["cropPest"]);
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

  const onDelete = () => {
    setCropId(formData.id);
    setOpen(true);
  };

  const onConfirm = async () => {
    if (toggleState === 1) {
      try {
        setLoading(true);
        for (const cropPest of selectCropPest) {
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
        for (const cropDisease of selectCropDisease) {
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
    setFormData({});
    setOpenCropPestAddDialog(false);
  };

  const closeCropDiseaseAddDialog = () => {
    setFormData({});
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
          const response = await handleCrop(formData, onSuccess, onError);
          setFormData(response.payload);
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

  return (
    <div>
      <FormWrapper>
        <PageHeader
          saving={saving}
          goBack={goBack}
          state={state}
          formName="Crop"
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
          sx={{
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={7}>
            <Grid container spacing={1}>
              <Grid item sm={3} md={3} lg={4}>
                <FieldWrapper>
                  <FieldName>Crop ID</FieldName>
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
                  <FieldName>Description</FieldName>
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
              <Grid item sm={3} md={3} lg={6}>
                <FieldWrapper>
                  <FieldName>Sub Category ID</FieldName>
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

              <Grid item sm={2} md={2} lg={6}>
                <FieldWrapper>
                  <FieldName>Crop Type</FieldName>
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
          <Grid item sm={3} md={3} lg={5}>
            <Grid container spacing={1}>
              <Grid item sm={3} md={3} lg={9}>
                <FieldWrapper>
                  <FieldName>Select Crop Image</FieldName>
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
                            width: "180px",
                            height: "180px",
                            borderRadius: "8px",
                          }}
                        >
                          <img
                            src={selectedImage}
                            alt="Profile"
                            style={{
                              width: "180px",
                              height: "180px",
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
          <Grid width={"100%"}>
            <TabWrapper>
              <TabButton
                variant="contained"
                className={toggleState === 1 ? "active-tabs" : ""}
                onClick={() => toggleTab(1)}
                disabled={!tabEnabled}
              >
                Pest
              </TabButton>
              <TabButton
                variant="contained"
                className={toggleState === 2 ? "active-tabs" : ""}
                onClick={() => toggleTab(2)}
                disabled={!tabEnabled}
              >
                Disease
              </TabButton>
            </TabWrapper>
            <TabContent className={toggleState === 1 ? "active-content" : ""}>
              <Box>
                <Grid container>
                  <Grid item sm={8} md={8} lg={12}></Grid>
                </Grid>
              </Box>
            </TabContent>
            <TabContent className={toggleState === 2 ? "active-content" : ""}>
              <Box>
                <Grid container>
                  <Grid item sm={8} md={8} lg={12}></Grid>
                </Grid>
              </Box>
            </TabContent>

            <TabContent className={toggleState === 1 ? "active-content" : ""}>
              <ActionWrapper isLeft>
                <ButtonGroup
                  variant="outlined"
                  disableElevation
                  size="small"
                  aria-label="action button group"
                  color="success"
                >
                  <Button onClick={onAddPest}>
                    <Add />
                    {DEF_ACTIONS.ADD}
                  </Button>
                  <AddCropPestDialog
                    open={openCropPestAddDialog}
                    setConfirmDialog={setOpenCropPestAddDialog}
                    confirmAction={handleCropPestAdd}
                    handleClose={closeCropPestAddDialog}
                    formId={formData?.id}
                    formData={formData}
                    mode={dialogMode}
                    cropId={cropId}
                  />
                  {selectCropPest.length > 0 && (
                    <Button onClick={onDelete}>
                      <Delete />
                      {DEF_ACTIONS.DELETE}
                    </Button>
                  )}
                </ButtonGroup>
              </ActionWrapper>
              <CropPestList
                url={pestUrl}
                onRowSelect={toggleCropPestSelect}
                selectedRows={selectCropPest}
                selectAll={selectAllCropPest}
                unSelectAll={resetSelectedCropPest}
                onDelete={handleCropPestDelete}
                cropId={cropId}
              />
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
                  <Button onClick={onAddDisease}>
                    <Add />
                    {DEF_ACTIONS.ADD}
                  </Button>
                  <AddCropDiseaseDialog
                    open={openCropDiseaseAddDialog}
                    setConfirmDialog={setOpenCropDiseaseAddDialog}
                    confirmAction={handleCropDiseaseAdd}
                    handleClose={closeCropDiseaseAddDialog}
                    formId={formData?.id}
                    formData={formData}
                    mode={dialogMode}
                    cropId={cropId}
                  />
                  {selectCropDisease.length > 0 && (
                    <Button onClick={onDelete}>
                      <Delete />
                      {DEF_ACTIONS.DELETE}
                    </Button>
                  )}
                </ButtonGroup>
              </ActionWrapper>
              <CropDiseaseList
                url={diseaseUrl}
                onRowSelect={toggleCropDiseaseSelect}
                selectedRows={selectCropDisease}
                selectAll={selectAllCropDisease}
                unSelectAll={resetSelectedCropDisease}
              />
            </TabContent>
            <DialogBox
              open={open}
              title="Delete Crop Disease"
              actions={
                <ActionWrapper>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={onConfirm}
                    sx={{ ml: "8px" }}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={close}
                    sx={{ ml: "8px" }}
                  >
                    Close
                  </Button>
                </ActionWrapper>
              }
            ></DialogBox>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CropForm;

export const TabWrapper = styled(Stack)`
  && {
    flex-direction: row;
    margin: 20px 0px;
  }
`;

export const TabButton = styled(Button)`
  && {
    padding: 15px;
    width: 200px;
    position: relative;
    border: none;
    border-radius: 0px;
    background-color: ${Colors.tableHeaderColor};
    color: white;
    line-height: 0px;
    box-shadow: none;
    cursor: pointer;
    &:hover {
      background-color: ${Colors.iconColor};
      box-shadow: none;
    }
    &:not(:last-child) {
      border-right: 2px solid white;
    }
    &.active-tabs {
      background: white;
      color: black;
    }

    &.active-tabs::before {
      content: "";
      display: block;
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 5px;
      background: ${Colors.tableHeaderColor};
    }
  }
`;

export const TabContent = styled(Stack)`
  && {
    display: none;
  }
  &.active-content {
    display: flex;
  }
`;
