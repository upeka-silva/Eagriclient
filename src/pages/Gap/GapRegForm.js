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
} from "@mui/material";
import Switch from "@mui/material/Switch";
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
import Checkbox from "@mui/material/Checkbox";
import { handleGap, updateGap } from "../../redux/actions/gap/action";
import CropDetails from "./CropDetails";

const label = { inputProps: { "aria-label": "Switch demo" } };

const GapRegForm = () => {
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

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const goBack = () => {
    navigate("/gap-registration");
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
          await updateGap(formData, onSuccess, onError);
        } else {
          await handleGap(formData, onSuccess, onError);
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
          {state?.action} GAP REQUEST
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
        <Grid
          container
          sx={{
            border: "1px solid #bec0c2",
            margin: "20px",
            width: "95%",
            borderRadius: "5px",
          }}
          spacing={0}
        >
          <Grid item  sx={{ paddingX: "15px" }}>
            <FieldName
              style={{
                width: "100%",
              }}
            >
              Applicant Title
            </FieldName>
            <Select
              name="applicantTitle"
              id="applicantTitle"
              value={formData?.applicantTitle || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                handleChange(e?.target?.value || "", "applicantTitle");
              }}
              fullWidth
              sx={{
                // width: "264px",
                // height: "30px",
                borderRadius: "8px",
                backgroundColor: `${Colors.white}`,
              }}
              size="small"
            >
              <MenuItem value={"REV"}>REV</MenuItem>
              <MenuItem value={"MR"}>MR</MenuItem>
              <MenuItem value={"MRS"}>MRS</MenuItem>
              <MenuItem value={"MISS"}>MISS</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={4} sx={{ paddingX: "15px" }}>
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
                Applicant Name
              </FieldName>
              <TextField
                name="applicantName"
                id="applicantName"
                value={formData?.applicantName || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "applicantName")
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
          </Grid>
          <Grid item lg={3}>
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
                Farm Name
              </FieldName>
              <TextField
                name="farmName"
                id="farmName"
                value={formData?.farmName || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "farmName")
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
          </Grid>
          <Grid
            item
            lg={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FieldWrapper
              style={{
                flexDirection: "row",
                flex: "1 1 264px",
                gap: "0",
                alignItems: "center",
                marginTop: "30px",
                justifyContent: "flex-end",
              }}
            >
              <Checkbox
                {...label}
                name="seedsFromOwnFarm"
                id="seedsFromOwnFarm"
                value={formData?.seedsFromOwnFarm || ""}
                onChange={(e) =>
                  handleChange(e?.target?.checked || "", "seedsFromOwnFarm")
                }
              />
              <FieldName
                style={{
                  width: "70%",
                }}
              >
                Certificate Renewal
              </FieldName>
            </FieldWrapper>
          </Grid>
          
          <Grid item lg={5} sx={{ paddingX: "15px" }}>
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
                Applicant Address
              </FieldName>
              <TextField
                name="applicantAddress"
                id="applicantAddress"
                value={formData?.applicantAddress || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "applicantAddress")
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
          </Grid>
        </Grid>
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
        >
          Crop Details
        </TabButton>
        <TabButton
          className={toggleState === 3 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
        >
          Land Details
        </TabButton>
        <TabButton
          className={toggleState === 4 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
        >
          Internal Audit
        </TabButton>
        <TabButton
          className={toggleState === 5 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
        >
          External Audit
        </TabButton>
        <TabButton
          className={toggleState === 6 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
        >
          Test
        </TabButton>
        <TabButton
          className={toggleState === 7 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
        >
          Certificate
        </TabButton>
        <TabButton
          className={toggleState === 8 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
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
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                // backgroundColor:'red',
                paddingInline: "15px",
              }}
              spacing={0}
            >
              <FieldWrapper
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,

                paddingInline: "15px",
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
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={3}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
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
                    // width: "264px",
                    // height: "30px",
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                >
                  <MenuItem value={"SOLE"}>SOLE</MenuItem>
                  <MenuItem value={"PROPRIETORSHIP"}>PROPRIETORSHIP</MenuItem>
                  <MenuItem value={"PARTNERSHIP"}>PARTNERSHIP</MenuItem>
                  <MenuItem value={"COMPANY"}>COMPANY</MenuItem>
                  <MenuItem value={"SOCIETY"}>SOCIETY</MenuItem>
                  <MenuItem value={"OTHER"}>OTHER</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
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
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "30px",
                }}
              >
                <FieldName
                  style={{
                    width: "80%",
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldName
                style={{
                  width: "100%",
                }}
              >
                type of certification (Please attach a photocopy)
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
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                }}
              >
                <FieldName
                  style={{
                    width: "70%",
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                }}
              >
                <FieldName
                  style={{
                    width: "70%",
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                }}
              >
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
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid
              item
              lg={3}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              {/* <FormWrapper
                style={{
                  flexDirection: "row",
                  gap: "12px",
                  flexWrap: "wrap",
                  maxWidth: "70vw",
                }}
              >
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Select on relevant cages based on the nature of the seed or
                    planting materials used in your farm.
                  </FieldName>
                </FieldWrapper>
              </FormWrapper> */}

              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "30px",
                }}
              >
                <FieldName
                  style={{
                    width: "70%",
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={3}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "30px",
                }}
              >
                <FieldName
                  style={{
                    width: "70%",
                  }}
                >
                  Seeds obtained from private institutes
                </FieldName>
                <Checkbox
                  {...label}
                  name="certifiedSeeds"
                  id="certifiedSeeds"
                  value={formData?.certifiedSeeds || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "certifiedSeeds")
                  }
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={2}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "30px",
                }}
              >
                <FieldName
                  style={{
                    width: "70%",
                  }}
                >
                  Certified seeds (DOA)
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={1}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "30px",
                }}
              >
                <FieldName
                  style={{
                    width: "70%",
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={3}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
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
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={5}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
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
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
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
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
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
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid
              item
              lg={3}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
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
                  Existing Soil Type
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
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "30px",
                }}
              >
                <FieldName
                  style={
                    {
                      // width: "70%",
                    }
                  }
                >
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
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid
              item
              lg={3}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "10px",
                }}
              >
                <FieldName
                  style={
                    {
                      // width: "70%",
                    }
                  }
                >
                  Fertilizer management based on soil test
                </FieldName>
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "10px",
                }}
              >
                <FieldName
                  style={
                    {
                      // width: "70%",
                    }
                  }
                >
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "10px",
                }}
              >
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={3}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "30px",
                }}
              >
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
                />
              </FieldWrapper>
            </Grid>

            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
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
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
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
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "20px",
                }}
              >
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={2}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "20px",
                }}
              >
                <FieldName
                  style={{
                    width: "70%",
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={2}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop: "20px",
                }}
              >
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
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
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
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
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid
              item
              lg={6}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  flexDirection: "row",
                  flex: "1 1 264px",
                  gap: "0",
                  marginTop:'15px'
                }}
              >
                <FieldName
                  style={{
                    
                  }}
                >
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
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline: "15px",
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'15px'
                  }}
                >
                  <FieldName
                    style={{
                      
                    }}
                  >
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
                  />
                </FieldWrapper>
              
            </Grid>
            </Grid>
            <Grid item
            container
            flexDirection="row"
            xs="auto"
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}>
            <Grid
              item
              lg={4}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'30px'
                  }}
                >
                  <FieldName
                    style={{
                      
                    }}
                  >
                    Do you have water testing report with regard to the water
                    used for irrigation?
                  </FieldName>
                  <Switch
                    {...label}
                    name="hasWaterTestReport"
                    id="hasWaterTestReport"
                    value={formData?.hasWaterTestReport || ""}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.checked || "",
                        "hasWaterTestReport"
                      )
                    }
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={3}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
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
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
             
                <FieldWrapper
                  style={{ flexDirection: "column", flex: "1 1 264px" }}
                >
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
                    value={formData?.irrigationMethod || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "irrigationMethod")
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
                    <MenuItem value={"FLOOD"}>FLOOD</MenuItem>
                    <MenuItem value={"DRIP"}> DRIP</MenuItem>
                    <MenuItem value={"SPRINKLER"}>SPRINKLER</MenuItem>
                    <MenuItem value={"OTHER"}> OTHER</MenuItem>
                  </Select>
                </FieldWrapper>
              
            </Grid>
            <Grid
              item
              lg={4}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
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
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
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
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}>
            <Grid
              item
              lg={5}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
             
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'30px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
                    Whether the farm has been used for any other
                    non-agricultural purpose earlier?
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
                  />
                </FieldWrapper>
              
            </Grid>
            <Grid
              item
              lg={6}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
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
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={5}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
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
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
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
             lg={12}
             sx={{
               border: "1px solid #bec0c2",
               borderRadius: "5px",
               marginBottom: "20px",
             }}
             spacing={0}
            >
              <Grid
              item
              lg={5}
              style={{
              
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
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
                   How do you manage weeds in your farm?
                  </FieldName>
                  <TextField
                    name="howManageWeeds"
                    id="howManageWeeds"
                    value={formData?.howManageWeeds || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.value || "",
                        "howManageWeeds"
                      )
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
              
            </Grid>
            </Grid>
            <Grid  item
             container
             flexDirection="row"
             xs="auto"
             lg={12}
             sx={{
               border: "1px solid #bec0c2",
               borderRadius: "5px",
               marginBottom: "20px",
             }}
             spacing={0}>
            <Grid
              item
              lg={5}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'30px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
                    Do you have SL-GAP and the conventional agricultural
                    practices available in your farm?
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
                  />
                </FieldWrapper>
              
            </Grid>
            <Grid
              item
              style={{
              
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
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
                      // width: "264px",
                      "& .MuiInputBase-root": {
                        // height: "30px",
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
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}>
            <Grid
              item
              lg={5}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'20px'
                  }}
                >
                  <FieldName
                    style={{
                    
                    }}
                  >
                    Do you have identified any risk due to the activities from
                    the surrounding lands?
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
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'20px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
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
                  />
                </FieldWrapper>
              
            </Grid>
            </Grid>
            <Grid  
            item
            container
            flexDirection="row"
            xs="auto"
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}>
            <Grid
              item
              lg={5}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
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
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={3}
              style={{
              
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
             
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
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
                  />
                </FieldWrapper>
              
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                      
                    }}
                  >
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
                  />
                </FieldWrapper>
             
            </Grid>
            </Grid>
            <Grid 
             item
             container
             flexDirection="row"
             xs="auto"
             lg={12}
             sx={{
               border: "1px solid #bec0c2",
               borderRadius: "5px",
               marginBottom: "20px",
             }}
             spacing={0}>
            <Grid
              item
              lg={3}
              style={{
              
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
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
                  />
                </FieldWrapper>
              
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
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
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={5}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                   
                    }}
                  >
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
                  />
                </FieldWrapper>
              
            </Grid>
            </Grid>
            <Grid item
             container
             flexDirection="row"
             xs="auto"
             lg={12}
             sx={{
               border: "1px solid #bec0c2",
               borderRadius: "5px",
               marginBottom: "20px",
             }}
             spacing={0}>
            <Grid
              item
              lg={4}
              style={{
              
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
             
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                      width: "70%",
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
                  />
                </FieldWrapper>
              
            </Grid>
            <Grid
              item
              lg={4}
              style={{
              
                backgroundColor: `${Colors.formBackgroundColor}`,
              paddingInline:'15px'              }}
            >
             
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
                    Do you have protect the temporary stores and processing
                    places from insects and other animals?
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
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={4}
              style={{
               
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
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
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={4}
              style={{
             
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
              
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                    // marginTop:'10px'
                  }}
                >
                  <FieldName
                    style={{
                      
                    }}
                  >
                    Do you have stored fertilizer and pesticide separately to
                    ensure the quality?
                  </FieldName>
                  <Switch
                    {...label}
                    name="fertilizerAndPesticidesInSeparateStore"
                    id="fertilizerAndPesticidesInSeparateStore"
                    value={
                      formData?.fertilizerAndPesticidesInSeparateStore || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        e?.target?.checked || "",
                        "fertilizerAndPesticidesInSeparateStore"
                      )
                    }
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={4}
              style={{
             
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
             
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                     
                    }}
                  >
                    The workers have been trained properly on relevant
                    trainings?
                  </FieldName>
                  <Switch
                    {...label}
                    name="workersTrained"
                    id="workersTrained"
                    value={formData?.workersTrained || ""}
                    onChange={(e) =>
                      handleChange(e?.target?.checked || "", "workersTrained")
                    }
                  />
                </FieldWrapper>
             
            </Grid>
            <Grid
              item
              lg={4}
              style={{
              
                backgroundColor: `${Colors.formBackgroundColor}`,
                paddingInline:'15px'
              }}
            >
            
                <FieldWrapper
                  style={{
                    flexDirection: "row",
                    flex: "1 1 264px",
                    gap: "0",
                  }}
                >
                  <FieldName
                    style={{
                      
                    }}
                  >
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
                  />
                </FieldWrapper>
              
            </Grid>
          </Grid>
        </Grid>
      </TabContent>

      <TabContent className={toggleState === 2 ? "active-content" : ""}>
        
        <CropDetails state={state}/>

       
      </TabContent>
    </div>
  );
};

export default GapRegForm;

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
