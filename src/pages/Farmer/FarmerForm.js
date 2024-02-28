import { PhotoCamera } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { useSnackBars } from "../../context/SnackBarContext";
import { useUserAccessValidation } from "../../hooks/authentication";
import {
  handleFarmer,
  handleFarmerProfile,
  updateFarmer,
} from "../../redux/actions/farmer/action";
import { get_GnDivisionList, get_GnDivisionListWithoutPage } from "../../redux/actions/gnDivision/action";
import { get_ScsRegionList } from "../../redux/actions/scsRegion/action";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { Fonts } from "../../utils/constants/Fonts";
import { Colors } from "../../utils/constants/Colors";
import { getColorCode } from "../../utils/helpers/formMgtUtil";



export const farmerDto = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  nationality: "",
  status: "",
  profilePicture: "",
  originalFileName: "",
  prsignedUrl: "",
  presignedExpDate: "",
  createdBy: "",
  createdDate: "",
  modifiedDate: "",
  address1: "",
  address2: "",
  city: "",
  postalCode: "",
  address: "",
  mobile: "",
  email: "",
  nic: "",
  landLine: "",
  gnDivision: null,
  scsRegion: null,
};

const FarmerForm = () => {
  useUserAccessValidation();

  const { state } = useLocation();

  const navigate = useNavigate();

  const dateAdapter = new AdapterDayjs();

  const [formData, setFormData] = useState({
    ...(state?.target || {}),
    dob: state?.target?.dob ? dateAdapter.date(state?.target?.dob) : null,
  });

  const [saving, setSaving] = useState(false);

  const [selectedImage, setSelectedImage] = useState(
    state?.target?.prsignedUrl || null
  );
  const [gnDivisions, setGnDivisions] = useState([]);
  const [inputGnDivision, setInputGnDivision] = useState("");

  const [scsRegion, setScsRegion] = useState([]);

  const [form, setForm] = useState();

  const { addSnackBar } = useSnackBars();

  const requiredFieldIdList = [
    "farmerId",
    "firstName",
    "lastName",
    "nationality",
    "gnDivision",
    "mobile",
    "address1",
    "gender",
  ];

  const goBack = () => {
    navigate("/farmer");
  };

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });

    getColorCode(target, value, requiredFieldIdList);
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
      Object.keys(formData || {}).length > 1 &&
      formData?.farmerId !== ""
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
      let dob = new Date(formData.dob);
      try {
        if (form && state?.action === DEF_ACTIONS.ADD) {
          const response = await handleFarmer(
            {
              ...formData,
              dob: dob.valueOf() || null,
            },
            onSuccess,
            onError
          );
          setFormData(response.payload);
          const res = await handleFarmerProfilePicture(response.payload?.id);
          console.log(res);
          if ((res.httpCode = "200 OK")) {
            const profilePicture = res.payload.storedFileName;
            const originalFileName = res.payload.originalFileName;
            const prsignedUrl = res.payload.presignedUrl;
            const presignedExpDate = res.payload.expireDate;

            await updateFarmer(
              {
                ...formData,
                id: response.payload?.id,
                dob: dob.valueOf() || null,
                profilePicture: profilePicture,
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
          const res = await handleFarmerProfilePicture(formData?.id);
          if ((res.httpCode = "200 OK")) {
            const profilePicture = res.payload.storedFileName;
            const originalFileName = res.payload.originalFileName;
            const prsignedUrl = res.payload.presignedUrl;
            const presignedExpDate = res.payload.expireDate;

            await updateFarmer(
              {
                ...formData,
                dob: dob.valueOf() || null,
                profilePicture: profilePicture,
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
          await updateFarmer(
            {
              ...formData,
              dob: dob.valueOf() || null,
            },
            onSuccess,
            onError
          );
        } else {
          const response = await handleFarmer(
            {
              ...formData,
              dob: dob.valueOf() || null,
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
    setForm(form);
  };

  const handleFarmerProfilePicture = async (id) => {
    try {
      const response = await handleFarmerProfile(
        id,
        form,
        onSuccess("Success"),
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
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_GnDivisionListWithoutPage().then(({ dataList = [] }) => {
      setGnDivisions(dataList);
    });
  }, []);

  useEffect(() => {
    get_ScsRegionList().then(({ dataList = [] }) => {
      setScsRegion(dataList);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <PageHeader
        saving={saving}
        state={state}
        formName="Farmer"
        goBack={goBack}
      />
      <Stack direction="row" spacing={1}>
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
      </Stack>
      <Grid container spacing={0}>
        <Grid item sm={3} md={3} lg={2}>
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
        <Grid item sm={3} md={3} lg={9}>
          <Grid container spacing={1}>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>Farmer ID</FieldName>
                <TextField
                  variant="outlined"
                  name="farmerId"
                  autoComplete="off"
                  id="farmerId"
                  value={formData?.farmerId || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "farmerId")
                  }
                  type="text"
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: requiredFieldIdList.includes("farmerId")
                        ? Colors.requiredColor
                        : Colors.white,
                    },
                  }}
                  size="small"
                  inputProps={{ style: { textTransform: "uppercase" } }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={3}>
              <FieldWrapper>
                <FieldName>NIC No</FieldName>
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
            <Grid item sm={4} md={4} lg={4}>
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
                      backgroundColor: requiredFieldIdList.includes("firstName")
                        ? Colors.requiredColor
                        : Colors.white,
                    },
                  }}
                  size="small"
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Last Name</FieldName>
                <TextField
                  name="lastName"
                  id="lastName"
                  value={formData?.lastName || ""}
                  fullWidth
                  type="text"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "lastName")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: requiredFieldIdList.includes("lastName")
                        ? Colors.requiredColor
                        : Colors.white,
                    },
                  }}
                  size="small"
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={3}>
              <FieldWrapper>
                <FieldName>Date of Birth</FieldName>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { size: "small", error: false } }}
                    name="dob"
                    id="dob"
                    value={formData?.dob || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(value) => {
                      handleChange(value || "", "dob");
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
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>Ethnicity</FieldName>
                <Select
                  id="nationality"
                  name="nationality"
                  value={formData?.nationality || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "nationality")
                  }
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: requiredFieldIdList.includes("nationality")
                      ? Colors.requiredColor
                      : Colors.white,
                  }}
                  size="small"
                  fullWidth
                >
                  <MenuItem value={"SINHALESE"}>Sinhala</MenuItem>
                  <MenuItem value={"SRILANKANTAMIL"}>Srilankan Tamil</MenuItem>
                  <MenuItem value={"SRILANKANMOORS"}>Srilankan Moors</MenuItem>
                  <MenuItem value={"INDIANTAMIL"}>Indian Tamil</MenuItem>
                  <MenuItem value={"OTHERS"}>Others</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Gender</FieldName>
                <Select
                  id="gender"
                  name="gender"
                  value={formData?.gender || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "gender")
                  }
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: requiredFieldIdList.includes("gender")
                      ? Colors.requiredColor
                      : Colors.white,
                  }}
                  size="small"
                  fullWidth
                >
                  <MenuItem value={"M"}>Male</MenuItem>
                  <MenuItem value={"F"}>Female</MenuItem>
                  <MenuItem value={"O"}>Other</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{ width: "97%", marginLeft: "15px", marginTop: "5px" }}
      >
        <Grid item lg={12} sm={12} xs={12}>
          <hr></hr>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
          margintop: "0px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Mobile</FieldName>
            <TextField
              name="mobile"
              id="mobile"
              value={formData?.mobile || ""}
              fullWidth
              type="text"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "mobile")}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: requiredFieldIdList.includes("mobile")
                    ? Colors.requiredColor
                    : Colors.white,
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
              type="text"
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
        <Grid item sm={4} md={4} lg={4}>
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
      <Grid container spacing={1} sx={{ width: "97%", marginLeft: "15px" }}>
        <Grid item lg={12} sm={12} xs={12}>
          <hr></hr>
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
            <FieldName>GN Division</FieldName>
            <Autocomplete
              key={formData?.gnDivision}
              id="gnDivision"
              name="gnDivision"
              isOptionEqualToValue={(option, value) =>
                option?.code === value?.code
              }
              inputValue={inputGnDivision}
              onInputChange={(event, newInputValue) => {
                setInputGnDivision(newInputValue);
              }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={gnDivisions}
              value={formData?.gnDivision}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                console.log(value);
                handleChange(value, "gnDivision");
              }}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: requiredFieldIdList.includes(
                        "gnDivision"
                      )
                        ? Colors.requiredColor
                        : Colors.white,
                    },
                  }}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>SCS Region</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={scsRegion}
              value={formData?.scsRegion}
              getOptionLabel={(i) => `${i.scsRegionId} - ${i.name}`}
              onChange={(event, value) => {
                console.log(value);
                handleChange(value, "scsRegion");
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
            <FieldName>Address 1</FieldName>
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
                  backgroundColor: requiredFieldIdList.includes("address1")
                    ? Colors.requiredColor
                    : Colors.white,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Address 2</FieldName>
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
        <Grid item sm={4} md={4} lg={4} spacing={0}>
              <FieldWrapper>
                <FieldName >
                 Seed Farmer
                </FieldName>
                <Switch
                  name="isSeedFarmer"
                  id="isSeedFarmer"
                  value={formData?.isSeedFarmer || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "isSeedFarmer")
                  }
                  checked={formData?.isSeedFarmer}
                  aria-label="Switch demo" 
                />
              </FieldWrapper>
            </Grid>
            
            <Grid item sm={4} md={4} lg={4} spacing={0}>
              <FieldWrapper>
                <FieldName >
                 Export Farmer
                </FieldName>
                <Switch
                  name="isExportFarmer"
                  id="isExportFarmer"
                  value={formData?.isExportFarmer || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "isExportFarmer")
                  }
                  checked={formData?.isExportFarmer}
                  aria-label="Switch demo" 
                />
              </FieldWrapper>
            </Grid>

        
           
            
        
        
      </Grid>
    </div>
  );
};

export default FarmerForm;
