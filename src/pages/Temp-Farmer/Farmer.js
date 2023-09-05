import React, { useEffect, useState } from "react";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Autocomplete, Grid, TextField } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useLocation } from "react-router";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import BackToList from "../../components/BackToList/BackToList";
import { get_DistrictList } from "../../redux/actions/district/action";

const Farmer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [open, setOpen] = useState(false);
  const { state } = useLocation();
  const [options, setOptions] = useState([]);

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

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
    }
  };

  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      setOptions(dataList);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${Colors.white}`,
        fontFamily: `${Fonts.fontStyle1}`,
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          paddingLeft: "10px",
          flexDirection: "column",
        }}
      >
        <BackToList goBack={goBack} />
        <FormHeader>Register Farmer</FormHeader>
        <ButtonWrapper
          style={{
            width: "95%",
            justifyContent: "flex-start",
            marginTop: "10px",
            paddingLeft: "18px",
          }}
        >
          <AddButton>Save</AddButton>
          <ResetButton onClick={resetForm}>Reset</ResetButton>
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
          <Grid item lg={2} sm={4} sx={12}>
            <FieldWrapper>
              <FieldName>Date of Birth</FieldName>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dob"
                  id="dob"
                  value={formData?.dob || ""}
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    width: "184px",
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  onChange={(e) => handleChange(e?.target?.value || "", "dob")}
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
                name="mobileNumber"
                id="mobileNumber"
                value={formData?.mobileNumber || ""}
                fullWidth
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "mobileNumber")
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
          <Grid item lg={3} sm={6} sx={12}>
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
        </Grid>

        <Grid container>
          <Grid item lg={2} sm={6} sx={12}>
            <FieldWrapper>
              <FieldName>User Name</FieldName>
              <TextField
                name="userName"
                id="userName"
                value={formData?.userName || ""}
                fullWidth
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "userName")
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
          <Grid item lg={2} sm={6} sx={12}>
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
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2} sm={6} sx={12}>
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
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid container>
          <Grid
            item
            sx={{
              border: "1px solid #000000",
              borderRadius: "13px",
              marginX: "15px",
            }}
          >
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
                  label="Male"
                />
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
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "11px",
                    },
                  }}
                  value="OTHER"
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
          <Grid
            item
            sx={{
              border: "1px solid #000000",
              borderRadius: "13px",
            }}
          >
            <FieldWrapper>
              <FieldName> Preferred Language</FieldName>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{ gap: "10px" }}
                value={formData?.nationality || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "nationality")
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
        </Grid>

        <Grid container sx={{ marginTop: "25px", width: "97%" }}>
          <Grid
            container
            lg={6}
            sm={6}
            sx={{
              border: "1px solid #000000",
              borderRadius: "13px",
            }}
          >
            <Grid item lg={4} sm={12} sx={12}>
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
            <Grid item lg={4} sm={12} sx={12}>
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
            <Grid item lg={4} sm={12} sx={12}>
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
            <Grid item lg={6} sm={12} sx={12}>
              <FieldWrapper>
                <FieldName>District</FieldName>
                <Autocomplete
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  options={options}
                  value={formData ? formData.districtDTO : ""}
                  getOptionLabel={(i) => `${i.code} - ${i.name}`}
                  onChange={(event, value) => {
                    handleChange(value, "districtDTO");
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
            <Grid item lg={6} sm={12} sx={12}>
              <FieldWrapper>
                <FieldName>Country</FieldName>
                <TextField
                  name="country"
                  id="country"
                  value={formData?.country || ""}
                  fullWidth
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "country")
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
        </Grid>

        {/* <Divider style={{ marginTop: "20px" }} />
        <ContactWrapper>
          <Contact>Contact</Contact>
          <AddButton style={{ fontSize: "11px" }} onClick={addContact}>
            ADD CONTACT
          </AddButton>
        </ContactWrapper>
        <ContactForm open={open} onClose={close} />
        <ContactList /> */}
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
