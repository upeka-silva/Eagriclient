import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  CircularProgress,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonGroup,
  Autocomplete,
  TextField,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import DistrictList from "./DistrictList";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  deleteDistrict,
  downloadDistrictExcel,
} from "../../../redux/actions/district/action";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import {
  Add,
  Delete,
  Edit,
  Vrpano,
  Search,
  RestartAlt,
  Download,
} from "@mui/icons-material";

import { get_ProvinceList } from "../../../redux/actions/province/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ExportButton from "../../../components/ExportButton/ExportButton";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";

const District = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataEndPoint, setDataEndPoint] = useState("geo-data/districts");

  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [options, setOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({
    code: "",
    name: "",
  });
  const [dialogSelectedDistrict, setDialogSelectedDistrict] = useState([]);

  const toggleDistrictSelect = (component) => {
    setSelectedDistricts((current = []) => {
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

  const selectAllDistricts = (all = []) => {
    setSelectedDistricts(all);
  };

  const resetSelectedDistricts = () => {
    setSelectedDistricts([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ga-structure/district-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ga-structure/district-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedDistricts[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ga-structure/district-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedDistricts[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedDistrict(selectedDistricts);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedDistrict([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedDistricts.map((p, key) => {
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {p.code} - {p.name}
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
      message: `Successfully Deleted`,
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const district of dialogSelectedDistrict) {
        await deleteDistrict(district?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedDistricts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    get_ProvinceList().then(({ dataList = [] }) => {
      console.log(dataList);
      setOptions(dataList);
    });
  }, []);

  const getFilteredData = (selectedProvince) => {
    setDataEndPoint(`geo-data/districts/province/` + selectedProvince?.id);
  };

  const resetFilter = () => {
    setSelectedProvince({ code: "", name: "" });
    console.log(selectedProvince);
    setDataEndPoint("geo-data/districts");
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
      await downloadDistrictExcel();
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
      <ListHeader title="District" />
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
            <PermissionWrapper></PermissionWrapper>
            <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.DISTRICT}`}
            >
              <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
            </PermissionWrapper>
            {selectedDistricts.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DISTRICT}`}
              >
                <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
              </PermissionWrapper>
            )}
            {selectedDistricts.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DISTRICT}`}
              >
                <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
              </PermissionWrapper>
            )}
            {selectedDistricts.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.DISTRICT}`}
              >
                <CrudActionButton
                  action={DEF_ACTIONS.DELETE}
                  handle={onDelete}
                />
              </PermissionWrapper>
            )}
          </ButtonGroup>
        </Stack>
      </ActionWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Select Province</FieldName>
              <Autocomplete
                options={options}
                value={selectedProvince}
                getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedProvince(value);
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.DISTRICT}`}
      >
        {loading === false && (
          <DistrictList
            selectedRows={selectedDistricts}
            onRowSelect={toggleDistrictSelect}
            selectAll={selectAllDistricts}
            unSelectAll={resetSelectedDistricts}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedDistricts}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedDistrict}
        dialogSelectedTypes={dialogSelectedDistrict}
        propertyId="code"
        propertyDescription="name"
      />
    </div>
  );
};

export default District;
