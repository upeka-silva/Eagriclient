import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  handleFarmLand,
  updateFarmLand,
} from "../../redux/actions/farmLand/action";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PathName } from "../../components/FormLayout/PathName";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { get_GnDivisionList } from "../../redux/actions/gnDivision/action";
import { get_SoilType } from "../../redux/actions/soil/soilType/action";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";

const FarmLandForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [gn, setGn] = useState([]);
  const [soilType, setSoilType] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [protectedHouseType, setProtectedHouseType] = useState(true);

  const { addSnackBar } = useSnackBars();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const goBack = () => {
    navigate("/farm-land");
  };

  useEffect(() => {
    get_GnDivisionList().then(({ dataList = [] }) => {
      setGn(dataList);
    });
  }, []);

  useEffect(() => {
    get_SoilType()
      .then(({ dataList = [] }) => {
        setSoilType(dataList);
      })
      .catch(() => {
        setSoilType([]);
      });
  }, []);

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
      Object.keys(formData || {}).length > 0
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
      try {
        if (formData?.id) {
          await updateFarmLand(formData, onSuccess, onError);
        } else {
          await handleFarmLand(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPathName = () => {
    return location.pathname === "/" || !location.pathname
      ? ""
      : location.pathname;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${Colors.formBackgroundColor}`,
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop:'10px',
        height:'100vh',
        overflowY:'scroll'
      }}
    >
      <div style={{ padding: "0px 18px" }}>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
        <PathName>{getPathName()}</PathName>
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} FARM LAND
        </FormHeader>
      </div>

      <TabContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ButtonWrapper
          style={{
            width: "95%",
            justifyContent: "flex-start",
            margin: "0",
            paddingLeft: "18px",
          }}
        >
          {state?.action !== DEF_ACTIONS.VIEW && (
            <ActionWrapper>
              {saving ? (
                <AddButton variant="contained" disabled>
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </AddButton>
              ) : (
                <>
                  <AddButton
                    variant="contained"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                  >
                    {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
                  </AddButton>
                  <ResetButton onClick={resetForm}>RESET</ResetButton>
                </>
              )}
            </ActionWrapper>
          )}
        </ButtonWrapper>
        <Grid container flexDirection="row">
          <Grid flexDirection="column">
            <Grid
              style={{
                // border: "1px solid #D2D2D2",
                // borderRadius: "10px",
                margin: "20px",
                backgroundColor: `${Colors.formBackgroundColor}`,
              }}
            >
              <FormWrapper
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                  flexWrap: "wrap",
                  maxWidth: "70vw",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Land Name
                  </FieldName>
                  <TextField
                    name="landName"
                    id="landName"
                    value={formData?.landName || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "landName")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                  }}
                >
                  <FormControl fullWidth>
                    <FieldName
                      style={{
                        width: "100%",
                      }}
                    >
                      Protected House Type
                    </FieldName>
                    <Select
                      name="protectedHouse"
                      id="protectedHouse"
                      value={formData?.protectedHouse || ""}
                      disabled={
                        protectedHouseType || state?.action === DEF_ACTIONS.VIEW
                      }
                      onChange={(e) =>
                        handleChange(e?.target?.value || "", "protectedHouse")
                      }
                      fullWidth
                      sx={{
                        // width: "264px",
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      }}
                      size="small"
                    >
                      <MenuItem value={"Test 1"}>Test 1</MenuItem>
                      <MenuItem value={"Test 2"}>Test 2</MenuItem>
                    </Select>
                  </FormControl>
                </FieldWrapper>
                <FieldWrapper
                  style={{ flexDirection: "column", flex: "1 1 264px" }}
                >
                  <FormControl fullWidth>
                    <FieldName
                      style={{
                        width: "100%",
                      }}
                    >
                      Land Type
                    </FieldName>
                    <Select
                      name="landType"
                      id="landType"
                      value={formData?.landType || ""}
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      onChange={(e) =>
                        // handleChange(e?.target?.value || "", "landType")
                        e?.target?.value === "Protected House"
                          ? (setProtectedHouseType(false),
                            handleChange(e?.target?.value || "", "landType"))
                          : e?.target?.value === "Open Field"
                          ? (setProtectedHouseType(true),
                            handleChange(e?.target?.value || "", "landType"))
                          : handleChange(e?.target?.value || "", "landType")
                      }
                      fullWidth
                      sx={{
                        // width: "264px",
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      }}
                      size="small"
                    >
                      <MenuItem value={"Open Field"}>Open Field</MenuItem>
                      <MenuItem value={"Protected House"}>
                        Protected House
                      </MenuItem>
                    </Select>
                  </FormControl>
                </FieldWrapper>
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Address Line 01
                  </FieldName>
                  <TextField
                    name="addressLine01"
                    id="addressLine01"
                    value={formData?.addressLine01 || ""}
                    placeholder="No/Po box"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "addressLine01")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                      "& ::placeholder": {
                        fontSize: 11,
                        fontWeight: 400,
                        color: `${Colors.iconColor}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Address Line 02
                  </FieldName>
                  <TextField
                    name="addressLine02"
                    id="addressLine02"
                    value={formData?.addressLine02 || ""}
                    placeholder="Street"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "addressLine02")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                      "& ::placeholder": {
                        fontSize: 11,
                        fontWeight: 400,
                        color: `${Colors.iconColor}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    City
                  </FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  style={{ flexDirection: "column", flex: "1 1 264px" }}
                >
                  <FormControl fullWidth>
                    <FieldName
                      style={{
                        width: "100%",
                      }}
                    >
                      GN Division
                    </FieldName>
                    <Autocomplete
                      name="gnDivisionDTO"
                      id="gnDivisionDTO"
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      options={gn}
                      value={formData ? formData.gnDivisionDTO : ""}
                      getOptionLabel={(i) => `${i.code} - ${i.name}`}
                      onChange={(event, value) => {
                        handleChange(value, "gnDivisionDTO");
                      }}
                      fullWidth
                      sx={{
                        // width: "264px",
                        "& .MuiOutlinedInput-root": {
                          // height: "30px",
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
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Latitude
                  </FieldName>
                  <TextField
                    name="latitude"
                    id="latitude"
                    value={formData?.latitude || ""}
                    type="number"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "latitude")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Longitude
                  </FieldName>
                  <TextField
                    name="longitude"
                    id="longitude"
                    value={formData?.longitude || ""}
                    type="number"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "longitude")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Elevation
                  </FieldName>
                  <TextField
                    name="elevation"
                    id="elevation"
                    value={formData?.elevation || ""}
                    type="number"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "elevation")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  style={{ flexDirection: "column", flex: "1 1 264px" }}
                >
                  <FormControl fullWidth>
                    <FieldName
                      style={{
                        width: "100%",
                      }}
                    >
                      Soil Type
                    </FieldName>

                    <Autocomplete
                      name="soilTypeDTO"
                      id="soilTypeDTO"
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      options={soilType}
                      value={formData ? formData.soilTypeDTO : ""}
                      getOptionLabel={(i) =>
                        `${i.soilTypeCode} - ${i.description}`
                      }
                      onChange={(event, value) => {
                        handleChange(value, "soilTypeDTO");
                      }}
                      fullWidth
                      sx={{
                        // width: 264,
                        "& .MuiOutlinedInput-root": {
                          // height: "30px",
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </FormControl>
                </FieldWrapper>
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Area
                  </FieldName>
                  <TextField
                    name="area"
                    id="area"
                    value={formData?.area || ""}
                    type="number"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "area")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  style={{ flexDirection: "column", flex: "1 1 264px" }}
                >
                  <FormControl fullWidth>
                    <FieldName
                      style={{
                        width: "100%",
                      }}
                    >
                      Status
                    </FieldName>
                    <Select
                      name="status"
                      id="status"
                      value={formData?.status || ""}
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      onChange={(e) =>
                        handleChange(e?.target?.value || "", "status")
                      }
                      fullWidth
                      sx={{
                        // width: "264px",
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      }}
                      size="small"
                    >
                      <MenuItem value={"VERIFIED"}>Verified</MenuItem>
                      <MenuItem value={"NOTVERIFIED"}>Not Verified</MenuItem>
                    </Select>
                  </FormControl>
                </FieldWrapper>
              </FormWrapper>
            </Grid>
          </Grid>
        </Grid>
      </TabContent>

      <TabWrapper style={{ margin: "40px 0px" }}>
        <TabButton
          className={toggleState === 1 ? "active-tabs" : ""}
          onClick={() => toggleTab(1)}
        >
          Farm Land Ownership
        </TabButton>
        <TabButton
          className={toggleState === 2 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
        >
          Soil Type Per Land
        </TabButton>
      </TabWrapper>

      <TabContent className={toggleState === 1 ? "active-content" : ""}>
        <ButtonWrapper
          style={{
            width: "95%",
            justifyContent: "flex-start",
            margin: "0",
            paddingLeft: "18px",
          }}
        >
          {state?.action !== DEF_ACTIONS.VIEW && (
            <ActionWrapper>
              {saving ? (
                <AddButton variant="contained" disabled>
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </AddButton>
              ) : (
                <>
                  <AddButton
                    variant="contained"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                  >
                    {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
                  </AddButton>
                  <ResetButton onClick={resetForm}>RESET</ResetButton>
                </>
              )}
            </ActionWrapper>
          )}
        </ButtonWrapper>
        <Grid container flexDirection="row">
          <Grid item container flexDirection="column" xs="auto">
            <Grid
              item
              style={{
                // border: "1px solid #D2D2D2",
                // borderRadius: "10px",
                // margin: "20px",
                backgroundColor: `${Colors.formBackgroundColor}`,
              }}
            >
              <FormWrapper
                style={{
                  flexDirection: "row",
                  gap: "12px",
                  flexWrap: "wrap",
                  maxWidth: "70vw",
                }}
              >
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Test 1
                  </FieldName>
                  <TextField
                    name="landName"
                    id="landName"
                    value={formData?.landName || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "landName")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
              </FormWrapper>
            </Grid>
          </Grid>
        </Grid>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ borderRadius: "0px", marginTop: "40px" }}
          hideFooterSelectedRowCount
        />
      </TabContent>

      <TabContent className={toggleState === 2 ? "active-content" : ""}>
        <ButtonWrapper
          style={{
            width: "95%",
            justifyContent: "flex-start",
            margin: "0",
            paddingLeft: "18px",
          }}
        >
          {state?.action !== DEF_ACTIONS.VIEW && (
            <ActionWrapper>
              {saving ? (
                <AddButton variant="contained" disabled>
                  {state?.action === DEF_ACTIONS.ADD
                    ? "ADDING..."
                    : "UPDATING..."}
                </AddButton>
              ) : (
                <>
                  <AddButton
                    variant="contained"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                  >
                    {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
                  </AddButton>
                  <ResetButton onClick={resetForm}>RESET</ResetButton>
                </>
              )}
            </ActionWrapper>
          )}
        </ButtonWrapper>
        <Grid container flexDirection="row">
          <Grid item container flexDirection="column" xs="auto">
            <Grid
              item
              style={{
                // border: "1px solid #D2D2D2",
                // borderRadius: "10px",
                // margin: "20px",
                backgroundColor: `${Colors.formBackgroundColor}`,
              }}
            >
              <FormWrapper
                style={{
                  flexDirection: "row",
                  gap: "12px",
                  flexWrap: "wrap",
                  maxWidth: "70vw",
                }}
              >
                <FieldWrapper
                  style={{
                    flexDirection: "column",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Test 2
                  </FieldName>
                  <TextField
                    name="landName"
                    id="landName"
                    value={formData?.landName || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "landName")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
              </FormWrapper>
            </Grid>
          </Grid>
        </Grid>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ borderRadius: "0px", marginTop: "40px" }}
          hideFooterSelectedRowCount
        />
      </TabContent>
    </div>
  );
};

export default FarmLandForm;

export const TabWrapper = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  padding: 15px;
  text-align: center;
  width: 100%;
  background: ${Colors.iconColor};
  cursor: pointer;
  position: relative;
  border: none;

  &:not(:last-child) {
    border-right: 2px solid white;
  }

  &.active-tabs {
    background: white;
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
    background: #1976d2;
  }
`;

export const TabContent = styled.div`
  display: none;

  &.active-content {
    display: flex;
    flex-direction: column;
  }
`;
