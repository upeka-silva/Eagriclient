import { Add, Delete, Edit, Vrpano, Download } from "@mui/icons-material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  deleteProvince,
  downloadProvincesExcel,
} from "../../../redux/actions/province/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import ProvinceList from "./ProvinceList";
import { Fonts } from "../../../utils/constants/Fonts";
import ExportButton from "../../../components/ExportButton/ExportButton";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";

const Province = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [dialogSelectedProvince, setDialogSelectedProvince] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [searchData, setSearchData] = useState({
    code: "",
    name: "",
  });
  const [search, setSearch] = useState({});

  const toggleProvinceSelect = (component) => {
    setSelectedProvinces((current = []) => {
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

  const selectAllProvinces = (all = []) => {
    setSelectedProvinces(all);
  };

  const resetSelectedProvinces = () => {
    setSelectedProvinces([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ga-structure/province-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ga-structure/province-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvinces[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ga-structure/province-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvinces[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedProvince(selectedProvinces);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedProvince([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedProvinces.map((p, key) => {
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
      for (const province of dialogSelectedProvince) {
        await deleteProvince(province?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedProvinces();
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      await downloadProvincesExcel(onDownloadSuccess,onDownloadError);
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
      <ListHeader title="Province" />
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
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROVINCE}`}
            >
              <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
            </PermissionWrapper>
            {selectedProvinces.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROVINCE}`}
              >
                <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
              </PermissionWrapper>
            )}
            {selectedProvinces.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROVINCE}`}
              >
                <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
              </PermissionWrapper>
            )}
            {selectedProvinces.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROVINCE}`}
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
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCE}`}
      >
        {loading === false && (
          <ProvinceList
            selectedRows={selectedProvinces}
            onRowSelect={toggleProvinceSelect}
            selectAll={selectAllProvinces}
            unSelectAll={resetSelectedProvinces}
            advancedSearchData={search}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedProvinces}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedProvince}
        dialogSelectedTypes={dialogSelectedProvince}
        propertyId="name"
        propertyDescription="code"
      />
    </div>
  );
};

export default Province;
