import React, { useState } from "react";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { FieldName } from "../../components/FormLayout/FieldName";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import Divider from "@mui/material/Divider";
import BranchList from "./BranchList";
import BranchForm from "./BranchForm";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

const Organization = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [open, setOpen] = useState(false);

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

  const addBranch = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
        <FormHeader>Register Your Organization</FormHeader>
        <FormWrapper>
          <FieldWrapper>
            <FieldName>Organization Name</FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              placeholder="Type the organization name"
              onChange={(e) => handleChange(e?.target?.value || "", "name")}
              sx={{
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                  fontSize: "11px",
                },
              }}
            />
          </FieldWrapper>
          <TypeWrapper>
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{
                  "&.MuiFormLabel-root": {
                    color: "#434343",
                    fontSize: "12px",
                    fontWeight: 400,
                  },
                }}
              >
                Organization Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{ gap: "10px" }}
              >
                <FormControlLabel
                  value="COMPANY"
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
                  label="Company"
                />
                <FormControlLabel
                  value="BUSINESS_REGISTRATION"
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
                  label="Business Registration"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "11px",
                    },
                  }}
                  value="FARMER_CO-OPERATIVE"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                  }
                  label="Farmer Co-operative"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "11px",
                    },
                  }}
                  value="FARMER_ORGANIZATION"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 15,
                        },
                      }}
                    />
                  }
                  label="Farmer Organization"
                />
              </RadioGroup>
            </FormControl>
          </TypeWrapper>
          <FieldWrapper>
            <FieldName>Registration Number</FieldName>
            <TextField
              name="registrationNo"
              id="registrationNo"
              value={formData?.registrationNo || ""}
              fullWidth
              onChange={(e) =>
                handleChange(e?.target?.value || "", "registrationNo")
              }
              sx={{
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                  fontSize: "11px",
                },
              }}
            />
          </FieldWrapper>
          <Divider style={{ marginTop: "20px" }} />
          <ContactWrapper>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FieldWrapper>
                <FieldName>Manager Name</FieldName>
                <TextField
                  name="managerName"
                  id="managerName"
                  value={formData?.managerName || ""}
                  fullWidth
                  placeholder="Manager Name"
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "managerName")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                      fontSize: "11px",
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Manager NIC Number</FieldName>
                <TextField
                  name="nic"
                  id="nic"
                  value={formData?.nic || ""}
                  fullWidth
                  placeholder="NIC Number"
                  onChange={(e) => handleChange(e?.target?.value || "", "nic")}
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                      fontSize: "11px",
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FieldName>Phone 1</FieldName>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 15,
                            },
                          }}
                        />
                      }
                    />
                    <FieldName>Primary Contact</FieldName>
                  </div>
                </div>

                <TextField
                  name="phone1"
                  id="phone1"
                  value={formData?.phone1 || ""}
                  fullWidth
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "phone1")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                      fontSize: "11px",
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FieldName>Phone 2</FieldName>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 15,
                            },
                          }}
                        />
                      }
                    />
                    <FieldName>Secondary Contact</FieldName>
                  </div>
                </div>

                <TextField
                  name="phone2"
                  id="phone2"
                  value={formData?.phone2 || ""}
                  fullWidth
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "phone2")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                      fontSize: "11px",
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Email</FieldName>
                <TextField
                  name="email"
                  id="email"
                  value={formData?.email || ""}
                  fullWidth
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "email")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                      fontSize: "11px",
                    },
                  }}
                />
              </FieldWrapper>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                      fontSize: "11px",
                    },
                  }}
                />
              </FieldWrapper>
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
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                      fontSize: "11px",
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>City</FieldName>
                <TextField
                  name="city"
                  id="city"
                  value={formData?.city || ""}
                  fullWidth
                  onChange={(e) => handleChange(e?.target?.value || "", "city")}
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                      fontSize: "11px",
                    },
                  }}
                />
              </FieldWrapper>
            </div>
          </ContactWrapper>
          <ButtonWrapper
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "40px",
            }}
          >
            <AddButton>Save</AddButton>
            <ResetButton>Reset</ResetButton>
          </ButtonWrapper>
          <Divider style={{ marginTop: "20px" }} />
          <BranchAction>
            <Branch>Branches</Branch>
            <AddButton
              style={{ fontSize: "11px", width: "146.42px", height: "27.39px" }}
              onClick={addBranch}
            >
              ADD NEW BRANCH
            </AddButton>
          </BranchAction>
          <BranchForm open={open} onClose={close} />
          <BranchList />
        </FormWrapper>
      </div>
    </Wrapper>
  );
};

export default Organization;

export const Wrapper = styled.div`
  display: flex;
  padding: 10px 40px;
  font-family: ${Fonts.fontStyle1};
  flex-direction: row;
  background-color: ${Colors.formBackgroundColor};
  justify-content: space-between;
`;

export const Branch = styled.p`
  font-size: 20px;
  font-weight: 400;
  font-family: ${Fonts.fontStyle1};
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d2d2;
  border-radius: 5px;
  margin-top: 13px;
  margin-bottom: 13px;
  padding-left: 10px;
  padding-right: 10px;
  width: 545px;
  height: 58px;
  padding-top: 2px;
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
  gap: 80px;
`;

export const BranchAction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  align-items: center;
`;
