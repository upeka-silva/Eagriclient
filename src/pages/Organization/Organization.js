import React, { useState } from "react";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { FieldName } from "../../components/FormLayout/FieldName";
import {
  ButtonGroup,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
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
import {
  Add,
  ArrowCircleLeftRounded,
  Delete,
  Edit,
  Vrpano,
} from "@mui/icons-material";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  deleteFarmerBusinessBranch,
  handleFarmerBusiness,
  handleFarmerBusinessBranch,
  updateFarmerBusinessBranch,
} from "../../redux/actions/temp-farmer-business/action";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DialogBox from "../../components/PageLayout/DialogBox";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../utils/constants/apiMessages";

const Organization = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [branchData, setBranchData] = useState({});
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState();

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };
  const handleChangeBranchData = (value, target) => {
    setBranchData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const goBack = () => {
    navigate("/login");
  };

  const addBranch = () => {
    setAction(DEF_ACTIONS.ADD);
    setBranchData({});
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  const enableSave = () => {
    if (JSON.stringify(formData) && JSON.stringify(branchData)) {
      return true;
    }

    return false;
  };

  const resetForm = () => {
    setFormData();
    setBranchData();
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);

      try {
        const response = await handleFarmerBusiness(formData, onError);
        if (response.httpCode === "201 CREATED") {
          setFormData(response?.payload);
          await handleFarmerBusinessBranch(
            response?.payload?.id,
            branchData,
            onSuccess,
            onError
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBranchFormSubmit = async (id, formData) => {
    try {
      setLoading(true);
      if (action == DEF_ACTIONS.EDIT) {
        await updateFarmerBusinessBranch(id, formData, onSuccess, onError);
      } else {
        await handleFarmerBusinessBranch(id, formData, onSuccess, onError);
      }

      setLoading(false);
      close();
    } catch (error) {
      console.log(error);
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
      message: message || defaultMessages.apiErrorUnknown,
    });
    setSaving(false);
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Deleted",
    });
    setSaving(false);
  };

  const toggleBranchSelect = (component) => {
    setSelectedBranch((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };

  const selectAllBranch = (all = []) => {
    setSelectedBranch(all);
  };

  const resetSelectedBranch = () => {
    setSelectedBranch([]);
  };

  const onDelete = () => {
    setOpenDelete(true);
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const branch of selectedBranch) {
        await deleteFarmerBusinessBranch(
          formData?.id,
          branch?.id,
          onSuccessDelete,
          onError
        );
      }
      setLoading(false);
      close();
      resetSelectedBranch();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedBranch.map((p, key) => {
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {p.code} - {p.name}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    setBranchData(selectedBranch[0]);
    setOpen(true);
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    setBranchData(selectedBranch[0]);
    setOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${Colors.white}`,
        fontFamily: `${Fonts.fontStyle1}`,
        overflowY: "scroll",
        marginRight: "-260px",
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
      <FormHeader>Register Your Organization</FormHeader>

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
              name="businessName"
              id="businessName"
              value={formData?.businessName || ""}
              fullWidth
              placeholder="Type the organization name"
              onChange={(e) =>
                handleChange(e?.target?.value || "", "businessName")
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
        <Grid item sm={5} md={5} lg={5}>
          <FieldWrapper>
            <FieldName>Organization Type</FieldName>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              style={{ gap: "10px" }}
              value={formData?.businessType || ""}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "businessType")
              }
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
        <Grid item sm={3} md={3} lg={2}>
          <FieldWrapper>
            <FieldName>Registration Number</FieldName>
            <TextField
              name="businessRegNo"
              id="businessRegNo"
              value={formData?.businessRegNo || ""}
              fullWidth
              onChange={(e) =>
                handleChange(e?.target?.value || "", "businessRegNo")
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Branch Name</FieldName>
            <TextField
              name="branchName"
              id="branchName"
              value={branchData?.branchName || ""}
              fullWidth
              placeholder="Branch Name"
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "branchName")
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
        <Grid item sm={3} md={3} lg={2}>
          <FieldWrapper>
            <FieldName>Branch Registration Number</FieldName>
            <TextField
              name="regNo"
              id="regNo"
              value={branchData?.regNo || ""}
              fullWidth
              placeholder="Reg No"
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "regNo")
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Manager Name</FieldName>
            <TextField
              name="managerName"
              id="managerName"
              value={branchData?.managerName || ""}
              fullWidth
              placeholder="Manager Name"
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "managerName")
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
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Manager NIC Number</FieldName>
            <TextField
              name="managerNic"
              id="managerNic"
              value={branchData?.managerNic || ""}
              fullWidth
              placeholder="NIC Number"
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "managerNic")
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
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Primary Contact</FieldName>
            <TextField
              name="contactNo"
              id="contactNo"
              value={branchData?.contactNo || ""}
              fullWidth
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "contactNo")
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
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Secondary Contact</FieldName>
            <TextField
              name="contactNo2"
              id="contactNo2"
              value={branchData?.contactNo2 || ""}
              fullWidth
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "contactNo2")
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Address 1</FieldName>
            <TextField
              name="address1"
              id="address1"
              value={branchData?.address1 || ""}
              fullWidth
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "address1")
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Address 2</FieldName>
            <TextField
              name="address2"
              id="address2"
              value={branchData?.address2 || ""}
              fullWidth
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "address2")
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>City</FieldName>
            <TextField
              name="city"
              id="city"
              value={branchData?.city || ""}
              fullWidth
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "city")
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

        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Email</FieldName>
            <TextField
              name="email"
              id="email"
              value={branchData?.email || ""}
              fullWidth
              onChange={(e) =>
                handleChangeBranchData(e?.target?.value || "", "email")
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

      <Divider style={{ marginTop: "20px" }} />
      <BranchAction>
        <Branch>Branches</Branch>

        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <Button onClick={addBranch}>
            <Add />
            {DEF_ACTIONS.ADD}
          </Button>
          {selectedBranch.length === 1 && (
            <Button onClick={onEdit}>
              <Edit />
              {DEF_ACTIONS.EDIT}
            </Button>
          )}
          {selectedBranch.length === 1 && (
            <Button onClick={onView}>
              <Vrpano />
              {DEF_ACTIONS.VIEW}
            </Button>
          )}
          {selectedBranch.length > 0 && (
            <Button onClick={onDelete}>
              <Delete />
              {DEF_ACTIONS.DELETE}
            </Button>
          )}
        </ButtonGroup>
      </BranchAction>
      {open == true && (
        <BranchForm
          open={open}
          onClose={close}
          id={formData?.id}
          handleBranchFormSubmit={handleBranchFormSubmit}
          action={action}
          data={branchData}
        />
      )}
      {loading == false && (
        <BranchList
          id={formData?.id}
          selectedRows={selectedBranch}
          onRowSelect={toggleBranchSelect}
          selectAll={selectAllBranch}
          unSelectAll={resetSelectedBranch}
        />
      )}
      <DialogBox
        open={openDelete}
        title="Delete Branch"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ ml: "8px" }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ ml: "8px" }}
            >
              Close
            </Button>
          </ActionWrapper>
        }
      >
        <>
          <DeleteMsg />
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
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
