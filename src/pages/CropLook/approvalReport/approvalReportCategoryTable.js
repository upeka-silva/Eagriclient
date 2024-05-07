import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAggrigateReportData } from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";
import ApprovalReportTableCell from "./approvalReportTableCell";

const ApprovalReportCategoryTable = ({ category, season }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetConfigs, setTargetConfigs] = useState([]);
  const [reportConfigs, setReportConfigs] = useState([]);
  const [confLoading, setConfLoading] = useState([]);

  useEffect(() => {
    async function fetchData(categoryId, seasonId) {
      setLoading(true);
      const dataList = await getAggrigateReportData(categoryId, seasonId);

      fetchConfig(category?.categoryId, dataList);

      const groupedData = dataList?.reduce((acc, obj) => {
        const cropName = obj?.cropName;
        acc[cropName] = acc[cropName] || [];
        acc[cropName].push(obj);
        return acc;
      }, {});

      setLoading(false);
      setData(groupedData);
    }

    async function fetchConfig(categoryId, dataList) {
      setConfLoading(true);
      const configs = await getConfigurationById(categoryId);
      setTargetConfigs(configs?.targetFields);
      setReportConfigs(configs?.fields);

      setConfLoading(false);
    }

    fetchData(category?.id, season?.id);
  }, [season]);

  const removeExtent = (field) => {
    field.replace(/Extent/g, '');
  };

  return (
    <>
      <h5>Target And Extent Progress</h5>
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
              {targetConfigs?.length > 0 &&
                targetConfigs?.map((fieldName, index) => (
                  <TableCell key={index} style={{ backgroundColor: "#A8CD9F" }}>{fieldName} (ha)</TableCell>
                ))}
              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total (ha)
              </TableCell>
              {reportConfigs?.length > 0 &&
                reportConfigs?.map((fieldName1, index1) => (
                  <TableCell key={index1} style={{ backgroundColor: "#A8CD9F" }}>{fieldName1} (ha)</TableCell>
                ))}
              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total (ha)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!confLoading &&
              Object.keys(data).map((cropName) => (
                <ApprovalReportTableCell
                  cropName={cropName}
                  cropData={data[cropName]}
                  targetConfigs={targetConfigs}
                  reportConfigs={reportConfigs}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ApprovalReportCategoryTable;
