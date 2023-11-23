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
import { deleteProvincialDoa } from "../../../redux/actions/ProvincialDoa/action";
import { Add, Delete, Edit, RestartAlt, Vrpano } from "@mui/icons-material";
import MahaweliUnitList from "./MahaweliUnitList";
import { deleteMahaweliUnit } from "../../../redux/actions/mahaweliUnit/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_MahaweliSystemList } from "../../../redux/actions/mahaweliSystem/action";
import { get_MahaweliBlockListBySystemId } from "../../../redux/actions/mahaweliBlock/action";
import ListHeader from "../../../components/ListHeader/ListHeader";

const MahaweliUnit = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});
  const [dataEndPoint, setDataEndPoint] = useState("geo-data/mahaweli-units");

  const [selectedMahaweliUnit, setSelectedMahaweliUnit] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
 
  const [mahaweliSystems, setMahaweliSystems] = useState([]);
  const [mahaweliBlocks, setMahaweliBlocks] = useState([]);
  const [selectedAuthority, setSelectedAuthority] = useState({
    authorityId: "",
    description: "",
  });
  const [selectedSystem, setSelectedSystem] = useState({
    systemId: "",
    description: "",
  });
  const [selectedBlock, setSelectedBlock] = useState({
    code: "",
    description: "",
  });

  const toggleMahaweliUnitSelect = (component) => {
    setSelectedMahaweliUnit((current = []) => {
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

  const selectAllMahaweliUnit = (all = []) => {
    setSelectedMahaweliUnit(all);
  };

  const resetSelectedMahaweliUnit = () => {
    setSelectedMahaweliUnit([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/mahaweli-structure/mahaweli-unit-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/mahaweli-structure/mahaweli-unit-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedMahaweliUnit[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/mahaweli-structure/mahaweli-unit-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedMahaweliUnit[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedMahaweliUnit.map((item) => {
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
      for (const MahaweliUnit of selectedMahaweliUnit) {
        await deleteMahaweliUnit(MahaweliUnit.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedMahaweliUnit();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getFilteredData = (selectedBlock) => {
    setDataEndPoint(`geo-data/mahaweli-units/by-mahaweli-block/` + selectedBlock?.id);
  };

  const resetFilter = () => {
    setSelectedAuthority({
      authorityId: "",
      description: "",
    });
    setSelectedSystem({
      systemId: "",
      description: "",
    });
    setSelectedBlock({
      code: "",
      description: "",
    })
    setDataEndPoint("geo-data/mahaweli-units");
  };

  useEffect(() => {
    get_MahaweliSystemList().then(({ dataList = [] }) => {
      console.log(dataList);
      setMahaweliSystems(dataList);
    });
    
  }, []);

  const getBlocks = (id)=>{
      get_MahaweliBlockListBySystemId(id).then(({ dataList = [] }) => {
        console.log(dataList);
        setMahaweliBlocks(dataList);
      })
  }
  return (
    <div>
      <ListHeader title="Mahaweli Unit" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.MAHAWELI_UNIT}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>

          {selectedMahaweliUnit.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.MAHAWELI_UNIT}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedMahaweliUnit.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.MAHAWELI_UNIT}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedMahaweliUnit.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.MAHAWELI_UNIT}`}
            >
              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
            </PermissionWrapper>
          )}
        </ButtonGroup>
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
                  setMahaweliSystems(value);
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
                // disabled={selectedAuthority?.id == null}
                options={mahaweliSystems}
                value={selectedSystem}
                getOptionLabel={(i) => `${i?.systemId} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedSystem(value);
              
                  getBlocks(value.id)
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
              <FieldName>Select Mahaweli Block</FieldName>
              <Autocomplete
                disabled={selectedSystem?.id == null}
                options={mahaweliBlocks}
                value={selectedBlock}
                getOptionLabel={(i) => `${i?.code} - ${i?.description}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedBlock(value);
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
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.MAHAWELI_UNIT}`}
      >
        {loading === false && (
          <MahaweliUnitList
            selectedRows={selectedMahaweliUnit}
            onRowSelect={toggleMahaweliUnitSelect}
            selectAll={selectAllMahaweliUnit}
            unSelectAll={resetSelectedMahaweliUnit}
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

export default MahaweliUnit;
