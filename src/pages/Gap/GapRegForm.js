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
  InputLabel,
  Stack,
  ButtonGroup,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Switch from "@mui/material/Switch";
import { DataGrid } from "@mui/x-data-grid";
import { useUserAccessValidation } from "../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  getFarmLandByFarmerId,
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
import Checkbox from "@mui/material/Checkbox";
import {
  getCropDetailsList,
  handleGap,
  updateGap,
} from "../../redux/actions/gap/action";
import CropDetails from "./CropDetails";
import { gapReqDto } from "./gap-type";
import {
  Add,
  ArrowCircleLeftRounded,
  Delete,
  Edit,
  Vrpano,
} from "@mui/icons-material";
import DynamicFormListFarmLand from "../DynamicFormFarmLand/DynamicFormListFarmLand";
import BackToList from "../../components/BackToList/BackToList";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import DynamicFormListGap from "../DynamicFormGap/DynamicFormListGap";
import { get } from "../../services/api";
import FarmerList from "../Farmer/FarmerList";
import { get_FarmerList } from "../../redux/actions/farmer/action";
import CropDetailsList from "./CropDetails/CropDetailsList";

const label = { inputProps: { "aria-label": "Switch demo" } };

const GapRegForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || gapReqDto);
  const [saving, setSaving] = useState(false);
  const [gn, setGn] = useState([]);
  const [farmerList, setFarmerList] = useState([]);
  const [farmerLandList, setFarmerLandList] = useState([]);
  const [soilType, setSoilType] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [tabEnabled, setTabInabled] = useState(true);

  const [enablePreGAPReqNo, setEnablePreGAPReqNo] = useState(false);
  const [enableOtherBusinessNature, setEnableOtherBusinessNature] =
    useState(false);
  const [enableOtherCeritications, setEnableOtherCeritications] =
    useState(false);
  const [enableOtherFertilizerMgt, setEnableOtherFertilizerMgt] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedCrop, setSelectedCrop] = useState([]);
  const [cropList, setCropList] = useState([]);
  const [openCropAreaAddDlg, setOpenCropAreaAddDlg] = useState(false);

  const { addSnackBar } = useSnackBars();

  const toggleTab = (index) => {
    setToggleState(index);
    console.log(index);
  };

  const goBack = () => {
    navigate("/gap-registration");
  };

  useEffect(() => {
    setLoading(true);
    get_GnDivisionList().then(({ dataList = [] }) => {
      setGn(dataList);
    });

    get_FarmerList().then(({ dataList = [] }) => {
      setFarmerList(dataList);
    });

    get_SoilType()
      .then(({ dataList = [] }) => {
        setSoilType(dataList);
      })
      .catch(() => {
        setSoilType([]);
      });

    setLoading(false);

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setTabInabled(false);
      const fetchGapReq = async (path, id) => {
        try {
          const { payload } = await get(`${path}/${id}`, true);
          setFormData(payload);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGapReq("gap-request", formData?.id);
    }
  }, []);

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });

    if (target === "appliedGapBefore") {
      setEnablePreGAPReqNo(value);
    }

    if (target === "businessNature") {
      setEnableOtherBusinessNature(value === "OTHER");
    }

    if (target === "hasOtherCertificates") {
      setEnableOtherCeritications(value);
    }

    if (target === "fertilizerMangeOther") {
      setEnableOtherFertilizerMgt(value);
    }
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
      state?.action === DEF_ACTIONS.ADD
      // &&
      // Object.keys(formData || {}).length > 0
    ) {
      return true;
    }
    return false;
  };

  const onSuccess = (gapReqId) => {
    console.log("gap req id " + gapReqId);
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
    formData.id = gapReqId;
    setTabInabled(false);
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
      if (!formData.businessNature) {
        formData.businessNature = "OTHER";
      }
      if (!formData.irrigationMethod) {
        formData.irrigationMethod = "OTHER";
      }
      try {
        if (formData?.id) {
          const response = await updateGap(formData, onSuccess, onError);
          setFormData(response?.payload);
        } else {
          const response = await handleGap(formData, onSuccess, onError);
          setFormData(response?.payload);
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
  const getLandsByFarmerId = (id) => {
    getFarmLandByFarmerId(id).then(({ dataList = {} }) => {
      setFarmerLandList(dataList);
    });
  };
  const fetchCropAreaData = () => {
    getCropDetailsList(formData?.id).then(({ dataList = {} }) => {
      setCropList(dataList);
    });
  };

  useEffect(() => {
    fetchCropAreaData();
  }, []);

  const toggleCropSelect = (component) => {
    console.log(component);
    setSelectedCrop(component);
  };

  const onCreateCropDetails = () => {};
  const onEditCropDetails = () => {};
  const onDeleteCropDetails = () => {};

  const onViewCropDetails = () => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <BackToList goBack={goBack} />
      <CustFormHeader saving={saving} state={state} formName="GAP Request" />

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
                <Button variant="contained">
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
        <Grid container spacing={0}>
          <Grid
            item
            sx={{
              display: "flex",
            }}
            lg={2}
          >
            <FieldWrapper>
              <FieldName
                style={{
                  width: "100%",
                }}
              >
                Renewal
              </FieldName>
              <Checkbox
                {...label}
                name="isRenewal"
                id="isRenewal"
                value={formData?.isRenewal || ""}
                onChange={(e) =>
                  handleChange(e?.target?.checked || "", "isRenewal")
                }
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <FieldWrapper>
              <FieldName>Farmer</FieldName>
              {loading ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  options={farmerList}
                  value={formData ? formData.farmerDTO : ""}
                  getOptionLabel={(i) =>
                    `${i.farmerId} - ${i.firstName} ${i.lastName}`
                  }
                  onChange={(event, value) => {
                    handleChange(value, "farmerDTO");
                    getLandsByFarmerId(value?.id)
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              )}
            </FieldWrapper>
          </Grid>
          <Grid item sm={12} md={6} lg={5}>
            <FieldWrapper>
              <FieldName>Farm Land</FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  formData?.farmerDTO == null
                }
                options={farmerLandList}
                value={formData ? formData.farmLandDTO : ""}
                getOptionLabel={(i) => `${i.code} - ${i.name}`}
                onChange={(event, value) => {
                  handleChange(value, "farmLandDTO");
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
              />
            </FieldWrapper>
          </Grid>
        </Grid>
        <Grid container sx={{ marginBottom: "20px" }} spacing={1}></Grid>
      </TabContent>

      <TabWrapper style={{ margin: "0px 0px" }}>
        <TabButton
          className={toggleState === 1 ? "active-tabs" : ""}
          onClick={() => toggleTab(1)}
        >
          General
        </TabButton>
        <TabButton
          className={toggleState === 2 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
          // disabled = {formData?.id !== null}
        >
          Crop Details
        </TabButton>
        <TabButton
          className={toggleState === 3 ? "active-tabs" : ""}
          onClick={() => toggleTab(3)}
          disabled={formData?.id !== null}
        >
          Land Details
        </TabButton>
        <TabButton
          className={toggleState === 4 ? "active-tabs" : ""}
          onClick={() => toggleTab(4)}
          disabled={formData?.id !== null}
        >
          Internal Audit
        </TabButton>
        <TabButton
          className={toggleState === 5 ? "active-tabs" : ""}
          onClick={() => toggleTab(5)}
          disabled={formData?.id !== null}
        >
          External Audit
        </TabButton>
        <TabButton
          className={toggleState === 6 ? "active-tabs" : ""}
          onClick={() => toggleTab(6)}
          disabled={formData?.id !== null}
        >
          Test
        </TabButton>
        <TabButton
          className={toggleState === 7 ? "active-tabs" : ""}
          onClick={() => toggleTab(7)}
          disabled={formData?.id !== null}
        >
          Certificate
        </TabButton>
        <TabButton
          className={toggleState === 8 ? "active-tabs" : ""}
          onClick={() => toggleTab(8)}
          disabled={formData?.id !== null}
        >
          Initial Assesment
        </TabButton>
      </TabWrapper>

      <TabContent className={toggleState === 1 ? "active-content" : ""}>
        <Grid
          container
          flexDirection="row"
          sx={{ paddingTop: "20px", paddingInline: "20px" }}
          spacing={0}
        >
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4} spacing={0}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Have you applied for registration under the SL-GAP previously?
                </FieldName>
                <Switch
                  {...label}
                  name="appliedGapBefore"
                  id="appliedGapBefore"
                  value={formData?.appliedGapBefore || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "appliedGapBefore")
                  }
                  checked={formData?.appliedGapBefore}
                />
              </FieldWrapper>
            </Grid>
            {enablePreGAPReqNo && (
              <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Previous Gap Request Number
                  </FieldName>
                  <TextField
                    name="previousGapReqNo"
                    id="previousGapReqNo"
                    value={formData?.previousGapReqNo || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "previousGapReqNo")
                    }
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
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Bussiness Nature
                </FieldName>
                <Select
                  name="businessNature"
                  id="businessNature"
                  value={formData?.businessNature || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "businessNature")
                  }
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                >
                  <MenuItem value={"SOLE"}>Sole</MenuItem>
                  <MenuItem value={"PROPRIETORSHIP"}>Proprietorship</MenuItem>
                  <MenuItem value={"PARTNERSHIP"}>Partnership</MenuItem>
                  <MenuItem value={"COMPANY"}>Company</MenuItem>
                  <MenuItem value={"SOCIETY"}>Society</MenuItem>
                  <MenuItem value={"OTHER"}>Other</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            {enableOtherBusinessNature && (
              <Grid item sm={6} md={6} lg={6}>
                <FieldWrapper>
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Bussiness Nature Other Value
                  </FieldName>
                  <TextField
                    name="businessNatureOtherValue"
                    id="businessNatureOtherValue"
                    value={formData?.businessNatureOtherValue || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.value || "",
                        "businessNatureOtherValue"
                      )
                    }
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
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper style={{}}>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Have you obtained any other kind of certificate for your farm?
                </FieldName>
                <Switch
                  {...label}
                  name="hasOtherCertificates"
                  id="hasOtherCertificates"
                  value={formData?.hasOtherCertificates || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "hasOtherCertificates"
                    )
                  }
                  checked={formData?.hasOtherCertificates}
                />
              </FieldWrapper>
            </Grid>
            {enableOtherCeritications && (
              <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>
                    Type of certification (Please attach a photocopy)
                  </FieldName>
                  <TextField
                    name="otherCertificateDoc"
                    id="otherCertificateDoc"
                    value={formData?.otherCertificateDoc || ""}
                    fullWidth
                    inputProps={{ multiple: true }}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.value || "",
                        "otherCertificateDoc"
                      )
                    }
                    type="file"
                    accept="image/*"
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                    size="small"
                  ></TextField>
                </FieldWrapper>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Do you have proper knowledge on SL-GAP standard?
                </FieldName>
                <Switch
                  {...label}
                  name="hasProperKnowledgeOnSLGap"
                  id="hasProperKnowledgeOnSLGap"
                  value={formData?.hasProperKnowledgeOnSLGap || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "hasProperKnowledgeOnSLGap"
                    )
                  }
                  checked={formData?.hasProperKnowledgeOnSLGap}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Do you have brochures or leaflets prepared pertaining to
                  SL-GAP standard?
                </FieldName>
                <Switch
                  {...label}
                  name="hasLeafletsPertainingToSLGap"
                  id="hasLeafletsPertainingToSLGap"
                  value={formData?.hasLeafletsPertainingToSLGap || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "hasLeafletsPertainingToSLGap"
                    )
                  }
                  checked={formData?.hasLeafletsPertainingToSLGap}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have a checklist pertaining to SL-GAP standard?
                </FieldName>
                <Switch
                  {...label}
                  name="hasChecklist"
                  id="hasChecklist"
                  value={formData?.hasChecklist || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "hasChecklist")
                  }
                  checked={formData?.hasChecklist}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Do you have a quality management plan for your farm?
                </FieldName>
                <Switch
                  {...label}
                  name="hasQualityManagementPlan"
                  id="hasQualityManagementPlan"
                  value={formData?.hasQualityManagementPlan || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "hasQualityManagementPlan"
                    )
                  }
                  checked={formData?.hasQualityManagementPlan}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Seeds obtained from your own farm
                </FieldName>
                <Checkbox
                  {...label}
                  name="seedsFromOwnFarm"
                  id="seedsFromOwnFarm"
                  value={formData?.seedsFromOwnFarm || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "seedsFromOwnFarm")
                  }
                  checked={formData?.seedsFromOwnFarm}
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              sm={3}
              md={3}
              lg={3}
              style={{
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0",
                }}
              >
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Seeds obtained from private institutes
                </FieldName>
                <Checkbox
                  {...label}
                  name="seedsFromPrivateFarm"
                  id="seedsFromPrivateFarm"
                  value={formData?.seedsFromPrivateFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "seedsFromPrivateFarm"
                    )
                  }
                  checked={formData?.seedsFromPrivateFarm}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Certified seeds (DOA)
                </FieldName>
                <Checkbox
                  {...label}
                  name="certifiedSeeds"
                  id="certifiedSeeds"
                  value={formData?.certifiedSeeds || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "certifiedSeeds")
                  }
                  checked={formData?.certifiedSeeds}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={1} md={1} lg={1}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Other
                </FieldName>
                <Checkbox
                  {...label}
                  name="seedsFromOther"
                  id="seedsFromOther"
                  value={formData?.seedsFromOther || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "seedsFromOther")
                  }
                  checked={formData?.seedsFromOther}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Seeds From Specify
                </FieldName>
                <TextField
                  name="seedsFromSpecify"
                  id="seedsFromSpecify"
                  value={formData?.seedsFromSpecify || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "seedsFromSpecify")
                  }
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
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If seeds / planting materials obtained are certified, mention
                  the name of the institution by which the certification was
                  made.
                </FieldName>
                <TextField
                  name="seedsCertifiedInstitution"
                  id="seedsCertifiedInstitution"
                  value={formData?.seedsCertifiedInstitution || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "seedsCertifiedInstitution"
                    )
                  }
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
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If seeds / planting materials obtained are not certified,
                  mention the place they were obtained, name and the officer /
                  institute recommended
                </FieldName>
                <TextField
                  name="notCertifiedSeedsRecommendedOfficer"
                  id="notCertifiedSeedsRecommendedOfficer"
                  value={formData?.notCertifiedSeedsRecommendedOfficer || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "notCertifiedSeedsRecommendedOfficer"
                    )
                  }
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>
                    Soil Type {formData?.soilTypeDTO?.length}
                  </FieldName>

                  <Autocomplete
                    name="soilTypeDTO"
                    id="soilTypeDTO"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    options={soilType}
                    value={formData?.soilTypeDTO || ""}
                    getOptionLabel={(i) =>
                      i.soilTypeCode
                        ? `${i.soilTypeCode} - ${i.description}`
                        : ""
                    }
                    onChange={(event, value) => {
                      handleChange(value, "soilTypeDTO");
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
                      <TextField
                        error={
                          !(formData?.soilTypeDTO?.soilTypeCode?.length > 0)
                        }
                        {...params}
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Mention whether any soil test has been done for your farm?
                </FieldName>
                <Switch
                  {...label}
                  name="hasSoilTestDone"
                  id="hasSoilTestDone"
                  value={formData?.hasSoilTestDone || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "hasSoilTestDone")
                  }
                  checked={formData?.hasSoilTestDone}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>Fertilizer management based on soil test</FieldName>
                <Switch
                  {...label}
                  name="fertilizerManageBasedOnSoilTest"
                  id="fertilizerManageBasedOnSoilTest"
                  value={formData?.fertilizerManageBasedOnSoilTest || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "fertilizerManageBasedOnSoilTest"
                    )
                  }
                  checked={formData?.fertilizerManageBasedOnSoilTest}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>
                  Following the recommendation of Department Of Agriculture
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerManageRecommendationOfAD"
                  id="fertilizerManageRecommendationOfAD"
                  value={formData?.fertilizerManageRecommendationOfAD || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "fertilizerManageRecommendationOfAD"
                    )
                  }
                  checked={formData?.fertilizerManageRecommendationOfAD}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Following the recommendation of another recognized institute
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerManageRecommendationOfAnotherInstitute"
                  id="fertilizerManageRecommendationOfAnotherInstitute"
                  value={
                    formData?.fertilizerManageRecommendationOfAnotherInstitute ||
                    ""
                  }
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "fertilizerManageRecommendationOfAnotherInstitute"
                    )
                  }
                  checked={
                    formData?.fertilizerManageRecommendationOfAnotherInstitute
                  }
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "70%",
                  }}
                >
                  Other Fertilizer management
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerMangeOther"
                  id="fertilizerMangeOther"
                  value={formData?.fertilizerMangeOther || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "fertilizerMangeOther"
                    )
                  }
                  checked={formData?.fertilizerMangeOther}
                />
              </FieldWrapper>
            </Grid>

            {enableOtherFertilizerMgt && (
              <Grid item sm={8} md={8} lg={8}>
                <FieldWrapper>
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Specify
                  </FieldName>
                  <TextField
                    name="fertilizerManageSpecify"
                    id="fertilizerManageSpecify"
                    value={formData?.fertilizerManageSpecify || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.value || "",
                        "fertilizerManageSpecify"
                      )
                    }
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
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Mention whether you have added compost to the soil
                </FieldName>
                <Switch
                  {...label}
                  name="addedCompostToSoil"
                  id="addedCompostToSoil"
                  value={formData?.addedCompostToSoil || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "addedCompostToSoil")
                  }
                  checked={formData?.addedCompostToSoil}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Prepared within the farm
                </FieldName>
                <Checkbox
                  {...label}
                  name="compostPreparedWithinFarm"
                  id="compostPreparedWithinFarm"
                  value={formData?.compostPreparedWithinFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "compostPreparedWithinFarm"
                    )
                  }
                  checked={formData?.compostPreparedWithinFarm}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName style={{}}>Prepared outside the farm</FieldName>
                <Checkbox
                  {...label}
                  name="compostPreparedOutsideFarm"
                  id="compostPreparedOutsideFarm"
                  value={formData?.compostPreparedOutsideFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "compostPreparedOutsideFarm"
                    )
                  }
                  checked={formData?.compostPreparedOutsideFarm}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If received from outside, mention the place and address
                </FieldName>
                <TextField
                  name="addressIfCompostReceivedOutside"
                  id="addressIfCompostReceivedOutside"
                  value={formData?.addressIfCompostReceivedOutside || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "addressIfCompostReceivedOutside"
                    )
                  }
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Mention whether human fecal matters were added to the field in
                  direct or indirect way.
                </FieldName>
                <Switch
                  {...label}
                  name="humanFecalMattersAdded"
                  id="humanFecalMattersAdded"
                  value={formData?.humanFecalMattersAdded || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "humanFecalMattersAdded"
                    )
                  }
                  checked={formData?.humanFecalMattersAdded}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have any measures adopted to minimize soil erosion?
                </FieldName>
                <Switch
                  {...label}
                  name="anyMeasuresToAdoptedSoilErosion"
                  id="anyMeasuresToAdoptedSoilErosion"
                  value={formData?.anyMeasuresToAdoptedSoilErosion || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "anyMeasuresToAdoptedSoilErosion"
                    )
                  }
                  checked={formData?.anyMeasuresToAdoptedSoilErosion}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have water testing report with regard to the water used
                  for irrigation?
                </FieldName>
                <Switch
                  {...label}
                  name="hasWaterTestReport"
                  id="hasWaterTestReport"
                  value={formData?.hasWaterTestReport || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "hasWaterTestReport")
                  }
                  checked={formData?.hasWaterTestReport}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  How often water is tested to ascertain its quality?
                </FieldName>
                <TextField
                  name="howOftenWaterTest"
                  id="howOftenWaterTest"
                  value={formData?.howOftenWaterTest || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "howOftenWaterTest")
                  }
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
            <Grid item>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  What is the irrigation methods used in your farm/field?
                </FieldName>
                <Select
                  name="irrigationMethod"
                  id="irrigationMethod"
                  value={formData?.irrigationMethod || "OTHER"}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "irrigationMethod")
                  }
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                >
                  <MenuItem value={"FLOOD"}>FLOOD</MenuItem>
                  <MenuItem value={"DRIP"}> DRIP</MenuItem>
                  <MenuItem value={"SPRINKLER"}>SPRINKLER</MenuItem>
                  <MenuItem value={"OTHER"}> OTHER</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If there Specific irrigation method ?
                </FieldName>
                <TextField
                  name="irrigationMethodSpecify"
                  id="irrigationMethodSpecify"
                  value={formData?.irrigationMethodSpecify || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "irrigationMethodSpecify"
                    )
                  }
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Whether the farm has been used for any other non-agricultural
                  purpose earlier?
                </FieldName>
                <Switch
                  {...label}
                  name="farmUsedForNonAgriculturalPurpose"
                  id="farmUsedForNonAgriculturalPurpose"
                  value={formData?.farmUsedForNonAgriculturalPurpose || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "farmUsedForNonAgriculturalPurpose"
                    )
                  }
                  checked={formData?.farmUsedForNonAgriculturalPurpose}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If yes, mention for what purpose?
                </FieldName>
                <TextField
                  name="specifyNonAgriculturalPurpose"
                  id="specifyNonAgriculturalPurpose"
                  value={formData?.specifyNonAgriculturalPurpose || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "specifyNonAgriculturalPurpose"
                    )
                  }
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
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Crops cultivated within past two years
                </FieldName>
                <TextField
                  name="cropsCultivatedPastTwoYears"
                  id="cropsCultivatedPastTwoYears"
                  value={formData?.cropsCultivatedPastTwoYears || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "cropsCultivatedPastTwoYears"
                    )
                  }
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  How do you manage weeds in your farm?
                </FieldName>
                <TextField
                  name="howManageWeeds"
                  id="howManageWeeds"
                  value={formData?.howManageWeeds || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "howManageWeeds")
                  }
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have SL-GAP and the conventional agricultural practices
                  available in your farm?
                </FieldName>
                <Switch
                  {...label}
                  name="SLGapConvPracExists"
                  id="SLGapConvPracExists"
                  value={formData?.SLGapConvPracExists || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "SLGapConvPracExists"
                    )
                  }
                  checked={formData?.SLGapConvPracExists}
                />
              </FieldWrapper>
            </Grid>
            <Grid item>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  mention the measures which have been taken to supply such
                  products to the market separately
                </FieldName>
                <TextField
                  name="howToMarketSeparately"
                  id="howToMarketSeparately"
                  value={formData?.howToMarketSeparately || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "howToMarketSeparately"
                    )
                  }
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have identified any risk due to the activities from the
                  surrounding lands?
                </FieldName>
                <Switch
                  {...label}
                  name="surroundingLandRiskExist"
                  id="surroundingLandRiskExist"
                  value={formData?.surroundingLandRiskExist || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "surroundingLandRiskExist"
                    )
                  }
                  checked={formData?.surroundingLandRiskExist}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Have you taken the corrective measures to minimize the risk?
                </FieldName>
                <Switch
                  {...label}
                  name="CorrectiveMeasuresTakenForSurroundingLands"
                  id="CorrectiveMeasuresTakenForSurroundingLands"
                  value={
                    formData?.CorrectiveMeasuresTakenForSurroundingLands || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "CorrectiveMeasuresTakenForSurroundingLands"
                    )
                  }
                  checked={formData?.CorrectiveMeasuresTakenForSurroundingLands}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Steps have been taken to prevent contamination at the
                  harvesting and temporary storage
                </FieldName>
                <Switch
                  {...label}
                  name="preventContaminationExists"
                  id="preventContaminationExists"
                  value={formData?.preventContaminationExists || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "preventContaminationExists"
                    )
                  }
                  checked={formData?.preventContaminationExists}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Produce / harvest washed at the farm?
                </FieldName>
                <Switch
                  {...label}
                  name="harvestWashedAtFarm"
                  id="harvestWashedAtFarm"
                  value={formData?.harvestWashedAtFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "harvestWashedAtFarm"
                    )
                  }
                  checked={formData?.harvestWashedAtFarm}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  If yes water quality is similar to drinking water?
                </FieldName>
                <Switch
                  {...label}
                  name="WaterQualitySimilarToDrinkingWater"
                  id="WaterQualitySimilarToDrinkingWater"
                  value={formData?.WaterQualitySimilarToDrinkingWater || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "WaterQualitySimilarToDrinkingWater"
                    )
                  }
                  checked={formData?.WaterQualitySimilarToDrinkingWater}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName style={{}}>
                  On farm packaging was carried out?
                </FieldName>
                <Switch
                  {...label}
                  name="onFarmPackaging"
                  id="onFarmPackaging"
                  value={formData?.onFarmPackaging || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "onFarmPackaging")
                  }
                  checked={formData?.onFarmPackaging}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have method to maintain traceability of produce?
                </FieldName>
                <Switch
                  {...label}
                  name="maintainTraceability"
                  id="maintainTraceability"
                  value={formData?.maintainTraceability || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "maintainTraceability"
                    )
                  }
                  checked={formData?.maintainTraceability}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you use the SL-GAP logo and the QR code on your product
                  package?
                </FieldName>
                <Switch
                  {...label}
                  name="useSLGapQR"
                  id="useSLGapQR"
                  value={formData?.useSLGapQR || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "useSLGapQR")
                  }
                  checked={formData?.useSLGapQR}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Do you store the both SL-GAP and non - GAP products together
                  in same place?
                </FieldName>
                <Switch
                  {...label}
                  name="storeSLGapAndNonGapTogether"
                  id="storeSLGapAndNonGapTogether"
                  value={formData?.storeSLGapAndNonGapTogether || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "storeSLGapAndNonGapTogether"
                    )
                  }
                  checked={formData?.storeSLGapAndNonGapTogether}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have protect the temporary stores and processing places
                  from insects and other animals?
                </FieldName>
                <Switch
                  {...label}
                  name="protectedTempProcessingStore"
                  id="protectedTempProcessingStore"
                  value={formData?.protectedTempProcessingStore || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "protectedTempProcessingStore"
                    )
                  }
                  checked={formData?.protectedTempProcessingStore}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you store fertilizer and pesticides in same store?
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerAndPesticidesInSameStore"
                  id="fertilizerAndPesticidesInSameStore"
                  value={formData?.fertilizerAndPesticidesInSameStore || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "fertilizerAndPesticidesInSameStore"
                    )
                  }
                  checked={formData?.fertilizerAndPesticidesInSameStore}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have stored fertilizer and pesticide separately to
                  ensure the quality?
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerAndPesticidesInSeparateStore"
                  id="fertilizerAndPesticidesInSeparateStore"
                  value={formData?.fertilizerAndPesticidesInSeparateStore || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "fertilizerAndPesticidesInSeparateStore"
                    )
                  }
                  checked={formData?.fertilizerAndPesticidesInSeparateStore}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  The workers have been trained properly on relevant trainings?
                </FieldName>
                <Switch
                  {...label}
                  name="workersTrained"
                  id="workersTrained"
                  value={formData?.workersTrained || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "workersTrained")
                  }
                  checked={formData?.workersTrained}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have provide first aid and sanitary facilities for
                  workers?
                </FieldName>
                <Switch
                  {...label}
                  name="firstAidSanitaryProvided"
                  id="firstAidSanitaryProvided"
                  value={formData?.firstAidSanitaryProvided || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || "",
                      "firstAidSanitaryProvided"
                    )
                  }
                  checked={formData?.firstAidSanitaryProvided}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </TabContent>

      <TabContent
        style={{ marginTop: "10px" }}
        className={toggleState === 2 ? "active-content" : ""}
      >
        {/* <CropDetails actionMode={state?.action} gapReqId={formData.id} /> */}
        <ActionWrapper isLeft>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <Button onClick={onCreateCropDetails}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>

            {selectedCrop.length == 1 && (
              <Button onClick={onEditCropDetails}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            )}

            {selectedCrop.length == 1 && (
              <Button onClick={onViewCropDetails}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            )}

            {selectedCrop.length > 0 && (
              <Button onClick={onDeleteCropDetails}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            )}
          </ButtonGroup>
        </ActionWrapper>
        <CropDetailsList onRowSelect={toggleCropSelect} data={cropList} />
      </TabContent>

      <TabContent className={toggleState === 4 ? "active-content" : ""}>
        <DynamicFormListGap
          dataList={null}
          onFormSaveSuccess={null}
          formId={null}
          formMode={null}
          auditFormType={"INTERNAL_AUDIT"}
        />
      </TabContent>

      <TabContent className={toggleState === 5 ? "active-content" : ""}>
        <DynamicFormListGap
          dataList={null}
          onFormSaveSuccess={null}
          formId={null}
          formMode={null}
          auditFormType={"EXTERNAL_AUDIT"}
        />
      </TabContent>
      {/* <AddCropDetailsDialog
        open={openCropAreaAddDlg}
        setConfirmDialog={setOpenCropAreaAddDlg}
        // setConfirmDialog={setOpenDlg}
        confirmAction={handle}
        handleClose={closeAddCropArea}
        formData={formData}
        mode={dialogMode}
      /> */}
    </div>
  );
};

export default GapRegForm;

export const TabWrapper = styled(Stack)`
  && {
    flex-direction: row;
    margin: 20px 0px;
  }
`;

export const TabButton = styled(Button)`
  && {
    padding: 15px;
    padding-inline: 25px;
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

export const AddFarmerButton = styled.button`
  width: 200px;
  height: 28px;
  margin-right: 5px;
  border-radius: 22px;
  background-color: ${Colors.formButton};
  border: none;
  color: ${Colors.white};
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;
