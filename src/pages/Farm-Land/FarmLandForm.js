import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Box,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  handleFarmLand,
  updateFarmLand,
} from "../../redux/actions/farmLand/action";
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
import { get_DistrictList } from "../../redux/actions/district/action";
import { get_ProvinceList } from "../../redux/actions/province/action";

const FarmLandForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [gn, setGn] = useState([]);
  const [district, setDistrict] = useState([]);
  const [province, setProvince] = useState([]);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/farm-land");
  };

  useEffect(() => {
    get_GnDivisionList().then(({ dataList = [] }) => {
      setGn(dataList);
    });
  }, []);

  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      setDistrict(dataList);
    });
  }, []);

  useEffect(() => {
    get_ProvinceList().then(({ dataList = [] }) => {
      setProvince(dataList);
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
      <div
        style={{
          gap: "30px",
          paddingLeft: "18px",
          display: "flex",
          alignItems: "center",
          paddingTop: "15px",
        }}
      >
        <FieldWrapper>
          <FieldName>Name</FieldName>
          <TextField
            name="code"
            id="code"
            value={formData?.code || ""}
            fullWidth
            disabled={
              state?.action === DEF_ACTIONS.VIEW ||
              state?.action === DEF_ACTIONS.EDIT
            }
            onChange={(e) => handleChange(e?.target?.value || "", "code")}
            sx={{
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
                backgroundColor: `${Colors.white}`,
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <FieldName>Address</FieldName>
            <TextField
              name="code"
              id="code"
              value={formData?.code || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "code")}
              sx={{
                width: "600px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
            />
          </div>
        </FieldWrapper>
      </div>
      <Grid container flexDirection="row">
        <Grid flexDirection="column">
          <Grid
            style={{
              border: "1px solid #D2D2D2",
              borderRadius: "10px",
              margin: "20px",
              backgroundColor: `${Colors.formBackgroundColor}`,
            }}
          >
            <FormWrapper
              style={{ backgroundColor: `${Colors.formBackgroundColor}` }}
            >
              <FieldWrapper>
                <FieldName>Address 01</FieldName>
                <TextField
                  name="address1"
                  id="address1"
                  value={formData?.address1 || ""}
                  fullWidth
                  placeholder="No/Po box"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "address1")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
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
              <FieldWrapper>
                <FieldName>Address 02</FieldName>
                <TextField
                  name="address2"
                  id="address2"
                  value={formData?.address2 || ""}
                  fullWidth
                  placeholder="Street"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "address2")
                  }
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
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
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>
                  Grama Niladari
                  <br /> Division
                </FieldName>
                <Autocomplete
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  options={gn}
                  value={formData ? formData.gnDivisionDTO : ""}
                  getOptionLabel={(i) => `${i.code} - ${i.name}`}
                  onChange={(event, value) => {
                    handleChange(value, "gnDivisionDTO");
                  }}
                  sx={{
                    width: "264px",
                    "& .MuiOutlinedInput-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>District</FieldName>
                <Autocomplete
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  options={district}
                  value={formData ? formData.districtDTO : ""}
                  getOptionLabel={(i) => `${i.code} - ${i.name}`}
                  onChange={(event, value) => {
                    handleChange(value, "districtDTO");
                  }}
                  sx={{
                    width: "264px",
                    "& .MuiOutlinedInput-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Province</FieldName>
                <Autocomplete
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  options={province}
                  value={formData ? formData.provinceDTO : ""}
                  getOptionLabel={(i) => `${i.code} - ${i.name}`}
                  onChange={(event, value) => {
                    handleChange(value, "provinceDTO");
                  }}
                  sx={{
                    width: "264px",
                    "& .MuiOutlinedInput-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </FieldWrapper>
            </FormWrapper>
          </Grid>
          <Grid
            style={{
              border: "1px solid #D2D2D2",
              borderRadius: "10px",
              margin: "20px",
              backgroundColor: `${Colors.formBackgroundColor}`,
            }}
          >
            <FormWrapper
              style={{ backgroundColor: `${Colors.formBackgroundColor}` }}
            >
              <FieldWrapper>
                <FieldName>Soil Depth</FieldName>
                <div style={{ gap: "5px", display: "flex" }}>
                  <TextField
                    name="soilDepth"
                    id="soilDepth"
                    value={formData?.soilDepth || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "soilDepth")
                    }
                    sx={{
                      width: "185px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />

                  <FormControl>
                    <Select
                      value={formData?.soilTexture || ""}
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      onChange={(e) =>
                        handleChange(e?.target?.value || "", "soilTexture")
                      }
                      sx={{
                        width: "75px",
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      }}
                      size="small"
                    >
                      <MenuItem value={""}></MenuItem>
                      <MenuItem value={""}></MenuItem>
                      <MenuItem value={""}></MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>PH</FieldName>
                <TextField
                  name="PH"
                  id="PH"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={formData?.PH || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "PH")}
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Nutrient Level</FieldName>
                <TextField
                  name="PH"
                  id="PH"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={formData?.PH || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "PH")}
                  sx={{
                    width: "264px",
                    "& .MuiInputBase-root": {
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </FormWrapper>
          </Grid>
        </Grid>
        <Grid
          style={{
            border: "1px solid #D2D2D2",
            borderRadius: "10px",
            margin: "20px",
            backgroundColor: `${Colors.formBackgroundColor}`,
          }}
        >
          <FormWrapper
            style={{ backgroundColor: `${Colors.formBackgroundColor}` }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FieldName>Legal Description</FieldName>
              <FormControl>
                <Select
                  value={formData?.soilTexture || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "soilTexture")
                  }
                  sx={{
                    width: "640px",
                    height: "30px",
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                >
                  <MenuItem value={"RENT "}>RENT</MenuItem>
                  <MenuItem value={"LEASE"}>LEASE</MenuItem>
                  <MenuItem value={"OWNED"}>OWNED</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ display: "flex" }}>
              <FormWrapper
                style={{
                  backgroundColor: `${Colors.formBackgroundColor}`,
                  padding: "0px",
                  marginRight: "30px",
                }}
              >
                <FieldWrapper>
                  <FieldName>Latitude</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Acres</FieldName>
                  <div style={{ gap: "5px", display: "flex" }}>
                    <TextField
                      name="soilDepth"
                      id="soilDepth"
                      value={formData?.soilDepth || ""}
                      fullWidth
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      onChange={(e) =>
                        handleChange(e?.target?.value || "", "soilDepth")
                      }
                      sx={{
                        width: "185px",
                        "& .MuiInputBase-root": {
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                    />

                    <FormControl>
                      <Select
                        value={formData?.soilTexture || ""}
                        disabled={state?.action === DEF_ACTIONS.VIEW}
                        onChange={(e) =>
                          handleChange(e?.target?.value || "", "soilTexture")
                        }
                        sx={{
                          width: "75px",
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        }}
                        size="small"
                      >
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={""}></MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Soil Type</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Rainfall</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Land Use</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Climate</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Current Crop</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Irrigation System</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Fertilizer Type</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
              </FormWrapper>
              <FormWrapper
                style={{
                  backgroundColor: `${Colors.formBackgroundColor}`,
                  padding: "0px",
                }}
              >
                <FieldWrapper>
                  <FieldName>Longitude</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Elevation</FieldName>
                  <div style={{ gap: "5px", display: "flex" }}>
                    <TextField
                      name="soilDepth"
                      id="soilDepth"
                      value={formData?.soilDepth || ""}
                      fullWidth
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      onChange={(e) =>
                        handleChange(e?.target?.value || "", "soilDepth")
                      }
                      sx={{
                        width: "185px",
                        "& .MuiInputBase-root": {
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                    />

                    <FormControl>
                      <Select
                        value={formData?.soilTexture || ""}
                        disabled={state?.action === DEF_ACTIONS.VIEW}
                        onChange={(e) =>
                          handleChange(e?.target?.value || "", "soilTexture")
                        }
                        sx={{
                          width: "75px",
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        }}
                        size="small"
                      >
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={""}></MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Fertility</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Slope</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Area</FieldName>
                  <div style={{ gap: "5px", display: "flex" }}>
                    <TextField
                      name="soilDepth"
                      id="soilDepth"
                      value={formData?.soilDepth || ""}
                      fullWidth
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      onChange={(e) =>
                        handleChange(e?.target?.value || "", "soilDepth")
                      }
                      sx={{
                        width: "185px",
                        "& .MuiInputBase-root": {
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                    />

                    <FormControl>
                      <Select
                        value={formData?.soilTexture || ""}
                        disabled={state?.action === DEF_ACTIONS.VIEW}
                        onChange={(e) =>
                          handleChange(e?.target?.value || "", "soilTexture")
                        }
                        sx={{
                          width: "75px",
                          height: "30px",
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        }}
                        size="small"
                      >
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={""}></MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Crop History</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Irrigation Type</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Tillage Type</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <FieldName>Pesticide Type</FieldName>
                  <TextField
                    name="city"
                    id="city"
                    value={formData?.city || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "city")
                    }
                    sx={{
                      width: "264px",
                      "& .MuiInputBase-root": {
                        height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
              </FormWrapper>
            </div>
          </FormWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FarmLandForm;
