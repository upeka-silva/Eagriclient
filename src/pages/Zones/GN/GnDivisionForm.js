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
import { handleGnDivision } from "../../../redux/actions/gnDivision/action";
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

import { ActionWrapper,makeCapitalize, } from "../../../components/PageLayout/ActionWrapper";
import { get_mahaweliBlockList } from "../../../redux/actions/mahaweliSystem/mahaweliBlock/action";
import { get_DistrictList } from "../../../redux/actions/district/action";
import { get_agroEcoList } from "../../../redux/actions/agroEco/action";

import { get_AiRegionList } from "../../../redux/actions/aiRegion/action";
import { get_arpaList } from "../../../redux/actions/arpa/action";
import { get_DsDivisionList } from "../../../redux/actions/dsDivision/action";

const GnDivisionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [mahaweliBlockList, setMahaweliBlockList] = useState([]);
  const [dsDivisionList, setDsDivisionList] = useState([]);
  const [agroEcoList, setAgroEcoList] = useState([]);

  const [aiRegionList, setAiRegionList] = useState([]);
  const [arpaList, setArpaList] = useState([]);
  const [dsOptions, setDsOptions] = useState([]);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/ga-structure/gn-division");
  };

  useEffect(() => {
    get_mahaweliBlockList().then(({ dataList = [] }) => {
      setMahaweliBlockList(dataList);
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
        await handleGnDivision(formData, onSuccess, onError);
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
    get_DsDivisionList().then(({ dataList = [] }) => {
      setDsOptions(dataList);
    });
  }, []);

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
        {/* <PathName>{getPathName()}</PathName> */}
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {makeCapitalize(state?.action)} Grama Niladari Division
        </FormHeader>
      </div>
      <Grid
        direction="row"
        container
        style={{ backgroundColor: `${Colors.formBackgroundColor}` }}
      >
        <FormWrapper>
          <FieldWrapper>
            <FieldName>Division ID</FieldName>
            <TextField
              name="id"
              id="id"
              value={formData?.id || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) => handleChange(e?.target?.value || "", "id")}
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
              Division <br /> Name
            </FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "name")}
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
            <FieldName>DS Division</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={dsOptions}
              value={formData ? formData.districtDTO : ""}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "dsDivisionDTO");
              }}
              sx={{
                width: "264px",
                "& .MuiOutlinedInput-root": {
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiOutlinedInput-root": {
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>Mahaweli Unit</FieldName>
            <TextField
              name="mahaweliBlockId"
              id="mahaweliBlockId"
              value={formData?.mahaweliBlockId || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "mahaweliBlockId")
              }
              sx={{
                width: "264px",
                "& .MuiOutlinedInput-root": {
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiOutlinedInput-root": {
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiOutlinedInput-root": {
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FieldWrapper>
        </FormWrapper>
        <FormWrapper border radius>
          <FieldWrapper>
            <FieldName>
              Total <br /> Households
            </FieldName>
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
              Total <br /> Population
            </FieldName>
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
              Male <br /> Population
            </FieldName>
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
              Female <br /> Population
            </FieldName>
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
        <FormWrapper border radius>
          <FieldWrapper>
            <FieldName>
              Select
              <br />
              measurement type
            </FieldName>
            <FormControl>
              <Select
                value={formData?.mahaweliSystem || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "landArea")
                }
                sx={{
                  width: "264px",
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                }}
                size="small"
              >
                <MenuItem value={"SQUARE_METERS"}>Square meters</MenuItem>
                <MenuItem value={"ACRES"}>Acres</MenuItem>
                <MenuItem value={"HECTARES"}>Hectares</MenuItem>
                <MenuItem value={"PERCH"}>Perch</MenuItem>
                <MenuItem value={"SQUARE_FEET"}>Square feet</MenuItem>
              </Select>
            </FormControl>
          </FieldWrapper>
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
              Agriculture <br /> Land Area
            </FieldName>
            <Grid direction="row" container gap="4px">
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
                  width: "185px",
                  "& .MuiInputBase-root": {
                    height: "30px",
                    borderRadius: "8px",
                  },
                }}
              />
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
                      width: "75px",
                      "& .MuiInputBase-root": {
                        textAlign: "center",
                        height: "30px",
                        borderRadius: "8px",
                      },
                    }}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                  />
                )}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Non - <br /> Agriculture <br /> Land Area
            </FieldName>
            <Grid direction="row" container gap="4px">
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
                  width: "185px",
                  "& .MuiInputBase-root": {
                    height: "30px",
                    borderRadius: "8px",
                  },
                }}
              />
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
                      width: "75px",
                      "& .MuiInputBase-root": {
                        textAlign: "center",
                        height: "30px",
                        borderRadius: "8px",
                      },
                    }}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                  />
                )}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>Crop Area</FieldName>
            <Grid direction="row" container gap="4px">
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
                  width: "185px",
                  "& .MuiInputBase-root": {
                    height: "30px",
                    borderRadius: "8px",
                  },
                }}
              />
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
                      width: "75px",
                      "& .MuiInputBase-root": {
                        textAlign: "center",
                        height: "30px",
                        borderRadius: "8px",
                      },
                    }}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                  />
                )}
              />
            </Grid>
          </FieldWrapper>
        </FormWrapper>
      </Grid>
      <ButtonWrapper style={{ width: "95%" }}>
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
    </div>
  );
};

export default GnDivisionForm;
