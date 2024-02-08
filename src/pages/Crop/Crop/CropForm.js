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
const CropForm = () => {
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

  // console.log("id", formData.id);

  // cropId = formData.id;

  const goBack = () => {
    navigate("/crop/crop");
  };

  const onCreate = (value) => {
    if(value === 1){
      navigate("/crop/crop-pest-form", { state: { cropId: formData.id } });
    } else {
      navigate("/crop/crop-disease-form", { state: { formId: formData.id } });
    }
    
  };

  const toggleTab = (index) => {
    setToggleState(index);
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
        <PageHeader saving={saving} goBack={goBack} state={state} formName="Crop" />
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
                    value={formData ? formData.cropSubCategoryDTO : ""}
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
          <Grid>
            
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
                <Grid item sm={8} md={8} lg={8}>
                  <Button onClick={() =>onCreate(1)}>
                    <Add />
                    {DEF_ACTIONS.ADD}
                  </Button>
                  {/* <CropPestList /> */}
                </Grid>
              </Grid>
            </Box>
          </TabContent>
          <TabContent className={toggleState === 2 ? "active-content" : ""}>
            <Box>
              <Grid container>
                <Grid item sm={8} md={8} lg={8}>
                  <Button onClick={() => onCreate(2)}>
                    <Add />
                    {DEF_ACTIONS.ADD}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabContent>

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
