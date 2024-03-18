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
import {
  initiateSignUp,
  initiateVerifyOTP,
} from "../../redux/actions/SignUp/action";

const Farmer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  console.log({ formData });
  const [open, setOpen] = useState(false);
  const { state } = useLocation();
  const [options, setOptions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [otp, setOTP] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enableOTP, setEnableOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  console.log({ phoneNumber });

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

      try {
        if (formData?.password.length < 6) {
          onError("Password should be at least 6 characters");
          return;
        }

        if (formData.password === formData.verifyPassword) {
          setPhoneNumber(formData.mobile);
          initiateSignUp(formData, onSuccess, onError).then((response) => {
            console.log({ response });
            if (response?.httpCode === "200 OK") {
              //setFormData(response?.payload);
              setOpen(true);
              setEnableOTP(true);
            }
          });
        } else {
          onError("Verify Password doesn't match");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSuccess = (message) => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: message && message,
    });
    setSaving(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "OTP Successfully Verified",
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
      mobile: phoneNumber,
      otp: otp,
    };
    try {
      const response = await initiateVerifyOTP(data, onSuccess, onError);
      if (response.httpCode === "200 OK") {
        close();
        setEnableOTP(false);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const changeOTP = (value) => {
    setOTP(value);
  };

  useEffect(() => {
    if (open) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [open]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${Colors.white}`,
        fontFamily: `${Fonts.fontStyle1}`,
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          paddingLeft: "10px",
          flexDirection: "column",
          filter: isDialogOpen ? "blur(3px)" : "none", // Blur effect when dialog is open
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
        <ButtonWrapper>
          <Button
            variant="outlined"
            disabled={!enableOTP}
            onClick={() => {
              setOpen(true);
            }}
            size="small"
            color="success"
          >
            open otp dialog
          </Button>
        </ButtonWrapper>
        <Grid container>
          <Grid item lg={2} sm={6} xs={12}>
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
          <Grid item lg={2} sm={4} xs={12}>
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
          <Grid item lg={2} sm={4} xs={12}>
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

          <Grid item lg={2} sm={4} xs={12}>
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
        </Grid>
        <Grid container sx={{ mt: "15px", mb: "15px", width: "99%" }}>
          <Grid
            item
            container
            sm={6}
            md={6}
            lg={6}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
            }}
          >
            <Grid item lg={4} sm={6} xs={12}>
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
            <Grid item lg={4} sm={6} xs={12}>
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
        <Grid container sx={{ mt: "15px", mb: "15px", width: "99%" }}>
          <GnDivisionSelector handleChange={handleChange} />
          <OTPDialog
            open={open}
            handleClose={() => {
              setOpen(false);
            }}
            ConfirmAction={handleOTPSubmit}
            otp={otp}
            changeOTP={changeOTP}
          />
        </Grid>
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
