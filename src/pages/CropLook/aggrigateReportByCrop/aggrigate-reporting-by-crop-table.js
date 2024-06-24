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
import { getCropLookProgressByCrop } from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { convertCropLookFields } from "../../../utils/appUtils";
import { getConfigurationByCropId } from "../../../redux/actions/cropLook/cropConfiguration/action";
import AiRangeProgressCell from "./AiRangeProgressCell";

const AggrigateReportByCropTable = ({ crop, season }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetConfigs, setTargetConfigs] = useState([]);
  const [reportConfigs, setReportConfigs] = useState([]);

  const [irrigationModeMap, setirrIgationModeMap] = useState(new Map());
  const [irrigationModeTargetMap, setirrIgationModeTargetMap] = useState(
    new Map()
  );

  useEffect(() => {
    async function fetchData(cropId, seasonId) {
      setLoading(true);
      const dataList = await getCropLookProgressByCrop(cropId, seasonId);
      fetchConfig(cropId, dataList);

      const groupedData = dataList?.reduce((acc, obj) => {
        const segName = obj?.segmentName;
        acc[segName] = acc[segName] || [];
        acc[segName].push(obj);
        return acc;
      }, {});

      setData(groupedData);
    }

    async function fetchConfig(cropId, dataList) {
      const configs = await getConfigurationByCropId(cropId);
      setTargetConfigs(configs?.targetFields || []);
      setReportConfigs(configs?.fields || []);

      calculateGrandTotal(dataList, configs?.fields, configs?.targetFields);

      setLoading(false);
    }
    fetchData(crop?.id, season?.id);
  }, [crop?.id, season?.id]);

  const calculateGrandTotal = (cropData, reportConfigs, targetConfigs) => {
    setirrIgationModeMap(new Map());
    setirrIgationModeTargetMap(new Map());

    for (let data of cropData) {
      for (let field of reportConfigs) {
        const dbField = convertCropLookFields(field);
        updateIrrigationModeMap(field, data[dbField]);
      }
      for (let field1 of targetConfigs) {
        const dbField = convertCropLookFields(field1);
        updateIrrigationModeTargetMap(field1, data[dbField]);
      }
      updateIrrigationModeMap("grandTotalBiWeek", data?.grandTotalBiWeek);
      updateIrrigationModeTargetMap(
        "grandTotalTargeted",
        data?.grandTotalTargeted
      );
    }
  };

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                District
              </TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                Segment
              </TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                Ai Division/ Mahaweli Block
              </TableCell>
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
              Object.keys(data).map((segName, index) => (
                <AiRangeProgressCell
                  segName={segName}
                  cropData={data[segName]}
                  targetConfigs={targetConfigs}
                  reportConfigs={reportConfigs}
                  isLast={Object.keys(data).length === index + 1}
                />
              ))
            ) : (
              <CircularProgress />
            )}
            {!loading ? (
              <TableRow>
                <TableCell style={{ backgroundColor: "#CA8787" }}></TableCell>
                <TableCell style={{ backgroundColor: "#CA8787" }}></TableCell>
                <TableCell style={{ backgroundColor: "#CA8787" }}>
                  Grand Total
                </TableCell>
                {targetConfigs.length > 0 &&
                  targetConfigs.map((fieldName, innerIndex) => (
                    <TableCell
                      key={innerIndex}
                      style={{ backgroundColor: "#CA8787" }}
                      align="right"
                    >
                      {getRoundValue(irrigationModeTargetMap.get(fieldName))}
                    </TableCell>
                  ))}
                <TableCell style={{ backgroundColor: "#A87676" }} align="right">
                  {getRoundValue(
                    irrigationModeTargetMap.get("grandTotalTargeted")
                  )}
                </TableCell>
                {reportConfigs.length > 0 &&
                  reportConfigs.map((fieldName1, innerIndex1) => (
                    <TableCell
                      key={innerIndex1}
                      style={{ backgroundColor: "#CA8787" }}
                      align="right"
                    >
                      {getRoundValue(irrigationModeMap.get(fieldName1))}
                    </TableCell>
                  ))}

                <TableCell style={{ backgroundColor: "#A87676" }} align="right">
                  {getRoundValue(irrigationModeMap.get("grandTotalBiWeek"))}
                </TableCell>
              </TableRow>
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AggrigateReportByCropTable;
