import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  Grid,
  Autocomplete,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";

import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import {
  changeStatusBiWeekData,
  getAgriSeasons,
  handleCropLookSeason,
} from "../../../redux/actions/cropLook/season/action";
import BiWeekDataTable from "./BiWeekDataTable";

const CropLookSeasonForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
  const { addSnackBar } = useSnackBars();
  const dateAdapter = new AdapterDayjs();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...(state?.target || {}),
    startDate: state?.target?.startDate
      ? dateAdapter.date(state?.target?.startDate)
      : null,
    endDate: state?.target?.endDate
      ? dateAdapter.date(state?.target?.endDate)
      : null,
  });
  const [saving, setSaving] = useState(false);
  const [agriSeasons, setAgriSeasons] = useState([]);
  const [selectedAgriSeason, setSelectedAgriSeason] = useState({});
  const [biWeekDataList, setBiWeekDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seasonId, setSeasonId] = useState(null);

  useEffect(() => {
    setIsLoading(false);
  }, [biWeekDataList, seasonId]);

  useEffect(() => {
    getAgriSeasons().then(({ dataList = [] }) => {
      setAgriSeasons(dataList);
    });

    setIsLoading(true);
    setSelectedAgriSeason(state?.target?.agriSeason);
    setSeasonId(state?.target?.id);
    setBiWeekDataList(state?.target?.biWeekDataList);
  }, []);

  const goBack = () => {
    navigate("/crop-look/season");
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

      let sdate = new Date(formData.startDate);
      let edate = new Date(formData.endDate);

      try {
        if (formData?.id) {
          setIsLoading(true);
          const dataList = await handleCropLookSeason(
            {
              ...formData,
              startDate: sdate.valueOf() || null,
              endDate: edate.valueOf() || null,
              agriSeason: { id: selectedAgriSeason.id },
            },
            onSuccess,
            onError
          );
          console.log("updated crop season");
          console.log(dataList);
          setSeasonId(dataList?.id);
          setBiWeekDataList(dataList?.biWeekDataList);
        } else {
          setIsLoading(true);
          const dataList = await handleCropLookSeason(
            {
              ...formData,
              startDate: sdate.valueOf() || null,
              endDate: edate.valueOf() || null,
              agriSeason: { id: selectedAgriSeason.id },
            },
            onSuccess,
            onError
          );
          console.log("created crop season");
          console.log(dataList);
          setSeasonId(dataList?.id);
          setBiWeekDataList(dataList?.biWeekDataList);
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

  const statusChangeHandler = async (id, status) => {
    setIsLoading(true);
    const data = await changeStatusBiWeekData(
      seasonId,
      id,
      status,
      onSuccessBiWeek,
      onErrorBiWeek
    );
    setBiWeekDataList(data?.biWeekDataList);
  };

  const onSuccessBiWeek = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully change the status",
    });
    setSaving(false);
  };

  const onErrorBiWeek = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  return (
    <FormWrapper>
      <BackToList goBack={goBack} />
      <CustFormHeader
        saving={saving}
        state={state}
        formName="Crop Look Season"
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
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Season ID</FieldName>
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
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Description</FieldName>
            <TextField
              name="description"
              id="description"
              value={formData?.description || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "description")
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
            <FieldName>Agriculture Season</FieldName>
            <Autocomplete
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              options={agriSeasons}
              value={selectedAgriSeason}
              getOptionLabel={(i) => `${i.code}`}
              onChange={(event, value) => {
                setSelectedAgriSeason(value);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>Start Date</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              
                name="startDate"
                id="startDate"
                disabled={state?.action === DEF_ACTIONS.VIEW}
                slotProps={{ textField: { size: "small", error: false } }}
                value={formData?.startDate || ""}
                onChange={(newValue) =>
                  handleChange(newValue || "", "startDate")
                }
                in="DD-MM-YYYY"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FieldWrapper>
            <FieldName>End Date</FieldName>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="endDate"
                id="endDate"
                disabled={state?.action === DEF_ACTIONS.VIEW}
                value={formData?.endDate || ""}
                onChange={(newValue) => handleChange(newValue || "", "endDate")}
                slotProps={{ textField: { size: "small", error: false } }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </LocalizationProvider>
          </FieldWrapper>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          {!isLoading ? (
            <BiWeekDataTable
              biWeekDataList={biWeekDataList}
              statusChangeHandler={statusChangeHandler}
              mode={state?.action}
            />
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default CropLookSeasonForm;
