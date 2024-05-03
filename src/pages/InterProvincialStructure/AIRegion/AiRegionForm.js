import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { get_ASC, get_ASCListByComId } from "../../../redux/actions/asc/action";
import { get_InterProvincialAdaListByDdoaId } from "../../../redux/actions/interProvincialAda/action";
import { get_InterProvincialDdoaListByDoaId } from "../../../redux/actions/interProvincialDdoa/action";
import { get_InterProvincialDoaList } from "../../../redux/actions/interProvincialDoa/action";
import {
  handleProvincialAI,
  updateProvincialAI,
} from "../../../redux/actions/provincialAI/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { getAll_districtCommissionerLevel } from "../../../redux/actions/districtComm/action";
import { get_provinceList } from "../../../redux/actions/province/action";
import { get_DistrictListByProvinceId } from "../../../redux/actions/district/action";
import { get_DsDivisionListById } from "../../../redux/actions/dsDivision/action";

const InterProvincialAiRegionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [ascList, setAscList] = useState([]);
  const [parentValue, setParentValue] = useState([]);
  const [dsdValue, setDsdValue] = useState([]);

  const [doas, setDoas] = useState([]);
  const [ddoas, setDdoas] = useState([]);
  const [adas, setAdas] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [provinceData, setprovinceData] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [dsDivitionData, setDsDivitionData] = useState([]);
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

  const [selectedDistrict, setSelectedDistrict] = useState({
    districtId: "",
    description: "",
  });
  const [selectectedArc, setSelectectedArc] = useState({
    ascId: "",
    name: "",
  });

  const [selectProvince, setSelectProvince] = useState({
    code: "",
    description: "",
  });

  const [selectedDistrictData, setSelectedDistrictData] = useState({
    code: "",
    name: "",
  });

  const [selectedDs, setSelectedDs] = useState({
    code: "",
    name: "",
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
      setSelectedDistrict({
        districtId: "",
        description: "",
      });
      setSelectectedArc({
        ascId: "",
        name: "",
      });
      setSelectProvince({
        code: "",
        description: "",
      });
      setSelectedDistrictData({
        code: "",
        name: "",
      });

      setSelectedDs({
        code: "",
        name: "",
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
          let deletedValue = formData?.ascRegionId;
          delete formData?.ascRegionId;
          const newFormData = {
            ...formData,
            parentType: "INTER_PROVINCIAL",
            ascRegionId: deletedValue?.id,
          };
          await handleProvincialAI(newFormData, onSuccess, onError);
          formData.ascRegionId = deletedValue;
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

  useEffect(() => {}, [formData]);

  useEffect(() => {
    get_InterProvincialDoaList().then(({ dataList = [] }) => {
      setDoas(dataList);
    });
  }, []);

  const getDDOAS = (id) => {
    get_InterProvincialDdoaListByDoaId(id).then(({ dataList = [] }) => {
      setDdoas(dataList);
    });
  };

  const getADAS = (id) => {
    get_InterProvincialAdaListByDdoaId(id).then(({ dataList = [] }) => {
      setAdas(dataList);
    });
  };

  useEffect(() => {
    getAll_districtCommissionerLevel().then(({ dataList = [] }) => {
      setDistrictData(dataList);
    });
  }, []);

  const getAscRegion = (id) => {
    get_ASCListByComId(id).then(({ dataList = [] }) => {
      setAscList(dataList);
    });
  };

  useEffect(() => {
    get_provinceList().then(({ dataList = [] }) => {
      setprovinceData(dataList);
    });
  }, []);

  const getDistrict = (id) => {
    get_DistrictListByProvinceId(id).then(({ dataList = [] }) => {
      setDistrictList(dataList);
    });
  };

  const get_dsList = (id) => {
    get_DsDivisionListById(id).then(({ dataList = [] }) => {
      setDsDivitionData(dataList);
    });
  };

  return (
    <FormWrapper>
      <PageHeader
        saving={saving}
        state={state}
        goBack={goBack}
        formName="AI Region"
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
        <Grid item lg={3}>
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
        <Grid
          container
          sx={{
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select Inter Provincial Director</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW}
                options={doas}
                value={selectedDoa}
                getOptionLabel={(i) => `${i?.doaId} - ${i?.description}`}
                onChange={(event, value) => {
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
        </Grid>
        <Grid
          container
          sx={{
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>District commissioner</FieldName>
              <Autocomplete
                options={districtData}
                value={selectedDistrict}
                getOptionLabel={(i) => `${i.districtId} - ${i.description}`}
                onChange={(event, value) => {
                  setSelectedDistrict(value);
                  setSelectectedArc({ ascId: "", name: "" });
                  getAscRegion(value.id);

                  // handleChange(value, "DistrictCom");
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
                // disabled={select}
                options={ascList}
                disabled={selectedDistrict?.id == null}
                getOptionLabel={(i) => `${i.ascId} - ${i.name}`}
                value={formData.ascRegionId || selectectedArc}
                onChange={(event, value) => {
                  handleChange(value, "ascRegionId");
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
        </Grid>

        <Grid
          container
          sx={{
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Province</FieldName>
              <Autocomplete
                options={provinceData}
                value={selectProvince}
                getOptionLabel={(i) => `${i.code} - ${i.description}`}
                onChange={(event, value) => {
                  setSelectProvince(value);
                  setSelectedDistrictData({ code: "", name: "" });
                  getDistrict(value.id);
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
              <FieldName>District</FieldName>
              <Autocomplete
                options={districtList}
                disabled={selectProvince?.id == null}
                value={selectedDistrictData}
                getOptionLabel={(i) => `${i.code} - ${i.name}`}
                onChange={(event, value) => {
                  setSelectedDistrictData(value);
                  setSelectedDs({
                    code: "",
                    name: "",
                  });
                  get_dsList(value.id);
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
              <FieldName>DS Divition</FieldName>
              <Autocomplete
                options={dsDivitionData}
                disabled={selectedDistrictData?.id == null}
                value={formData.dsDivisionDTO || selectedDs}
                getOptionLabel={(i) => `${i.code} - ${i.name}`}
                onChange={(event, value) => {
                  setDsdValue("id", value.id);
                  handleChange(value, "dsDivisionDTO");
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
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default InterProvincialAiRegionForm;
