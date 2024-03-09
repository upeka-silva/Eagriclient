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
import { getSummaryByDDIdAndSeason } from "../../../redux/actions/indicativeTargets/actions";
import { useEffect, useState } from "react";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { getAgriSeasons } from "../../../redux/actions/cropLook/season/action";
import { Colors } from "../../../utils/constants/Colors";
import { Fonts } from "../../../utils/constants/Fonts";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";


const DDLevelSummary = () => {
  const [data, setData] = useState([]);

  const [seasons, setSeasons] = useState([]);

  //const [seasonId, setSeasonId] = useState(0);

  useEffect(() => {
    getAgriSeasons().then(({ dataList = [] }) => {
      setSeasons(dataList);
    });
  }, []);

  const onSelectSeason = (seasonId) => {
    console.log("season Id");
    console.log(seasonId);
    getSummaryByDDIdAndSeason(1, seasonId).then(({ data = [] }) => {
      setData(data);
    });
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
    <>
      <ListHeader title="Indicative Target Summary (DD Level)" />

      <ActionWrapper isLeft>
        <Grid container>
          {/* <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Crop Category</FieldName>
              <Autocomplete
                options={ddRegions}
                //value={category}
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
          </Grid> */}
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Season</FieldName>
              <Autocomplete
                options={seasons}
                //value={subCategory}
                getOptionLabel={(i) => `${i.code} - ${i.description}`}
                onChange={(event, value) => {
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

      <TableWrapper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead
            sx={{
              backgroundColor: Colors.tableHeaderColor,
            }}
          >
            <TableRow>
              <TableCell>Crop Id</TableCell>
              <TableCell>Crop Description</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Target Minor</TableCell>
              <TableCell>Target Rainfed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row, index) => (
                <TableRow key={row.cropId}>
                  <TableCell>{row.cropId}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.targetSum}</TableCell>
                  <TableCell>{row.targetMinorSum}</TableCell>
                  <TableCell>{row.targetRainFedSum}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </TableWrapper> 
    </>
    </div>
  );
};

export default DDLevelSummary;
