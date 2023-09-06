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
import { Add, Delete, Edit, RestartAlt, Vrpano } from "@mui/icons-material";
import ProvincialAiRegionList from "./AiRegionList";
import { deleteProvincialAI } from "../../../redux/actions/provincialAI/action";
import { get_ProvincialDdoaListByDoaId } from "../../../redux/actions/provincialDdoa/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_ProvincialAdaListByDdoaId } from "../../../redux/actions/provincialAda/action";
import ListHeader from "../../../components/ListHeader/ListHeader";

const ProvincialAiRegion = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [dataEndPoint, setDataEndPoint] = useState(
    "geo-data/ai-region/get-by-parent/PROVINCIAL"
  );
  const [selectedProvincialAI, setSelectedProvincialAI] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [doas, setDoas] = useState([]);
  const [ddoas, setDdoas] = useState([]);
  const [adas, setAdas] = useState([]);
  const [selectedDdoa, setSelectedDdoa] = useState({
    provincialDdId: "",
    description: "",
  });
  const [selectedDoa, setSelectedDoa] = useState({
    proDirectorId: "",
    description: "",
  });
  const [selectedAda, setSelectedAda] = useState({
    provinceSegmentId: "",
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
  };

  const onClose = () => {
    setOpen(false);
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
      for (const provincialAI of selectedProvincialAI) {
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
    setDataEndPoint(
      `geo-data/ai-region/get-by-parent/PROVINCIAL/` + selectedAda?.id
    );
  };

  return (
    <div>
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>

          {selectedProvincialAI.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedProvincialAI.length === 1 && (

            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedProvincialAI.length > 0 && (

            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
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
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Select Provincial DOA</FieldName>
              <Autocomplete
                // disabled={state?.action === DEF_ACTIONS.VIEW}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
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

export default ProvincialAiRegion;
