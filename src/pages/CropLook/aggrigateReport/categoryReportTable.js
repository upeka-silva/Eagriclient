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
import { convertCropLookFields, getDbFieldName } from "../../../utils/appUtils";

const CategoryReportTabel = ({ category, season }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetConfigs, setTargetConfigs] = useState([]);
  const [reportConfigs, setReportConfigs] = useState([]);
  const [confLoading, setConfLoading] = useState([]);

  console.log({ category, season });

  useEffect(() => {
    async function fetchData(categoryId, seasonId) {
      setLoading(true);
      const dataList = await getAggrigateReportData(categoryId, seasonId);
      setLoading(false);
      setData(dataList);
    }

    async function fetchConfig(categoryId) {
      setConfLoading(true);
      const configs = await getConfigurationById(categoryId);
      setTargetConfigs(configs.targetFields);
      setReportConfigs(configs.fields);
      setConfLoading(false);
    }

    fetchConfig(category?.categoryId);
    fetchData(category?.categoryId, season?.id);
  }, [season]);

  return (
    <>
      <h5>{category.description}</h5>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Variety</TableCell>
              {targetConfigs.length > 0 &&
                targetConfigs.map((fieldName, index) => (
                  <TableCell key={index}>{fieldName} (ha)</TableCell>
                ))}
              <TableCell>Total Target (ha)</TableCell>
              {reportConfigs.length > 0 &&
                reportConfigs.map((fieldName1, index1) => (
                  <TableCell key={index1}>{fieldName1} (ha)</TableCell>
                ))}
              <TableCell>Total Extent (ha)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data?.map((row, index) => (
                <TableRow key={index}>
                  {targetConfigs.length > 0 &&
                    targetConfigs.map((fieldName, innerIndex) => (
                      <TableCell key={innerIndex}>
                        {row[convertCropLookFields(fieldName)]}
                      </TableCell>
                    ))}
                  <TableCell>{row.grandTotalTargeted}</TableCell>
                  {reportConfigs.length > 0 &&
                    reportConfigs.map((fieldName1, innerIndex1) => (
                      <TableCell key={innerIndex1}>
                        {row[convertCropLookFields(fieldName1)]}
                      </TableCell>
                    ))}

                  <TableCell>{row.grandTotalBiWeek}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoryReportTabel;
