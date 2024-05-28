import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { get_SubCategoryById } from "../../../redux/actions/crop/crop/action";
import { RestartAlt } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, TextField, Autocomplete, Grid } from "@mui/material";

import { useEffect, useState } from "react";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { useTranslation } from "react-i18next";

const CropList = ({
  url,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {

  const {t} = useTranslation();
  const columns = [
    {
      field: [
        "cropSubCategoryDTO.subCategoryId",
        "cropSubCategoryDTO.description",
      ],
      sortCol: ["cropSubCategory.id"],
      joinString: " - ",
      headerName: t("cropPage.subCategory"),
    },
    { field: "description", headerName: t("cropPage.crop"), sortCol: ["description"] },
    {
      field: "scientificName",
      type: "scientific",
      headerName: t("cropPage.scientificName"),
      sortCol: ["scientificName"],
    },

    // { field: "cropType", headerName: "Crop Type" },
    // { field: "family", headerName: "Family" },
    // { field: "havesting", headerName: "Havesting" },
    { field: "cropId", headerName: t("cropPage.cropId"), sortCol: ["cropId"] },
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
      setCats(dataList);
    });
  }, []);

  const getSubCategories = (id) => {
    get_SubCategoryById(id).then(({ dataList = [] }) => {
      setSubcats(dataList);
    });
  };

  const reset = () => {
    setCategory({ categoryId: "", description: "" });
    setSubCategory({ subCategoryId: "", description: "" });
    setDataEndPoint("geo-data/crops");
  };

  const filter = () => {
    if (category?.id) {
      setDataEndPoint(`geo-data/crops/crop-category/${category?.id}`);
    }
    if (subCategory?.id) {
      setDataEndPoint(`geo-data/crops/crop-sub-category/${subCategory?.id}`);
    }
  };

  return (
    <TableWrapper style={{ marginTop: "0px" }}>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>{t("cropPage.cropCategory")}</FieldName>
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
              <FieldName>{t("cropPage.cropSubCategory")}</FieldName>
              <Autocomplete
                disabled={category?.id == null}
                options={subCats}
                value={subCategory}
                getOptionLabel={(i) => `${i.subCategoryId} - ${i.description}`}
                onChange={(event, value) => {
                  setSubCategory(value);
                  // setDataEndPoint(
                  //   `geo-data/crops/crop-sub-category/${value?.id}`
                  // );
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
          <Grid item>
            <FieldWrapper>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={filter}
                sx={{ marginTop: "40px" }}
              >
                <FilterAltIcon />
                {t("action.filter")}
              </Button>
            </FieldWrapper>
          </Grid>
          <Grid item>
            <Button
              color="success"
              variant="contained"
              size="small"
              onClick={reset}
              sx={{ marginTop: "40px" }}
            >
              <RestartAlt />
              {t("action.reset")}
            </Button>
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
          searchable={false}
        />
      </>
    </TableWrapper>
  );
};

export default CropList;
