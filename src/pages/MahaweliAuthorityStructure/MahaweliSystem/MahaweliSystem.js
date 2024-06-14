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

import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ListHeader from "../../../components/ListHeader/ListHeader";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { get_MahaweliAuthorityList } from "../../../redux/actions/mahaweliAuthority/action";
import { deleteMahaweliSystem,downloadmahaweliSystemExcel } from "../../../redux/actions/mahaweliSystem/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import MahaweliSystemList from "./MahaweliSystemList";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import CrudActionButton from "../../../components/CrudActionButton/CrudActionButton";
import ExportButton from "../../../components/ExportButton/ExportButton";
const MahaweliSystem = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [selectedMahaweliSystem, setSelectedMahaweliSystem] = useState([]);
  const [dialogSelectedMahaweliSystem, setDialogSelectedMahaweliSystem] =
    useState([]);

  const [dataEndPoint, setDataEndPoint] = useState("geo-data/mahaweli-systems");

  const [mahaweliAuthority, setSelecteMahaweliAuthority] = useState({
    authorityId: "",
    description: "",
  });
  const [mahaweliAuthorities, setMahaweliAuthorities] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleMahaweliSystemSelect = (component) => {
    setSelectedMahaweliSystem((current = []) => {
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

  const selectAllMahaweliSystem = (all = []) => {
    setSelectedMahaweliSystem(all);
  };

  const resetSelectedMahaweliSystem = () => {
    setSelectedMahaweliSystem([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/mahaweli-structure/mahaweli-system-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/mahaweli-structure/mahaweli-system-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedMahaweliSystem[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/mahaweli-structure/mahaweli-system-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedMahaweliSystem[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedMahaweliSystem(selectedMahaweliSystem);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedMahaweliSystem([]);
  };

  useEffect(() => {
    get_MahaweliAuthorityList().then(({ dataList = [] }) => {
      console.log(dataList);
      setMahaweliAuthorities(dataList);
    });
  }, []);

  // const getFilteredData = (selectedDoa) => {
  //   console.log(selectedDoa);
  //   setDataEndPoint(
  //     `geo-data/mahaweli-systems` +
  //       selectedDoa?.id
  //   );
  // };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedMahaweliSystem.map((item) => {
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
      for (const system of dialogSelectedMahaweliSystem) {
        await deleteMahaweliSystem(system.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedMahaweliSystem();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const resetFilter = () => {
  //   setSelecteMahaweliAuthority({ authorityId: "", description: "" });
  //   setDataEndPoint( "geo-data/mahaweli-systems");
  // };
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
      await downloadmahaweliSystemExcel(onDownloadSuccess,onDownloadError);
    } catch (error) {
      console.error(error);
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
      <ListHeader title="Mahaweli System" />
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.MAHAWELI_SYSTEM}`}
          >
            <CrudActionButton action={DEF_ACTIONS.ADD} handle={onCreate} />
          </PermissionWrapper>

          {selectedMahaweliSystem.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.MAHAWELI_SYSTEM}`}
            >
              <CrudActionButton action={DEF_ACTIONS.EDIT} handle={onEdit} />
            </PermissionWrapper>
          )}
          {selectedMahaweliSystem.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.MAHAWELI_SYSTEM}`}
            >
              <CrudActionButton action={DEF_ACTIONS.VIEW} handle={onView} />
            </PermissionWrapper>
          )}
          {selectedMahaweliSystem.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.MAHAWELI_SYSTEM}`}
            >
              <CrudActionButton action={DEF_ACTIONS.DELETE} handle={onDelete} />
            </PermissionWrapper>
          )}
        </ButtonGroup>
        </Stack>
      </ActionWrapper>
      {/* <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select Mahaweli Authority</FieldName>
              <Autocomplete
                // disabled={state?.action === DEF_ACTIONS.VIEW}
                options={mahaweliAuthorities}
                value={mahaweliAuthority}
                getOptionLabel={(i) =>
                  `${i?.authorityId} - ${i?.description}`
                }
                onChange={(event, value) => {
                  console.log(value);
                  setSelecteMahaweliAuthority(value);
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
        </Grid>
      </ActionWrapper> */}

      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.MAHAWELI_SYSTEM}`}
      >
        {loading === false && (
          <MahaweliSystemList
            selectedRows={selectedMahaweliSystem}
            onRowSelect={toggleMahaweliSystemSelect}
            selectAll={selectAllMahaweliSystem}
            unSelectAll={resetSelectedMahaweliSystem}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedMahaweliSystem}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedMahaweliSystem}
        dialogSelectedTypes={dialogSelectedMahaweliSystem}
        propertyId="systemId"
        propertyDescription="description"
      />
    </div>
  );
};

export default MahaweliSystem;
