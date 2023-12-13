import {
  RestartAlt
} from "@mui/icons-material";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { DataTable } from "../../../components/PageLayout/Table";
import { get_SubCategoryById } from "../../../redux/actions/crop/crop/action";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { get_CropById } from "../../../redux/actions/crop/cropVariety/action";

const CropVarietyList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: ["varietyId"], headerName: "Variety ID" },
    { field: "varietyName", headerName: "Variety Name" },
    { field: "grainSize", headerName: "Grain Size" },
    { field: "pericarpColor", headerName: "Pericarp Color" },
    { field: "maturityTime", headerName: "Maturity Time" },
    { field: "averageYield", headerName: "Avg. Yeild" },
  ];
  

  const [cats, setCats] = useState([]);
  const [subCats, setSubcats] = useState([]);
  const [crops, setCrops] = useState([]);
  const [category, setCategory] = useState({ categoryId: "", description: "" });
  const [subCategory, setSubCategory] = useState({
    subCategoryId: "",
    description: "",
  });
  const [crop, setCrop] = useState({
    cropId: "",
    description: "",
  });
  const [dataEndPoint, setDataEndPoint] = useState("geo-data/crop-varieties");

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      console.log(dataList);
      setCats(dataList);
    });
  }, []);

  const reset = () => {
    setCategory({ categoryId: "", description: "" });
    setSubCategory({
      subCategoryId: "",
      description: "",
    });
    setCrop({
      cropId: "",
      description: "",
    });
    setDataEndPoint("geo-data/crop-varieties");
  };
  

  const getSubCategories = (id) => {
    get_SubCategoryById(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setSubcats(dataList);
    });
  };

  const getCrops = (id) => {
    get_CropById(id).then(({ dataList = [] }) => {
      setCrops(dataList);
    });
  };

  return (
    <div>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop Category</FieldName>
              <Autocomplete
                options={cats}
                value={category}
                disableClearable
                getOptionLabel={(i) => `${i.categoryId} - ${i.description} `}
                onChange={(event, value) => {
                  setCategory(value);
                  getSubCategories(value?.id);
                  setSubCategory({
                    subCategoryId: "",
                    description: "",
                  });
                  setCrop({
                    cropId: "",
                    description: "",
                  });
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Select Crop Category"
                  />
                )}
              />
            </FieldWrapper>
          </Grid>

          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop Sub Category</FieldName>
              <Autocomplete
                disabled={category?.id == null}
                options={subCats}
                value={subCategory}
                getOptionLabel={(i) => `${i.subCategoryId} - ${i.description} `}
                onChange={(event, value) => {
                  setSubCategory(value);
                  getCrops(value?.id);
                  setCrop({
                    cropId: "",
                    description: "",
                  });
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Select Crop Sub Category"
                  />
                )}
                disableClearable
              />
            </FieldWrapper>
          </Grid>

          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop</FieldName>
              <Autocomplete
                disabled={subCategory?.id == null}
                options={crops}
                value={crop}
                getOptionLabel={(i) => `${i.cropId} - ${i.description} `}
                onChange={(event, value) => {
                  setCrop(value);
                  setDataEndPoint(`geo-data/crop-varieties/crop/${value?.id}`);
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  marginRight: "5px",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Select Crop "
                  />
                )}
                disableClearable
              />
            </FieldWrapper>
          </Grid>

          <Grid item sm={2} md={2} lg={2}>
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

      <>
        <DataTable
          loadingTable
          dataEndPoint={dataEndPoint}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      </>
    </div>
  );
};

export default CropVarietyList;
