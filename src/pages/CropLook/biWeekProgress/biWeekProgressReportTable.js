import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getBiWeekProgressData } from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";
import AggrigateVarietyCell from "./biWeekProgressReportRow";
import BiWeekProgressReportRow from "./biWeekProgressReportRow";

const BiWeekProgressReportTable = ({ category, season }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetConfigs, setTargetConfigs] = useState([]);
  const [reportConfigs, setReportConfigs] = useState([]);
  const [seasonType, setSeasonType] = useState(null);

  useEffect(() => {
    async function fetchData(categoryId, seasonId) {
      setLoading(true);
      const dataList = await getBiWeekProgressData(categoryId, seasonId);
      // fetchConfig(categoryId, dataList);

      // const groupedData = dataList?.reduce((acc, obj) => {
      //   const cropName = obj?.cropName;
      //   acc[cropName] = acc[cropName] || [];
      //   acc[cropName].push(obj);
      //   return acc;
      // }, {});

      setData(dataList);
      setLoading(false);
    }

    // async function fetchConfig(categoryId, dataList) {
    //   const configs = await getConfigurationById(categoryId);
    //   setTargetConfigs(configs?.targetFields || []);
    //   setReportConfigs(configs?.fields || []);
    //   setLoading(false);
    // }
    setSeasonType();
    fetchData(category?.id, season?.id);
  }, [season]);

  const getStartMonthOfSeason = () => {
    const date = new Date(season?.startDate);

    return date.getMonth() + 1;
  };

  return (
    <>
      <h5>{category.description}</h5>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>Crop</TableCell>
              {getStartMonthOfSeason > 7 ? (
                <>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    SEPTEMBER (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    SEPTEMBER (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    OCTOBER (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    OCTOBER (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    NOVEMBER (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    NOVEMBER (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    DECEMBER (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    DECEMBER (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    JANUARY (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    JANUARY (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    FEBRUARY (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    FEBRUARY (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    MARCH (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    MARCH (3-4 Week)
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    APRIL (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    APRIL (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    MAY (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    MAY (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    JUNE (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    JUNE (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    JULY (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    JULY (3-4 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    AUGUST (1-2 Week)
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                    AUGUST (3-4 Week)
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              <BiWeekProgressReportRow
                data={data}
                seasonStartMonth={getStartMonthOfSeason}
              />
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BiWeekProgressReportTable;
