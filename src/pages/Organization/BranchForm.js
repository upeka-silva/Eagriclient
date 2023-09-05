import React, { useState } from "react";
import styled from "styled-components";
import { FormHeader } from "../../components/FormLayout/FormHeader";
// import { FieldWrapper } from "./Organization";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Grid, TextField } from "@mui/material";
import { useLocation } from "react-router";
import { Colors } from "../../utils/constants/Colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { Fonts } from "../../utils/constants/Fonts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BranchForm = ({ open = false, onClose = () => {} }) => {
  const [formData, setFormData] = useState([]);
  const { state } = useLocation();
  const [saving, setSaving] = useState(false);

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <BranchWrapper>
        <FormHeader>Add New Branch</FormHeader>
        <ButtonWrapper
          style={{
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: "18px",
          }}
        >
          <AddButton>SAVE</AddButton>
          <ResetButton>RESET</ResetButton>
          <ResetButton onClick={onClose}>CANCEL</ResetButton>
        </ButtonWrapper>

        <Grid
          container
          sx={{
            border: "1px solid #bec0c2",
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
            paddingTop: "10px",
          }}
        >
          <Grid item sm={6} md={6} lg={6}>
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Manager NIC Number</FieldName>
              <TextField
                name="nic"
                id="nic"
                value={formData?.nic || ""}
                fullWidth
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
          <Grid item sm={6} md={6} lg={6}>
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
          <Grid item sm={6} md={6} lg={6}>
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
          <Grid item sm={6} md={6} lg={6}>
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
          <Grid item sm={6} md={6} lg={6}>
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
          <Grid item sm={6} md={6} lg={6}>
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
          <Grid item sm={6} md={6} lg={6}>
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
        </Grid>
      </BranchWrapper>
    </Dialog>
  );
};

export default BranchForm;

export const BranchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: ${Fonts.fontStyle1};
`;

export const BranchFormWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  /* gap: 40px; */
`;
