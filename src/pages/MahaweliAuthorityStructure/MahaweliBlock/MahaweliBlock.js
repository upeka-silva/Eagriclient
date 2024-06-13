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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { Add, Delete, Edit, RestartAlt, Vrpano } from "@mui/icons-material";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import ListHeader from "../../../components/ListHeader/ListHeader";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { deleteMahaweliBlock,downloadmahaweliBlockExcel } from "../../../redux/actions/mahaweliBlock/action";
import { get_MahaweliSystemList } from "../../../redux/actions/mahaweliSystem/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import MahaweliBlockList from "./MahaweliBlockList";
import { Fonts } from "../../../utils/constants/Fonts";
import SearchBox from "../../../components/SearchBox/SearchBox";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";

const MahaweliBlock = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [dataEndPoint, setDataEndPoint] = useState("geo-data/mahaweli-blocks");
  const [selectedMahaweliBlocks, setSelectedMahaweliBlocks] = useState([]);
  const [dialogSelectedMahaweliBlocks, setDialogSelectedMahaweliBlocks] =
    useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [mahaweliAuthorities, setMahaweliAuthorities] = useState([]);
  const [mahaweliSystems, setMahaweliSystems] = useState([]);
  const [selectedAuthority, setSelectedAuthority] = useState({
    authorityId: "",
    description: "",
  });
  const [selectedSystem, setSelectedSystem] = useState({
    systemId: "",
    description: "",
  });

  const toggleMahaweliBlockSelect = (component) => {
    setSelectedMahaweliBlocks((current = []) => {
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

  const selectAllMahaweliBlocks = (all = []) => {
    setSelectedMahaweliBlocks(all);
  };

  const resetSelectedMahaweliBlocks = () => {
    setSelectedMahaweliBlocks([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedMahaweliBlocks[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedMahaweliBlocks[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedMahaweliBlocks(selectedMahaweliBlocks);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedMahaweliBlocks([]);
  };

  const getFilteredData = (selectedSystem) => {
    console.log("selectedSys", selectedSystem);
    setDataEndPoint(
      `geo-data/mahaweli-blocks/mahaweli-system/` + selectedSystem?.id
    );
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedMahaweliBlocks.map((item) => {
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
      for (const block of dialogSelectedMahaweliBlocks) {
        await deleteMahaweliBlock(block.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedMahaweliBlocks();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    get_MahaweliSystemList().then(({ dataList = [] }) => {
      setMahaweliSystems(dataList);
    });
  }, []);

  const resetFilter = () => {
    setSelectedAuthority({
      authorityId: "",
      description: "",
    });
    setSelectedSystem({
      systemId: "",
      description: "",
    });
    setDataEndPoint("geo-data/mahaweli-blocks");
  };

  const handleSearch = (searchText = "") => {
    let url = dataEndPoint;
    const searchTextParam = "searchText=" + encodeURIComponent(searchText);

    if (url.includes("searchText=") && searchText) {
      url = url.replace(/searchText=[^&]+/, searchTextParam);
    } else if (url.includes("searchText=") && !searchText) {
      url = url.replace(/searchText=[^&]+/, "");
    } else {
      url += (url.includes("?") ? "&" : "?") + searchTextParam;
    }

    setDataEndPoint(url);
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
      await downloadmahaweliBlockExcel();
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
      <ListHeader title="Mahaweli Block" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedMahaweliBlocks.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedMahaweliBlocks.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedMahaweliBlocks.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          {/* <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select Mahaweli Authority</FieldName>
              <Autocomplete
                // disabled={state?.action === DEF_ACTIONS.VIEW}
                options={mahaweliAuthorities}
                value={selectedAuthority}
                getOptionLabel={(i) => `${i?.authorityId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedAuthority(value);
                  setSelectedSystem({ systemId: "", description: "" });
                //   setMahaweliSystems(value.provincialDeputyDirectorLevelList);
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
          </Grid> */}
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select Mahaweli System</FieldName>
              <Autocomplete
                options={mahaweliSystems}
                value={selectedSystem}
                getOptionLabel={(i) => `${i?.systemId} - ${i?.description}`}
                onChange={(event, value) => {
                  setSelectedSystem(value);
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
          <Grid item lg={2}>
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
          <SearchBox handleSearch={handleSearch} />
        </Grid>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
      >
        {loading === false && (
          <MahaweliBlockList
            selectedRows={selectedMahaweliBlocks}
            onRowSelect={toggleMahaweliBlockSelect}
            selectAll={selectAllMahaweliBlocks}
            unSelectAll={resetSelectedMahaweliBlocks}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedMahaweliBlocks}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedMahaweliBlocks}
        dialogSelectedTypes={dialogSelectedMahaweliBlocks}
        propertyId="code"
        propertyDescription="description"
      />
    </div>
  );
};

export default MahaweliBlock;
