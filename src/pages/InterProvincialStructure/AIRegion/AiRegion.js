import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { ActionButton } from "../../../components/ActionButtons/ActionButton";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import {
  deleteProvincialDoa,
  get_ProvincialDoaList,
} from "../../../redux/actions/ProvincialDoa/action";
import { Add, Delete, Edit, RestartAlt, Vrpano } from "@mui/icons-material";
import InterProvincialAiRegionList from "./AiRegionList";
import { deleteProvincialAI } from "../../../redux/actions/provincialAI/action";
import { get_ProvincialDdoaListByDoaId } from "../../../redux/actions/provincialDdoa/action";
import { get_ProvincialAdaListByDdoaId } from "../../../redux/actions/provincialAda/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_InterProvincialDdoaListByDoaId } from "../../../redux/actions/interProvincialDdoa/action";
import { get_InterProvincialAdaListByDdoaId } from "../../../redux/actions/interProvincialAda/action";
import { get_InterProvincialDoaList } from "../../../redux/actions/interProvincialDoa/action";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import SearchBox from "../../../components/SearchBox/SearchBox";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";
import { downloadProvincialAIExcel } from "../../../redux/actions/aiRegion/action";

const InterProvincialAiRegion = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [dataEndPoint, setDataEndPoint] = useState(
    "geo-data/ai-region/get-by-parent/INTER_PROVINCIAL"
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
    ddId: "",
    description: "",
  });
  console.log({ selectedDdoa });
  const [selectedDoa, setSelectedDoa] = useState({
    doaId: "",
    description: "",
  });
  console.log({ selectedDoa });
  const [selectedAda, setSelectedAda] = useState({
    segmentId: "",
    description: "",
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

  const selectAllProvincialAI = (all = []) => {
    setSelectedProvincialAI(all);
  };

  const resetSelectedProvincialAI = () => {
    setSelectedProvincialAI([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/inter-provincial-structure/inter-ai-region-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/inter-provincial-structure/inter-ai-region-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvincialAI[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/inter-provincial-structure/inter-ai-region-form", {
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

  useEffect(() => {
    get_InterProvincialDoaList().then(({ dataList = [] }) => {
      console.log(dataList);
      setDoas(dataList);
    });
  }, []);

  const resetFilter = () => {
    setSelectedDoa({
      doaId: "",
      description: "",
    });
    setSelectedDdoa({
      ddId: "",
      description: "",
    });
    setSelectedAda({ segmentId: "", description: "" });
    setDataEndPoint("geo-data/ai-region/get-by-parent/INTER_PROVINCIAL");
  };

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

  const getFilteredData = (selectedAda) => {
    // setDataEndPoint(
    //   `geo-data/ai-region/get-by-parent/INTER_PROVINCIAL/` + selectedAda?.id
    // );
  };

  const filter = () => {
    if (selectedDoa?.id) {
      setDataEndPoint(
        `geo-data/ai-region/inter-provincial-doa?directorDoaId=${selectedDoa?.id}`
      );
    }

    if (selectedDdoa?.id && selectedDoa?.id) {
      setDataEndPoint(
        `geo-data/ai-region/inter-provincial-doa?interProDdoaId=${selectedDdoa?.id}`
      );
    }

    if (selectedAda?.id && selectedDdoa?.id && selectedDoa?.id) {
      setDataEndPoint(
        `geo-data/ai-region/inter-provincial-doa?interProAdaId=${selectedAda?.id}`
      );
    }
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedProvincialAI.map((item) => {
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {" "}
                {item?.proDirectorId} - {item?.description}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
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

  const onDownloadSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Downloaded successfully",
    });
  };
  
  const onDownloadError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "Download failed",
    });
  };
  
  const onDownload = async () => {
    try {
      await downloadProvincialAIExcel(onDownloadSuccess,onDownloadError);
    } catch (error) {
      console.error("Download failed:", error);
      onDownloadError();
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
      <Stack direction="row" spacing={1} sx={{ paddingTop: "2px" }}>
      <ExportButton onDownload={onDownload} />
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
        </Stack>
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select Director DOA</FieldName>
              <Autocomplete
                options={doas}
                value={selectedDoa}
                getOptionLabel={(i) => `${i?.doaId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDoa(value);
                  setSelectedDdoa({ ddId: "", description: "" });
                  setSelectedAda({ segmentId: "", description: "" });
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
              <FieldName>Select Inter Provincial DDOA</FieldName>
              <Autocomplete
                disabled={selectedDoa?.id == null}
                options={ddoas}
                value={selectedDdoa}
                getOptionLabel={(i) => `${i?.ddId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDdoa(value);
                  setSelectedAda({ segmentId: "", description: "" });
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
              <FieldName>Select Inter Provincial ADA</FieldName>
              <Autocomplete
                disabled={selectedDdoa?.id == null}
                options={adas}
                value={selectedAda}
                getOptionLabel={(i) => `${i?.segmentId} - ${i?.description}`}
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
                onClick={resetFilter}
                sx={{ marginTop: "40px" }}
              >
                <RestartAlt />
                Reset
              </Button>
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
        </Grid>
      </ActionWrapper>
      <Grid container>
        <SearchBox handleSearch={handleSearch} />
      </Grid>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AI_REGION}`}
      >
        {loading === false && (
          <InterProvincialAiRegionList
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

export default InterProvincialAiRegion;
