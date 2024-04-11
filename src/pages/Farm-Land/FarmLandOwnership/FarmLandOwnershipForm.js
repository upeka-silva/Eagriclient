import {
  Autocomplete,
  Button,
  Dialog,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";
import { get_FarmerList } from "../../../redux/actions/farmer/action";
import {
  handleFarmLandOwnership,
  updateFarmLandOwnership,
} from "../../../redux/actions/farmerLandOwnership/action";
import { get_GnDivisionListWithoutPage } from "../../../redux/actions/gnDivision/action";
import { Colors } from "../../../utils/constants/Colors";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { handleProjectActivity, updateProjectActivity } from "../../../redux/actions/extension/agricultureProject/ProjectActivity/action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FarmLandOwnershipForm({
  open = false,
  onClose = () => {},
  action,
  farmLandData,
  data,
  loading,
  stopLoading,
  onChange,
  resetData,
  refresh,
  setOpenFlO
}) {
  const { addSnackBar } = useSnackBars();
  const [formData, setFormData] = useState(data);
  const [gnDivisionList, setGnDivisionList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [farmerList, setFarmerList] = useState([]);

  const enableSave = () => {
    if (action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(data || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (action === DEF_ACTIONS.ADD && Object.keys(data || {}).length > 0) {
      return true;
    }
    return false;
  };

  const resetForm = () => {
    if (action === DEF_ACTIONS.EDIT) {
      setFormData(data || {});
    } else {
      setFormData({});
    }
  };
  const handleFormSubmit = async () => {
    setSaving(true);
    let dateFrom = new Date(data.dateFrom);
    let dateUntil = new Date(data.dateUntil);
    try {
      if (farmLandData?.id && data?.id) {
        await updateProjectActivity(
          {
            ...data,
            dateFrom: dateFrom.valueOf() || null,
            dateUntil: dateUntil.valueOf() || null,
            farmLandDTO: farmLandData,
          },

          onSuccess,
          onError
        );
        refresh();
      }
      if (farmLandData?.id) {
        console.log("handleFarmLandOwnership");
        await handleProjectActivity(
          {
            ...data,
            dateFrom: dateFrom.valueOf() || null,
            dateUntil: dateUntil.valueOf() || null,
            farmLandDTO: farmLandData,
          },
          onSuccess,
          onError
        );
        refresh();
      }
      setSaving(false);
      setOpenFlO(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  useEffect(() => {
    get_GnDivisionListWithoutPage().then(({ dataList = [] }) => {
      setGnDivisionList(dataList);
    });
  }, []);

  useEffect(() => {
    get_FarmerList().then(({ dataList = [] }) => {
      setFarmerList(dataList);
    });
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        maxWidth={"md"}
      >
        <FormWrapper>
          <FormHeader style={{ marginLeft: "15px" }}>
            {action === DEF_ACTIONS.ADD ? "Add" : ""} Farm Land Ownership
          </FormHeader>

          <ButtonWrapper
            isCeneter
            style={{
              width: "95%",
              justifyContent: "flex-start",
              margin: "0",
              paddingLeft: "18px",
            }}
          >
            {action !== DEF_ACTIONS.VIEW && (
              <ActionWrapper>
                {saving ? (
                  <Button variant="contained" color="success" size="small">
                    {action === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
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
                      {action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
                    </Button>
                    <Button
                      onClick={resetData}
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
            )}
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
              borderRadius: "5px",
              margin: "15px",
              width: "97%",
            }}
          >
            <Grid item sm={6} md={4} lg={4}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>Owner Type</FieldName>
                  <Select
                    name="ownerType"
                    id="ownerType"
                    value={data?.ownerType || ""}
                    disabled={action === DEF_ACTIONS.VIEW}
                    onChange={(e) => {
                      onChange(e?.target?.value || "", "ownerType");
                      onChange(null, "farmerDTO");
                    }}
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    }}
                    size="small"
                  >
                    <MenuItem value={"FARMER"}>Farmer</MenuItem>
                    <MenuItem value={"OTHER"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </FieldWrapper>
            </Grid>

            {
               data?.ownerType === "OTHER" ? null : (
                <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FormControl fullWidth>
                    <FieldName>Select Farmer</FieldName>
                    <Autocomplete
                      name="farmerDTO"
                      id="farmerDTO"
                      disabled={
                        action === DEF_ACTIONS.VIEW || data?.ownerType === "OTHER"
                      }
                      disableClearable
                      options={farmerList}
                      value={data?.ownerType ? data.farmerDTO : ""}
                      getOptionLabel={(i) =>
                        i ?  `${i.farmerId} - ${i.firstName} ${" "}${i.lastName}` : " "
                      }
                      onChange={(event, value) => {
                        onChange(value, "farmerDTO");
                      }}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                      size="small"
                      renderInput={(params) => (
                        <>
                          <TextField {...params} size="small" />
                        </>
                      )}
                    />
                  </FormControl>
                </FieldWrapper>
                </Grid>
               )
            }
           
            {
              data?.ownerType === "FARMER" ? null : (
                <Grid item sm={6} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>Address Line 01</FieldName>
                  <TextField
                    name="address1"
                    id="address1"
                    value={data?.address1 || ""}
                    disabled={
                      action === DEF_ACTIONS.VIEW || data?.ownerType === "FARMER"
                    }
                    onChange={(e) => onChange(e?.target?.value || "", "address1")}
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
              </Grid>
              )
            }
           
           {
              data?.ownerType === "FARMER" ? null : (
                <Grid item sm={6} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>Address Line 02</FieldName>
                  <TextField
                    name="address2"
                    id="address2"
                    value={data?.address2 || ""}
                    disabled={
                      action === DEF_ACTIONS.VIEW || data?.ownerType === "FARMER"
                    }
                    onChange={(e) => onChange(e?.target?.value || "", "address2")}
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                </Grid>
              )
           }

           {
              data?.ownerType === "FARMER" ? null : (
                <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>City</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={data?.city || ""}
                    disabled={
                      action === DEF_ACTIONS.VIEW || data?.ownerType === "FARMER"
                    }
                    onChange={(e) => onChange(e?.target?.value || "", "city")}
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                </Grid>
              )
           }
            
           {
              data?.ownerType === "FARMER" ? null : (
                <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FormControl fullWidth>
                    <FieldName>GN Division</FieldName>
                    <Autocomplete
                      name="gnDivisionDTO"
                      id="gnDivisionDTO"
                      disabled={
                        action === DEF_ACTIONS.VIEW || data?.ownerType === "FARMER"
                      }
                      options={gnDivisionList}
                      value={data?.ownerType ? data.gnDivisionDTO : ""}
                      getOptionLabel={(i) => i ? `${i.code} - ${i.name}` : ""}
                      onChange={(event, value) => {
                        onChange(value, "gnDivisionDTO");
                      }}
                      disableClearable
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                      size="small"
                      renderInput={(params) => (
                        <>
                          <TextField {...params} size="small" />
                        </>
                      )}
                    />
                  </FormControl>
                </FieldWrapper>
                </Grid>
              )
           }
           
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Date From</FieldName>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={data?.dateFrom || null}
                    onChange={(value) => {
                      onChange(value || "", "dateFrom");
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                    slotProps={{ textField: { size: "small", error: false } }}
                    in="DD-MM-YYYY"
                    disabled={action === DEF_ACTIONS.VIEW}
                  />
                </LocalizationProvider>
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Date Until</FieldName>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(value) => {
                      onChange(value || "", "dateUntil");
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                    value={data?.dateUntil  || null}
                    slotProps={{ textField: { size: "small", error: false } }}
                    in="DD-MM-YYYY"
                    name="dob"
                    id="dob"
                    disabled={action === DEF_ACTIONS.VIEW}
                  />
                </LocalizationProvider>
              </FieldWrapper>
            </Grid>
          </Grid>
        </FormWrapper>
      </Dialog>
    </div>
  );
}
