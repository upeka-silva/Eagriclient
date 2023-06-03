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
import Divider from '@mui/material/Divider';

const Organization = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

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
            <FieldName>Organization Type</FieldName>
            <Types>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Company</FieldName>
              </Type>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Business Registraion</FieldName>
              </Type>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Farmer Co-operative</FieldName>
              </Type>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Farmer Organization</FieldName>
              </Type>
            </Types>
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
          <Divider style={{marginTop: "20px"}} />
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
                    <FormControlLabel control={<Radio />} />
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
                    <FormControlLabel control={<Radio />} />
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
        </FormWrapper>
      </div>
      <BranchWrapper>
        <FormHeader>Add New Branch</FormHeader>
        <BranchForm>
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
                  <FormControlLabel control={<Radio />} />
                  <FieldName>Primary Contact</FieldName>
                </div>
              </div>

              <TextField
                name="phone1"
                id="phone1"
                value={formData?.phone1 || ""}
                fullWidth
                onChange={(e) => handleChange(e?.target?.value || "", "phone1")}
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
                  <FormControlLabel control={<Radio />} />
                  <FieldName>Secondary Contact</FieldName>
                </div>
              </div>

              <TextField
                name="phone2"
                id="phone2"
                value={formData?.phone2 || ""}
                fullWidth
                onChange={(e) => handleChange(e?.target?.value || "", "phone2")}
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
                onChange={(e) => handleChange(e?.target?.value || "", "email")}
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
        </BranchForm>
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
      </BranchWrapper>
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
  height: 75px;
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
