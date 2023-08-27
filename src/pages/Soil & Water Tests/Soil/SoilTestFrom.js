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
  handleSoilTest,
  updateSoilTest,
} from "../../../redux/actions/soil & water tests/soil/action";

import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { Add, Edit } from "@mui/icons-material";

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
      try {
        if (formData?.id) {
          await updateSoilTest(formData, onSuccess, onError);
        } else {
          await handleSoilTest(formData, onSuccess, onError);
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
        // backgroundColor: `${Colors.white}`,
        fontFamily: `${Fonts.fontStyle1}`,
        overflowY:'scroll'
      }}
    >
      <div>
        <ActionWrapper isLeft>
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to list
          </Button>
        </ActionWrapper>
        {/* <PathName>{getPathName()}</PathName> */}
        <FormHeader>
          {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
          {state?.action} SOIL TEST
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
                    {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />}
                    {/* {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"} */}
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
        <Grid item lg={2}>
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
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Sample ID</FieldName>
            <TextField
              name="dateSampled"
              id="dateSampled"
              value={formData?.dateSampled || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "dateSampled")
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
        <Grid item lg={2}>
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
        <Grid item lg={3}>
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
        <Grid item lg={3}>
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
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Date Sampled</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              {/* <DemoContainer components={["DatePicker"]}> */}
                <DatePicker
                  label=""
                  slotProps={{ textField: { size: "small" } }}
                  name="dateSampled"
                  id="dateSampled"
                  value={formData?.dateSampled || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "dateSampled")
                  }
                />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item lg={2}>
          <FieldWrapper>
            <FieldName>Date Analyzed</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={["DatePicker"]}> */}
                <DatePicker
                  label=""
                  slotProps={{ textField: { size: "small" } }}
                  name="dateAnalyzed"
                  id="dateAnalyzed"
                  value={formData?.dateAnalyzed || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "dateAnalyzed")
                  }
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
        <Grid item lg={3}>
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
        <Grid item lg={3}>
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
        <Grid item lg={3}>
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
        <Grid item lg={3}>
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
        <Grid item lg={3}>
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
        <Grid item lg={3}>
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
        <Grid item lg={3}>
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
          <Grid item lg={3}>
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
          <Grid item lg={3}>
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
          <Grid item lg={3}>
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
          <Grid item lg={3}>
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
          <Grid item lg={3}>
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
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>
              Base
              Saturation
            </FieldName>
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
          <Grid item lg={3}>
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
          <Grid item lg={3}>
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
          <Grid item lg={3}>

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
          <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>
              Additional
               Comments
            </FieldName>
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
