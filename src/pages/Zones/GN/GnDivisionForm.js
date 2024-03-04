import {
  Autocomplete,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleGnDivision,
  updateGnDivision,
} from "../../../redux/actions/gnDivision/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";

// import { get_mahaweliBlockList } from "../../../redux/actions/mahaweliSystem/mahaweliBlock/action";
import { get_agroEcoList } from "../../../redux/actions/agroEco/action";
import {
  get_DistrictList,
  get_DistrictListByProvinceId,
} from "../../../redux/actions/district/action";

import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { get_ProvincialDoaList } from "../../../redux/actions/ProvincialDoa/action";
import { get_AiRegionList } from "../../../redux/actions/aiRegion/action";
import {
  get_arpaList,
  get_arpaListByAscId,
} from "../../../redux/actions/arpa/action";
import { get_ASCListByComId } from "../../../redux/actions/asc/action";
import { get_DistrictCommList } from "../../../redux/actions/districtComm/action";
import { get_DsDivisionListByDistrictId } from "../../../redux/actions/dsDivision/action";
import { get_InterProvincialAdaListByDdoaId } from "../../../redux/actions/interProvincialAda/action";
import { get_InterProvincialDdoaListByDoaId } from "../../../redux/actions/interProvincialDdoa/action";
import { get_InterProvincialDoaList } from "../../../redux/actions/interProvincialDoa/action";
import { get_MahaweliBlockListBySystemId } from "../../../redux/actions/mahaweliBlock/action";
import { get_MahaweliSystemList } from "../../../redux/actions/mahaweliSystem/action";
import {
  get_MahaweliUnitList,
  get_MahaweliUnitListByBlockId,
} from "../../../redux/actions/mahaweliUnit/action";
import { get_ProvinceList } from "../../../redux/actions/province/action";
import {
  get_InterProvincialAIListByAdaId,
  get_ProvincialAIListByAdaId,
} from "../../../redux/actions/provincialAI/action";
import { get_ProvincialAdaListByDdoaId } from "../../../redux/actions/provincialAda/action";
import { get_ProvincialDdoaListByDoaId } from "../../../redux/actions/provincialDdoa/action";
import { getCalendarPickerSkeletonUtilityClass } from "@mui/lab";
import { ViewCarouselTwoTone } from "@mui/icons-material";
import { Fonts } from "../../../utils/constants/Fonts";

const GnDivisionForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  console.log(state);

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [mahaweliUnitList, setMahaweliUnitList] = useState([]);
  const [dsDivisionList, setDsDivisionList] = useState([]);
  const [agroEcoList, setAgroEcoList] = useState([]);

  const [aiRegionList, setAiRegionList] = useState([]);
  const [arpaList, setArpaList] = useState([]);
  const [dsOptions, setDsOptions] = useState([]);
  const [districs, setDistrics] = useState([]);
  const [dsDivisions, setDsDivisions] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState({
    name: "",
    code: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: "",
    code: "",
  });
  
  const [selectedDsDevision, setSelectedDsDevision] = useState({
    name: "",
    code: "",
  });




  const [doas, setDoas] = useState([]);
  const [ddoas, setDdoas] = useState([]);
  const [adas, setAdas] = useState([]);
 const [selectedDdoa, setSelectedDdoa] = useState({
  provincialDdId: "",
  description: "",
  }); 
  const [selectedDoa, setSelectedDoa] = useState({
    proDirectorId: "",
    description: "",
  });
    const [selectedAda, setSelectedAda] = useState({
    provinceSegmentId: "",
    description: "",
  });
  
  const [interProDoas, setInterProDoas] = useState([]);
  const [interProDdoas, setInterProDdoas] = useState([]);
  const [interProAdas, setInterProAdas] = useState([]);
  const [selectedInterProDdoa, setSelectedInterProDdoa] = useState({
    ddId: "",
    description: "",
  });
  const [selectedInterProDoa, setSelectedInterProDoa] = useState({
    doaId: "",
    description: "",
  });
  const [selectedInterProAda, setSelectedInterProAda] = useState({
    segmentId: "",
    description: "",
  });

  const [doaType, setDoaType] = useState("");

  const [aiRegions, setAiRegions] = useState([]);
  const [selectedAiRegion, setSelectedAiRegion] = useState({
    regionId: "",
    description: "",
  });

  const [mahaweliSystems, setMahaweliSystems] = useState([]);
  const [mahaweliBlocks, setMahaweliBlocks] = useState([]);

  const [selectedSystem, setSelectedSystem] = useState({
    systemId: "",
    description: "",
  });
  const [selectedBlock, setSelectedBlock] = useState({
    code: "",
    description: "",
  });

  const [selectedMahaweliUnit, setSelectedMahaweliUnit] = useState({
    unitId: "",
    description: "",
  });

  const [dcomms, setDcomms] = useState([]);
  const [selectedDcomm, setSelectedDcomm] = useState({
    districtCommId: "",
    name: "",
  });
  const [ascDivisions, setAscDivisions] = useState([]);
  const [selectedAscDivision, setSelectedAscDivision] = useState({
    ascId: "",
    name: "",
  });

  const [arps, setArps] = useState([]);
  const [selectedArp, setSelectedArp] = useState({
    arpaId: "",
    name: "",
  });

  const [selectedAgriEcoZone, setSelectedAgriEcoZone] = useState({
    aeZoneId: "",
    name: "",
  });

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/ga-structure/gn-division");
  };

  useEffect(() => {
    if (state.isProvincial) {
      setDoaType("PROVINCIAL");
      // handleChange("PROVINCIAL", "gnDivisionType");
    }
    if (state.isIntProvincial) {
      setDoaType("INTER_PROVINCIAL");
      // handleChange("INTER_PROVINCIAL", "gnDivisionType");
    }
    if (state.isMahaweli) {
      setDoaType("MAHAWELI");
      // handleChange("MAHAWELI", "gnDivisionType");
    }
  


    console.log("1111111111111111", formData);
  }, []);

  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
        setSelectedAda({
            provinceSegmentId: formData?.aiRegionsDTO?.provincialAdaSegmentDTO?.provinceSegmentId || "",
            description: formData?.aiRegionsDTO?.provincialAdaSegmentDTO?.description || ""
        });
    }
  }, []);
  
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedDdoa({
        provincialDdId: formData?.aiRegionsDTO?.provincialAdaSegmentDTO?.proDeputyDirectorLevelDTO?.provincialDdId || "",
        description: formData?.aiRegionsDTO?.provincialAdaSegmentDTO?.proDeputyDirectorLevelDTO?.description || ""
        });
    }
  }, []);
  
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedDoa({
        proDirectorId: formData?.aiRegionsDTO?.provincialAdaSegmentDTO?.proDeputyDirectorLevelDTO?.proDirectorLevelDTO?.proDirectorId || "",
        description: formData?.aiRegionsDTO?.provincialAdaSegmentDTO?.proDeputyDirectorLevelDTO?.proDirectorLevelDTO?.description || ""
        });
    }
  }, []);
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedInterProAda({
        segmentId: formData?.aiRegionsDTO?.interProvincialAdaSegmentDTO?.segmentId || "",
        description: formData?.aiRegionsDTO?.interProvincialAdaSegmentDTO?.description || ""
        });
    }
  }, []);
  
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedInterProDdoa({
        ddId: formData?.aiRegionsDTO?.interProvincialAdaSegmentDTO?.interProvinceDeputyDirectorLevelDTO?.ddId || "",
        description: formData?.aiRegionsDTO?.interProvincialAdaSegmentDTO?.interProvinceDeputyDirectorLevelDTO?.description || ""
        });
    }
  }, []);
  
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedInterProDoa({
        doaId: formData?.aiRegionsDTO?.interProvincialAdaSegmentDTO?.interProvinceDeputyDirectorLevelDTO?.directorDoaDTO?.doaId || "",
        description: formData?.aiRegionsDTO?.interProvincialAdaSegmentDTO?.interProvinceDeputyDirectorLevelDTO?.directorDoaDTO?.description || ""
        });
    }
  }, []);
  
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedAscDivision({
        ascId: formData?.arpaDTO?.ascDto?.ascId ||"",
        name: formData?.arpaDTO?.ascDto?.name ||""
        });
    }
  }, []);
  
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedDcomm({
        districtCommId: formData?.arpaDTO?.ascDto?.districtCommissionerLevelDTO?.districtCommId ||"",
        name: formData?.arpaDTO?.ascDto?.districtCommissionerLevelDTO?.name ||""
        });
    }
  }, []);
  
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedDistrict({
        code: formData?.dsDivisionDTO?.districtDTO?.code ||"",
        name: formData?.dsDivisionDTO?.districtDTO?.name||"",
        });
    }
  }, []);
  
  useEffect(() => {
    if (state.action !== DEF_ACTIONS.ADD) {
      setSelectedProvince({
        code: formData?.dsDivisionDTO?.districtDTO?.provinceDTO?.code ||"",
        name: formData?.dsDivisionDTO?.districtDTO?.provinceDTO?.name||"",
        });
    }
  }, []);
  

  useEffect(() => {
    get_MahaweliUnitList().then(({ dataList = [] }) => {
      setMahaweliUnitList(dataList);
    });
  }, []);

  useEffect(() => {
    get_DistrictList().then(({ dataList = [] }) => {
      setDsDivisionList(dataList);
    });
  }, []);

  useEffect(() => {
    get_agroEcoList().then(({ dataList = [] }) => {
      setAgroEcoList(dataList);
    });
  }, []);

  useEffect(() => {
    get_AiRegionList().then(({ dataList = [] }) => {
      setAiRegionList(dataList);
    });
  }, []);

  useEffect(() => {
    get_arpaList().then(({ dataList = [] }) => {
      setArpaList(dataList);
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
    console.log(formData);
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateGnDivision(formData, onSuccess, onError);
        } else {
          console.log(formData);
          await handleGnDivision(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    get_ProvinceList().then(({ dataList = [] }) => {
      console.log(dataList);
      setProvinces(dataList);
    });
  }, []);

  const getDistricts = (id) => {
    get_DistrictListByProvinceId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDistrics(dataList);
    });
  };
  const getDsDivisions = (id) => {
    get_DsDivisionListByDistrictId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDsDivisions(dataList);
    });
  };

  useEffect(() => {
    get_ProvincialDoaList().then(({ dataList = [] }) => {
      console.log(dataList);
      setDoas(dataList);
    });
  }, []);

  useEffect(() => {
    get_InterProvincialDoaList().then(({ dataList = [] }) => {
      console.log(dataList);
      setInterProDoas(dataList);
    });
  }, []);

  const getDDOAS = (id) => {
    get_ProvincialDdoaListByDoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDdoas(dataList);
    });
  };

  const getADAS = (id) => {
    get_ProvincialAdaListByDdoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setAdas(dataList);
    });
  };

  const getInterProDDOAS = (id) => {
    get_InterProvincialDdoaListByDoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setInterProDdoas(dataList);
    });
  };

  const getInterProADAS = (id) => {
    get_InterProvincialAdaListByDdoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setInterProAdas(dataList);
    });
  };

  const resetProAndIntProFields = () => {
    setSelectedDoa({
      proDirectorId: "",
      description: "",
    });
    setSelectedDdoa({ provincialDdId: "", description: "" });
    setSelectedAda({ provinceSegmentId: "", description: "" });
    setSelectedInterProDdoa({ ddId: "", description: "" });
    setSelectedInterProAda({ segmentId: "", description: "" });
    setSelectedInterProDoa({ doaId: "", description: "" });
    setSelectedSystem({ systemId: "", description: "" });
    setSelectedBlock({ code: "", description: "" });
    resetAiRegion();
  };

  const resetAiRegion = () => {
    setFormData({
      ...formData,
      aiRegionsDTO: { regionId: "", description: "" },
    });
  };

  const resetDsDivision= () => {
    setFormData({
      ...formData,
      dsDivisionDTO:{code:"",name:""}
    });
  };

  const getAiRegions = (value) => {
    console.log(doaType + " " + value);
    if (doaType === "PROVINCIAL") {
      get_ProvincialAIListByAdaId(value.id).then(({ dataList = [] }) => {
        console.log(dataList);
        setAiRegions(dataList);
      });
    }
    if (doaType === "INTER_PROVINCIAL") {
      get_InterProvincialAIListByAdaId(value.id).then(({ dataList = [] }) => {
        console.log(dataList);
        setAiRegions(dataList);
      });
    }
  };
  useEffect(() => {
    get_MahaweliSystemList().then(({ dataList = [] }) => {
      console.log(dataList);
      setMahaweliSystems(dataList);
    });
  }, []);

  const getBlocks = (id) => {
    get_MahaweliBlockListBySystemId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setMahaweliBlocks(dataList);
    });
  };

  const getMahaweliUnits = (id) => {
    get_MahaweliUnitListByBlockId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setMahaweliUnitList(dataList);
    });
  };

  useEffect(() => {
    get_DistrictCommList().then(({ dataList = [] }) => {
      setDcomms(dataList);
    });
  }, []);

  const getAscDivisions = (id) => {
    get_ASCListByComId(id).then(({ dataList = [] }) => {
      setAscDivisions(dataList);
    });
  };

  const getArps = (id) => {
    get_arpaListByAscId(id).then(({ dataList = [] }) => {
      setArps(dataList);
    });
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
    <FormWrapper style={{ overflowY: "scroll" }}>
      <PageHeader
        goBack={goBack}
        saving={saving}
        state={state}
        formName="Grama Nildari Division"
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
          marginY: "0px",
        }}
      >
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>GN Division Code</FieldName>
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
              inputProps={{ style: { textTransform: "uppercase" } }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>GN Division Name</FieldName>
            <TextField
              name="name"
              id="name"
              value={formData?.name || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
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
        <Grid item lg={4}></Grid>
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
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>Province</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={provinces}
              value={selectedProvince}
              getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
              onChange={(event, value) => {
               console.log(value);
               setSelectedProvince(value);
               setSelectedDistrict({ name: "", code: "" });
               setSelectedDsDevision({ name: "", code: "" });
               resetDsDivision();
               getDistricts(value.id);
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
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>District</FieldName>
            <Autocomplete
              disabled={selectedProvince?.id == null}
              options={districs}
              value={selectedDistrict}
              getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedDistrict(value);
                setSelectedDsDevision({ name: "", code: "" });
               
                getDsDivisions(value.id);
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
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>DS Division</FieldName>
            <Autocomplete
              disabled={selectedDistrict?.id == null}
              options={dsDivisions}
              value={formData.dsDivisionDTO || selectedDsDevision}
              getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
              onChange={(event, value) => {
                console.log(value);
               handleChange(value || "", "dsDivisionDTO");
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
      </Grid>

      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          marginY: "0px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        {state.isAdmin || state.isAgrarian || state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Agriculture Structure Type</FieldName>
              <Select
                name="doaType"
                id="doaType"
                value={formData?.gnDivisionType || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => {
                  setDoaType(e.target.value || "userSelectedType");
                  resetProAndIntProFields();
                }}
                fullWidth
                sx={{
                  borderRadius: "8px",
                }}
                size="small"
              >
                <MenuItem value={"PROVINCIAL"}> Provincial</MenuItem>
                <MenuItem value={"INTER_PROVINCIAL"}>Inter Provincial</MenuItem>
                <MenuItem value={"MAHAWELI"}>Mahaweli</MenuItem>
              </Select>
            </FieldWrapper>
          </Grid>
        ) : null}
        {state.isAdmin || state.isAgrarian || state.isEcoz ? (
          <Grid item lg={4}></Grid>
        ) : null}
        {state.isAdmin || state.isAgrarian || state.isEcoz ? (
          <Grid item lg={4}></Grid>
        ) : null}
        {state.isProvincial ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Provincial DOA</FieldName>
              <Autocomplete
                disabled={doaType !== "PROVINCIAL" && !state.isProvincial}
                options={doas}
                value={selectedDoa}
                getOptionLabel={(i) =>
                  `${i?.proDirectorId} - ${i?.description}`
                }
                onChange={(event, value) => {
                  console.log(value);
                  if(value){
                    console.log("provinceSegmentId:", value.proDirectorId);
                    console.log("description:", value.description);
                  }
                  setSelectedDoa(value);
                  setSelectedDdoa({ provincialDdId: "", description: "" });
                  setSelectedAda({ provinceSegmentId: "", description: "" });
                  resetAiRegion();
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
        ) : (
          ""
        )}
        {state.isProvincial ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
             <FieldName>Provincial DDOA</FieldName>
             <Autocomplete
              disabled={selectedDoa?.id == null}
              options={ddoas}
              value={selectedDdoa}
              getOptionLabel={(i) =>
               `${i?.provincialDdId} - ${i?.description}`
              }
              onChange={(event, value) => {
                console.log("Selected Value:", value);
                if (value) {
                 console.log("provincialDdId:", value.provincialDdId);
                 console.log("description:", value.description);
                }
                 setSelectedDdoa(value)
                 setSelectedAda({ provinceSegmentId: "", description: "" });
                 resetAiRegion();
                 getADAS(value?.id);
                 
                 
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
        ) : (
          ""
        )}
        {state.isProvincial ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Provincial ADA</FieldName>
              <Autocomplete
                disabled={selectedDdoa?.id == null}
                options={adas}
                value={selectedAda}
                getOptionLabel={(i) =>
                  `${i?.provinceSegmentId} - ${i?.description}`
                }
                onChange={(event, value) => {
                  console.log("Selected Value:",value);
                  if(value){
                    console.log("provinceSegmentId:", value.provinceSegmentId);
                    console.log("description:", value.description);
                  }

              
                  setSelectedAda(value);
                  getAiRegions(value);
                  resetAiRegion();
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
        ) : (
          ""
        )}
        {state.isProvincial ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>AI Region</FieldName>
              <Autocomplete
                disabled={selectedAda?.id == null}
                options={aiRegions}
                value={formData.aiRegionsDTO || selectedAiRegion}
                getOptionLabel={(i) => `${i?.regionId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  handleChange(value, "aiRegionsDTO");
                  handleChange("PROVINCIAL", "gnDivisionType");
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
        ) : (
          ""
        )}
        {state.isIntProvincial ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Director DOA</FieldName>
              <Autocomplete
                disabled={
                  doaType !== "INTER_PROVINCIAL" && !state.isIntProvincial
                }
                options={interProDoas}
                value={selectedInterProDoa}
                getOptionLabel={(i) => `${i?.doaId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedInterProDoa(value);
                  setSelectedInterProDdoa({ ddId: "", description: "" });
                  setSelectedInterProAda({ segmentId: "", description: "" });
                  resetAiRegion();
                  getInterProDDOAS(value.id);
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
        ) : null}
        {state.isIntProvincial ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Inter Provincial DDOA</FieldName>
              <Autocomplete
                disabled={selectedInterProDoa?.id == null}
                options={interProDdoas}
                value={selectedInterProDdoa}
                getOptionLabel={(i) => `${i?.ddId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log("Selected Value:",value);
                  if(value){
                    console.log("ddID:", value.ddId);
                    console.log("description:", value.description);
                  }
                  setSelectedInterProDdoa(value);
                  setSelectedInterProAda({ segmentId: "", description: "" });
                  resetAiRegion();
                  getInterProADAS(value.id);
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
        ) : null}
        {state.isIntProvincial ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Inter Provincial ADA</FieldName>
              <Autocomplete
                disabled={selectedInterProDdoa?.id == null}
                options={interProAdas}
                value={selectedInterProAda}
                getOptionLabel={(i) =>
                  `${i?.segmentId} - ${i?.description}`
                }
                onChange={(event, value) => {
                 
                  console.log("Selected Value:",value);
                  if(value){
                    console.log("segmentID:", value.segmentId);
                    console.log("description:", value.description);
                  }
                  setSelectedInterProAda(value);
                  resetAiRegion();
                  getAiRegions(value);
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
        ) : null}
        {state.isIntProvincial ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>AI Region</FieldName>
              <Autocomplete
                disabled={selectedInterProAda?.id == null}
                options={aiRegions}
                value={formData.aiRegionsDTO || selectedAiRegion}
                getOptionLabel={(i) =>
                 `${i?.regionId} - ${i?.description}`
                }
                onChange={(event, value) => {
                  console.log(value);
                  handleChange(value, "aiRegionsDTO");
                  handleChange("INTER_PROVINCIAL", "gnDivisionType");
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
        ) : null}
        {state.isMahaweli ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={4}>
            <FieldWrapper>
              <FieldName>Mahaweli System</FieldName>
              <Autocomplete
                disabled={doaType !== "MAHAWELI" && !state.isMahaweli}
                options={mahaweliSystems}
                value={selectedSystem}
                getOptionLabel={(i) => `${i?.systemId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedSystem(value);
                  getBlocks(value.id);
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
        ) : null}
        {state.isMahaweli ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item lg={4}>
            <FieldWrapper>
              <FieldName>Mahaweli Block</FieldName>
              <Autocomplete
                disabled={selectedSystem?.id == null}
                options={mahaweliBlocks}
                value={selectedBlock}
                getOptionLabel={(i) => `${i?.code} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedBlock(value);

                  getMahaweliUnits(value.id);
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
        ) : null}
        {state.isMahaweli ||
        state.isAdmin ||
        state.isAgrarian ||
        state.isEcoz ? (
          <Grid item sm={3} md={3} lg={4}>
            <FieldWrapper>
              <FieldName>Mahaweli Unit</FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  selectedBlock?.id == null
                }
                options={mahaweliUnitList}
                value={formData.mahaweliUnitDTO || selectedMahaweliUnit}
                getOptionLabel={(i) => `${i.unitId} - ${i.description}`}
                onChange={(event, value) => {
                  handleChange(value, "mahaweliUnitDTO");
                  handleChange("MAHAWELI", "gnDivisionType");
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
        ) : null}
      </Grid>
      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          marginTop: "10px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FormControl fullWidth>
              <FieldName>District Commissioner</FieldName>
              <Autocomplete
                disabled={state?.action === DEF_ACTIONS.VIEW}
                options={dcomms}
                value={selectedDcomm}
                getOptionLabel={(i) => `${i.districtCommId} - ${i.name}`}
                onChange={(event, value) => {
                  setSelectedDcomm(value);
                  setSelectedAscDivision({
                    ascId: "",
                    name: "",
                  });
                  getAscDivisions(value.id);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                disableClearable
                size="small"
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </FormControl>
          </FieldWrapper>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FormControl fullWidth>
              <FieldName>ASC Division </FieldName>
              <Autocomplete
                disabled={
                  state?.action === DEF_ACTIONS.VIEW || selectedDcomm.id == null
                }
                options={ascDivisions}
                value={formData?.ascDto || selectedAscDivision}
                getOptionLabel={(i) => `${i.ascId} - ${i.name}`}
                onChange={(event, value) => {
                  handleChange(value, "ascDto");
                  setSelectedAscDivision(value);
                  getArps(value.id);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                disableClearable
                size="small"
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </FormControl>
          </FieldWrapper>
        </Grid>
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>ARPA Area</FieldName>
            <Autocomplete
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                selectedAscDivision.id == null
              }
              options={arps}
              value={formData.arpaDTO || selectedArp}
              getOptionLabel={(i) => `${i.arpaId} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "arpaDTO");
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              disableClearable
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          marginTop: "0px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName>Agri Eco Zone</FieldName>
            <Autocomplete
              disabled={state?.action === DEF_ACTIONS.VIEW}
              options={agroEcoList}
              value={formData?.agroEcologicalZoneDTO || selectedAgriEcoZone}
              getOptionLabel={(i) => `${i.aeZoneId} - ${i.name}`}
              onChange={(event, value) => {
                handleChange(value, "agroEcologicalZoneDTO");
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              disableClearable
              renderInput={(params) => <TextField {...params} size="small" />}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          border: "1px solid #bec0c2",
          margin: "15px",
          marginTop: "0px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={4} md={4} lg={4}>
          <FieldWrapper>
            <FieldName>Total Households</FieldName>
            <TextField
              name="totalHouseholds"
              id="totalHouseholds"
              value={formData?.totalHouseholds || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                handleChange(value, "totalHouseholds");
              }}
              InputProps={{
                inputProps: { min: 0 },
              }}
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
            <FieldName>Total Population</FieldName>
            <TextField
              name="totalPopulation"
              id="totalPopulation"
              value={formData?.totalPopulation || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                // console.log(e?.target?.value);
                const value = parseFloat(e.target.value) || 0;
                handleChange(value, "totalPopulation");
              }}
              InputProps={{
                inputProps: { min: 0 },
              }}
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
            <FieldName>Male Population</FieldName>
            <TextField
              name="malePopulation"
              id="malePopulation"
              value={formData?.malePopulation || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                handleChange(value, "malePopulation");

                // Calculate and update female population
                const totalPopulation =
                  parseFloat(formData?.totalPopulation) || 0;
                const femalePopulation = totalPopulation - value;
                handleChange(femalePopulation, "femalePopulation");
              }}
              InputProps={{
                inputProps: { min: 0 },
              }}
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
            <FieldName>Female Population</FieldName>
            <TextField
              name="femalePopulation"
              id="femalePopulation"
              value={formData?.femalePopulation || ""}
              fullWidth
              type="number"
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                handleChange(value, "femalePopulation");
              }}
              InputProps={{
                inputProps: { min: 0 },
              }}
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
          marginTop: "0px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>measurement type</FieldName>

            <Select
              value={formData?.userSelectedUnit || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "userSelectedUnit")
              }
              sx={{
                borderRadius: "8px",
              }}
              size="small"
              fullWidth
            >
              <MenuItem value={"SQUARE_METERS"}>Square meters</MenuItem>
              <MenuItem value={"ACRES"}>Acres</MenuItem>
              <MenuItem value={"HECTARES"}>Hectares</MenuItem>
              <MenuItem value={"PERCH"}>Perch</MenuItem>
              <MenuItem value={"SQUARE_FEET"}>Square feet</MenuItem>
            </Select>
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Land Area</FieldName>
            <TextField
              name="landArea"
              id="landArea"
              value={formData?.landArea || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                handleChange(value, "landArea");
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
              type="number"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Agriculture Land Area</FieldName>

            <TextField
              name="agriculturalLandArea"
              id="agriculturalLandArea"
              value={formData?.agriculturalLandArea || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                handleChange(value, "agriculturalLandArea");
                const landArea = parseFloat(formData?.landArea) || 0;
                const nonAgriculturalLandArea = landArea - value;
                handleChange(
                  nonAgriculturalLandArea,
                  "nonAgriculturalLandArea"
                );
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
              type="number"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Non - Agriculture Land Area</FieldName>

            <TextField
              name="nonAgriculturalLandArea"
              id="nonAgriculturalLandArea"
              value={formData?.nonAgriculturalLandArea || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                handleChange(value, "nonAgriculturalLandArea");
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
              type="number"
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Crop Area</FieldName>

            <TextField
              name="cropArea"
              id="cropArea"
              value={formData?.cropArea || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                handleChange(value, "cropArea");
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
              size="small"
              type="number"
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
    </div>
  );
};

export default GnDivisionForm;
