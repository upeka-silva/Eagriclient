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
import { get_CategoryList } from "../../../redux/actions/crop/cropVariety/action";
import {
  getAllAiAndMahaweliUnits,
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
import { downloadDDSummaryExcel } from "../../../redux/actions/cropLook/aggrigateReport/actions";
import AggrigateReportByCropTable from "./aggrigate-reporting-by-crop-table";
import { get_CropList } from "../../../redux/actions/crop/crop/action";

const AggrigateReportByCrop = () => {
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
  const [toggleState, setToggleState] = useState(1);
  const [aiRegions, setAiRegions] = useState([]);
  const [selectedAiRegion, setSelectedAiRegion] = useState(null);

  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    getSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
    });

    get_CropList().then(({ dataList = [] }) => {
      setCrops(dataList);
    });
  }, []);

  const onDownload = async (categoryId) => {
    try {
      await downloadDDSummaryExcel(selectedSeason.id, categoryId);
    } catch (error) {
      console.error(error);
    }
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
      <ListHeader title="AI Range Wise Segment Summary" />
      <Grid
        container
        sx={{
          margin: "15px",
          // width: "80%",
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
                <FieldName>Crop</FieldName>
                <Autocomplete
                  options={crops}
                  value={selectedCrop}
                  getOptionLabel={(i) => `${i.cropId} - ${i.description} `}
                  onChange={(event, value) => {
                    setSelectedCrop(value);
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
          </Grid>
        </Grid>
        <Grid item container sx={{ marginTop: "20px" }}>
          {selectedSeason && selectedCrop ? (
            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGGREGATE_BI_WEEK_REPORT}`}
            >
              <TableWrapper>
                <div>
                  <AggrigateReportByCropTable
                    crop={selectedCrop}
                    season={selectedSeason}
                  />
                </div>
              </TableWrapper>
            </PermissionWrapper>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default AggrigateReportByCrop;
