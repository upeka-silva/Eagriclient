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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const Farmer = () => {
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
          <div style={{ display: "flex", flexDirection: "column" }}>
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
              <FieldName>NIC Number</FieldName>
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
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
              <FieldName>Organization Name</FieldName>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FieldWrapper>
          </div>
        </FormWrapper>
        <FormWrapper>
          <TypeWrapper>
            <FieldName>Gender</FieldName>
            <Types>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Male</FieldName>
              </Type>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Female</FieldName>
              </Type>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Other</FieldName>
              </Type>
            </Types>
          </TypeWrapper>
          <TypeWrapper>
            <FieldName>Preferred Language</FieldName>
            <Types>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Sinhala</FieldName>
              </Type>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>Tamil</FieldName>
              </Type>
              <Type>
                <FormControlLabel control={<Radio />} />
                <FieldName>English</FieldName>
              </Type>
            </Types>
          </TypeWrapper>
        </FormWrapper>
        <FormWrapper>
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
          <div>
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
        </FormWrapper>
        <hr />
        <FieldWrapper>
          <FieldName>User Name</FieldName>
          <TextField
            name="userName"
            id="userName"
            value={formData?.userName || ""}
            fullWidth
            placeholder="Enter a user name"
            onChange={(e) => handleChange(e?.target?.value || "", "userName")}
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
        <div style={{ display: "flex", flexDirection: "row", gap: "40px" }}>
          <FieldWrapper>
            <FieldName>Password</FieldName>
            <TextField
              name="password"
              id="password"
              value={formData?.password || ""}
              fullWidth
              placeholder="At least 6 characters"
              onChange={(e) => handleChange(e?.target?.value || "", "password")}
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
        <ButtonWrapper style={{display: "flex", justifyContent: "flex-start"}}>
        <AddButton>Save</AddButton>
        <ResetButton>Reset</ResetButton>
      </ButtonWrapper>
      </div>
     
    </Wrapper>
  );
};

export default Farmer;

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
  flex-direction: row;
  gap: 40px;
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
  width: 263px;
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
