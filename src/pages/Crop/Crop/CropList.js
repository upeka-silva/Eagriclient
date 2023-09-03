import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { get_SubCategoryById } from "../../../redux/actions/crop/crop/action";
import {
  Add,
  Delete,
  Edit,
  RestartAlt,
  Search,
  Vrpano,
} from "@mui/icons-material";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";

const CropList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "cropId", headerName: "Crop ID" },
    { field: "scientificName", headerName: "Scientific Name" },
  ];
  const [options, setOptions] = useState([]);
  const [subcat, setSubcat] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
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

  const handleChange = (value, target) => {
    console.log(value?.id);
    const val = target;

    console.log(val);
    setId(value?.id);
    setIsdisable((prevState) => ({
      ...prevState,
      [val]: true,
    }));

    get_SubCategoryById(value?.id).then(({ dataList = [] }) => {
      console.log(dataList);
      setSubcat(dataList);
    });

    if (Object.keys(subcat).length > 0) {
      setShow(!show);
    }
  };

  const reset = () => {
    setIsdisable(false);
    setData(null);
    setShow(null);
  };
  // console.log(options)

  return (
    <CardWrapper>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Crop Category</FieldName>
              <Autocomplete
                disabled={isdisable.cat}
                options={options}
                value={data}
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
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Crop Sub Category</FieldName>
              <Autocomplete
                disabled={isdisable.subcat}
                options={subcat}
                value={data}
                getOptionLabel={(i) => `${i.subCategoryId} - ${i.description}`}
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
                    value={
                      data ? `${data.subCategoryId} - ${data.description}` : ""
                    }
                  />
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
            dataEndPoint={`geo-data/crops/crop-sub-category/${id}`}
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
          {" "}
          <DataTable
            loadingTable
            dataEndPoint={"geo-data/crops"}
            columns={columns}
            selectable
            selectedRows={selectedRows}
            selectAll={selectAll}
            onRowSelect={onRowSelect}
            unSelectAll={unSelectAll}
          />
        </>
      )}
    </CardWrapper>
  );
};

export default CropList;
