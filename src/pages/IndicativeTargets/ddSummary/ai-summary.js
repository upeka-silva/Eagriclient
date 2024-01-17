import {
  Autocomplete,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  getSummaryByAiIdAndSeason,
  getSummaryByDDIdAndSeason,
} from "../../../redux/actions/indicativeTargets/actions";
import { useEffect, useState } from "react";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { getAgriSeasons } from "../../../redux/actions/cropLook/season/action";
import { getAllAiAndMahaweliUnits } from "../../../redux/actions/cropLook/cropTarget/actions";
import { get_AiRegionList, get_AiRegionListWithoutPagination } from "../../../redux/actions/aiRegion/action";

const AILevelSummary = () => {
  const [data, setData] = useState([]);

  const [aiRegions, setAiRegions] = useState([]);

  const [seasons, setSeasons] = useState([]);

  const [aiId, setAiId] = useState(null);

  const [seasonId, setSeasonId] = useState(null);

  useEffect(() => {
    getAgriSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
    });

    get_AiRegionListWithoutPagination().then(({ dataList = [] }) => {
      setAiRegions(dataList);
      console.log(dataList);
    });
  }, []);

  const onSelectSeason = (sId) => {
    console.log("season Id");
    console.log(seasonId);
    if (aiId) {
      getSummaryByAiIdAndSeason(aiId, sId).then(({ data = [] }) => {
        setData(data);
      });
    }
  };

  const onSelectAiRegion = (aId) => {
    console.log("Ai Id");
    console.log(aiId);
    if (seasonId) {
      getSummaryByAiIdAndSeason(aId, seasonId).then(({ data = [] }) => {
        setData(data);
      });
    }
  };

  return (
    <>
      <ListHeader title="Indicative Target Summary (AI Region Level)" />

      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Ai Region</FieldName>
              <Autocomplete
                options={aiRegions}
                //value={category}
                getOptionLabel={(i) => `${i.regionId} - ${i.description} `}
                onChange={(event, value) => {
                  setAiId(value.id);
                  onSelectAiRegion(value.id);
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
                    placeholder="Select Ai Region"
                  />
                )}
                disableClearable
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Season</FieldName>
              <Autocomplete
                options={seasons}
                //value={subCategory}
                getOptionLabel={(i) => `${i.code} - ${i.description}`}
                onChange={(event, value) => {
                  setSeasonId(value.id);
                  onSelectSeason(value.id);
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
                    placeholder="Select Season"
                    value={data ? `${data.code} - ${data.description}` : ""}
                  />
                )}
                disableClearable
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </ActionWrapper>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Crop Id</TableCell>
              <TableCell>Crop Description</TableCell>
              <TableCell>Target</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row, index) => (
                <TableRow key={row.cropId}>
                  <TableCell>{row.cropId}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.targetSum}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AILevelSummary;
