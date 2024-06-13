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
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
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
import ProvincialDdoaList from "./ProvincialDdoaList";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { deleteProvincialDdoa,  downloadProvincialDDoaExcel } from "../../../redux/actions/provincialDdoa/action";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";
const ProvincialDdoa = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [selectedProvincialDdoa, setSelectedProvincialDdoa] = useState([]);
  const [dialogSelectedProvincialDdoa, setDialogSelectedProvincialDdoa] =
    useState([]);
  const [dataEndPoint, setDataEndPoint] = useState(
    "geo-data/provincial-deputy-director-level"
  );

  const [selectedDoa, setSelectedDoa] = useState({
    proDirectorId: "",
    description: "",
  });
  const [doas, setDoas] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleProvincialDdoaSelect = (component) => {
    setSelectedProvincialDdoa((current = []) => {
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

  const selectAllProvincialDdoa = (all = []) => {
    setSelectedProvincialDdoa(all);
  };

  const resetSelectedProvincialDdoa = () => {
    setSelectedProvincialDdoa([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/provincial-structure/provincial-ddoa-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/provincial-structure/provincial-ddoa-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvincialDdoa[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/provincial-structure/provincial-ddoa-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvincialDdoa[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedProvincialDdoa(selectedProvincialDdoa);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedProvincialDdoa([]);
  };

  useEffect(() => {
    get_ProvincialDoaList().then(({ dataList = [] }) => {
      console.log(dataList);
      setDoas(dataList);
    });
  }, []);

  const getFilteredData = (selectedDoa) => {
    console.log(selectedDoa);
    setDataEndPoint(
      `geo-data/provincial-deputy-director-level/pro-director-id/` +
        selectedDoa?.id
    );
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
      await downloadProvincialDDoaExcel();
      onDownloadSuccess();
    } catch (error) {
      console.error("Download failed:", error);
      onDownloadError();
    }
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedProvincialDdoa.map((item) => {
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
      for (const provincialDoa of dialogSelectedProvincialDdoa) {
        await deleteProvincialDdoa(provincialDoa.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedProvincialDdoa();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const resetFilter = () => {
    setSelectedDoa({ proDirectorId: "", description: "" });
    setDataEndPoint("geo-data/provincial-deputy-director-level");
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
      <ListHeader title="Provincial DDOA" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROVINCIAL_DEPUTY_DIRECTOR_LEVEL}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedProvincialDdoa.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROVINCIAL_DEPUTY_DIRECTOR_LEVEL}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedProvincialDdoa.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROVINCIAL_DEPUTY_DIRECTOR_LEVEL}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedProvincialDdoa.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROVINCIAL_DEPUTY_DIRECTOR_LEVEL}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item sm={3} md={3} lg={3}>
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
          <Grid item sm={2} md={2} lg={2}>
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCIAL_DEPUTY_DIRECTOR_LEVEL}`}
      >
        {loading === false && (
          <ProvincialDdoaList
            selectedRows={selectedProvincialDdoa}
            onRowSelect={toggleProvincialDdoaSelect}
            selectAll={selectAllProvincialDdoa}
            unSelectAll={resetSelectedProvincialDdoa}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedProvincialDdoa}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedProvincialDdoa}
        dialogSelectedTypes={dialogSelectedProvincialDdoa}
        propertyId="provincialDdId"
        propertyDescription="description"
      />
    </div>
  );
};

export default ProvincialDdoa;
