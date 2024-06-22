import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";

import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropVariety/action";
import { getSeasons } from "../../../redux/actions/cropLook/cropTarget/actions";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../../components/TabButtons/TabButtons";
import NationalReportTable from "./nationalReportTable";

const NationalReport = () => {
  useUserAccessValidation();

  const [cropCategoryList, setCropCategoryList] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [toggleState, setToggleState] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setCropCategoryList(dataList);
    });

    getSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
    });
  }, []);

  const toggleTab = (index) => {
    console.log("toggle state : " + index);
    setToggleState(index);
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
      <ListHeader title="National Report" />
      <Grid
        container
        sx={{
          margin: "15px",
          //width: "97%",
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
                  value={selectedSeason}
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
            {selectedSeason ? (
              <Grid item sm={3} md={3} lg={3}>
                <FieldWrapper>
                  <FieldName>Week</FieldName>
                  <Autocomplete
                    options={selectedSeason?.biWeekDataList}
                    value={selectedWeek}
                    getOptionLabel={(i) => `${i.weekDescription}`}
                    onChange={(event, value) => {
                      setSelectedWeek(value);
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
            ) : null}
          </Grid>
        </Grid>
        <Grid item container sx={{ marginTop: "20px" }}>
          <Grid md={12}>
            <TabWrapper style={{ margin: "0px 0px" }}>
              {cropCategoryList.map((category, index) => (
                <TabButton
                  className={toggleState === index + 1 ? "active-tabs" : ""}
                  onClick={() => toggleTab(index + 1)}
                >
                  {category?.description}
                </TabButton>
              ))}
            </TabWrapper>
          </Grid>

          {selectedSeason &&
            cropCategoryList &&
            cropCategoryList.map((category, index) => (
              <TabContent
                //style={{ marginTop: "10px" }}
                className={toggleState === index + 1 ? "active-content" : ""}
              >
                <PermissionWrapper
                  permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGGREGATE_BI_WEEK_REPORT}`}
                >
                  <TableWrapper>
                    <div key={category.categoryId}>
                      {toggleState === index + 1 &&
                      selectedSeason &&
                      selectedWeek ? (
                        <NationalReportTable
                          category={category}
                          season={selectedSeason}
                          week={selectedWeek}
                        />
                      ) : null}
                    </div>
                  </TableWrapper>
                </PermissionWrapper>
              </TabContent>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default NationalReport;
