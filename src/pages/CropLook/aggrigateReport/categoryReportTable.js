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
import { getAggrigateReportData } from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";
import { convertCropLookFields, getDbFieldName } from "../../../utils/appUtils";
import AggrigateVarietyCell from "./aggrigateVarietyCell";

const CategoryReportTabel = ({ category, season }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetConfigs, setTargetConfigs] = useState([]);
  const [reportConfigs, setReportConfigs] = useState([]);
  const [irrigationModeMap, setirrIgationModeMap] = useState(new Map());
  const [irrigationModeTargetMap, setirrIgationModeTargetMap] = useState(
    new Map()
  );

  useEffect(() => {
    setirrIgationModeMap(new Map());
    setirrIgationModeTargetMap(new Map());
    async function fetchData(categoryId, seasonId) {
      setLoading(true);
      const dataList = await getAggrigateReportData(categoryId, seasonId);

      fetchConfig(categoryId, dataList);

      const groupedData = dataList.reduce((acc, obj) => {
        const cropName = obj?.cropName;
        acc[cropName] = acc[cropName] || [];
        acc[cropName].push(obj);
        return acc;
      }, {});
      setData(groupedData);
    }

    async function fetchConfig(categoryId, dataList) {
      const configs = await getConfigurationById(categoryId);
      setTargetConfigs(configs.targetFields);
      setReportConfigs(configs.fields);

      for (let data of dataList) {
        for (let field of configs?.fields) {
          const dbField = convertCropLookFields(field);
          updateIrrigationModeMap(field, data[dbField]);
        }

        for (let field1 of configs?.targetFields) {
          const dbField = convertCropLookFields(field1);
          updateIrrigationModeTargetMap(field1, data[dbField]);
        }
        updateIrrigationModeMap("grandTotalBiWeek", data?.grandTotalBiWeek);
        updateIrrigationModeTargetMap(
          "grandTotalTargeted",
          data?.grandTotalTargeted
        );
      }
      setLoading(false);
    }

    fetchData(category?.id, season?.id);
  }, [season]);

  const updateIrrigationModeMap = (key, value) => {
    setirrIgationModeMap((prevMap) => {
      const newMap = new Map(prevMap);

      if (newMap.has(key)) {
        newMap.set(key, newMap.get(key) + value);
      } else {
        newMap.set(key, value);
      }

      return newMap;
    });
  };

  const updateIrrigationModeTargetMap = (key, value) => {
    setirrIgationModeTargetMap((prevMap) => {
      const newMap = new Map(prevMap);

      if (newMap.has(key)) {
        newMap.set(key, newMap.get(key) + value);
      } else {
        newMap.set(key, value);
      }

      return newMap;
    });
  };

  const getRoundValue = (value) => {
    return value?.toFixed(3);
  };

  return (
    <>
      <h5>{category.description}</h5>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                Crop
              </TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                Variety
              </TableCell>
              {targetConfigs.length > 0 &&
                targetConfigs.map((fieldName, index) => (
                  <TableCell key={index} style={{ backgroundColor: "#A8CD9F" }}>{fieldName} (ha)</TableCell>
                ))}
              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total Target (ha)
              </TableCell>
              {reportConfigs.length > 0 &&
                reportConfigs.map((fieldName1, index1) => (
                  <TableCell key={index1} style={{ backgroundColor: "#A8CD9F" }}>{fieldName1} (ha)</TableCell>
                ))}
              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total Extent (ha)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ?
              Object.keys(data).map((cropName) => (
                <AggrigateVarietyCell
                  cropName={cropName}
                  cropData={data[cropName]}
                  targetConfigs={targetConfigs}
                  reportConfigs={reportConfigs}
                />
              )) : <CircularProgress/>}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoryReportTabel;
