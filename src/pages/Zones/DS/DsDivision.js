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
  ButtonGroup,
  Autocomplete,
  TextField,
  Grid,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DsDivisionList from "./DsDivisionList";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { deleteDsDivision,downloaddsDivisionsExcel } from "../../../redux/actions/dsDivision/action";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Add, Delete, Edit, RestartAlt, Vrpano,Download } from "@mui/icons-material";
import { get_ProvinceList } from "../../../redux/actions/province/action";
import { get_DistrictListByProvinceId } from "../../../redux/actions/district/action";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import SearchBox from "../../../components/SearchBox/SearchBox";

const DsDivision = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataEndPoint, setDataEndPoint] = useState("geo-data/ds-divisions");

  const [selectedDsDivisions, setSelectedDsDivisions] = useState([]);
  const [dialogSelectedDsTypes, setDialogSelectedDsTypes] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [provinces, setProvinces] = useState([]);
  const [districs, setDistrics] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({
    name: "",
    code: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: "",
    code: "",
  });

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

  const handleSearch = (searchText) => {
    let url = dataEndPoint;
    const searchTextParam = 'searchText=' + encodeURIComponent(searchText);
    
    if (url.includes('searchText=')) {
        url = url.replace(/searchText=[^&]+/, searchTextParam);
    } else {
      url += (url.includes('?') ? '&' : '?') + searchTextParam;
    }

    setDataEndPoint(url);
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
    setDialogSelectedDsTypes(selectedDsDivisions);
  };

  const close = () => {
    setOpen(false);
    setDialogSelectedDsTypes([]);
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
      for (const dsDivision of dialogSelectedDsTypes) {
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

  const getFilteredData = (selectedDistrict) => {
    setDataEndPoint(
      `geo-data/ds-divisions/by-district/` + selectedDistrict?.id
    );
  };

  const resetFilter = () => {
    setSelectedProvince({ code: "", name: "" });
    setSelectedDistrict({ code: "", name: "" });
    setDataEndPoint("geo-data/ds-divisions");
  };

  const getDistricts = (id) => {
    get_DistrictListByProvinceId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDistrics(dataList);
    });
  };
  const onDownload = async () => {
    try {
      await downloaddsDivisionsExcel(onSuccess, onError);
    } catch (error) {
      console.error(error);
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
      <ListHeader title="DS Division" />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        ><PermissionWrapper
       
      >
        <Button onClick={onDownload} title="export" 
          color="success">
          <Download />
          {DEF_ACTIONS.EXPORT}
        </Button>
      </PermissionWrapper>
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
        <Grid container>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Select Province</FieldName>
              <Autocomplete
                options={provinces}
                value={selectedProvince}
                getOptionLabel={(i) => `${i?.code} - ${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedProvince(value);
                  setSelectedDistrict({ name: "", code: "" });
                  getDistricts(value.id);
                }}
                fullWidth
                inputProps={{ readOnly: true }}
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
              <FieldName>Select District</FieldName>
              <Autocomplete
                disabled={selectedProvince?.id == null}
                options={districs}
                value={selectedDistrict}
                getOptionLabel={(i) => `${i?.code}-${i?.name}`}
                onChange={(event, value) => {
                  console.log(value);
                  setSelectedDistrict(value);
                  getFilteredData(value);
                }}
                disableClearable
                fullWidth
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
          <SearchBox handleSearch={handleSearch} />
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
      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedDsDivisions}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedDsTypes}
        dialogSelectedTypes={dialogSelectedDsTypes}
        propertyId="id"
        propertyDescription="name"
      />
    </div>
  );
};

export default DsDivision;
