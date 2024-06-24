import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
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

import {
  handleSoilTest,
  updateSoilTest,
} from "../../../redux/actions/soil & water tests/soil/action";

import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import PageHeader from "../../../components/PageHeader/PageHeader";
import dayjs from "dayjs";

const SoilTestFrom = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/tests/soil-test");
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
      let dateSampled = new Date(formData.dateSampled);
      let dateAnalyzed = new Date(formData.dateAnalyzed);
      try {
        if (formData?.id) {
          await updateSoilTest(
            {
              ...formData,
              dateSampled: dateSampled.valueOf() || null,
              dateAnalyzed: dateAnalyzed.valueOf() || null,
            },
            onSuccess,
            onError
          );
        } else {
          await handleSoilTest(
            {
              ...formData,
              dateSampled: dateSampled.valueOf() || null,
              dateAnalyzed: dateAnalyzed.valueOf() || null,
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

  console.log("value", formData?.dateSampled);
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
        formName="Soil Test"
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
            <FieldName>Report ID</FieldName>
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
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Sample ID</FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) => handleChange(e?.target?.value || "", "name")}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Lab No</FieldName>
            <TextField
              name="labNo"
              id="labNo"
              value={formData?.labNo || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "labNo")}
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
            <FieldName>Test Type</FieldName>
            <TextField
              name="testType"
              id="testType"
              value={formData?.testType || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "testType")}
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
            <FieldName>Sample Description</FieldName>
            <TextField
              name="sampleDescription"
              id="sampleDescription"
              value={formData?.sampleDescription || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "sampleDescription")
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
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Date Sampled</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={["DatePicker"]}> */}
              <DatePicker
                slotProps={{ textField: { size: "small", error: false } }}
                format="DD-MM-YYYY"
                name="dateSampled"
                id="dateSampled"
                defaultValue={
                  formData?.dateSampled ? dayjs(formData.dateSampled) : null
                }
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(value) => {
                  handleChange(value ? value.toISOString() : "", "dateSampled");
                }}
              />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Date Analyzed</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={["DatePicker"]}> */}
              <DatePicker
                slotProps={{ textField: { size: "small", error: false } }}
                in="DD-MM-YYYY"
                name="dateAnalyzed"
                id="dateAnalyzed"
                defaultValue={
                  formData?.dateAnalyzed ? dayjs(formData.dateAnalyzed) : null
                }
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(value) => {
                  handleChange(
                    value ? value.toISOString() : "",
                    "dateAnalyzed"
                  );
                }}
              />
              {/* </DemoContainer> */}
            </LocalizationProvider>
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
            <FieldName>Soil PH</FieldName>
            <TextField
              name="soilPH"
              id="soilPH"
              value={formData?.soilPH || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0, max: 14 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "soilPH")}
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
            <FieldName>Organic Matter</FieldName>
            <TextField
              name="organicMatter"
              id="organicMatter"
              value={formData?.organicMatter || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "organicMatter")
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
            <FieldName>Available-P</FieldName>
            <TextField
              name="availableP"
              id="availableP"
              value={formData?.availableP || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableP")
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
            <FieldName>Available-K</FieldName>
            <TextField
              name="availableK"
              id="availableK"
              value={formData?.availableK || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableK")
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
            <FieldName>Available S</FieldName>
            <TextField
              name="availableS"
              id="availableS"
              value={formData?.availableS || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableS")
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
            <FieldName>Available Mg</FieldName>
            <TextField
              name="availableMg"
              id="availableMg"
              value={formData?.availableMg || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableMg")
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
            <FieldName>Available Ca</FieldName>
            <TextField
              name="availableCa"
              id="availableCa"
              value={formData?.availableCa || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableCa")
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
            <FieldName>Exchangeable Al</FieldName>
            <TextField
              name="exchangeableAl"
              id="exchangeableAl"
              value={formData?.exchangeableAl || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "exchangeableAl")
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
            <FieldName>Available Cu</FieldName>
            <TextField
              name="availableCu"
              id="availableCu"
              value={formData?.availableCu || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableCu")
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
            <FieldName>Available Fe</FieldName>
            <TextField
              name="availableFe"
              id="availableFe"
              value={formData?.availableFe || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableFe")
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
            <FieldName>Available Mn</FieldName>
            <TextField
              name="availableMn"
              id="availableMn"
              value={formData?.availableMn || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableMn")
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
            <FieldName>Available Zn</FieldName>
            <TextField
              name="availableZn"
              id="availableZn"
              value={formData?.availableZn || ""}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "availableZn")
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
      <Grid>
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
              <FieldName>Base Saturation</FieldName>
              <TextField
                name="baseSaturation"
                id="baseSaturation"
                value={formData?.baseSaturation || ""}
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "baseSaturation")
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
              <FieldName>EC</FieldName>
              <TextField
                name="ec"
                id="ec"
                value={formData?.ec || ""}
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "ec")}
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
              <FieldName>cea</FieldName>
              <TextField
                name="cec"
                id="cec"
                value={formData?.cec || ""}
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "cec")}
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
              <FieldName>Nh4N</FieldName>
              <TextField
                name="nh4N"
                id="nh4N"
                value={formData?.nh4N || ""}
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "nh4N")}
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
              <FieldName>Additional Comments</FieldName>
              <TextField
                name="additionalComments"
                id="additionalComments"
                value={formData?.additionalComments || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "additionalComments")
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
    </div>
  );
};

export default SoilTestFrom;

const GroupWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  border: 2px solid #bf4f74;
  align-items: center;
  border-radius: 5px;
`;
