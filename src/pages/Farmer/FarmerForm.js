import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Grid,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { useLocation, useNavigate } from "react-router";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  handleFarmer,
  handleFarmerProfile,
  updateFarmer,
} from "../../redux/actions/farmer/action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { PathName } from "../../components/FormLayout/PathName";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { get_ProvinceList } from "../../redux/actions/province/action";
import {
  get_DistrictList,
  get_DistrictListByProvinceId,
} from "../../redux/actions/district/action";
import {
  get_DsDivisionList,
  get_DsDivisionListByDistrictId,
} from "../../redux/actions/dsDivision/action";
import {
  get_GnDivisionList,
  get_GnDivisionListByDsDivisionId,
} from "../../redux/actions/gnDivision/action";
import { Add, Edit, PhotoCamera } from "@mui/icons-material";
import BackToList from "../../components/BackToList/BackToList";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import dayjs from "dayjs";

const FarmerForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  console.log(state?.farmerId);
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    state?.target || { id: state?.farmerId }
  );
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  const [gnDivisionList, setGnDivisionList] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [districs, setDistrics] = useState([]);
  const [dsDivisions, setDsDivisions] = useState([]);
  const [gnDivisions, setGnDivisions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({
    name: "",
    code: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: "",
    code: "",
  });
  const [selectedDsDevision, setSelectedDsDevision] = useState({
    name: "",
    code: "",
  });
  const [selectedGnDivision, setSelectedGnDevision] = useState({
    name: "",
    code: "",
  });

  const [dob, setDob] = useState();

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/farmer");
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
      Object.keys(formData || {}).length > 1
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
        if (formData?.id && state?.action === DEF_ACTIONS.EDIT) {
          await updateFarmer(formData, onSuccess, onError);
        }
        if (formData?.id) {
          await updateFarmer(formData, onSuccess, onError);
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

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const form = new FormData();
    form.append("file", file);

    try {
      if (formData?.id) {
        const response = await handleFarmerProfile(
          formData?.id,
          form,
          onSuccess,
          onError
        );
        if ((response.httpCode = "200 OK")) {
          const profilePicture = response.payload.storedFileName;
          const originalFileName = response.payload.originalFileName;
          const prsignedUrl = response.payload.presignedUrl;
          const presignedExpDate = response.payload.expireDate;

         
          setFormData({
            ...formData,
            profilePicture: profilePicture,
            originalFileName: originalFileName,
            prsignedUrl: prsignedUrl,
            presignedExpDate: presignedExpDate,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_ProvinceList().then(({ dataList = [] }) => {
      console.log(dataList);
      setProvinces(dataList);
    });
  }, []);

  const getDistricts = (id) => {
    get_DistrictListByProvinceId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDistrics(dataList);
    });
  };
  const getDsDivisions = (id) => {
    get_DsDivisionListByDistrictId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDsDivisions(dataList);
    });
  };
  const getGnDivisions = (id) => {
    get_GnDivisionListByDsDivisionId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setGnDivisions(dataList);
    });
  };

  return (
    <FormWrapper style={{ overflowY: "scroll" }}>
      <BackToList goBack={goBack} />
      <CustFormHeader saving={saving} state={state} formName="Farmer" />
      {/* <FormButtonGroup
        {...{
          state,
          DEF_ACTIONS,
          saving,
          enableSave,
          handleFormSubmit,
          resetForm,
        }}
      /> */}
      <ButtonWrapper
        isCeneter
        style={{
          width: "95%",
          justifyContent: "flex-start",
          margin: "0",
          paddingLeft: "18px",
        }}
      >
        {state?.action !== DEF_ACTIONS.VIEW && (
          <ActionWrapper>
            {saving ? (
              <Button variant="contained" color="success" size="small">
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
                  {state?.action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
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
      <Grid container>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Select Profile Picture</FieldName>
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
                    width: "140px",
                    height: "140px",
                    border: "1px solid #7a879d",
                    borderRadius: "70px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                      width: "140px",
                      height: "140px",
                      borderRadius: "70px",
                    }}
                  >
                    <img
                      src={selectedImage}
                      alt="Profile"
                      style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "70px",
                      }}
                    />
                  </div>
                )}
              </Box>
            </div>
          </FieldWrapper>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>First Name</FieldName>
            <TextField
              name="firstName"
              id="firstName"
              value={formData?.firstName || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "firstName")
              }
              type="text"
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
            <FieldName>Last Name</FieldName>
            <TextField
              name="lastName"
              id="lastName"
              value={formData?.lastName || ""}
              fullWidth
              type="text"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "lastName")}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Date of Birth</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                name="dob"
                id="dob"
                value={""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(value) => {
                  setDob(value);
                }}
                in="DD-MM-YYYY"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Ethnicity</FieldName>

            <Select
              value={formData?.nationality || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "nationality")
              }
              sx={{
                borderRadius: "8px",
              }}
              size="small"
              fullWidth
            >
              <MenuItem value={"SINHALA"}>Sinhala</MenuItem>
              <MenuItem value={"ENGLISH"}>English</MenuItem>
              <MenuItem value={"TAMIL"}>Tamil</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>

        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Gender</FieldName>

            <Select
              value={formData?.gender || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "gender")}
              sx={{
                borderRadius: "8px",
              }}
              size="small"
              fullWidth
            >
              <MenuItem value={"MALE"}>MALE</MenuItem>
              <MenuItem value={"FEMALE"}>FEMALE</MenuItem>
              <MenuItem value={"OTHER"}>OTHER</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Nic</FieldName>
            <TextField
              name="nic"
              id="nic"
              value={formData?.nic || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "nic")}
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
            <FieldName>Mobile</FieldName>
            <TextField
              name="mobile"
              id="mobile"
              value={formData?.mobile || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "mobile")}
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
            <FieldName>Home</FieldName>
            <TextField
              name="landLine"
              id="landLine"
              value={formData?.landLine || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "landLine")}
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
            <FieldName>Email</FieldName>
            <TextField
              name="email"
              id="email"
              value={formData?.email || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "email")}
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

      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Province Name</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={provinces}
              value={selectedProvince}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                setSelectedProvince(value);
                setSelectedDistrict({ code: "", name: "" });
                setSelectedDsDevision({ code: "", name: "" });
                setSelectedGnDevision({ code: "", name: "" });
                getDistricts(value.id);
              }}
              disableClearable
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
            <FieldName>District</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={districs}
              value={selectedDistrict}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              disableClearable
              onChange={(event, value) => {
                setSelectedDistrict(value);
                setSelectedDsDevision({ code: "", name: "" });
                setSelectedGnDevision({ code: "", name: "" });
                getDsDivisions(value.id);
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
            <FieldName>Divisional Secretariats Division </FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={dsDivisions}
              value={selectedDsDevision}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                setSelectedDsDevision(value);
                setSelectedGnDevision({ code: "", name: "" });
                getGnDivisions(value.id);
              }}
              disableClearable
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
            <FieldName>Grama Niladari Division</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={gnDivisions}
              value={formData.gnDivisionDTO || selectedGnDivision}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "gnDivisionDTO");
              }}
              disableClearable
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
      </Grid>
      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Address 01</FieldName>
            <TextField
              name="address1"
              id="address1"
              value={formData?.address1 || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              placeholder=""
              onChange={(e) => handleChange(e?.target?.value || "", "address1")}
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
            <FieldName>Address 02</FieldName>
            <TextField
              name="address2"
              id="address2"
              value={formData?.address2 || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "address2")}
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
            <FieldName>City</FieldName>
            <TextField
              name="city"
              id="city"
              value={formData?.city || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "city")}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>

        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Postal Code</FieldName>
            <TextField
              name="postalCode"
              id="postalCode"
              value={formData?.postalCode || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "postalCode")
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
    </FormWrapper>
  );
};

export default FarmerForm;
