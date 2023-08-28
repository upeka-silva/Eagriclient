import React, { useEffect, useState } from "react";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
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
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DsDivisionList from "./DsDivisionList";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { deleteDsDivision } from "../../../redux/actions/dsDivision/action";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, Search, Vrpano } from "@mui/icons-material";
import { get_ProvinceList } from "../../../redux/actions/province/action";
import { get_DistrictList } from "../../../redux/actions/district/action";

const DsDivision = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataEndPoint, setDataEndPoint] = useState("geo-data/ds-divisions");

  const [selectedDsDivisions, setSelectedDsDivisions] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [provinces, setProvinces] = useState([]);
  const [districs, setDistrics] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({ name: "Select" });
  const [selectedDistrict, setSelectedDistrict] = useState({ name: "Select" });

  const toggleDsDivisionSelect = (component) => {
    setSelectedDsDivisions((current = []) => {
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

  const selectAllDsDivisions = (all = []) => {
    setSelectedDsDivisions(all);
  };

  const resetSelectedDsDivisions = () => {
    setSelectedDsDivisions([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/ga-structure/ds-division-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/ga-structure/ds-division-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedDsDivisions[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/ga-structure/ds-division-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedDsDivisions[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedDsDivisions.map((p, key) => {
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
      for (const dsDivision of selectedDsDivisions) {
        await deleteDsDivision(dsDivision?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedDsDivisions();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    get_ProvinceList().then(({ dataList = [] }) => {
      console.log(dataList);
      setProvinces(dataList);
    });
  }, []);

  const getFilteredData = () => {
    setDataEndPoint(
      `geo-data/ds-divisions/by-district/` + selectedDistrict?.id
    );
  };

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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.DS_DIVISION}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectedDsDivisions.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DS_DIVISION}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedDsDivisions.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DS_DIVISION}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedDsDivisions.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.DS_DIVISION}`}
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
        <Autocomplete
          // disabled={state?.action === DEF_ACTIONS.VIEW}
          options={provinces}
          value={selectedProvince}
          getOptionLabel={(i) => `${i?.name} Province`}
          onChange={(event, value) => {
            console.log(value);
            setSelectedProvince(value);
            setSelectedDistrict({name:"Select"})
            setDistrics(value?.districtDTOList);
          }}
          fullWidth
          sx={{
            width: "214px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
            },
            marginRight: "5px",
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" fullWidth />
          )}
        />
        <Autocomplete
          disabled={selectedProvince?.id == null}
          options={districs}
          value={selectedDistrict}
          getOptionLabel={(i) => `${i?.name} District`}
          onChange={(event, value) => {
            console.log(value);
            setSelectedDistrict(value);
          }}
          fullWidth
          sx={{
            width: "214px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
            },
            marginRight: "5px",
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" fullWidth />
          )}
        />
        <Button
          color="success"
          variant="contained"
          size="small"
          onClick={getFilteredData}
        >
          <Search />
          Search
        </Button>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.DS_DIVISION}`}
      >
        {loading === false && (
          <DsDivisionList
            selectedRows={selectedDsDivisions}
            onRowSelect={toggleDsDivisionSelect}
            selectAll={selectAllDsDivisions}
            unSelectAll={resetSelectedDsDivisions}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title="Delete DS Division"
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
              onClick={close}
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

export default DsDivision;
