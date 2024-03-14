import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";

import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";
import { get_CategoryList } from "../../../redux/actions/crop/cropVariety/action";
import CategoryReportTabel from "./categoryReportTable";
import { getSeasons } from "../../../redux/actions/cropLook/cropTarget/actions";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";

const AggrigateReport = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [cropCategoryList, setCropCategoryList] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      console.log("crop list");
      console.log(dataList);
      setCropCategoryList(dataList);
    });

    getSeasons().then(({ dataList = [] }) => {
      console.log("seasons ---------->");
      console.log(dataList);
      setSeasons(dataList);
    });
  }, []);

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
      <ListHeader title="Aggrigate Report" />
      <Grid
        container
        sx={{
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item md={12}>
          <Grid container>
            <Grid item md={4}>
              <FieldWrapper>
                <FieldName>Season</FieldName>
                <Autocomplete
                  options={seasons}
                  //value={selectedSeason}
                  getOptionLabel={(i) => `${i?.code} - ${i?.description}`}
                  onChange={(event, value) => {
                    setSelectedSeason(value);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGGREGATE_BI_WEEK_REPORT}`}
          >
            <TableWrapper>
              {selectedSeason &&
                cropCategoryList &&
                cropCategoryList.map((category) => (
                  <div key={category.categoryId}>
                    <h5>{category.categoryName}</h5>
                    <CategoryReportTabel
                      category={category}
                      season={selectedSeason}
                    />
                  </div>
                ))}
            </TableWrapper>
          </PermissionWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AggrigateReport;
