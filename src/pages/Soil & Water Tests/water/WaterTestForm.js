import React, { useState } from "react";
import { TextField, Button, CircularProgress, Grid } from "@mui/material";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
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

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  handleWaterTest,
  updateWaterTest,
} from "../../../redux/actions/soil & water tests/water/action";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";

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
        backgroundColor: `${Colors.white}`,
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
          {state?.action} WATER TEST
        </FormHeader>
      </div>
      <Grid
        container
        flexDirection="row"
        style={{
          border: "2px solid #C0C0C0",
          padding: "5px",
          gap: "0px 20px",
          paddingLeft: "18px",
        }}
      >
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
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
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
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>
            Sample
            <br /> Location
          </FieldName>
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
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>

        <FieldWrapper>
          <FieldName>
            Sample
            <br /> Depth
          </FieldName>
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
              width: "264px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>
            Date of
            <br /> Collection
          </FieldName>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Basic date picker"
                slotProps={{ textField: { size: "small" } }}
                name="dateOfCollection"
                id="dateOfCollection"
                value={formData?.dateOfCollection || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "dateOfCollection")
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </FieldWrapper>
        <FieldWrapper>
          <FieldName>
            Test
            <br /> Date
          </FieldName>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Basic date picker"
                slotProps={{ textField: { size: "small" } }}
                name="testDate"
                id="testDate"
                value={formData?.testDate || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "testDate")
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </FieldWrapper>
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
              width: "750px",
              "& .MuiInputBase-root": {
                height: "30px",
                borderRadius: "8px",
              },
            }}
          />
        </FieldWrapper>
      </Grid>
      <Grid container flexDirection="row">
        <FormWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Coliform
              <br /> Bacteria
            </FieldName>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Electrical
              <br /> Conductivity
            </FieldName>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Free Residual
              <br /> Chlorine
            </FieldName>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Total Dissolved
              <br /> Solids
            </FieldName>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
        </FormWrapper>
        <FormWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
        </FormWrapper>
        <FormWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Total
              <br /> Alkalinity
            </FieldName>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Magnesium
              <br /> Hardness
            </FieldName>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Calcium
              <br /> Hardness
            </FieldName>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
          <FieldWrapper>
            <FieldName>
              Total
              <br /> Hardness
            </FieldName>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
          </FieldWrapper>
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
                width: "264px",
                "& .MuiInputBase-root": {
                  height: "30px",
                  borderRadius: "8px",
                },
              }}
            />
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

export default WaterTestForm;
