import React, { useState } from "react";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Grid, TextField } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Divider from "@mui/material/Divider";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useLocation } from "react-router";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";

const Farmer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [open, setOpen] = useState(false);
  const { state } = useLocation();

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
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
                placeholder="Type the First name"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "firstName")
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
              <FieldName>Last Name</FieldName>
              <TextField
                name="lastName"
                id="lastName"
                value={formData?.lastName || ""}
                fullWidth
                placeholder="Type the Last lastName"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "lastName")
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
              <FieldName>NIC Number</FieldName>
              <TextField
                name="nic"
                id="nic"
                value={formData?.nic || ""}
                fullWidth
                placeholder="NIC Number"
                onChange={(e) => handleChange(e?.target?.value || "", "nic")}
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
              <FieldName>Middle Name</FieldName>
              <TextField
                name="middleName"
                id="middleName"
                value={formData?.middleName || ""}
                fullWidth
                placeholder="Type the Middle name"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "middleName")
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
          <Grid item>
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
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  onChange={(e) => handleChange(e?.target?.value || "", "dob")}
                />
              </LocalizationProvider>
            </FieldWrapper>
          </Grid>
          <Grid item>
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
          <Grid item>
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
          <Grid item lg={3}>
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
                onChange={(e) => handleChange(e?.target?.value || "", "city")}
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
          <Grid item lg={2}>
            <FieldWrapper>
              <FieldName>Postal Code</FieldName>
              <TextField
                name="postalCode"
                id="postalCode"
                value={formData?.postalCode || ""}
                fullWidth
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "postalCode")
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
              <FieldName>User Name</FieldName>
              <TextField
                name="userName"
                id="userName"
                value={formData?.userName || ""}
                fullWidth
                placeholder="Enter a user name"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "userName")
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
          <Grid item lg={2}>
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
          <Grid item lg={2}>
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
        </Grid>
        
        

        <Divider style={{ marginTop: "20px" }} />
        <ContactWrapper>
          <Contact>Contact</Contact>
          <AddButton style={{ fontSize: "11px" }} onClick={addContact}>
            ADD CONTACT
          </AddButton>
        </ContactWrapper>
        <ContactForm open={open} onClose={close} />
        <ContactList />
      </div>
    </div>
  );
};

export default Farmer;

export const Wrapper = styled.div`
  display: flex;
  /* padding: 10px 40px; */
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

// export const FieldWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

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
