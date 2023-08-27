import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
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
import {
  ActionWrapper,
  makeCapitalize,
} from "../../components/PageLayout/ActionWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PathName } from "../../components/FormLayout/PathName";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { get_GnDivisionList } from "../../redux/actions/gnDivision/action";
import { get_SoilType } from "../../redux/actions/soil/soilType/action";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FarmLandLocation from "./FarmLandLocation";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";

const FarmLandForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [gn, setGn] = useState([]);
  const [soilType, setSoilType] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [protectedHouseType, setProtectedHouseType] = useState(true);
  const [otherField, setOtherField] = useState("none");

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
    get_GnDivisionList().then(({ dataList = [] }) => {
      setGn(dataList);
    });
  }, []);

  useEffect(() => {
    get_SoilType()
      .then(({ dataList = [] }) => {
        setSoilType(dataList);
      })
      .catch(() => {
        setSoilType([]);
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
          await updateFarmLand(formData, onSuccess, onError);
        } else {
          await handleFarmLand(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPathName = () => {
    return location.pathname === "/" || !location.pathname
      ? ""
      : location.pathname;
  };

  return (
    <Box
      sx={{
        backgroundColor: `${Colors.formBackgroundColor}`,
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        overflowY: "scroll",
      }}
    >
      <Box>
        <ActionWrapper isLeft>
          <Button
            startIcon={<ArrowCircleLeftRounded />}
            onClick={goBack}
            color="success"
          >
            Go back to list
          </Button>
        </ActionWrapper>
        {/* <PathName>{getPathName()}</PathName> */}
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {makeCapitalize(state?.action)} Farm Land
        </FormHeader>
      </Box>

      <TabContent
        style={{
          display: "flex",
        }}
      >
        <ButtonWrapper>
          {state?.action !== DEF_ACTIONS.VIEW && (
            <ActionWrapper>
              {saving ? (
                <Button variant="contained">
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                    size="small"
                    color="success"
                  >
                    {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />}
                    {/* {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"} */}
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
          )}
        </ButtonWrapper>
        <Box sx={{ padding: "20px" }}>
          <Grid
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
            container
          >
            <Grid item lg={4}>
              <FieldWrapper>
                <FieldName>Land Name</FieldName>
                <TextField
                  name="landName"
                  id="landName"
                  value={formData?.landName || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "landName")
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
            <Grid item lg={2}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Land Type</FieldName>
                  <Select
                    name="landType"
                    id="landType"
                    value={formData?.landType || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      e?.target?.value === "Protected House"
                        ? (setProtectedHouseType(false),
                          handleChange(e?.target?.value || "", "landType"))
                        : e?.target?.value === "Open Field"
                        ? (setProtectedHouseType(true),
                          handleChange(e?.target?.value || "", "landType"))
                        : handleChange(e?.target?.value || "", "landType")
                    }
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    }}
                    size="small"
                  >
                    <MenuItem value={"Open Field"}>Open Field</MenuItem>
                    <MenuItem value={"Protected House"}>
                      Protected House
                    </MenuItem>
                  </Select>
                </FormControl>
              </FieldWrapper>
            </Grid>
            <Grid item lg={2}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Protected House Type</FieldName>
                  <Select
                    name="protectedHouse"
                    id="protectedHouse"
                    value={formData?.protectedHouse || ""}
                    disabled={
                      protectedHouseType || state?.action === DEF_ACTIONS.VIEW
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
                    <MenuItem value={"Greenhouses"}>Greenhouses</MenuItem>
                    <MenuItem value={"Net houses"}>Net houses</MenuItem>
                    <MenuItem value={"Shade houses"}>Shade houses</MenuItem>
                    <MenuItem value={"Poly houses"}>Poly houses</MenuItem>
                    <MenuItem value={"Glass houses"}>Glass houses</MenuItem>
                    <MenuItem value={"Hydroponic houses"}>
                      Hydroponic houses
                    </MenuItem>
                    <MenuItem value={"Aeroponic houses"}>
                      Aeroponic houses
                    </MenuItem>
                    <MenuItem value={"Vertical farming structures"}>
                      Vertical farming structures
                    </MenuItem>
                  </Select>
                </FormControl>
              </FieldWrapper>
            </Grid>

            <Grid item lg={4}>
              <FieldWrapper>
                <FieldName>Address Line 01</FieldName>
                <TextField
                  name="addressLine01"
                  id="addressLine01"
                  value={formData?.addressLine01 || ""}
                  placeholder="No/Po box"
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
                    "& ::placeholder": {
                      fontSize: 11,
                      fontWeight: 400,
                      color: `${Colors.iconColor}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item lg={4}>
              <FieldWrapper>
                <FieldName>Address Line 02</FieldName>
                <TextField
                  name="addressLine02"
                  id="addressLine02"
                  value={formData?.addressLine02 || ""}
                  placeholder="Street"
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
                    "& ::placeholder": {
                      fontSize: 11,
                      fontWeight: 400,
                      color: `${Colors.iconColor}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item lg={2}>
              <FieldWrapper>
                <FieldName>City</FieldName>
                <TextField
                  name="city"
                  id="city"
                  value={formData?.city || ""}
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
            <Grid item lg={2}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>GN Division</FieldName>
                  <Autocomplete
                    name="gnDivisionDTO"
                    id="gnDivisionDTO"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    options={gn}
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
            <Grid item lg={2}>
              <FieldWrapper>
                <FieldName>Latitude</FieldName>
                <TextField
                  name="latitude"
                  id="latitude"
                  value={formData?.latitude || ""}
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
            <Grid item lg={2}>
              <FieldWrapper>
                <FieldName>Longitude</FieldName>
                <TextField
                  name="longitude"
                  id="longitude"
                  value={formData?.longitude || ""}
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
            <Grid item lg={2}>
              <FieldWrapper>
                <FieldName>Elevation</FieldName>
                <TextField
                  name="elevation"
                  id="elevation"
                  value={formData?.elevation || ""}
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
            <Grid item lg={3}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Soil Type</FieldName>

                  <Autocomplete
                    name="soilTypeDTO"
                    id="soilTypeDTO"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    options={soilType}
                    value={formData ? formData.soilTypeDTO : ""}
                    getOptionLabel={(i) =>
                      `${i.soilTypeCode} - ${i.description}`
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
                      <TextField {...params} size="small" />
                    )}
                  />
                </FormControl>
              </FieldWrapper>
            </Grid>
            <Grid item lg={3}>
              <FieldWrapper>
                <FieldName>Area</FieldName>
                <TextField
                  name="area"
                  id="area"
                  value={formData?.area || ""}
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
            <Grid item lg={2}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Status</FieldName>
                  <Select
                    name="status"
                    id="status"
                    value={formData?.status || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "status")
                    }
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    }}
                    size="small"
                  >
                    <MenuItem value={"VERIFIED"}>Verified</MenuItem>
                    <MenuItem value={"NOTVERIFIED"}>Not Verified</MenuItem>
                  </Select>
                </FormControl>
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
      </TabWrapper>

      <TabContent className={toggleState === 1 ? "active-content" : ""}>
        <Box>
          <Grid container>
            <Grid item lg={8}>
              <FarmLandLocation />
            </Grid>
          </Grid>
        </Box>
      </TabContent>

      <TabContent className={toggleState === 2 ? "active-content" : ""}>
        <ButtonWrapper>
          {state?.action !== DEF_ACTIONS.VIEW && (
            <ActionWrapper>
              {saving ? (
                <Button variant="contained">
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                    size="small"
                    color="success"
                  >
                    {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />}
                    {/* {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"} */}
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
          )}
        </ButtonWrapper>
        <Box sx={{ padding: "20px" }}>
          <Grid
            container
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
          >
            <Grid item lg={6}>
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
            <Grid item lg={6}>
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
              <Grid item lg={6}>
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
              <Grid item lg={6}>
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
              <Grid item lg={4}>
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
              <Grid item lg={4}>
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
              <Grid item lg={4}>
                <FieldWrapper>
                  <FormControl fullWidth>
                    <FieldName>GN Division</FieldName>
                    <Autocomplete
                      name="gnDivisionDTO"
                      id="gnDivisionDTO"
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      options={gn}
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
            <Grid item lg={4}>
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
            <Grid item lg={4}>
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
            <Grid item lg={4}>
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
        <ButtonWrapper>
          {state?.action !== DEF_ACTIONS.VIEW && (
            <ActionWrapper>
              {saving ? (
                <Button variant="contained">
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                    size="small"
                    color="success"
                  >
                    {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />}
                    {/* {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"} */}
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
          )}
        </ButtonWrapper>
        <Box sx={{ padding: "20px" }}>
          <Grid
            container
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
          >
            <Grid item lg={6}>
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
            <Grid item lg={6}>
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
