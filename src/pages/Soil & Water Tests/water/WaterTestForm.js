import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { Fonts } from "../../../utils/constants/Fonts";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {
  handleWaterTest,
  updateWaterTest,
} from "../../../redux/actions/soil & water tests/water/action";

const WaterTestForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const dateAdapter = new AdapterDayjs();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...(state?.target || {}),
    dateOfCollection: state?.target?.dateOfCollection
      ? dateAdapter.date(state?.target?.dateOfCollection)
      : null,
    testDate: state?.target?.testDate
      ? dateAdapter.date(state?.target?.testDate)
      : null,
  });
  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/tests/water-test");
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

      let cdate = new Date(formData.dateOfCollection);
      let tdate = new Date(formData.testDate);

      try {
        if (formData?.id) {
          await updateWaterTest(
            {
              ...formData,
              dateOfCollection: cdate.valueOf() || null,
              testDate: tdate.valueOf() || null,
            },
            onSuccess,
            onError
          );
        } else {
          await handleWaterTest(
            {
              ...formData,
              dateOfCollection: cdate.valueOf() || null,
              testDate: tdate.valueOf() || null,
            },
            onSuccess,
            onError
          );
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
      fontFamily: `${Fonts.fontStyle1}`,
      marginTop: "10px",
      height: "90vh",
      overflowY: "scroll",
    }}
    >
      <PageHeader
        saving={saving}
        state={state}
        formName="Water Test"
        goBack={goBack}
      />
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
          // border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Test ID</FieldName>
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
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Test Name</FieldName>
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
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Sample Location</FieldName>
            <TextField
              name="sampleLocation"
              id="sampleLocation"
              value={formData?.sampleLocation || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "sampleLocation")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Sample Depth</FieldName>
            <TextField
              name="sampleDepth"
              id="sampleDepth"
              value={formData?.sampleDepth || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "sampleDepth")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Date of Collection</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={["DatePicker"]} > */}
              <DatePicker
                label=""
                slotProps={{ textField: { size: "small", error: false } }}
                name="dateOfCollection"
                id="dateOfCollection"
                value={formData?.dateOfCollection || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "dateOfCollection")
                }
              />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Test Date</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={["DatePicker"]}> */}
              <DatePicker
                label=""
                slotProps={{ textField: { size: "small", error: false } }}
                name="testDate"
                id="testDate"
                value={formData?.testDate || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "testDate")
                }
              />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>remarks</FieldName>
            <TextField
              name="remarks"
              id="remarks"
              value={formData?.remarks || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "remarks")}
              sx={{
                // width: "750px",
                "& .MuiInputBase-root": {
                  // height: "30px",
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
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Color</FieldName>
            <TextField
              name="color"
              id="color"
              value={formData?.color || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "color")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Coliform Bacteria</FieldName>
            <TextField
              name="coliformBacteria"
              id="coliformBacteria"
              value={formData?.coliformBacteria || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "coliformBacteria")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Turbidity</FieldName>
            <TextField
              name="turbidity"
              id="turbidity"
              value={formData?.turbidity || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "turbidity")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Electrical Conductivity</FieldName>
            <TextField
              name="electricalConductivity"
              id="electricalConductivity"
              value={formData?.electricalConductivity || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "electricalConductivity")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Free Residual Chlorine</FieldName>
            <TextField
              name="freeResidualChlorine"
              id="freeResidualChlorine"
              value={formData?.freeResidualChlorine || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "freeResidualChlorine")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Total Dissolved Solids</FieldName>
            <TextField
              name="totalDissolvedSolids"
              id="totalDissolvedSolids"
              value={formData?.totalDissolvedSolids || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "totalDissolvedSolids")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Nitrate</FieldName>
            <TextField
              name="nitrate"
              id="nitrate"
              value={formData?.nitrate || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "nitrate")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Ammonium</FieldName>
            <TextField
              name="ammonium"
              id="ammonium"
              value={formData?.ammonium || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "ammonium")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Nitrite</FieldName>
            <TextField
              name="nitrite"
              id="nitrite"
              value={formData?.nitrite || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "nitrite")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Fluoride</FieldName>
            <TextField
              name="fluoride"
              id="fluoride"
              value={formData?.fluoride || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "fluoride")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
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
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Phosphate</FieldName>
            <TextField
              name="phosphate"
              id="phosphate"
              value={formData?.phosphate || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "phosphate")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Potassium</FieldName>
            <TextField
              name="potassium"
              id="potassium"
              value={formData?.potassium || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "potassium")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Dissolved Solids</FieldName>
            <TextField
              name="dissolvedSolids"
              id="dissolvedSolids"
              value={formData?.dissolvedSolids || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "dissolvedSolids")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Calcium</FieldName>
            <TextField
              name="calcium"
              id="calcium"
              value={formData?.calcium || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "calcium")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Magnesium</FieldName>
            <TextField
              name="magnesium"
              id="magnesium"
              value={formData?.magnesium || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "magnesium")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Sodium</FieldName>
            <TextField
              name="sodium"
              id="sodium"
              value={formData?.sodium || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "sodium")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Chloride</FieldName>
            <TextField
              name="chloride"
              id="chloride"
              value={formData?.chloride || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "chloride")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Sulphate</FieldName>
            <TextField
              name="sulphate"
              id="sulphate"
              value={formData?.sulphate || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "sulphate")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Iron</FieldName>
            <TextField
              name="iron"
              id="iron"
              value={formData?.iron || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "iron")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Manganese</FieldName>
            <TextField
              name="manganese"
              id="manganese"
              value={formData?.manganese || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "manganese")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Zinc</FieldName>
            <TextField
              name="zinc"
              id="zinc"
              value={formData?.zinc || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "zinc")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
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
          border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Copper</FieldName>
            <TextField
              name="copper"
              id="copper"
              value={formData?.copper || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "copper")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Boron</FieldName>
            <TextField
              name="boron"
              id="boron"
              value={formData?.boron || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "boron")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Total Alkalinity</FieldName>
            <TextField
              name="totalAlkalinity"
              id="totalAlkalinity"
              value={formData?.totalAlkalinity || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "totalAlkalinity")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Bicarbonate</FieldName>
            <TextField
              name="bicarbonate"
              id="bicarbonate"
              value={formData?.bicarbonate || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "bicarbonate")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Carbonate</FieldName>
            <TextField
              name="carbonate"
              id="carbonate"
              value={formData?.carbonate || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "carbonate")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Magnesium Hardness</FieldName>
            <TextField
              name="magnesiumHardness"
              id="magnesiumHardness"
              value={formData?.magnesiumHardness || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "magnesiumHardness")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Calcium Hardness</FieldName>
            <TextField
              name="calciumHardness"
              id="calciumHardness"
              value={formData?.calciumHardness || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "calciumHardness")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Total Hardness</FieldName>
            <TextField
              name="totalHardness"
              id="totalHardness"
              value={formData?.totalHardness || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "totalHardness")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Ecoli</FieldName>
            <TextField
              name="ecoli"
              id="ecoli"
              value={formData?.ecoli || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "ecoli")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Ph</FieldName>
            <TextField
              name="ph"
              id="ph"
              value={formData?.ph || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "ph")}
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default WaterTestForm;
