import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormHeader } from "../../components/FormLayout/FormHeader";
// import { FieldWrapper } from "./Organization";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Button, Grid, TextField } from "@mui/material";
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
import { handleFarmerBusinessBranch } from "../../redux/actions/temp-farmer-business/action";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { DEF_ACTIONS } from "../../utils/constants/permission";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BranchForm = ({
  open = false,
  onClose = () => {},
  id,
  handleBranchFormSubmit,
  action,
  data,
}) => {
  console.log(data)
  const [formData, setFormData] = useState(data);
  const { state } = useLocation();
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const enableSave = () => {
    if (JSON.stringify(formData)) {
      return true;
    }
    return false;
  };

  const handleFormSubmit = async () => {
    handleBranchFormSubmit(id, formData);
  };

  const resetForm = () => {
    setFormData({});
  };

  useEffect(() => {
    setFormData(data);
    console.log(data)
  }, []);

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <BranchWrapper>
        <FormHeader>{action == DEF_ACTIONS.ADD ? "Add" :""} Branch</FormHeader>
        <ButtonWrapper
          style={{
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: "18px",
          }}
        >
        {action !== DEF_ACTIONS.VIEW &&  <Button
            variant="outlined"
            disabled={!enableSave()}
            onClick={handleFormSubmit}
            size="small"
            color="success"
          >
            Save
          </Button>}
          {action !== DEF_ACTIONS.VIEW && <Button
            color="success"
            variant="contained"
            size="small"
            onClick={resetForm}
          >
            Reset
          </Button>}

          <Button
            color="success"
            variant="contained"
            size="small"
            onClick={onClose}
          >
            Cancel
          </Button>
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
              <FieldName>Branch Name</FieldName>
              <TextField
                name="branchName"
                id="branchName"
                value={formData?.branchName || ""}
                disabled={action == DEF_ACTIONS.VIEW}
                fullWidth
                placeholder="Branch Name"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "branchName")
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Branch Registration Number</FieldName>
              <TextField
                name="regNo"
                id="regNo"
                value={formData?.regNo || ""}
                disabled={action == DEF_ACTIONS.VIEW}
                fullWidth
                placeholder="Reg No"
                onChange={(e) => handleChange(e?.target?.value || "", "regNo")}
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Manager Name</FieldName>
              <TextField
                name="managerName"
                id="managerName"
                value={formData?.managerName || ""}
                disabled={action == DEF_ACTIONS.VIEW}
                fullWidth
                placeholder="Manager Name"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "managerName")
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Manager NIC Number</FieldName>
              <TextField
                name="managerNic"
                id="managerNic"
                value={formData?.managerNic || ""}
                fullWidth
                disabled={action == DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "managerNic")
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Address 1</FieldName>
              <TextField
                name="address1"
                id="address1"
                value={formData?.address1 || ""}
                fullWidth
                disabled={action == DEF_ACTIONS.VIEW}
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Address 2</FieldName>
              <TextField
                name="address2"
                id="address2"
                value={formData?.address2 || ""}
                fullWidth
                disabled={action == DEF_ACTIONS.VIEW}
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>City</FieldName>
              <TextField
                name="city"
                id="city"
                value={formData?.city || ""}
                fullWidth
                disabled={action == DEF_ACTIONS.VIEW}
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Primary Contact</FieldName>
              <TextField
                name="contactNo"
                id="contactNo"
                value={formData?.contactNo || ""}
                fullWidth
                disabled={action == DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "contactNo")
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Secondary Contact</FieldName>
              <TextField
                name="contactNo2"
                id="contactNo2"
                value={formData?.contactNo2 || ""}
                fullWidth
                disabled={action == DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "contactNo2")
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Email</FieldName>
              <TextField
                name="email"
                id="email"
                value={formData?.email || ""}
                fullWidth
                disabled={action == DEF_ACTIONS.VIEW}
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
