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
import MahaweliSystemList from "./MahaweliSystemList";
import { get_MahaweliAuthorityList } from "../../../redux/actions/mahaweliAuthority/action";
import { deleteMahaweliSystem } from "../../../redux/actions/mahaweliSystem/action";

const MahaweliSystem = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [selectedMahaweliSystem, setSelectedMahaweliSystem] = useState([]);
  const [dataEndPoint, setDataEndPoint] = useState(
    "geo-data/mahaweli-systems"
  );

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
  };

  const onClose = () => {
    setOpen(false);
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
      for (const system of selectedMahaweliSystem) {
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

  return (
    <div>
      <ActionWrapper isLeft>
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
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>

          {selectedMahaweliSystem.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.MAHAWELI_SYSTEM}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedMahaweliSystem.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.MAHAWELI_SYSTEM}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedMahaweliSystem.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.MAHAWELI_SYSTEM}`}
            >
              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
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
      <DialogBox
        open={open}
        title="Delete Provincial Level"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ ml: "8px" }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={onClose}
              sx={{ ml: "8px" }}
            >
              Close
            </Button>
          </ActionWrapper>
        }
      >
        <>
          <DeleteMsg />
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default MahaweliSystem;
