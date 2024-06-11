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
import {
  Add,
  Delete,
  Edit,
  RestartAlt,
  Search,
  Vrpano,
} from "@mui/icons-material";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_ProvincialDdoaList } from "../../../redux/actions/provincialDdoa/action";
import IntProvincialAdaList from "./IntProvincialAdaList";
import { get_InterProvincialDoaList } from "../../../redux/actions/interProvincialDoa/action";
import { get_InterProvincialDdoaListByDoaId } from "../../../redux/actions/interProvincialDdoa/action";
import { deleteInterProvincialAda ,downloadInterProvincialADAExcel} from "../../../redux/actions/interProvincialAda/action";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";

const IntProvincialAda = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [dataEndPoint, setDataEndPoint] = useState(
    "geo-data/interprovincial-ada-segments"
  );
  const [selectedProvincialAda, setSelectedProvincialAda] = useState([]);
  const [dialogSelectedProvincialAda, setDialogSelectedProvincialAda] =
    useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [doas, setDoas] = useState([]);
  const [ddoas, setDdoas] = useState([]);
  const [selectedDdoa, setSelectedDdoa] = useState({
    ddId: "",
    description: "",
  });
  const [selectedDoa, setSelectedDoa] = useState({
    doaId: "",
    description: "",
  });

  const toggleProvincialDoaSelect = (component) => {
    setSelectedProvincialAda((current = []) => {
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

  const selectAllProvincialAda = (all = []) => {
    setSelectedProvincialAda(all);
  };

  const resetSelectedProvincialAda = () => {
    setSelectedProvincialAda([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/inter-provincial-structure/inter-provincial-ada-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/inter-provincial-structure/inter-provincial-ada-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvincialAda[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/inter-provincial-structure/inter-provincial-ada-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvincialAda[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedProvincialAda(selectedProvincialAda);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedProvincialAda([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedProvincialAda.map((item) => {
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
      for (const provincialDoa of dialogSelectedProvincialAda) {
        await deleteInterProvincialAda(provincialDoa.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedProvincialAda();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getFilteredData = (selectedDdoa) => {
    // setDataEndPoint(
    //   `geo-data/interprovincial-ada-segments/inter-province-dd/` +
    //     selectedDdoa?.id
    // );
  };

  const filter = () => {
    if (selectedDoa?.id) {
      setDataEndPoint(
        `geo-data/interprovincial-ada-segments?directorDoaId=${selectedDoa?.id}`
      );
    }

    if (selectedDdoa?.id && selectedDoa?.id) {
      setDataEndPoint(
        `geo-data/interprovincial-ada-segments?interProDdId=${selectedDdoa?.id}`
      );
    }
  };

  useEffect(() => {
    get_InterProvincialDoaList().then(({ dataList = [] }) => {
      console.log(dataList);
      setDoas(dataList);
    });
    // get_ProvincialDdoaList().then(({ dataList = [] }) => {
    //     console.log(dataList);
    //     setDdoas(dataList);
    //   });
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
    setDataEndPoint("geo-data/interprovincial-ada-segments");
  };

  const getDDOAS = (id) => {
    get_InterProvincialDdoaListByDoaId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDdoas(dataList);
    });
  };
  const onDownloadSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Download successful",
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
      await downloadInterProvincialADAExcel();
      onDownloadSuccess();
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
      <ListHeader title="Inter Provincial ADA" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.INTER_PROVINCIAL_ADA_SEGMENT}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedProvincialAda.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.INTER_PROVINCIAL_ADA_SEGMENT}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedProvincialAda.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.INTER_PROVINCIAL_ADA_SEGMENT}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedProvincialAda.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.INTER_PROVINCIAL_ADA_SEGMENT}`}
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
                // disabled={state?.action === DEF_ACTIONS.VIEW}
                options={doas}
                value={selectedDoa}
                getOptionLabel={(i) => `${i?.doaId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDoa(value);
                  setSelectedDdoa({ ddId: "", description: "" });
                  // setDdoas(value.provincialDeputyDirectorLevelList);
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
        </Grid>
      </ActionWrapper>

      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.INTER_PROVINCIAL_ADA_SEGMENT}`}
      >
        {loading === false && (
          <IntProvincialAdaList
            selectedRows={selectedProvincialAda}
            onRowSelect={toggleProvincialDoaSelect}
            selectAll={selectAllProvincialAda}
            unSelectAll={resetSelectedProvincialAda}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedProvincialAda}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedProvincialAda}
        dialogSelectedTypes={dialogSelectedProvincialAda}
        propertyId="segmentId"
        propertyDescription="description"
      />
    </div>
  );
};

export default IntProvincialAda;
