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
import CategoryReportTabel from "./ApprovalDashboardTable";
import { getSeasons } from "../../../redux/actions/cropLook/cropTarget/actions";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import ReportApprovalTable from "./ApprovalDashboardTable";
import { BI_WEEK_DATA_STATUS } from "../../../utils/constants/bi-week-data-status";

const ApprovalDashboard = () => {
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
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    getSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
    });
  }, []);

  const filterBiWeekList = (biWeekList) => {
    return biWeekList.filter(
      (data) => data.status === BI_WEEK_DATA_STATUS.ENABLED
    );
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
      <ListHeader title="Aggrigated Report" />
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
                  //value={selectedSeason}
                  getOptionLabel={(i) => `${i?.code} - ${i?.description}`}
                  onChange={(event, value) => {
                    setSelectedSeason(value);
                    setSelectedWeek(null);
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
                  options={filterBiWeekList(selectedSeason?.biWeekDataList)}
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
        <Grid item md={12}>
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGGREGATE_BI_WEEK_REPORT}`}
          >
            {selectedWeek && <TableWrapper>
                    <ReportApprovalTable
                      season={selectedSeason}
                      week={selectedWeek}
                    />
            </TableWrapper>}
          </PermissionWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ApprovalDashboard;
