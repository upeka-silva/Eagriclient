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
import { handleFarmer, updateFarmer } from "../../redux/actions/farmer/action";
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
import { get_DistrictList } from "../../redux/actions/district/action";
import { get_DsDivisionList } from "../../redux/actions/dsDivision/action";
import { get_GnDivisionList } from "../../redux/actions/gnDivision/action";

const FarmerForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [dsDivisionList, setDsDivisionList] = useState([]);
  const [gnDivisionList, setGnDivisionList] = useState([]);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/farmer");
  };

  useEffect(() => {
    get_ProvinceList().then(({ dataList = [] }) => {
      setProvinceList(dataList);
    });
  }, []);
  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      setDistrictList(dataList);
    });
  }, []);
  useEffect(() => {
    get_DsDivisionList().then(({ dataList = [] }) => {
      setDsDivisionList(dataList);
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
          await updateFarmer(formData, onSuccess, onError);
        } else {
          await handleFarmer(formData, onSuccess, onError);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${Colors.formBackgroundColor}`,
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <div>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
        <PathName>{getPathName()}</PathName>
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} FARMER
        </FormHeader>
      </div>
      <ButtonWrapper
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
              <AddButton variant="contained" disabled>
                {state?.action === DEF_ACTIONS.ADD
                  ? "ADDING..."
                  : "UPDATING..."}
              </AddButton>
            ) : (
              <>
                <AddButton
                  variant="contained"
                  disabled={!enableSave()}
                  onClick={handleFormSubmit}
                >
                  {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
                </AddButton>
                <ResetButton onClick={resetForm}>RESET</ResetButton>
              </>
            )}
          </ActionWrapper>
        )}
      </ButtonWrapper>

      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item lg={3}>
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
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Date of Birth</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData?.dateOfBirth || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "dateOfBirth")
                }
                in="DD-MM-YYYY"
                sx={{
                  // width: "264px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                  },
                }}
              />
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Nationality</FieldName>

            <Select
              value={formData?.climateZone || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "climateZone")
              }
              sx={{
                // width: "264px",
                // height: "30px",
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
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Last Name</FieldName>
            <TextField
              name="lastName"
              id="lastName"
              value={formData?.city || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "lastName")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Gender</FieldName>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                value="FEMALE"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "11px",
                  },
                }}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Female"
              />
              <FormControlLabel
                value="MALE"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "11px",
                  },
                }}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Mole"
              />
              <FormControlLabel
                value="CUSTOM"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "11px",
                  },
                }}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Custom"
              />
            </div>
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Profile Picture</FieldName>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <TextField
                name=""
                id=""
                value={formData?.firstName || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "")}
                sx={{
                  // width: "190px",
                  "& .MuiInputBase-root": {
                    // height: "30px",
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
                size="small"
              />
              <Button
                style={{
                  backgroundColor: "#408DFB",
                  color: `${Colors.white}`,
                  width: "60px",
                  height: "20px",
                  borderRadius: "15px",
                  fontSize: "10px",
                  fontWeight: 400,
                }}
              >
                Browse
              </Button>
            </div>
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
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Mobile</FieldName>
            <TextField
              name="mobile"
              id="mobile"
              value={formData?.mobile || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "mobile")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Home / Work</FieldName>
            <TextField
              name="homeWork"
              id="homeWork"
              value={formData?.homeWork || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "homeWork")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
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
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
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
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Address 01</FieldName>
            <TextField
              name="address01"
              id="address01"
              value={formData?.address01 || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              placeholder="No/Po box"
              onChange={(e) =>
                handleChange(e?.target?.value || "", "address01")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                  // fontSize: "11px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
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
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>
              Divisional
              
              Secretariats
             
              Division{" "}
            </FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={dsDivisionList}
              value={formData ? formData.dsDivisionDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "dsDivisionDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Province Name</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={provinceList}
              value={formData ? formData.provinceDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "provinceDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Address 02</FieldName>
            <TextField
              name="address02"
              id="address02"
              value={formData?.address02 || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "address02")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>
              Grama Niladari
             
              Division
            </FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={gnDivisionList}
              value={formData ? formData.gnDivisionDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "gnDivisionDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>District</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={districtList}
              value={formData ? formData.districtDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "districtDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={2}>
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
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FarmerForm;
