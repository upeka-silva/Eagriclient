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
import { deleteDistrict } from "../../../redux/actions/district/action";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, Vrpano, Search } from "@mui/icons-material";

import { get_ProvinceList } from "../../../redux/actions/province/action";

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
  const [selectedProvince, setSelectedProvince] = useState({ name: "Select" });

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
  };

  const close = () => {
    setOpen(false);
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
      for (const district of selectedDistricts) {
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

  const getFilteredData = () => {
    setDataEndPoint(`geo-data/districts/province/` + selectedProvince?.id);
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
            permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.DISTRICT}`}
          >
            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectedDistricts.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DISTRICT}`}
            >
              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
            </PermissionWrapper>
          )}
          {selectedDistricts.length === 1 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DISTRICT}`}
            >
              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
            </PermissionWrapper>
          )}
          {selectedDistricts.length > 0 && (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.DISTRICT}`}
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
          options={options}
          value={selectedProvince}
          getOptionLabel={(i) => `${i?.name} Province`}
          onChange={(event, value) => {
            console.log(value);
            setSelectedProvince(value);
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
      <DialogBox
        open={open}
        title="Delete District"
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

export default District;
