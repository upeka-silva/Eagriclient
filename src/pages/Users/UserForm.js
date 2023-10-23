import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  FormControl,
  Grid,
  Autocomplete,
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Select,
} from "@mui/material";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../context/SnackBarContext";
import data from "../../dropdown/drodwnlist";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import {
  handleUserProfile,
  handleUsers,
  updateUsers,
} from "../../redux/actions/users/action";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RoleSelection from "./RoleSelection";
import { get } from "../../services/api/index";
import AdministrativeDivisionSelectFilter from "../../components/FilterTypeFilter/AdministrativeDivisionSelectFilter";
import DialogBox from "../../components/PageLayout/DialogBox";
import BackToList from "../../components/BackToList/BackToList";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import { PhotoCamera } from "@mui/icons-material";

const UsersForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const { addSnackBar } = useSnackBars();
  const dateAdapter = new AdapterDayjs();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ id: state?.target?.id });
  const [saving, setSaving] = useState(false);
  const [selectRoles, setSelectRoles] = useState([]);
  const [selectServices, setSelectServices] = useState([]);
  const [val, setVal] = useState(null);
  const goBack = () => {
    navigate("/users");
  };
  const [parentLinks, setParentLinks] = useState([]);
  const [parentFilter, setParentFilter] = useState(null);
  const [originalPath, setOriginalPath] = useState(null);
  const [view, setView] = useState(false);
  const [isview, setIsview] = useState(false);
  const [message, setMessage] = useState("");
  const [toggleState, setToggleState] = useState(1);
  const [dataListTemplates, setDataListTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userTypes, setUserTypes] = useState([]);

  const [selectedImage, setSelectedImage] = useState(
    state?.target?.profilePictureUrl || null
  );

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedAdminDivType, setSelectedAdminDivType] = useState("");
  const [selectedAdminDiv, setSelectedAdminDiv] = useState(null);
  const [selectedAdminDivOpt, setSelectedAdminDivOpt] = useState(null);
  const [selectedAdminDivOjbects, setSelectedAdminDivObjects] = useState([]);
  const [isAdminDivDialogOpen, setAdminDivDialogOpen] = useState(false);

  const [form, setForm] = useState();
  const handleRolesChange = (roleId) => {
    console.log(roleId);
    // Toggle the selected state of the role
    const updatedRoles = selectedRoles.some(
      (role) => role?.roleDTO?.id === roleId
    )
      ? selectedRoles.filter(
          (selectedRole) => selectedRole?.roleDTO?.id !== roleId
        )
      : [...selectedRoles, { roleDTO: { id: roleId } }];

    setSelectedRoles(updatedRoles);
  };

  useEffect(() => {
    const fetchRoles = async (path, page = 0, size = 10) => {
      try {
        const { totalElements, httpCode, payloadDto } = await get(
          `${path}?page=${page}&size=1000&sort=asc&sort`,
          true
        );
        setRoles(payloadDto);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoles("app-settings/roles");

    const fetchUserTypes = async (path, page = 0, size = 10) => {
      try {
        const { totalElements, httpCode, payloadDto } = await get(
          `${path}?page=${page}&size=1000&sort=asc&sort`,
          true
        );
        setUserTypes(payloadDto);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserTypes("user-types");

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      const fetchUser = async (path, id) => {
        setLoading(true);
        try {
          const { payload } = await get(`${path}/${id}`, true);
          const dob = payload?.dateOfBirth
            ? dateAdapter.date(payload?.dateOfBirth)
            : null;
          payload.dateOfBirth = dob;
          setFormData(payload);
          const roles = payload?.userRoleDTOs.map((userRole) => ({
            roleDTO: userRole?.roleDTO,
          }));
          setSelectedRoles(roles);
          setLoading(false);
          if (state.action === DEF_ACTIONS.EDIT) {
            mapAdministrativeDivStatus(payload?.administrativeDivisionDTO);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser("user", formData?.id);
    }
  }, []);

  const getSelectedFilterType = (value) => {
    setDataListTemplates([...dataListTemplates, value]);
    setMessage(value?.id);
  };

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
      setSelectedImage(null);
    }
  };

  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (
      state?.action === DEF_ACTIONS.ADD &&
      Object.keys(formData || {}).length > 1
    ) {
      return true;
    }

    return false;
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
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

 

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);
      let dob = new Date(formData.dateOfBirth);
      try {
        if (form && state?.action === DEF_ACTIONS.ADD) {
          console.log("save");
          const response = await handleUsers(
            {
              ...formData,
              dateOfBirth: dob.valueOf() || null,
              userRoleDTOs: selectedRoles,
              administrativeDivisionDTO: {
                administrativeDivisionType: selectedAdminDivType,
                values: selectedAdminDivOjbects?.map((obj) => ({
                  divisionId: obj.id,
                  name: obj.name,
                })),
              },
            },
            onSuccess,
            onError
          );
          setFormData(response.payload);
          console.log(response);
          const res = await handleUserProfilePicture(response.payload?.id);
          console.log(res);
          if ((res.httpCode = "200 OK")) {
            const storedFileName = res.payload.storedFileName;
            const originalFileName = res.payload.originalFileName;
            const prsignedUrl = res.payload.presignedUrl;
            const presignedExpDate = res.payload.expireDate;

            await updateUsers(
              {
                ...formData,
                id: response.payload?.id,
                dateOfBirth: dob.valueOf() || null,
                storedFileName: storedFileName,
                originalFileName: originalFileName,
                profilePictureUrl: prsignedUrl,
                presignedExpDate: presignedExpDate,
                userRoleDTOs: selectedRoles,
                administrativeDivisionDTO: {
                  administrativeDivisionType: selectedAdminDivType,
                  values: selectedAdminDivOjbects?.map((obj) => ({
                    divisionId: obj.id,
                    name: obj.name,
                  })),
                },
              },
              onSuccess,
              onError
            );
          }
          return;
        }
        if (form && state?.action === DEF_ACTIONS.EDIT) {
          const res = await handleUserProfilePicture(formData?.id);
          console.log("update");
          if ((res.httpCode = "200 OK")) {
            const storedFileName = res.payload.storedFileName;
            const originalFileName = res.payload.originalFileName;
            const prsignedUrl = res.payload.presignedUrl;
            const presignedExpDate = res.payload.expireDate;

            await updateUsers(
              {
                ...formData,
                dateOfBirth: dob.valueOf() || null,
                profilePictureUrl: prsignedUrl,
                originalFileName: originalFileName,
                storedFileName: storedFileName,
                presignedExpDate: presignedExpDate,
              },
              onSuccess,
              onError
            );
          }
          return;
        }
        if (formData?.id && state?.action === DEF_ACTIONS.EDIT) {
          await updateUsers(
            {
              ...formData,
              dateOfBirth: dob.valueOf() || null,
            },
            onSuccess,
            onError
          );
        } else {
          const response = await handleUsers(
            {
              ...formData,
              dateOfBirth: dob.valueOf() || null,
              userRoleDTOs: selectedRoles,
              administrativeDivisionDTO: {
                administrativeDivisionType: selectedAdminDivType,
                values: selectedAdminDivOjbects?.map((obj) => ({
                  divisionId: obj.id,
                  name: obj.name,
                })),
              },
            },
            onSuccess,
            onError
          );
          setFormData(response.payload);
          console.log(response);
        }
        setSaving(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const form = new FormData();
    form.append("file", file);
    setForm(form);
  };

  const handleUserProfilePicture = async (id) => {
    try {
      const response = await handleUserProfile(
        id,
        form,
        onSuccess("Success"),
        onError
      );

      return response;
      
    } catch (error) {
      console.log(error);
    }
  };

  // In update action set administrative state values
  const mapAdministrativeDivStatus = (existigValue) => {
    setSelectedAdminDivType(existigValue?.administrativeDivisionType);
    setSelectedAdminDivObjects(
      existigValue?.values?.map((value) => ({
        id: value?.divisionId,
        name: value?.name,
      }))
    );
  };

  // This will close the dialog
  const closeAdminDivDialog = () => {
    setSelectedAdminDiv(null);
    setAdminDivDialogOpen(false);
  };

  const getPathName = () => {
    return location.pathname === "/" || !location.pathname
      ? ""
      : location.pathname;
  };

  const toggleRolesSelect = (component) => {
    setSelectRoles((current = []) => {
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

  const selectAllRoles = (all = []) => {
    setSelectRoles(all);
  };

  const resetSelectedRoles = () => {
    setSelectRoles([]);
  };

  const handleAdvanceDataChange = (value) => {
    setOriginalPath(value);
    const curFilter = data[value];
    setParentFilter(curFilter);
    setParentLinks(curFilter.links);
    setView(!view);
    setIsview(true);
    setVal(value);
  };

  // Handle administrative division select
  const handleAdministrativeDivTypeSelect = (key) => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setAdminDivDialogOpen(true);
    }
    console.log("key --------->");
    console.log(key);
    setSelectedAdminDiv(data[key]?.child);
    setSelectedAdminDivType(data[key]?.type);
    setSelectedAdminDivOpt({ value: key, label: data[key]?.displayName });
  };

  const handleAdministrativeValueSelect = (selectedValues) => {
    console.log("parent final administrtive values --------->");
    console.log(selectedValues);

    setSelectedAdminDivObjects(selectedValues);
  };

  const toggleServicesSelect = (component) => {
    setSelectServices((current = []) => {
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
  const reset = () => {
    setVal(null);
    setParentFilter(null);

    setView(!view);
  };
  const selectAllServices = (all = []) => {
    setSelectServices(all);
  };

  const resetSelectedServices = () => {
    setSelectServices([]);
  };
  return (
    <>
      <FormWrapper style={{ overflowY: "scroll" }}>
        <BackToList goBack={goBack} />
        <CustFormHeader saving={saving} state={state} formName="New User" />
        <FormButtonGroup
          state={state}
          DEF_ACTIONS={DEF_ACTIONS}
          saving={saving}
          enableSave={enableSave}
          handleFormSubmit={handleFormSubmit}
          resetForm={resetForm}
        />
        <Grid
          container
          sx={{
            
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
          flex={"flex"}
        >
          <Grid item sm={3} md={3} lg={2} sx={{}}>
            <FieldWrapper>
              <FieldName>Select Profile Picture</FieldName>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="profile-picture-input"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ position: "relative" }}
                >
                  <label
                    htmlFor="profile-picture-input"
                    style={{
                      width: "140px",
                      height: "140px",
                      border: "1px solid #7a879d",
                      borderRadius: "70px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton component="span" style={{ zIndex: "2" }}>
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  {selectedImage && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        backgroundColor: "rgb(46,125,50,0.1)",
                        width: "140px",
                        height: "140px",
                        borderRadius: "70px",
                      }}
                    >
                      <img
                        src={selectedImage}
                        alt="Profile"
                        style={{
                          width: "140px",
                          height: "140px",
                          borderRadius: "70px",
                        }}
                      />
                    </div>
                  )}
                </Box>
              </div>
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={9}>
            <Grid
              container
              sx={{
                
                width: "100%",
                borderRadius: "5px",
              }}
            >
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>First name</FieldName>
                  <TextField
                    name="firstName"
                    id="firstName"
                    value={formData?.firstName || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "firstName")
                    }
                    sx={{
                      
                      "& .MuiInputBase-root": {
                       
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>Last name</FieldName>
                  <TextField
                    name="lastName"
                    id="lastName"
                    value={formData?.lastName || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "lastName")
                    }
                    sx={{
                     
                      "& .MuiInputBase-root": {
                     
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              
              <Grid item lg={3}>
                <FieldWrapper>
                  <FieldName>Date of Birth</FieldName>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="dob"
                      id="dob"
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      slotProps={{ textField: { size: "small" } }}
                      value={formData?.dateOfBirth || ""}
                      onChange={(newValue) =>
                        handleChange(newValue || "", "dateOfBirth")
                      }
                      in="DD-MM-YYYY"
                      sx={{
                      
                        "& .MuiInputBase-root": {
                       
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FieldWrapper>
              </Grid>

              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>Email</FieldName>
                  <TextField
                    name="email"
                    id="email"
                    value={formData?.email || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "email")
                    }
                    sx={{
                     
                      "& .MuiInputBase-root": {
                       
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={3} md={3} lg={3}>
                <FieldWrapper>
                  <FieldName>Password</FieldName>
                  <TextField
                    type="password"
                    name="password"
                    id="password"
                    value={formData?.password || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "password")
                    }
                    sx={{
                      
                      "& .MuiInputBase-root": {
                       
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={3} md={3} lg={3}>
                <FieldWrapper>
                  <FieldName>Verify password</FieldName>
                  <TextField
                    type="password"
                    name="matchingPassword"
                    id="matchingPassword"
                    value={formData?.matchingPassword || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "matchingPassword")
                    }
                    sx={{
                      
                      "& .MuiInputBase-root": {
                       
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={3} md={3} lg={2}>
            <FieldWrapper>
              <FieldName>Gender</FieldName>
              <Select
                name="gender"
                id="gender"
                value={formData?.gender || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "gender")}
                sx={{
                  borderRadius: "8px",
                }}
                size="small"
                fullWidth
              >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
                <MenuItem value={"O"}>Other</MenuItem>
              </Select>
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={2}>
            <FieldWrapper>
              <FieldName>Language</FieldName>
              <Select
                name="userLanguage"
                id="userLanguage"
                value={formData?.userLanguage || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "userLanguage")
                }
                sx={{
                  borderRadius: "8px",
                }}
                size="small"
                fullWidth
              >
                <MenuItem value={"SINHALA"}>Sinhala</MenuItem>
                <MenuItem value={"TAMIL"}>Tamil</MenuItem>
                <MenuItem value={"ENGLISH"}>English</MenuItem>
              </Select>
            </FieldWrapper>
          </Grid>
          <Grid item sm={4} md={4} lg={3}>
            <FieldWrapper>
              <FormControl fullWidth>
                <FieldName>User Type</FieldName>
                <Autocomplete
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  options={userTypes}
                  value={formData ? formData.userTypeDTO : ""}
                  getOptionLabel={(i) => `${i.userTypeId} - ${i.description}`}
                  onChange={(event, value) => {
                    handleChange(value, "userTypeDTO");
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </FormControl>
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          sx={{ marginTop: "15px", width: "97%", marginLeft: "15px" }}
        >
          <Grid item lg={12} sm={12} xs={12}>
            <hr></hr>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{ margin: "15px", width: "97%", borderRadius: "5px" }}
        >
          <Grid item lg={3} sm={3} xs={3}>
            <FieldWrapper>
              <FieldName>Address 1</FieldName>
              <TextField
                name="address1"
                id="address1"
                value={formData?.address1 || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "address1")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3} sm={3} xs={3}>
            <FieldWrapper>
              <FieldName>Address 2</FieldName>
              <TextField
                name="address2"
                id="address2"
                value={formData?.address2 || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "address2")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3} sm={3} xs={3}>
            <FieldWrapper>
              <FieldName>City</FieldName>
              <TextField
                name="city"
                id="city"
                value={formData?.city || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "city")}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>

          <Grid item lg={3} sm={3} xs={3}>
            <FieldWrapper>
              <FieldName>Phone No</FieldName>
              <TextField
                name="phone"
                id="phone"
                value={formData?.phone || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "phone")}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={12}>
            <TabWrapper>
              <TabButton
                variant="contained"
                className={toggleState === 1 ? "active-tabs" : ""}
                onClick={() => toggleTab(1)}
              >
                Roles
              </TabButton>
              
              <TabButton
                variant="contained"
                className={toggleState === 3 ? "active-tabs" : ""}
                onClick={() => toggleTab(3)}
              >
                Filter Type
              </TabButton>
            </TabWrapper>
            <TabContent className={toggleState === 1 ? "active-content" : ""}>
              <Grid
                container
                sx={{
                  margin: "15px",
                  width: "97%",
                  borderRadius: "5px",
                }}
              >
                <Grid item lg={12} sx={{ margin: "15px" }}>
                  <RoleSelection
                    roles={roles}
                    selectedRoles={selectedRoles}
                    onRolesChange={handleRolesChange}
                    action={state?.action}
                  />
                </Grid>
              </Grid>
            </TabContent>
            
            <TabContent className={toggleState === 3 ? "active-content" : ""}>
              <Grid
                container
                spacing={2}
                sx={{
                  margin: "15px",
                  width: "97%",
                  borderRadius: "5px",
                  // border: "1px solid #bec0c2",
                }}
              >
                {state?.action !== DEF_ACTIONS.VIEW ? (
                  <Grid item lg={3}>
                    <FieldWrapper>
                      <FieldName>Select Adminstrative Division Type</FieldName>
                      <Autocomplete
                        id="dropdown"
                        options={Object.keys(data).map((key) => ({
                          value: key,
                          label: data[key]?.displayName,
                        }))}
                        //getOptionLabel={(option) => option.label}
                        onChange={(event, selectedOption) =>
                          handleAdministrativeDivTypeSelect(
                            selectedOption?.value
                          )
                        }
                        value={selectedAdminDivOpt || "Choose an option"}
                        isSearchable
                        renderInput={(params) => <TextField {...params} />}
                        sx={{
                          borderRadius: "8px",
                          "& .MuiInputBase-root": {
                            backgroundColor: "transparent", // Set the background color to transparent
                          },
                        }}
                        size="small"
                        fullWidth
                      />
                    </FieldWrapper>
                  </Grid>
                ) : null}
                {selectedAdminDiv != null ? (
                  <AdministrativeDivisionSelectFilter
                    selectedOption={selectedAdminDiv}
                    onAdministrativeValueSelect={
                      handleAdministrativeValueSelect
                    }
                  />
                ) : null}

                {!loading ? (
                  <Grid item lg={3}>
                    {formData?.administrativeDivisionDTO &&
                      state.action != DEF_ACTIONS.ADD && (
                        <>
                          <Typography variant="h6" gutterBottom>
                            {formData.administrativeDivisionDTO?.type}
                          </Typography>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Division Id</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {formData.administrativeDivisionDTO?.values?.map(
                                  (row, index) => (
                                    <TableRow key={row.name}>
                                      <TableCell>{row.name}</TableCell>
                                      <TableCell>{row.divisionId}</TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      )}
                  </Grid>
                ) : (
                  <CircularProgress />
                )}
              </Grid>
            </TabContent>
          </Grid>
        </Grid>
        <DialogBox
          open={isAdminDivDialogOpen}
          title={`Please Confirm`}
          actions={
            <ActionWrapper>
              <Button
                variant="contained"
                color="info"
                onClick={() => setAdminDivDialogOpen(false)}
                sx={{ ml: "8px" }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={closeAdminDivDialog}
                sx={{ ml: "8px" }}
              >
                Close
              </Button>
            </ActionWrapper>
          }
        >
          <Typography>
          This will replace your existing filter type with the newly added filter type
          </Typography>
        </DialogBox>
      </FormWrapper>
    </>
  );
};

export default UsersForm;

export const TabWrapper = styled(Stack)`
  && {
    flex-direction: row;
    margin: 20px 0px;
  }
`;

export const TabButton = styled(Button)`
  && {
    padding: 15px;
    width: 200px;
    position: relative;
    border: none;
    border-radius: 0px;
    background-color: ${Colors.tableHeaderColor};
    color: white;
    line-height: 0px;
    box-shadow: none;
    cursor: pointer;
    &:hover {
      background-color: ${Colors.iconColor};
      box-shadow: none;
    }
    &:not(:last-child) {
      border-right: 2px solid white;
    }
    &.active-tabs {
      background: white;
      color: black;
    }

    &.active-tabs::before {
      content: "";
      display: block;
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 5px;
      background: ${Colors.tableHeaderColor};
    }
  }
`;

export const TabContent = styled(Stack)`
  && {
    display: none;
  }
  &.active-content {
    display: flex;
  }
`;
