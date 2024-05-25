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
import AggrigateVarietyCellDDLevel from "./aggrigateVarietyCell-Dd";
import { getAggrigateReportDataADDLevel } from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";

const CategoryReportTabelDDLevel = ({ category, season, ddId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetConfigs, setTargetConfigs] = useState([]);
  const [reportConfigs, setReportConfigs] = useState([]);

  useEffect(() => {
    async function fetchData(categoryId, seasonId, ddId) {
      setLoading(true);
      const dataList = await getAggrigateReportDataADDLevel(
        categoryId,
        seasonId,
        ddId
      );
      fetchConfig(categoryId, dataList);

      const groupedData = dataList?.reduce((acc, obj) => {
        const cropName = obj?.cropName;
        acc[cropName] = acc[cropName] || [];
        acc[cropName].push(obj);
        return acc;
      }, {});

      setData(groupedData);
    }

    async function fetchConfig(categoryId, dataList) {
      const configs = await getConfigurationById(categoryId);
      setTargetConfigs(configs?.targetFields || []);
      setReportConfigs(configs?.fields || []);
      setLoading(false);
    }
    fetchData(category?.id, season?.id, ddId);
  }, [ddId,season?.id]);

  return (
    <>
      <h5>{category.description}</h5>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>Crop</TableCell>

              {targetConfigs?.length > 0 &&
                targetConfigs.map((fieldName, index) => (
                  <TableCell key={index} style={{ backgroundColor: "#A8CD9F" }}>
                    {fieldName} (ha)
                  </TableCell>
                ))}
              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total Target (ha)
              </TableCell>
              {reportConfigs?.length > 0 &&
                reportConfigs.map((fieldName1, index1) => (
                  <TableCell
                    key={index1}
                    style={{ backgroundColor: "#A8CD9F" }}
                  >
                    {fieldName1} (ha)
                  </TableCell>
                ))}
              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total Extent (ha)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              Object.keys(data).map((cropName) => (
                <AggrigateVarietyCellDDLevel
                  cropName={cropName}
                  cropData={data[cropName]}
                  targetConfigs={targetConfigs}
                  reportConfigs={reportConfigs}
                />
              ))
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoryReportTabelDDLevel;
