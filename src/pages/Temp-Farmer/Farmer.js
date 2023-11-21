import React, { useEffect, useState } from "react";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Button, Grid, TextField } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useLocation } from "react-router";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { get_DistrictList } from "../../redux/actions/district/action";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  handleFarmer,
  handleFarmerOTP,
} from "../../redux/actions/temp-farmer/action";
import GnDivisionSelector from "../../components/GnDivisionSelector/GnDivisionSelector";
import OTPDialog from "./OTPDialog/OTPDialog";
import { ArrowCircleLeftRounded } from "@mui/icons-material";

const Farmer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [open, setOpen] = useState(false);
  const { state } = useLocation();
  const [options, setOptions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [otp, setOTP] = useState();

  const { addSnackBar } = useSnackBars();

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const goBack = () => {
    navigate("/login");
  };

  const addContact = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const enableSave = () => {
    if (JSON.stringify(formData)) {
      return true;
    }

    return false;
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
    }
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);
      let dob = new Date(formData.dob);

      try {
        if (formData?.password.length < 6) {
          onError("Password should be at least 6 characters");
          return;
        }

        if (formData.password == formData.verifyPassword) {
          const response = await handleFarmer(
            {
              ...formData,
              dob: dob.valueOf() || null,
            },
            onSuccess,
            onError
          );
          if (response.httpCode === "201 CREATED") {
            setFormData(response?.payload);
            setOpen(true);
          }
          console.log(response);
        } else {
          onError("Verify Password doesn't match");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Added",
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

  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      setOptions(dataList);
    });
  }, []);

  const handleOTPSubmit = async () => {
    const data = {
      farmerId: formData?.id,
      otp: otp,
    };
    try {
      const response = await handleFarmerOTP(data, onSuccess, onError);
      if (response.httpCode === "201 CREATED") {
        close();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const changeOTP = (value) => {
    setOTP(value);
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${Colors.white}`,
        fontFamily: `${Fonts.fontStyle1}`,
        overflowY: "scroll",
        height: "100vh",
        marginRight:"-260px"
      }}
    >
      <div
        style={{
          display: "flex",
          paddingLeft: "10px",
          flexDirection: "column",
        }}
      >
        <ActionWrapper isLeft>
          <Button
            startIcon={<ArrowCircleLeftRounded />}
            onClick={goBack}
            color="success"
          >
            Back
          </Button>
        </ActionWrapper>
        <FormHeader>Register Farmer</FormHeader>

        <ButtonWrapper
          style={{
            width: "95%",
            justifyContent: "flex-start",
            margin: "0",
            paddingLeft: "18px",
          }}
        >
          <ActionWrapper>
            {saving ? (
              <Button variant="contained" color="success" size="small">
                ADDING...
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
                  SAVE
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
        </ButtonWrapper>
        <Grid container>
          <Grid item lg={2} sm={4} sx={12}>
            <FieldWrapper>
              <FieldName>NIC Number</FieldName>
              <TextField
                name="nic"
                id="nic"
                value={formData?.nic || ""}
                fullWidth
                onChange={(e) => handleChange(e?.target?.value || "", "nic")}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2} sm={4} sx={12}>
            <FieldWrapper>
              <FieldName>First Name</FieldName>
              <TextField
                name="firstName"
                id="firstName"
                value={formData?.firstName || ""}
                fullWidth
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "firstName")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2} sm={4} sx={12}>
            <FieldWrapper>
              <FieldName>Middle Name</FieldName>
              <TextField
                name="middleName"
                id="middleName"
                value={formData?.middleName || ""}
                fullWidth
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "middleName")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2} sm={4} sx={12}>
            <FieldWrapper>
              <FieldName>Last Name</FieldName>
              <TextField
                name="lastName"
                id="lastName"
                value={formData?.lastName || ""}
                fullWidth
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "lastName")
                }
                sx={{
                  "& .MuiInputBase-root": {
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
                  name="dob"
                  id="dob"
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  onChange={(value) => handleChange(value || "", "dob")}
                />
              </LocalizationProvider>
            </FieldWrapper>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={2} sm={6} sx={12}>
            <FieldWrapper>
              <FieldName>Mobile Number</FieldName>
              <TextField
                name="mobile"
                id="mobile"
                value={formData?.mobile || ""}
                fullWidth
                onChange={(e) => handleChange(e?.target?.value || "", "mobile")}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <FieldWrapper>
              <FieldName>Email</FieldName>
              <TextField
                name="email"
                id="email"
                value={formData?.email || ""}
                fullWidth
                onChange={(e) => handleChange(e?.target?.value || "", "email")}
                sx={{
                  "& .MuiInputBase-root": {
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
              <FieldName>Educational Level</FieldName>
              <TextField
                name="educationalLevel"
                id="educationalLevel"
                value={formData?.educationalLevel || ""}
                fullWidth
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "educationalLevel")
                }
                sx={{
                  "& .MuiInputBase-root": {
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
              <FieldName>Occupation</FieldName>
              <TextField
                name="occupation"
                id="occupation"
                value={formData?.occupation || ""}
                fullWidth
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "occupation")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}></Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <FieldName> Gender</FieldName>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{ gap: "10px" }}
                value={formData?.gender || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "gender")}
              >
                <FormControlLabel
                  value="M"
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
                  label="Male"
                />
                <FormControlLabel
                  value="F"
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
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "11px",
                    },
                  }}
                  value="O"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                  }
                  label="Other"
                />
              </RadioGroup>
            </FieldWrapper>
          </Grid>
          <Grid item>
            <FieldWrapper>
              <FieldName> Preferred Language</FieldName>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{ gap: "10px" }}
                value={formData?.userLanguage || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "userLanguage")
                }
              >
                <FormControlLabel
                  value="SINHALA"
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
                  label="Sinhala"
                />
                <FormControlLabel
                  value="TAMIL"
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
                  label="Tamil"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "11px",
                    },
                  }}
                  value="ENGLISH"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                  }
                  label="English"
                />
              </RadioGroup>
            </FieldWrapper>
          </Grid>
          <Grid item lg={5}>
            <FieldWrapper>
              <FieldName> Ethnicity</FieldName>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{ gap: "10px" }}
                value={formData?.ethnicity || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "ethnicity")
                }
              >
                <FormControlLabel
                  value="SINHALESE"
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
                  label="Sinhalese"
                />
                <FormControlLabel
                  value="SRILANKANTAMIL"
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
                  label="Srilankan Tamil"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "11px",
                    },
                  }}
                  value="SRILANKANMOORS"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                  }
                  label="Srilankan Moors"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "11px",
                    },
                  }}
                  value="INDIANTAMIL"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                  }
                  label="Indian Tamil"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "11px",
                    },
                  }}
                  value="OTHERS"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                  }
                  label="Others"
                />
              </RadioGroup>
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: "15px", mb: "15px", width: "99%" }}>
          <Grid
            container
            sm={6}
            md={6}
            lg={6}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
          >
            <Grid item lg={4} sm={6} sx={12}>
              <FieldWrapper>
                <FieldName>User Name</FieldName>
                <TextField
                  name="username"
                  id="username"
                  value={formData?.username || ""}
                  fullWidth
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "username")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  size="small"
                />
              </FieldWrapper>
            </Grid>
            <Grid item lg={4} sm={6} sx={12}>
              <FieldWrapper>
                <FieldName>Password</FieldName>
                <TextField
                  name="password"
                  id="password"
                  value={formData?.password || ""}
                  fullWidth
                  placeholder="At least 6 characters"
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "password")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  size="small"
                  type="password"
                />
              </FieldWrapper>
            </Grid>
            <Grid item lg={4} sm={6} sx={12}>
              <FieldWrapper>
                <FieldName>Verify Password</FieldName>
                <TextField
                  name="verifyPassword"
                  id="verifyPassword"
                  value={formData?.verifyPassword || ""}
                  fullWidth
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "verifyPassword")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  size="small"
                  type="password"
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: "10px", width: "98%" }}>
          <Grid
            container
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
          >
            <Grid item lg={3} sm={12} sx={12}>
              <FieldWrapper>
                <FieldName>Address 1</FieldName>
                <TextField
                  name="address1"
                  id="address1"
                  value={formData?.address1 || ""}
                  fullWidth
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "address1")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  size="small"
                />
              </FieldWrapper>
            </Grid>
            <Grid item lg={3} sm={12} sx={12}>
              <FieldWrapper>
                <FieldName>Address 2</FieldName>
                <TextField
                  name="address2"
                  id="address2"
                  value={formData?.address2 || ""}
                  fullWidth
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "address2")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  size="small"
                />
              </FieldWrapper>
            </Grid>
            <Grid item lg={2} sm={12} sx={12}>
              <FieldWrapper>
                <FieldName>City</FieldName>
                <TextField
                  name="city"
                  id="city"
                  value={formData?.city || ""}
                  fullWidth
                  onChange={(e) => handleChange(e?.target?.value || "", "city")}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  size="small"
                />
              </FieldWrapper>
            </Grid>
            <Grid item lg={4}></Grid>

            <GnDivisionSelector handleChange={handleChange} />
          </Grid>
        </Grid>

        <OTPDialog
          open={open}
          handleClose={close}
          ConfirmAction={handleOTPSubmit}
          otp={otp}
          changeOTP={changeOTP}
        />
      </div>
    </div>
  );
};

export default Farmer;

export const Wrapper = styled.div`
  display: flex;
  font-family: ${Fonts.fontStyle1};
  flex-direction: row;
  background-color: ${Colors.formBackgroundColor};
  justify-content: space-between;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

export const Contact = styled.p`
  font-size: 20px;
  font-weight: 400;
  font-family: ${Fonts.fontStyle1};
`;

export const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d2d2;
  font-family: ${Fonts.fontStyle1};
  border-radius: 5px;
  margin-top: 13px;
  margin-bottom: 13px;
  padding-left: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 263px;
  height: 58px;
`;

export const Types = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export const Type = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  padding-left: 20px;
`;

export const BranchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding: 20px;
  background-color: #eeecec;
  border: 1px solid #000000;
  border-radius: 13px;
`;

export const BranchForm = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  gap: 40px;
`;
