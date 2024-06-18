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
import {
  getAllProAndInterAda,
  getSeasons,
} from "../../../redux/actions/cropLook/cropTarget/actions";
import { Autocomplete, Grid, Stack, TextField } from "@mui/material";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../../components/TabButtons/TabButtons";
import ExportButton from "../../../components/ExportButton/ExportButton";
import { downloadDDSummaryADAExcel } from "../../../redux/actions/cropLook/aggrigateReport/actions";
import CategoryReportTabelAdaLevel from "./categoryReportTable-ada";

const AggrigateReportAdaLevel = () => {
  useUserAccessValidation();

  const [cropCategoryList, setCropCategoryList] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [toggleState, setToggleState] = useState(1);
  const [adaRegions, setAdaRegions] = useState([]);
  const [selectedAdaRegion, setSelectedAdaRegion] = useState(null);

  useEffect(() => {
    getAllProAndInterAda().then(({ dataList = [] }) => {
      setAdaRegions(dataList);
    });

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
  const onDownload = async (categoryId) => {
    try {
      await downloadDDSummaryADAExcel(selectedSeason.id, categoryId,selectedAdaRegion.id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAdaRegionChange = (value) => {
    setSelectedAdaRegion(value);
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
      <ListHeader title="Variety Summary - ADA Wise" />
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
            <Grid item md={3}>
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <FieldWrapper sx={{ width: "90%" }}>
                  <FieldName>Season</FieldName>
                  <Autocomplete
                    options={seasons}
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
              </Stack>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>ADA Segments</FieldName>
                <Autocomplete
                  options={adaRegions}
                  value={selectedAdaRegion}
                  getOptionLabel={(i) =>
                    `${i.code || i.regionId} - ${i.description}`
                  }
                  onChange={(event, value) => {
                    handleAdaRegionChange(value);
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
        <Grid item container sx={{ marginTop: "20px" }}>
          <TabWrapper style={{ margin: "0px 0px" }}>
            {cropCategoryList.map((category, index) => (
              <TabButton
                key={index}
                className={toggleState === index + 1 ? "active-tabs" : ""}
                onClick={() => toggleTab(index + 1)}
              >
                {category?.description}
              </TabButton>
            ))}
          </TabWrapper>

          {selectedSeason && selectedAdaRegion &&
            cropCategoryList &&
            cropCategoryList.map((category, index) => (
              <TabContent
                //style={{ marginTop: "10px" }}
                className={toggleState === index + 1 ? "active-content" : ""}
              >
                {toggleState === index + 1 ? (
                  <PermissionWrapper
                    permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGGREGATE_BI_WEEK_REPORT_ADA_LEVEL}`}
                  >
                    <TableWrapper>
                      <div key={category.categoryId}>
                        <ExportButton
                         onDownload={() => onDownload(category.id,selectedSeason.id, selectedAdaRegion.id)}
                        />
                        <CategoryReportTabelAdaLevel
                          category={category}
                          season={selectedSeason}
                          adaId={selectedAdaRegion?.id}
                        />
                      </div>
                    </TableWrapper>
                  </PermissionWrapper>
                ) : null}
              </TabContent>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default AggrigateReportAdaLevel;
