import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { get_SubCategoryById } from "../../../redux/actions/crop/crop/action";
import { RestartAlt } from "@mui/icons-material";
import { Button, TextField, Autocomplete, Grid } from "@mui/material";

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
    { field: "description", headerName: "Description" },
    { field: "scientificName", headerName: "Scientific Name" },
    {
      field: [
        "cropSubCategoryDTO.subCategoryId",
        "cropSubCategoryDTO.description",
      ],
      joinString: " - ",
      headerName: "Sub Category",
    },
    { field: "cropType", headerName: "Crop Type" },
    { field: "family", headerName: "Family" },
    { field: "havesting", headerName: "Havesting" },
  ];
  const [cats, setCats] = useState([]);
  const [subCats, setSubcats] = useState([]);

  const [data, setData] = useState(null);

  const [category, setCategory] = useState({ categoryId: "", description: "" });
  const [subCategory, setSubCategory] = useState({
    subCategoryId: "",
    description: "",
  });
  const [dataEndPoint, setDataEndPoint] = useState("geo-data/crops");
  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      console.log(dataList);
      setCats(dataList);
    });
  }, []);

  const getSubCategories = (id) => {
    get_SubCategoryById(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setSubcats(dataList);
    });
  };

  const reset = () => {
    setCategory({ categoryId: "", description: "" });
    setSubCategory({ subCategoryId: "", description: "" });
    setDataEndPoint("geo-data/crops");
  };

  return (
    <TableWrapper style={{ marginTop: "0px" }}>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Crop Category</FieldName>
              <Autocomplete
                options={cats}
                value={category}
                getOptionLabel={(i) => `${i.categoryId} - ${i.description} `}
                onChange={(event, value) => {
                  setCategory(value);
                  getSubCategories(value.id);
                  setSubCategory({ subCategoryId: "", description: "" });
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
                disableClearable
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Crop Sub Category</FieldName>
              <Autocomplete
                disabled={category?.id == null}
                options={subCats}
                value={subCategory}
                getOptionLabel={(i) => `${i.subCategoryId} - ${i.description}`}
                onChange={(event, value) => {
                  setSubCategory(value);
                  setDataEndPoint(
                    `geo-data/crops/crop-sub-category/${value?.id}`
                  );
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
                disableClearable
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
    </TableWrapper>
  );
};

export default CropList;
