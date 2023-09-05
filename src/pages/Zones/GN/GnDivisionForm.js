import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  handleGnDivision,
  updateGnDivision,
} from "../../../redux/actions/gnDivision/action";
import { Colors } from "../../../utils/constants/Colors";
import { Fonts } from "../../../utils/constants/Fonts";

import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { PathName } from "../../../components/FormLayout/PathName";

import {
  ActionWrapper,
  makeCapitalize,
} from "../../../components/PageLayout/ActionWrapper";
// import { get_mahaweliBlockList } from "../../../redux/actions/mahaweliSystem/mahaweliBlock/action";
import {
  get_DistrictList,
  get_DistrictListByProvinceId,
} from "../../../redux/actions/district/action";
import { get_agroEcoList } from "../../../redux/actions/agroEco/action";

import { get_AiRegionList } from "../../../redux/actions/aiRegion/action";
import { get_arpaList } from "../../../redux/actions/arpa/action";
import {
  get_DsDivisionList,
  get_DsDivisionListByDistrictId,
} from "../../../redux/actions/dsDivision/action";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";
import { get_MahaweliUnitList } from "../../../redux/actions/mahaweliUnit/action";
import { get_ProvinceList } from "../../../redux/actions/province/action";

const GnDivisionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [mahaweliUnitList, setMahaweliUnitList] = useState([]);
  const [dsDivisionList, setDsDivisionList] = useState([]);
  const [agroEcoList, setAgroEcoList] = useState([]);

  const [aiRegionList, setAiRegionList] = useState([]);
  const [arpaList, setArpaList] = useState([]);
  const [dsOptions, setDsOptions] = useState([]);
  const [districs, setDistrics] = useState([]);
  const [dsDivisions, setDsDivisions] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState({
    name: "",
    code: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: "",
    code: "",
  });
  const [selectedDsDevision, setSelectedDsDevision] = useState({
    name: "",
    code: "",
  });

  const [doaType, setDoaType] = useState("");

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/ga-structure/gn-division");
  };

  useEffect(() => {
    get_MahaweliUnitList().then(({ dataList = [] }) => {
      setMahaweliUnitList(dataList);
    });
  }, []);

  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      setDsDivisionList(dataList);
    });
  }, []);

  useEffect(() => {
    get_agroEcoList().then(({ dataList = [] }) => {
      setAgroEcoList(dataList);
    });
  }, []);

  useEffect(() => {
    get_AiRegionList().then(({ dataList = [] }) => {
      setAiRegionList(dataList);
    });
  }, []);

  useEffect(() => {
    get_arpaList().then(({ dataList = [] }) => {
      setArpaList(dataList);
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
          await updateGnDivision(formData, onSuccess, onError);
        } else {
          console.log(formData);
          // await handleGnDivision(formData, onSuccess, onError);
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

  useEffect(() => {
    // get_DsDivisionList().then(({ dataList = [] }) => {
    //   setDsOptions(dataList);
    // });
    get_ProvinceList().then(({ dataList = [] }) => {
      console.log(dataList);
      setProvinces(dataList);
    });
  }, []);

  const getDistricts = (id) => {
    get_DistrictListByProvinceId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDistrics(dataList);
    });
  };
  const getDsDivisions = (id) => {
    get_DsDivisionListByDistrictId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDsDivisions(dataList);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // backgroundColor: `${Colors.formBackgroundColor}`,
        fontFamily: `${Fonts.fontStyle1}`,
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <div>
        <ActionWrapper isLeft>
          <Button
            startIcon={<ArrowCircleLeftRounded />}
            onClick={goBack}
            color="success"
          >
            Go back to list
          </Button>
        </ActionWrapper>
        {/* <PathName>{getPathName()}</PathName> */}
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {makeCapitalize(state?.action)} Grama Niladari Division
        </FormHeader>
      </div>
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
              <Button variant="contained" color="success" size="small">
                {state?.action === DEF_ACTIONS.ADD
                  ? "ADDING..."
                  : "UPDATING..."}
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
                  {/* {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />} */}
                  {state?.action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
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
        )}
      </ButtonWrapper>
      <Grid
        container
        sx={{
          // border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Division ID</FieldName>
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
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Division Name</FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "name")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Select Province</FieldName>
            <Autocomplete
              // disabled={state?.action === DEF_ACTIONS.VIEW}
              options={provinces}
              value={selectedProvince}
              getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedProvince(value);
                setSelectedDistrict({ name: "", code: "" });
                setSelectedDsDevision({ name: "", code: "" });
                getDistricts(value.id);
              }}
              fullWidth
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                marginRight: "5px",
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>Select District</FieldName>
            <Autocomplete
              disabled={selectedProvince?.id == null}
              options={districs}
              value={selectedDistrict}
              getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedDistrict(value);
                setSelectedDsDevision({ name: "", code: "" });
                getDsDivisions(value.id);
              }}
              fullWidth
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                marginRight: "5px",
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>Select Ds Devision</FieldName>
            <Autocomplete
              disabled={selectedDistrict?.id == null}
              options={dsDivisions}
              value={formData.dsDivisionDTO || selectedDsDevision}
              getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedDsDevision(value);
                handleChange(value || "", "dsDivisionDTO");
              }}
              fullWidth
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                marginRight: "5px",
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
            />
          </FieldWrapper>
        </Grid>

        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Type Of DOA Structure</FieldName>
            <Select
              name="doaType"
              id="doaType"
              value={doaType}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => setDoaType(e.target.value)}
              fullWidth
              sx={{
                borderRadius: "8px",
              }}
              size="small"
            >
              <MenuItem value={"PROVINCIAL"}> PROVINCIAL</MenuItem>
              <MenuItem value={"INTER_PROVINCIAL"}>INTER_PROVINCIAL</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
        <Grid item lg={4}></Grid>
        <Grid item lg={4}></Grid>

        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>AEZ</FieldName>
            <TextField
              name="agroEcologicalZoneId"
              id="agroEcologicalZoneId"
              value={formData?.agroEcologicalZoneId || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "agroEcologicalZoneId")
              }
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Mahaweli Unit</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={mahaweliUnitList}
              value={formData ? formData.mahaweliUnitDTO : ""}
              getOptionLabel={(i) => `${i.unitId} - ${i.description}`}
              onChange={(event, value) => {
                handleChange(value, "mahaweliUnitDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>AI Region</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={aiRegionList}
              value={formData ? formData.aiRegionDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "aiRegionDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>ARPA Area</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={arpaList}
              value={formData ? formData.arpaList : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "arpaDTO");
              }}
              sx={{
                // width: "264px",
                "& .MuiOutlinedInput-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Total Households</FieldName>
            <TextField
              name="totalHouseholds"
              id="totalHouseholds"
              value={formData?.totalHouseholds || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "totalHouseholds")
              }
              InputProps={{
                inputProps: { min: 0 },
              }}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Total Population</FieldName>
            <TextField
              name="totalPopulation"
              id="totalPopulation"
              value={formData?.totalPopulation || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "totalPopulation")
              }
              InputProps={{
                inputProps: { min: 0 },
              }}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Male Population</FieldName>
            <TextField
              name="malePopulation"
              id="malePopulation"
              value={formData?.malePopulation || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "malePopulation")
              }
              InputProps={{
                inputProps: { min: 0 },
              }}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Female Population</FieldName>
            <TextField
              name="femalePopulation"
              id="femalePopulation"
              value={formData?.femalePopulation || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "femalePopulation")
              }
              InputProps={{
                inputProps: { min: 0 },
              }}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
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
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Select measurement type</FieldName>

            <Select
              value={formData?.mahaweliSystem || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "landArea")}
              sx={{
                // width: "264px",
                // height: "30px",
                borderRadius: "8px",
                // backgroundColor: `${Colors.white}`,
              }}
              size="small"
              fullWidth
            >
              <MenuItem value={"SQUARE_METERS"}>Square meters</MenuItem>
              <MenuItem value={"ACRES"}>Acres</MenuItem>
              <MenuItem value={"HECTARES"}>Hectares</MenuItem>
              <MenuItem value={"PERCH"}>Perch</MenuItem>
              <MenuItem value={"SQUARE_FEET"}>Square feet</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Mahaweli System</FieldName>
            <TextField
              name="landArea"
              id="landArea"
              value={formData?.landArea || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "mahaweliSystem")
              }
              InputProps={{
                inputProps: { min: 0 },
              }}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                  // backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Agriculture Land Area</FieldName>
            <Grid container>
              <Grid item sm={6} md={6} lg={6}>
                <TextField
                  name="agriculturalLandArea"
                  id="agriculturalLandArea"
                  value={formData?.agriculturalLandArea || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "agriculturalLandArea")
                  }
                  sx={{
                    // width: "185px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                    },
                  }}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} md={6} lg={6}>
                <Autocomplete
                  disabled
                  open={open}
                  disablePortal
                  options=""
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        // width: "75px",
                        "& .MuiInputBase-root": {
                          textAlign: "center",
                          // height: "30px",
                          borderRadius: "8px",
                          marginLeft: "10px",
                        },
                      }}
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      size="small"
                    />
                  )}
                  fullWidth
                />
              </Grid>
            </Grid>
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Non - Agriculture Land Area</FieldName>

            <Grid container>
              <Grid item sm={6} md={6} lg={6}>
                <TextField
                  name="nonAgriculturalLandArea"
                  id="nonAgriculturalLandArea"
                  value={formData?.nonAgriculturalLandArea || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "nonAgriculturalLandArea"
                    )
                  }
                  sx={{
                    // width: "185px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                    },
                  }}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} md={6} lg={6}>
                <Autocomplete
                  disabled
                  open={open}
                  disablePortal
                  options=""
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        // width: "75px",
                        "& .MuiInputBase-root": {
                          textAlign: "center",
                          // height: "30px",
                          borderRadius: "8px",
                          marginLeft: "10px",
                        },
                      }}
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Crop Area</FieldName>
            <Grid container>
              <Grid item sm={6} md={6} lg={6}>
                <TextField
                  name="cropArea"
                  id="cropArea"
                  value={formData?.cropArea || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "cropArea")
                  }
                  sx={{
                    // width: "185px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                    },
                  }}
                  size="small"
                />
              </Grid>
              <Grid item sm={6} md={6} lg={6}>
                <Autocomplete
                  disabled
                  open={open}
                  disablePortal
                  options=""
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        // width: "75px",
                        "& .MuiInputBase-root": {
                          textAlign: "center",
                          // height: "30px",
                          borderRadius: "8px",
                          marginLeft: "10px",
                        },
                      }}
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </FieldWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default GnDivisionForm;
