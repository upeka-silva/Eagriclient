import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

import { useLocation, useNavigate } from "react-router";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { DEF_ACTIONS } from "../../../utils/constants/permission";

import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";

import { useEffect } from "react";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { get_SubCategoryById, get_all_SubCategoryById } from "../../../redux/actions/crop/crop/action";
import { get_CropById, get_all_CropById } from "../../../redux/actions/crop/cropVariety/action";
import { RestartAlt } from "@mui/icons-material";

const CropLookEarlyWarningRangesList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  useUserAccessValidation();
  const { state } = useLocation();
  //const location = useLocation();
  console.log(state);

  const columns = [
    { field: "cropDTO.description", headerName: "Crop" },
    {
      field: "twoWeekRecommendation",
      headerName: "Two Week Recommendation",
      type: "float",
    },
    { field: "greenUpper", headerName: "Green Upper", type: "float" },
    {
      field: "lightGreenLower",
      headerName: "Light Green Lower",
      type: "float",
    },
    {
      field: "lightGreenUpper",
      headerName: "Light Green Upper",
      type: "float",
    },
    { field: "yellowLower", headerName: "Yellow Lower", type: "float" },
    { field: "yellowUpper", headerName: "Yellow Upper", type: "float" },
    { field: "orangeLower", headerName: "Orange Lower", type: "float" },
    { field: "orangeUpper", headerName: "Orange Upper", type: "float" },
    { field: "redLower", headerName: "Red Lower", type: "float" },
  ];

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [cropyOptions, setCropyOptions] = useState([]);
  const [category, setCategory] = useState({ categoryId: "", description: "" });
  const [subCategory, setSubCategory] = useState({
    subCategoryId: "",
    description: "",
  });
  const [crop, setCrop] = useState(null);

  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [isdisable, setIsdisable] = useState({
    crop: false,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setCategoryOptions(dataList);
    });
  }, []);

  const getSubCategories = (id) => {
    get_all_SubCategoryById(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setSubCategoryOptions(dataList);
    });
  };

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setCategoryOptions(dataList);
    });
  }, []);

  const getCrops = (id) => {
    debugger;
    get_all_CropById(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setCropyOptions(dataList);
    });
  };

  const handleChange = (value, target) => {
    setShow(false);
    setId(value?.id);
    if (Object.keys(cropyOptions).length > 0) {
      setShow(true);
    }
    setIsdisable((prevState) => ({
      ...prevState,
      [target]: true,
    }));
    setData(value);
  };

  const reset = () => {
    const allTrueIsdisable = {
      crop: false,
    };
    setIsdisable(allTrueIsdisable);
    setCategory(null);
    setSubCategory(null);
    setCrop(null);
    setData(null);
    setShow(null);
  };

  return (
    <TableWrapper>
      <ActionWrapper isLeft>
        <Grid
          container
          sx={{
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop Category</FieldName>
              <Autocomplete
                options={categoryOptions}
                //disabled={selectedDdoa?.id == null}
                getOptionLabel={(i) =>
                  i.categoryId ? `${i.categoryId} - ${i.description}` : ""
                }
                value={category || null}
                onChange={(event, value) => {
                  getSubCategories(value?.id);
                  setCategory(value);
                  setSubCategory({ subCategoryId: "", description: "" });
                  setCrop(null);
                }}
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                  />
                )}
                fullWidth
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop Sub Category</FieldName>
              <Autocomplete
                options={subCategoryOptions}
                disabled={category === null || category?.categoryId === ""}
                getOptionLabel={(i) => `${i.subCategoryId} - ${i.description}`}
                value={subCategory || null}
                onChange={(event, value) => {
                  getCrops(value?.id);
                  setSubCategory(value);
                  setCrop(null);
                }}
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                  />
                )}
                fullWidth
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop</FieldName>
              <Autocomplete
                options={cropyOptions}
                disabled={
                  subCategory === null || subCategory?.subCategoryId === ""
                }
                getOptionLabel={(i) => `${i?.cropId} - ${i?.description}`}
                value={crop || null}
                onChange={(event, value) => {
                  setCrop(value);
                  handleChange(value, "crop");
                }}
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                  />
                )}
                fullWidth
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={reset}
                sx={{ marginTop: "40px" }}
              >
                <RestartAlt />
                Reset
              </Button>
            </FieldWrapper>
          </Grid>
        </Grid>
      </ActionWrapper>
      {show ? (
        <DataTable
          loadingTable
          dataEndPoint={`crop/early-warning-ranges/crop/${id}`}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      ) : (
        <DataTable
          loadingTable
          dataEndPoint={"crop/early-warning-ranges"}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      )}
    </TableWrapper>
  );
};

export default CropLookEarlyWarningRangesList;
