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
import { getAggrigateReportDataAILevelByCrop } from "../../../redux/actions/cropLook/aggrigateReport/actions";

const AiSummaryReportTable = ({ category, season, weekId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  let previousAiName = null;
  let isAlternateColor = false;

  useEffect(() => {
    async function fetchData(categoryId, seasonId, weekId) {
      setLoading(true);
      const dataList = await getAggrigateReportDataAILevelByCrop(
        categoryId,
        seasonId,
        weekId
      );
      setData(dataList);
      setLoading(false);
    }

    fetchData(category?.id, season?.id, weekId);
  }, [weekId]);

  return (
    <>
      <h5>{category.description}</h5>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                AI Region/Mahaweli Block
              </TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>Crop</TableCell>

              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total Target (ha)
              </TableCell>

              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total Extent (ha)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              data?.map((aiRegionData, index) => {
                const isNewAiName = aiRegionData?.aiName !== previousAiName;
                if (isNewAiName) {
                  // Toggle the color for the new aiName
                  isAlternateColor = !isAlternateColor;
                  previousAiName = aiRegionData?.aiName;
                }
                
                // Determine the row color based on the toggle state
                const rowColor = isAlternateColor ? '#f0f0f0' : '#ffffff'; // Change '#f0f0f0' to your desired color
        
                return (
                  <TableRow
                    key={index}
                    style={{ backgroundColor: rowColor }}
                  >
                    <TableCell>{isNewAiName ? aiRegionData?.aiName : ''}</TableCell>
                    <TableCell>{aiRegionData?.cropName}</TableCell>
                    <TableCell>{aiRegionData?.totalTarget}</TableCell>
                    <TableCell>{aiRegionData?.totalExtent}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AiSummaryReportTable;
