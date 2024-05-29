import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { Colors } from "../../../utils/constants/Colors";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {
  saveCropDisease,
  updateCropDisease,
} from "../../../redux/actions/crop/CropDisease/action";
import { Fonts } from "../../../utils/constants/Fonts";
import { useTranslation } from "react-i18next";

const CropDiseaseForm = () => {
  const { t } = useTranslation();
  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const { addSnackBar } = useSnackBars();

  const [form, setForm] = useState();

  const goBack = () => {
    navigate("/crop/crop-disease");
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
      setForm(null);
    } else {
      setFormData({});
      setForm(null);
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
    if (state?.action === DEF_ACTIONS.EDIT && form) {
      return true;
    }
    return false;
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? t("message.successfullyAdded")
          : t("message.successfullyUpdated"),
    });
    setSaving(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || t("message.loginFailed"),
    });
    setSaving(false);
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);

      try {
        if (form && state?.action === DEF_ACTIONS.ADD) {
          const response = await saveCropDisease(formData, onSuccess, onError);
          setFormData(response.payload);
          console.log(response);
        }
        if (form && state?.action === DEF_ACTIONS.EDIT) {
          const response = await updateCropDisease(
            {
              ...formData,
              id: response.payload?.id,
            },
            onSuccess,
            onError
          );
        } else {
          const response = await saveCropDisease(
            {
              ...formData,
            },
            onSuccess,
            onError
          );
          setFormData(response.payload);
          console.log(response);
        }
        setSaving(false);
      } catch (error) {
        console.log(error);
      }
    }
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
        goBack={goBack}
        formName="cropDisease"
      />
      <ButtonWrapper>
        <ActionWrapper>
          {saving ? (
            <Button variant="contained" size="small">
              {state?.action === DEF_ACTIONS.ADD
                ? t("action.adding")
                : t("action.updating")}
              t("action.adding")
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                disabled={false}
                onClick={handleFormSubmit}
                size="small"
                color="success"
                style={{ marginLeft: "10px" }}
              >
                {/* {state?.action === DEF_ACTIONS.ADD ? <Add/> : <Edit/>} */}
                {/* <Add/> */}
                {t("action.save")}
              </Button>
              <Button
                onClick={resetForm}
                color="success"
                variant="contained"
                size="small"
                sx={{ marginLeft: "10px" }}
              >
                {t("action.reset")}
              </Button>
            </>
          )}
        </ActionWrapper>
      </ButtonWrapper>
      {/* <Box sx={{ padding: "20px" }}> */}
      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>{t("cropDiseasePage.diseaseName")}</FieldName>
            <TextField
              name="diseaseName"
              id="diseaseName"
              value={formData?.diseaseName || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "diseaseName")
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
        <Grid item sm={3} md={3} lg={5}>
          <FieldWrapper>
            <FieldName>{t("cropDiseasePage.diseaseType")}</FieldName>
            <TextField
              name="type"
              id="type"
              value={formData?.type || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "type")}
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
        <Grid item sm={3} md={3} lg={6}>
          <FieldWrapper>
            <FieldName>{t("cropDiseasePage.causalAgent")}</FieldName>
            <TextField
              name="causalAgent"
              id="causalAgent"
              value={formData?.causalAgent || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "causalAgent")
              }
              size="small"
              fullWidth
              multiline
              rows={6}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={5}>
          <FieldWrapper>
            <FieldName>{t("cropDiseasePage.vector")}</FieldName>
            <TextField
              name="vector"
              id="vector"
              value={formData?.vector || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "vector")}
              size="small"
              fullWidth
              multiline
              rows={6}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={6}>
          <FieldWrapper>
            <FieldName>{t("cropDiseasePage.affectedPart")}</FieldName>
            <TextField
              name="affectedPart"
              id="affectedPart"
              value={formData?.affectedPart || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "affectedPart")
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
        <Grid item sm={3} md={3} lg={10}>
          <FieldWrapper>
            <FieldName>{t("cropDiseasePage.symptoms")}</FieldName>
            <TextField
              name="symptom"
              id="symptom"
              value={formData?.symptom || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value || "", "symptom")}
              size="small"
              fullWidth
              multiline
              rows={10}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={10}>
          <FieldWrapper>
            <FieldName>{t("cropDiseasePage.management")}</FieldName>
            <TextField
              name="management"
              id="management"
              value={formData?.management || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "management")
              }
              size="small"
              fullWidth
              multiline
              rows={10}
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
      {/* </Box> */}
    </div>
  );
};

export default CropDiseaseForm;
