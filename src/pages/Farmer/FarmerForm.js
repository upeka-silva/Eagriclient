import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Autocomplete,
  Grid,
  MenuItem,
  Select,
  IconButton,
  Box,
} from "@mui/material";
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
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { get_GnDivisionList } from "../../redux/actions/gnDivision/action";
import { PhotoCamera } from "@mui/icons-material";
import BackToList from "../../components/BackToList/BackToList";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";

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
};

const FarmerForm = () => {
  useUserAccessValidation();

  const { state } = useLocation();

  const location = useLocation();

  const navigate = useNavigate();

  const dateAdapter = new AdapterDayjs();

  const [formData, setFormData] = useState({
    ...(state?.target || {}),
    dob: state?.target?.dob ? dateAdapter.date(state?.target?.dob) : null,
  });

  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(
    state?.target?.prsignedUrl || null
  );
  const [gnDivisions, setGnDivisions] = useState([]);
  const [selectedGnDivision, setSelectedGnDevision] = useState({
    name: "",
    code: "",
  });
  const [form, setForm] = useState();

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
          console.log(response);
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
    console.log("handleFarmerProfile");
    try {
      const response = await handleFarmerProfile(
        id,
        form,
        onSuccess("Success"),
        onError
      );

      return response;
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_GnDivisionList().then(({ dataList = [] }) => {
      console.log(dataList);
      setGnDivisions(dataList);
    });
  }, []);

  return (
    <FormWrapper style={{ overflowY: "scroll" }}>
      <BackToList goBack={goBack} />
      <CustFormHeader saving={saving} state={state} formName="Farmer" />
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
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName>Farmer ID</FieldName>
                <TextField
                  name="farmerId"
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
                    },
                  }}
                  size="small"
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
              value={formData?.gender || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "gender")}
              sx={{
                borderRadius: "8px",
              }}
              size="small"
              fullWidth
            >
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
              <MenuItem value={"OTHER"}>Other</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
          container
          spacing={1}
          sx={{  width: "97%", marginLeft: "15px",marginTop:"5px" }}
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
      <Grid
          container
          spacing={1}
          sx={{  width: "97%", marginLeft: "15px" }}
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
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>GN Division</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={gnDivisions}
              value={formData?.gnDivision}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                console.log(value);
                handleChange(value, "gnDivision");
               
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
      </Grid>
    </FormWrapper>
  );
};

export default FarmerForm;
