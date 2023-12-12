import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  get_ProvincialDoaList,
  handleProvincialDoa,
  updateProvincialDoa,
} from "../../../redux/actions/ProvincialDoa/action";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  getPaginationItemUtilityClass,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import {
  ActionWrapper,
  makeCapitalize,
} from "../../../components/PageLayout/ActionWrapper";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";
import {
  handleProvincialDdoa,
  updateProvincialDdoa,
} from "../../../redux/actions/provincialDdoa/action";
import { get_ASC } from "../../../redux/actions/asc/action";
import { handleAI } from "../../../redux/actions/aiRegion/action";
import {
  handleProvincialAI,
  updateProvincialAI,
} from "../../../redux/actions/provincialAI/action";
import { get_InterProvincialDoaList } from "../../../redux/actions/interProvincialDoa/action";
import { get_InterProvincialDdoaListByDoaId } from "../../../redux/actions/interProvincialDdoa/action";
import { get_InterProvincialAdaListByDdoaId } from "../../../redux/actions/interProvincialAda/action";
import BackToList from "../../../components/BackToList/BackToList";
import CustFormHeader from "../../../components/FormHeader/CustFormHeader";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import PageHeader from "../../../components/PageHeader/PageHeader";

const InterProvincialAiRegionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [ascList, setAscList] = useState([]);
  const [parentValue, setParentValue] = useState([]);

  const [doas, setDoas] = useState([]);
  const [ddoas, setDdoas] = useState([]);
  const [adas, setAdas] = useState([]);
  const [selectedDdoa, setSelectedDdoa] = useState({
    ddId: "",
    description: "",
  });
  const [selectedDoa, setSelectedDoa] = useState({
    doaId: "",
    description: "",
  });
  const [selectedAda, setSelectedAda] = useState({
    segmentId: "",
    description: "",
  });

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/inter-provincial-structure/inter-ai-region");
  };

  useEffect(() => {
    get_ASC().then(({ dataList = [] }) => {
      setAscList(dataList);
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
      setSelectedDoa({
        doaId: "",
        description: "",
      });
      setSelectedDdoa({
        ddId: "",
        description: "",
      });
      setSelectedAda({
        segmentId: "",
        description: "",
      });
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
          await updateProvincialAI(formData, onSuccess, onError);
        } else {
          const newFormData = {
            ...formData,
            parentType: "INTER_PROVINCIAL",
          };
          console.log(newFormData);
          await handleProvincialAI(newFormData, onSuccess, onError);
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
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    get_InterProvincialDoaList().then(({ dataList = [] }) => {
      console.log(dataList);
      setDoas(dataList);
    });
  }, []);

  const getDDOAS = (id) => {
    get_InterProvincialDdoaListByDoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDdoas(dataList);
    });
  };

  const getADAS = (id) => {
    get_InterProvincialAdaListByDdoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setAdas(dataList);
    });
  };

  return (
    <FormWrapper>
      <PageHeader saving={saving} state={state} goBack={goBack} formName="AI Region" />
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
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>Region ID</FieldName>
            <TextField
              name="regionId"
              id="regionId"
              value={formData?.regionId || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) => handleChange(e?.target?.value || "", "regionId")}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              inputProps={{ style: { textTransform: "uppercase" } }}
              size="small"
            />
          </FieldWrapper>
        </Grid>

        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>Description</FieldName>
            <TextField
              name="description"
              id="id"
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
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Select Inter Provincial Director</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={doas}
              value={selectedDoa}
              getOptionLabel={(i) => `${i?.doaId} - ${i?.description}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedDoa(value);
                setSelectedDdoa({ ddId: "", description: "" });
                setSelectedAda({
                  segmentId: "",
                  description: "",
                });
                getDDOAS(value.id);
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
            <FieldName>Select Inter Provincial DDOA</FieldName>
            <Autocomplete
              disabled={selectedDoa?.id == null}
              options={ddoas}
              value={selectedDdoa}
              getOptionLabel={(i) => `${i?.ddId} - ${i?.description}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedDdoa(value);
                setSelectedAda({
                  segmentId: "",
                  description: "",
                });
                getADAS(value.id);
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
            <FieldName>Inter Provincial Ada Segment</FieldName>
            <Autocomplete
              options={adas}
              disabled={selectedDdoa?.id == null}
              getOptionLabel={(i) => `${i?.segmentId} - ${i?.description}`}
              value={formData.interProvincialAdaSegmentDTO || selectedAda}
              onChange={(event, value) => {
                handleChange(value, "interProvincialAdaSegmentDTO");
              }}
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>ASC Region ID</FieldName>
            <Autocomplete
              options={ascList}
              getOptionLabel={(i) => `${i.code} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "");
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default InterProvincialAiRegionForm;
