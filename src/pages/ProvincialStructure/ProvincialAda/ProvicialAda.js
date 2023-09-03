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
import { Add, Delete, Edit, Search, Vrpano } from "@mui/icons-material";
import ProvincialAdaList from "./ProvicialAdaList";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_ProvincialDdoaList } from "../../../redux/actions/provincialDdoa/action";
import ListHeader from "../../../components/ListHeader/ListHeader";

const ProvincialAda = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [dataEndPoint, setDataEndPoint] = useState(
    "geo-data/provincial-ada-segments"
  );
  const [selectedProvincialAda, setSelectedProvincialAda] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [doas, setDoas] = useState([]);
  const [ddoas, setDdoas] = useState([]);
  const [selectedDdoa, setSelectedDdoa] = useState({
    provincialDdId: "",
    description: "",
  });
  const [selectedDoa, setSelectedDoa] = useState({
    proDirectorId: "",
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
    navigate("/zone/provincial-structure/provincial-ada-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/provincial-structure/provincial-ada-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvincialAda[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/provincial-structure/provincial-ada-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvincialAda[0] || {},
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
      for (const provincialDoa of selectedProvincialAda) {
        await deleteProvincialDoa(provincialDoa.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedProvincialAda();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getFilteredData = () => {
    setDataEndPoint(
      `geo-data/provincial-ada-segments/pro-dd-id/` + selectedDdoa?.id
    );
  };

  useEffect(() => {
    get_ProvincialDoaList().then(({ dataList = [] }) => {
      console.log(dataList);
      setDoas(dataList);
    });
    // get_ProvincialDdoaList().then(({ dataList = [] }) => {
    //     console.log(dataList);
    //     setDdoas(dataList);
    //   });
  }, []);

  return (
    <div>
      <ListHeader title="Provincial ADA Segments" />
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

          {selectedProvincialAda.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedProvincialAda.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedProvincialAda.length > 0 && (
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
          <Grid item sm={3} md={3} lg={3}>
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
                  setDdoas(value.provincialDeputyDirectorLevelList);
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
          <Grid item sm={3} md={3} lg={3}>
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
                onClick={getFilteredData}
                sx={{ marginTop: "40px" }}
              >
                <Search />
                Search
              </Button>
            </FieldWrapper>
          </Grid>
        </Grid>
      </ActionWrapper>

      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCIAL_DOA}`}
      >
        {loading === false && (
          <ProvincialAdaList
            selectedRows={selectedProvincialAda}
            onRowSelect={toggleProvincialDoaSelect}
            selectAll={selectAllProvincialAda}
            unSelectAll={resetSelectedProvincialAda}
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

export default ProvincialAda;
