import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  handleFarmLand,
  updateFarmLand,
} from "../../redux/actions/farmLand/action";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";

import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { get_GnDivisionList } from "../../redux/actions/gnDivision/action";
import { get_SoilType } from "../../redux/actions/soil/soilType/action";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FarmLandLocation from "./FarmLandLocation";
import BackToList from "../../components/BackToList/BackToList";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import DynamicFormFarmLand from "../DynamicFormFarmLand/DynamicFormFarmLand";
import CommonQuestionList from "../AuditForm/CommonQuestionList";
import DynamicFormListFarmLand from "../DynamicFormFarmLand/DynamicFormListFarmLand";
import { isEmpty } from "../../utils/helpers/stringUtils";
import { Circle } from "@mui/icons-material";

const FarmLandForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [gnDivisionList, setGnDivisionList] = useState([]);
  const [soilType, setSoilType] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [otherField, setOtherField] = useState("none");
  const [farmLandId, setFarmLandId] = useState(null);
  const isVerifiedFunctionality = true;
  const [verifiedStatus, setVerifiedStatus] = useState(state?.target?.status);
  const [isProtectedHouseTypeEnable, setIsProtectedHouseTypeEnable] =
    useState(false);

  const { addSnackBar } = useSnackBars();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const goBack = () => {
    navigate("/farm-land");
  };

  useEffect(() => {
    get_SoilType()
      .then(({ dataList = [] }) => {
        setSoilType(dataList);
      })
      .catch(() => {
        setSoilType([]);
      });
  }, []);

  useEffect(() => {
    get_GnDivisionList().then(({ dataList = [] }) => {
      setGnDivisionList(dataList);
    });
  }, []);

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });

    if (target === "farmLandType" && value === "PROTECTED_HOUSE") {
      setIsProtectedHouseTypeEnable(true);
    }
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
    }
  };
  const verifyForm = async () => {
    setSaving(true);
    try {
      const verifyObj = {
        id: farmLandId,
        status: true,
      };
      await updateFarmLand(verifyObj, onSuccess, onError);
    } catch (error) {
      console.log(error);
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

  const onSuccess = (response) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setFarmLandId(response?.payload?.id);
    setFormData((prevState) => ({
      ...prevState,
      id: farmLandId,
    }));
    setSaving(false);
    navigate("/farm-land-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: farmLandId,
      },
    });
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
      if (isEmpty(formData.name)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Land name is empty",
        });
        return;
      }

      if (isEmpty(formData.farmLandType)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Land type is empty",
        });
        return;
      }

      if (isEmpty(formData.soilTypeDTO)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Soil Type is empty",
        });
        return;
      }

      if (isEmpty(formData.area)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Area is empty",
        });
        return;
      }

      if (isEmpty(formData.gnDivisionDTO)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "GN Division is empty",
        });
        return;
      }

      setSaving(true);
      try {
        if (formData?.id) {
          await updateFarmLand(formData, onSuccess, onError);
        } else {
          await handleFarmLand(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      sx={{
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        overflowY: "scroll",
      }}
    >
      <Box>
        <BackToList goBack={goBack} />
        <CustFormHeader saving={saving} state={state} formName="Farm Land" />
      </Box>

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
            isVerifiedFunctionality,
            verifyForm,
            verifiedStatus,
          }}
        />
        <Box sx={{ padding: "20px" }}>
          <Grid container sx={{ marginBottom: "10px" }}>
            <Grid lg={12}></Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>Land Name</FieldName>
                <TextField
                  name="name"
                  id="name"
                  value={formData?.name || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "name")}
                  error={!(formData?.name?.length > 0)}
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
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Land Type</FieldName>
                  <Select
                    name="farmLandType"
                    id="farmLandType"
                    value={formData?.farmLandType || ""}
                    error={!(formData?.farmLandType?.length > 0)}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "farmLandType")
                    }
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    }}
                    size="small"
                  >
                    <MenuItem value={"OPEN_FIELD"}>Open Field</MenuItem>
                    <MenuItem value={"PROTECTED_HOUSE"}>
                      Protected House
                    </MenuItem>
                  </Select>
                </FormControl>
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Protected House Type</FieldName>
                  <Select
                    name="protectedHouse"
                    id="protectedHouse"
                    value={formData?.protectedHouse || ""}
                    error={!(formData?.protectedHouse?.length > 0)}
                    disabled={
                      !isProtectedHouseTypeEnable ||
                      state?.action === DEF_ACTIONS.VIEW
                    }
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "protectedHouse")
                    }
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    }}
                    size="small"
                  >
                    <MenuItem value={"GREEN_HOUSE"}>Greenhouse</MenuItem>
                    <MenuItem value={"NET_HOUSE"}>Net house</MenuItem>
                    <MenuItem value={"SHADE_HOUSE"}>Shade house</MenuItem>
                    <MenuItem value={"POLY_HOUSE"}>Poly house</MenuItem>
                    <MenuItem value={"GLASS_HOUSE"}>Glass house</MenuItem>
                    <MenuItem value={"HYDROPONIC"}>Hydroponic house</MenuItem>
                    <MenuItem value={"AEROPONIC"}>Aeroponic house</MenuItem>
                    <MenuItem value={"VERTICAL_FARMING"}>
                      Vertical farming structure
                    </MenuItem>
                  </Select>
                </FormControl>
              </FieldWrapper>
            </Grid>

            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>
                    Soil Type {formData?.soilTypeDTO?.length}
                  </FieldName>

                  <Autocomplete
                    name="soilTypeDTO"
                    id="soilTypeDTO"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    options={soilType}
                    value={formData?.soilTypeDTO || ""}
                    getOptionLabel={(i) =>
                      i.soilTypeCode
                        ? `${i.soilTypeCode} - ${i.description}`
                        : ""
                    }
                    onChange={(event, value) => {
                      handleChange(value, "soilTypeDTO");
                    }}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        error={
                          !(formData?.soilTypeDTO?.soilTypeCode?.length > 0)
                        }
                        {...params}
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Area</FieldName>
                <TextField
                  name="area"
                  id="area"
                  value={formData?.area || ""}
                  error={!(formData?.area?.length > 0)}
                  type="number"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "area")}
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

          <Grid
            container
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Address 1</FieldName>
                <TextField
                  name="address1"
                  id="address1"
                  value={formData?.address1 || ""}
                  error={!(formData?.address1?.length > 0)}
                  placeholder="No/Po box"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "address1")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                    "& ::placeholder": {
                      fontSize: 11,
                      fontWeight: 400,
                      color: `${Colors.iconColor}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Address 2</FieldName>
                <TextField
                  name="address2"
                  id="address2"
                  value={formData?.address2 || ""}
                  error={!(formData?.address2?.length > 0)}
                  placeholder="Street"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "address2")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                    "& ::placeholder": {
                      fontSize: 11,
                      fontWeight: 400,
                      color: `${Colors.iconColor}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>City</FieldName>
                <TextField
                  name="city"
                  id="city"
                  value={formData?.city || ""}
                  error={!(formData?.city?.length > 0)}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "city")}
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
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>GN Division</FieldName>
                  <Autocomplete
                    name="gnDivisionDTO"
                    id="gnDivisionDTO"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    options={gnDivisionList}
                    value={formData?.gnDivisionDTO || ""}
                    getOptionLabel={(i) =>
                      i.code ? `${i.code} - ${i.name}` : ""
                    }
                    onChange={(event, value) => {
                      handleChange(value, "gnDivisionDTO");
                    }}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                    size="small"
                    renderInput={(params) => (
                      <>
                        <TextField
                          error={!(formData?.gnDivisionDTO?.code?.length > 0)}
                          {...params}
                          size="small"
                        />
                      </>
                    )}
                  />
                </FormControl>
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Latitude</FieldName>
                <TextField
                  name="latitude"
                  id="latitude"
                  value={formData?.latitude || ""}
                  error={!(formData?.latitude?.length > 0)}
                  type="number"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "latitude")
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
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Longitude</FieldName>
                <TextField
                  name="longitude"
                  id="longitude"
                  value={formData?.longitude || ""}
                  error={!(formData?.longitude?.length > 0)}
                  type="number"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "longitude")
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
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Elevation</FieldName>
                <TextField
                  name="elevation"
                  id="elevation"
                  value={formData?.elevation || ""}
                  error={!(formData?.elevation?.length > 0)}
                  type="number"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "elevation")
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
        </Box>
      </TabContent>

      <TabWrapper>
        <TabButton
          variant="contained"
          className={toggleState === 1 ? "active-tabs" : ""}
          onClick={() => toggleTab(1)}
        >
          Land Location
        </TabButton>
        <TabButton
          variant="contained"
          className={toggleState === 2 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
        >
          Farm Land Ownership
        </TabButton>
        <TabButton
          variant="contained"
          className={toggleState === 3 ? "active-tabs" : ""}
          onClick={() => toggleTab(3)}
        >
          Soil Type Per Land
        </TabButton>
        <TabButton
          variant="contained"
          className={toggleState === 4 ? "active-tabs" : ""}
          onClick={() => toggleTab(4)}
        >
          Self Assessment
        </TabButton>
        <TabButton
          variant="contained"
          className={toggleState === 5 ? "active-tabs" : ""}
          onClick={() => toggleTab(5)}
        >
          Basic Assessment
        </TabButton>
      </TabWrapper>

      <TabContent className={toggleState === 1 ? "active-content" : ""}>
        <Box>
          <Grid container>
            <Grid item sm={8} md={8} lg={8}>
              <FarmLandLocation />
            </Grid>
          </Grid>
        </Box>
      </TabContent>

      <TabContent className={toggleState === 2 ? "active-content" : ""}>
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
        <Box sx={{ padding: "20px" }}>
          <Grid
            container
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
          >
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName>Ownership ID</FieldName>
                <TextField
                  name="ownershipID"
                  id="ownershipID"
                  value={formData?.ownershipID || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "ownershipID")
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
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Owner Type</FieldName>
                  <Select
                    name="ownerType"
                    id="ownerType"
                    value={formData?.ownerType || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      e?.target?.value === "Other"
                        ? (setOtherField("flex"),
                          handleChange(e?.target?.value || "", "ownerType"))
                        : e?.target?.value === "Farmer"
                        ? (setOtherField("none"),
                          handleChange(e?.target?.value || "", "ownerType"))
                        : handleChange(e?.target?.value || "", "ownerType")
                    }
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    }}
                    size="small"
                  >
                    <MenuItem value={"Farmer"}>Farmer</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </FieldWrapper>
            </Grid>
            <Grid container style={{ display: `${otherField}` }}>
              <Grid item sm={6} md={6} lg={6}>
                <FieldWrapper>
                  <FieldName>NIC</FieldName>
                  <TextField
                    name="nic"
                    id="nic"
                    value={formData?.nic || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "nic")
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
              <Grid item sm={6} md={6} lg={6}>
                <FieldWrapper>
                  <FieldName>Address Line 01</FieldName>
                  <TextField
                    name="addressLine01"
                    id="addressLine01"
                    value={formData?.addressLine01 || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "addressLine01")
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
              <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>Address Line 02</FieldName>
                  <TextField
                    name="addressLine02"
                    id="addressLine02"
                    value={formData?.addressLine02 || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "addressLine02")
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
              <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>City</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
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
              <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FormControl fullWidth>
                    <FieldName>GN Division</FieldName>
                    <Autocomplete
                      name="gnDivisionDTO"
                      id="gnDivisionDTO"
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      options={gnDivisionList}
                      value={formData ? formData.gnDivisionDTO : ""}
                      getOptionLabel={(i) => `${i.code} - ${i.name}`}
                      onChange={(event, value) => {
                        handleChange(value, "gnDivisionDTO");
                      }}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                      size="small"
                      renderInput={(params) => (
                        <>
                          <TextField {...params} size="small" />
                        </>
                      )}
                    />
                  </FormControl>
                </FieldWrapper>
              </Grid>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Ownership Proof Document</FieldName>
                <TextField
                  name="ownershipProofDocument"
                  id="ownershipProofDocument"
                  value={formData?.ownershipProofDocument || ""}
                  fullWidth
                  inputProps={{ multiple: true }}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "ownershipProofDocument"
                    )
                  }
                  type="file"
                  accept="image/*"
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  size="small"
                ></TextField>
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Date From</FieldName>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker"]}
                    sx={{
                      width: "100%",
                      padding: "0",
                    }}
                    size="small"
                  >
                    <DatePicker
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Date Until</FieldName>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker"]}
                    sx={{
                      width: "100%",
                      padding: "0",
                    }}
                  >
                    <DatePicker
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FieldWrapper>
            </Grid>
          </Grid>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{ borderRadius: "0px", marginTop: "40px" }}
            hideFooterSelectedRowCount
          />
        </Box>
      </TabContent>

      <TabContent className={toggleState === 3 ? "active-content" : ""}>
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
        <Box sx={{ padding: "20px" }}>
          <Grid
            container
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
          >
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName>Land ID</FieldName>
                <TextField
                  name="landId"
                  id="landId"
                  value={formData?.landId || ""}
                  type="number"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "landId")
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
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName>Soil Type ID</FieldName>
                <TextField
                  name="soilTypeId"
                  id="soilTypeId"
                  value={formData?.soilTypeId || ""}
                  type="number"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "soilTypeId")
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
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{ borderRadius: "0px", marginTop: "40px" }}
            hideFooterSelectedRowCount
          />
        </Box>
      </TabContent>
      <TabContent className={toggleState === 4 ? "active-content" : ""}>
        <DynamicFormListFarmLand
          dataList={null}
          onFormSaveSuccess={null}
          formId={null}
          formMode={null}
          auditFormType={"SELF_ASSESSMENT"}
        />
      </TabContent>
      <TabContent className={toggleState === 5 ? "active-content" : ""}>
        <DynamicFormListFarmLand
          dataList={null}
          onFormSaveSuccess={null}
          formId={null}
          formMode={null}
          auditFormType={"BASIC_ASSESSMENT"}
        />
      </TabContent>
    </Box>
  );
};

export default FarmLandForm;

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
