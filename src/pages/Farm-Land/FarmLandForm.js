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
  CircularProgress,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  getFarmLandById,
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
import DynamicFormListFarmLand from "../DynamicFormFarmLand/DynamicFormListFarmLand";
import { isEmpty } from "../../utils/helpers/stringUtils";
import GridFormField from "../../components/GridFormField/GridFormField";
import { FORM_CONTROL_TYPE } from "../../components/GridFormField/FieldType";
import { get_ProtectedHousTypeList } from "../../redux/actions/protectedHouseType/action";
import FarmLandOwnershipForm from "./FarmLandOwnership/FarmLandOwnershipForm";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import OwnershipList from "./FarmLandOwnership/OwnershipList";
import {
  deleteFarmLandOwnership,
  get_FarmLandOwnershipList,
  get_FarmLandOwnershipListByLandId,
} from "../../redux/actions/farmerLandOwnership/action";
import DialogBox from "../../components/PageLayout/DialogBox";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

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
  const [tabEnabled, setTabEnabled] = useState(state?.target?.id !== undefined);
  console.log(state?.target?.id == undefined);
  const [protectedHouseList, setProtectedHoseList] = useState([]);
  const [phLoading, setPhLoading] = useState(true);

  const { addSnackBar } = useSnackBars();

  const [flODataList, setFlODataList] = useState([]);
  const [flOData, setFlOData] = useState();
  const [openFlO, setOpenFlO] = useState(false);
  const [fLOAction, setFlOAction] = useState(DEF_ACTIONS.ADD);
  const [selectedOwnership, setSelectedOwnership] = useState([]);
  const [openDeleteOwnership, setOpenDeleteOwnership] = useState(false);
  const [refreshFLOwnership, setRefreshFLOwnership] = useState(true);
  const [loading, setLoading] = useState(false);

  const dateAdapter = new AdapterDayjs();

  const landTypeItems = [
    { value: "OPEN_FIELD", label: "Open Field" },
    { value: "PROTECTED_HOUSE", label: "Protected House" },
  ];

  const areaUnits = [
    { value: "SQUARE_METERS", label: "Square Meters" },
    { value: "ACRES", label: "Acres" },
    { value: "HECTARES", label: "Hectares" },
    { value: "PERCH", label: "Perch" },
    { value: "SQUARE_FEET", label: "Squre Feet" },
  ];

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
    console.log("FORM DATA ----------->", formData);
    // getFarmLandById(state?.target?.id).then(({ payload }) => {
    //   setFormData(payload);
    // });
  }, []);

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });

    if (target === "farmLandType") {
      if (value === "PROTECTED_HOUSE") {
        setIsProtectedHouseTypeEnable(true);
        setPhLoading(false);
        get_ProtectedHousTypeList()
          .then(({ dataList = [] }) => {
            setProtectedHoseList(dataList);
          })
          .catch(() => {
            setProtectedHoseList([]);
          });
        setPhLoading(true);
      } else {
        setIsProtectedHouseTypeEnable(false);
        setProtectedHoseList([]);
        setFormData((current) => ({ ...current, protectedHouseTypeDTO: null }));
      }
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
    console.log("form data", formData);
    if (enableSave()) {
      if (isEmpty(formData.code)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Code must have a value",
        });
        return;
      }
      if (isEmpty(formData.name)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Land name must have a value",
        });
        return;
      }

      if (isEmpty(formData.farmLandType)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Land type must have a value",
        });
        return;
      }

      if (isEmpty(formData.soilTypeDTO)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Soil Type must have a value",
        });
        return;
      }

      if (isEmpty(formData.area)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "Area must have a value",
        });
        return;
      }

      if (isEmpty(formData.gnDivisionDTO)) {
        addSnackBar({
          type: SnackBarTypes.error,
          message: "GN Division must have a value",
        });
        return;
      }

      setSaving(true);
      try {
        if (formData?.id) {
          const response = await updateFarmLand(formData, onSuccess, onError);
          if (response.httpCode === "200 OK") {
            setFormData(response?.payload);
          }
        } else {
          const response = await handleFarmLand(formData, onSuccess, onError);
          if (response.httpCode === "200 OK") {
            setFormData(response?.payload);
          }
        }
        setTabEnabled(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closeFlO = () => {
    setOpenFlO(false);
  };
  const handleFlOData = (value, target) => {
    setFlOData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const onCreateFlOData = () => {
    setOpenFlO(true);
  };
  const onEditFlOData = () => {
    const data = flODataList.filter((item) => item?.id == selectedOwnership[0]);
    console.log(data[0]);
    const dateFrom = dateAdapter.date(data[0].dateFrom);
    const dateUntil = dateAdapter.date(data[0].dateUntil);

    setFlOAction(DEF_ACTIONS.EDIT);
    setFlOData({ ...data[0], dateFrom: dateFrom, dateUntil: dateUntil });
    setOpenFlO(true);
  };
  const onDeleteFlOData = () => {
    setOpenDeleteOwnership(true);
    //setOpenFlO(true);
  };

  const onViewFlOData = () => {
    const data = flODataList.filter((item) => item?.id == selectedOwnership[0]);
    console.log(data[0]);
    const dateFrom = dateAdapter.date(data[0].dateFrom);
    const dateUntil = dateAdapter.date(data[0].dateUntil);

    setFlOAction(DEF_ACTIONS.VIEW);
    setFlOData({ ...data[0], dateFrom: dateFrom, dateUntil: dateUntil });
    setOpenFlO(true);
  };

  const resetData = () => {
    setFlOData({});
  };

  const toggleFarmLandOwnershipSelect = (component) => {
    console.log(component);
    setSelectedOwnership(component);
  };

  const resetSelectedFarmLandOwnership = () => {
    setSelectedOwnership([]);
    refreshFLOList();
  };

  useEffect(() => {
    formData?.id &&
      get_FarmLandOwnershipListByLandId(formData?.id).then(
        ({ dataList = [] }) => {
          console.log(dataList);
          setFlODataList(dataList);
        }
      );
  }, [refreshFLOwnership]);

  const closeOwnershipDelete = () => {
    setOpenDeleteOwnership(false);
  };
  const refreshFLOList = () => {
    setRefreshFLOwnership(!refreshFLOwnership);
  };

  const onConfirmDeleteOwnership = async () => {
    try {
      setLoading(true);
      for (const id of selectedOwnership) {
        await deleteFarmLandOwnership(id, onSuccessDelete, onError);
      }
      setLoading(false);
      closeOwnershipDelete();
      resetSelectedFarmLandOwnership();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedOwnership.map((p, key) => {
          console.log(p);
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {p} - {p.ownerType}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Deleted`,
    });
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
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Code</FieldName>
                <TextField
                  name="code"
                  id="code"
                  value={formData?.code || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "code")}
                  error={!(formData?.code?.length > 0)}
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

                  <Autocomplete
                    name="protectedHouseTypeDTO"
                    id="protectedHouseTypeDTO"
                    disabled={
                      state?.action === DEF_ACTIONS.VIEW ||
                      !isProtectedHouseTypeEnable
                    }
                    options={protectedHouseList}
                    value={formData?.protectedHouseTypeDTO || ""}
                    getOptionLabel={(i) =>
                      i.typeId ? `${i.typeId} - ${i.description}` : ""
                    }
                    onChange={(event, value) => {
                      handleChange(value, "protectedHouseTypeDTO");
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
                          !(formData?.protectedHouseTypeDTO?.typeId?.length > 0)
                        }
                        {...params}
                        size="small"
                      />
                    )}
                  />
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
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Aria Unit</FieldName>
                  <Select
                    name="landAreaUnit"
                    id="landAreaUnit"
                    value={formData?.landAreaUnit || ""}
                    error={!(formData?.landAreaUnit?.length > 0)}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "landAreaUnit")
                    }
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    }}
                    size="small"
                  >
                    <MenuItem value={"SQUARE_METERS"}>Square Meters</MenuItem>
                    <MenuItem value={"ACRES"}>Acres</MenuItem>
                    <MenuItem value={"HECTARES"}>Hectares</MenuItem>
                    <MenuItem value={"PERCH"}>Perch</MenuItem>
                    <MenuItem value={"SQUARE_FEET"}>Square Feet</MenuItem>
                  </Select>
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
          Location
        </TabButton>
        <TabButton
          variant="contained"
          className={toggleState === 2 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
          disabled={!tabEnabled}
        >
          Ownership
        </TabButton>

        <TabButton
          variant="contained"
          className={toggleState === 4 ? "active-tabs" : ""}
          onClick={() => toggleTab(4)}
          disabled={!tabEnabled}
        >
          Self Assessment
        </TabButton>
        <TabButton
          variant="contained"
          className={toggleState === 5 ? "active-tabs" : ""}
          onClick={() => toggleTab(5)}
          disabled={!tabEnabled}
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
        <ActionWrapper isLeft>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <Button onClick={onCreateFlOData}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>

            {selectedOwnership.length == 1 && (
              <Button onClick={onEditFlOData}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            )}

            {selectedOwnership.length == 1 && (
              <Button onClick={onViewFlOData}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            )}

            {selectedOwnership.length > 0 && (
              <Button onClick={onDeleteFlOData}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            )}
          </ButtonGroup>
        </ActionWrapper>

        <OwnershipList
          onRowSelect={toggleFarmLandOwnershipSelect}
          data={flODataList}
        />
      </TabContent>

      <TabContent className={toggleState === 4 ? "active-content" : ""}>
        <DynamicFormListFarmLand
          dataList={null}
          onFormSaveSuccess={null}
          formId={formData?.id}
          formMode={null}
          auditFormType={"SELF_ASSESSMENT"}
        />
      </TabContent>
      <TabContent className={toggleState === 5 ? "active-content" : ""}>
        <DynamicFormListFarmLand
          dataList={null}
          onFormSaveSuccess={null}
          formId={formData?.id}
          formMode={null}
          auditFormType={"BASIC_ASSESSMENT"}
        />
      </TabContent>
      <FarmLandOwnershipForm
        open={openFlO}
        action={fLOAction}
        onClose={closeFlO}
        farmLandData={formData}
        data={flOData}
        onChange={handleFlOData}
        resetData={resetData}
        refresh={refreshFLOList}
      />
      <DialogBox
        open={openDeleteOwnership}
        title="Delete Farm Land Ownership"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirmDeleteOwnership}
              sx={{ ml: "8px" }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={closeOwnershipDelete}
              sx={{ ml: "8px" }}
            >
              Close
            </Button>
          </ActionWrapper>
        }
      >
        <>
          <DeleteMsg />
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
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
