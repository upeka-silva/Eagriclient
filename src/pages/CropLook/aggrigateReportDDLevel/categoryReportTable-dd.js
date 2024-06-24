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
import { convertCropLookFields } from "../../../utils/appUtils";

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
  }, [ddId, season?.id]);

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
              <>
                {Object.keys(data).map((cropName) => (
                  <AggrigateVarietyCellDDLevel
                    cropName={cropName}
                    cropData={data[cropName]}
                    targetConfigs={targetConfigs}
                    reportConfigs={reportConfigs}
                  />
                ))}
                <TableRow>
                  <TableCell style={{ backgroundColor: "#FCFFE0" }}>
                    Total
                  </TableCell>
                  {targetConfigs.length > 0 &&
                    targetConfigs.map((fieldName, innerIndex) => (
                      <TableCell
                        key={innerIndex}
                        align="right"
                        style={{ backgroundColor: "#FCFFE0" }}
                      >
                        {getRoundValue(
                          Object.values(data).reduce((acc, cropArray) => {
                            return (
                              acc +
                              cropArray.reduce((cropSum, obj) => {
                                return (
                                  cropSum +
                                  (obj[convertCropLookFields(fieldName)] || 0)
                                );
                              }, 0)
                            );
                          }, 0)
                        )}
                      </TableCell>
                    ))}
                  <TableCell
                    style={{ backgroundColor: "#F5DAD2" }}
                    align="right"
                  >
                    {getRoundValue(
                      Object.values(data).reduce((acc, cropArray) => {
                        return (
                          acc +
                          cropArray.reduce((cropSum, obj) => {
                            return cropSum + (obj.grandTotalTargeted || 0);
                          }, 0)
                        );
                      }, 0)
                    )}
                  </TableCell>
                  {reportConfigs.length > 0 &&
                    reportConfigs.map((fieldName, innerIndex) => (
                      <TableCell
                        key={innerIndex}
                        align="right"
                        style={{ backgroundColor: "#FCFFE0" }}
                      >
                        {getRoundValue(
                          Object.values(data).reduce((acc, cropArray) => {
                            return (
                              acc +
                              cropArray.reduce((cropSum, obj) => {
                                return (
                                  cropSum +
                                  (obj[convertCropLookFields(fieldName)] || 0)
                                );
                              }, 0)
                            );
                          }, 0)
                        )}
                      </TableCell>
                    ))}
                  <TableCell
                    style={{ backgroundColor: "#F5DAD2" }}
                    align="right"
                  >
                    {getRoundValue(
                      Object.values(data).reduce((acc, cropArray) => {
                        return (
                          acc +
                          cropArray.reduce((cropSum, obj) => {
                            return cropSum + (obj.grandTotalBiWeek || 0);
                          }, 0)
                        );
                      }, 0)
                    )}
                  </TableCell>
                </TableRow>
              </>
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
