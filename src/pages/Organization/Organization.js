import React, { useState } from "react";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Grid, TextField } from "@mui/material";
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
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${Colors.white}`,
        fontFamily: `${Fonts.fontStyle1}`,
        overflowY: "scroll",
        marginRight:"-260px"
      }}
    >
      <ActionWrapper isLeft>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
          Go back to list
        </Button>
      </ActionWrapper>
      <FormHeader>Register Your Organization</FormHeader>
      <ButtonWrapper
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "10px",
          paddingLeft: "18px",
        }}
      >
        <AddButton>Save</AddButton>
        <ResetButton>Reset</ResetButton>
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
        <Grid item sm={3} md={3} lg={3}>
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
        <Grid item sm={5} md={5} lg={5}>
          <FieldWrapper>
            <FieldName>Organization Type</FieldName>
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
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
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
        <Grid item sm={3} md={3} lg={3}>
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
        <Grid item sm={2} md={2} lg={2}>
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Address 1</FieldName>
            <TextField
              name="address1"
              id="address1"
              value={formData?.address1 || ""}
              fullWidth
              onChange={(e) => handleChange(e?.target?.value || "", "address1")}
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Address 2</FieldName>
            <TextField
              name="address2"
              id="address2"
              value={formData?.address2 || ""}
              fullWidth
              onChange={(e) => handleChange(e?.target?.value || "", "address2")}
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
        <Grid item sm={3} md={3} lg={3}>
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
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Primary Contact</FieldName>
            <TextField
              name="phone1"
              id="phone1"
              value={formData?.phone1 || ""}
              fullWidth
              onChange={(e) => handleChange(e?.target?.value || "", "phone1")}
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
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Secondary Contact</FieldName>
            <TextField
              name="phone2"
              id="phone2"
              value={formData?.phone2 || ""}
              fullWidth
              onChange={(e) => handleChange(e?.target?.value || "", "phone2")}
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Email</FieldName>
            <TextField
              name="email"
              id="email"
              value={formData?.email || ""}
              fullWidth
              onChange={(e) => handleChange(e?.target?.value || "", "email")}
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
        {/* <ContactWrapper>
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

            
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>Email</FieldName>
            
          </FieldWrapper>

          <div style={{ display: "flex", flexDirection: "column" }}></div>
        </ContactWrapper> */}
      </Grid>

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
    </div>
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
  padding-left: 18px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// export const FieldWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

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
  gap: 20px;
  align-items: center;
`;
