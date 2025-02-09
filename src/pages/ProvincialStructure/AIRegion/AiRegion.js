import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Grid,
  TextField,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { get_ProvincialDoaList } from "../../../redux/actions/ProvincialDoa/action";
import { RestartAlt } from "@mui/icons-material";
import ProvincialAiRegionList from "./AiRegionList";
import { deleteProvincialAI } from "../../../redux/actions/provincialAI/action";
import { get_ProvincialDdoaListByDoaId } from "../../../redux/actions/provincialDdoa/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_ProvincialAdaListByDdoaId } from "../../../redux/actions/provincialAda/action";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import SearchBox from "../../../components/SearchBox/SearchBox";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";

const ProvincialAiRegion = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [dataEndPoint, setDataEndPoint] = useState(
    "geo-data/ai-region/get-by-parent/PROVINCIAL"
  );
  const [selectedProvincialAI, setSelectedProvincialAI] = useState([]);
  const [dialogSelectedProvincialAI, setDialogSelectedProvincialAI] = useState(
    []
  );

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [doas, setDoas] = useState([]);
  const [ddoas, setDdoas] = useState([]);
  const [adas, setAdas] = useState([]);
  const [selectedDdoa, setSelectedDdoa] = useState({
    provincialDdId: "",
    description: "",
    id: null,
  });
  const [selectedDoa, setSelectedDoa] = useState({
    proDirectorId: "",
    description: "",
    id: null,
  });
  console.log({ selectedDoa });
  const [selectedAda, setSelectedAda] = useState({
    provinceSegmentId: "",
    description: "",
    id: null,
  });

  const toggleProvincialAISelect = (component) => {
    setSelectedProvincialAI((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };

  const selectAllProvincialAI = (all = []) => {
    setSelectedProvincialAI(all);
  };

  const resetSelectedProvincialAI = () => {
    setSelectedProvincialAI([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/provincial-structure/ai-region-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/provincial-structure/ai-region-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvincialAI[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/provincial-structure/ai-region-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvincialAI[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedProvincialAI(selectedProvincialAI);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedProvincialAI([]);
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully deleted",
    });
  };

  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "Failed to delete",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const provincialAI of dialogSelectedProvincialAI) {
        await deleteProvincialAI(provincialAI.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedProvincialAI();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    get_ProvincialDoaList().then(({ dataList = [] }) => {
      console.log(dataList);
      setDoas(dataList);
    });
  }, []);

  const resetFilter = () => {
    setSelectedDoa({
      proDirectorId: "",
      description: "",
    });
    setSelectedDdoa({
      provincialDdId: "",
      description: "",
    });
    setSelectedAda({ provinceSegmentId: "", description: "" });
    setDataEndPoint("geo-data/ai-region/get-by-parent/PROVINCIAL");
  };

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

  const getFilteredData = (selectedAda) => {
    // setDataEndPoint(
    //   `geo-data/ai-region/get-by-parent/PROVINCIAL/` + selectedAda?.id
    // );
  };

  const handleSearch = (searchText) => {
    let url = dataEndPoint;
    const searchTextParam = "searchText=" + encodeURIComponent(searchText);

    if (url.includes("searchText=")) {
      url = url.replace(/searchText=[^&]+/, searchTextParam);
    } else {
      url += (url.includes("?") ? "&" : "?") + searchTextParam;
    }

    setDataEndPoint(url);
  };

  const filter = () => {
    if (selectedDoa?.id) {
      setDataEndPoint(
        `geo-data/ai-region/provincial-doa?proDirectorLevelId=${selectedDoa?.id}`
      );
    }

    if (selectedDoa?.id && selectedDdoa?.id) {
      setDataEndPoint(
        `geo-data/ai-region/provincial-doa?proDeputyDirectorLevelId=${selectedDdoa?.id}`
      );
    }

    if (selectedDoa?.id && selectedDdoa?.id && selectedAda?.id) {
      setDataEndPoint(
        `geo-data/ai-region/provincial-doa?provincialAdaSegmentId=${selectedAda?.id}`
      );
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
      <ListHeader title="AI Region" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.AI_REGION}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedProvincialAI.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.AI_REGION}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedProvincialAI.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.AI_REGION}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedProvincialAI.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.AI_REGION}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select Provincial DOA</FieldName>
              <Autocomplete
                options={doas}
                value={selectedDoa}
                getOptionLabel={(i) =>
                  `${i?.proDirectorId} - ${i?.description}`
                }
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDoa(value);
                  setSelectedDdoa({ provincialDdId: "", description: "" });
                  setSelectedAda({ provinceSegmentId: "", description: "" });
                  getDDOAS(value.id);
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
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
              <FieldName>Select Provincial DDOA</FieldName>
              <Autocomplete
                disabled={selectedDoa?.id == null}
                options={ddoas}
                value={selectedDdoa}
                getOptionLabel={(i) =>
                  `${i?.provincialDdId} - ${i?.description}`
                }
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDdoa(value);
                  setSelectedAda({ provinceSegmentId: "", description: "" });
                  getADAS(value.id);
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
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
              <FieldName>Select Provincial ADA</FieldName>
              <Autocomplete
                disabled={selectedDdoa?.id == null}
                options={adas}
                value={selectedAda}
                getOptionLabel={(i) =>
                  `${i?.provinceSegmentId} - ${i?.description}`
                }
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedAda(value);
                  getFilteredData(value);
                }}
                fullWidth
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </FieldWrapper>
          </Grid>

          <Grid item>
            <FieldWrapper>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={filter}
                sx={{ marginTop: "40px" }}
              >
                <FilterAltIcon />
                Filter
              </Button>
            </FieldWrapper>
          </Grid>
          <Grid item>
            <Button
              color="success"
              variant="contained"
              size="small"
              onClick={resetFilter}
              sx={{ marginTop: "40px" }}
            >
              <RestartAlt />
              Reset
            </Button>
          </Grid>
          <SearchBox handleSearch={handleSearch} />
        </Grid>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AI_REGION}`}
      >
        {loading === false && (
          <ProvincialAiRegionList
            selectedRows={selectedProvincialAI}
            onRowSelect={toggleProvincialAISelect}
            selectAll={selectAllProvincialAI}
            unSelectAll={resetSelectedProvincialAI}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedProvincialAI}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedProvincialAI}
        dialogSelectedTypes={dialogSelectedProvincialAI}
        propertyId="regionId"
        propertyDescription="description"
      />
    </div>
  );
};

export default ProvincialAiRegion;
