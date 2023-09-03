import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import {
  Add,
  Delete,
  RestartAlt,
  Edit,
  Search,
  Vrpano,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Grid,
} from "@mui/material";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_SubCategoryById } from "../../../redux/actions/crop/crop/action";
import { get_CropById } from "../../../redux/actions/crop/cropVariety/action";

const CropVarietyList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "varietyId", headerName: "Variety ID" },
    { field: "varietyName", headerName: "Variety Name" },
  ];
  // const columns1 = [
  //     {field: "payloadDto.varietyId", headerName: "Variety ID"},
  //     {field: "payloadDto.varietyName", headerName: "Variety Name"},
  // ];
  const [options, setOptions] = useState([]);
  const [id, setId] = useState(null);
  const [subcat, setSubcat] = useState([]);
  const [subcrop, setSubcrop] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [isdisable, setIsdisable] = useState({
    cat: false,
    subcat: false,
  });
  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setOptions(dataList);
      console.log(dataList);
    });
  }, []);
  const reset = () => {
    const allTrueIsdisable = {
      cat: false,
      subcat: false,
      crop: false,
    };
    setIsdisable(allTrueIsdisable);
    setData(null);
    setShow(null);
  };
  const handleChange = (value, target) => {
    console.log(value?.id);
    setId(value?.id);
    setIsdisable((prevState) => ({
      ...prevState,
      [target]: true,
    }));
    get_SubCategoryById(value?.id).then(({ dataList = [] }) => {
      console.log(dataList);
      setSubcat(dataList);
    });

    // if (Object.keys(subcat).length > 0) {
    //     setShow(!show);
    // }
    get_CropById(value?.id).then(({ dataList = [] }) => {
      console.log("crops", dataList);
      setSubcrop(dataList);
    });

    if (Object.keys(subcrop).length > 0) {
      setShow(!show);
    }
  };

  // console.log(options)

  return (
    <div>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop Category</FieldName>
              <Autocomplete
                disabled={isdisable.cat}
                // disabled={state?.action === DEF_ACTIONS.VIEW}
                options={options}
                value={data}
                disableClearable
                // value={formData ? formData.cropCategoryDTO : ""}
                getOptionLabel={(i) => `${i.categoryId} - ${i.description} `}
                onChange={(event, value) => {
                  handleChange(value, "cat");
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
                fullWidth
              />
            </FieldWrapper>
          </Grid>

          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop Sub Category</FieldName>
              <Autocomplete
                disabled={isdisable.subcat}
                options={subcat}
                value={data}
                // // value={formData ? formData.cropCategoryDTO : ""}
                getOptionLabel={(i) => `${i.subCategoryId} - ${i.description} `}
                onChange={(event, value) => {
                  handleChange(value, "subcat");
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
                fullWidth
              />
            </FieldWrapper>
          </Grid>

          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Crop</FieldName>
              <Autocomplete
                disabled={isdisable.crop}
                options={subcrop}
                value={data}
                // // value={formData ? formData.cropCategoryDTO : ""}
                getOptionLabel={(i) => `${i.cropId} - ${i.scientificName} `}
                onChange={(event, value) => {
                  handleChange(value, "crop");
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
                fullWidth
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
      {show ? (
        <>
          <DataTable
            loadingTable
            dataEndPoint={`geo-data/crop-varieties/crop/${id}`}
            columns={columns}
            selectable
            selectedRows={selectedRows}
            selectAll={selectAll}
            onRowSelect={onRowSelect}
            unSelectAll={unSelectAll}
          />
        </>
      ) : (
        <>
          <DataTable
            loadingTable
            dataEndPoint={"geo-data/crop-varieties"}
            columns={columns}
            selectable
            selectedRows={selectedRows}
            selectAll={selectAll}
            onRowSelect={onRowSelect}
            unSelectAll={unSelectAll}
          />
        </>
      )}
    </div>
  );
};

export default CropVarietyList;
