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
import AiRangeProgessCell from "./AiRangeProgressCell";
import { getConfigurationByCropId } from "../../../redux/actions/cropLook/cropConfiguration/action";

const AggrigateReportByCropTable = ({ crop, season}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetConfigs, setTargetConfigs] = useState([]);
  const [reportConfigs, setReportConfigs] = useState([]);

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
      setLoading(false);
    }
    fetchData(crop?.id, season?.id);
  }, [crop?.id,season?.id]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>District</TableCell>
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
              Object.keys(data).map((segName) => (
                <AiRangeProgessCell
                  segName={segName}
                  cropData={data[segName]}
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

export default AggrigateReportByCropTable;
