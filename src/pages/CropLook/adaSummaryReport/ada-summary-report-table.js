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
  Button,
} from "@mui/material";
import {
  approveBiWeekCategoryReportDD,
  getAdaSummaryReport
} from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";

const ADASummaryReportTable = ({ category, season, weekId }) => {

  const { addSnackBar } = useSnackBars();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  let previousAiName = null;
  let isAlternateColor = false;

  useEffect(() => {
    async function fetchData(categoryId, seasonId, weekId) {
      setLoading(true);
      const dataList = await getAdaSummaryReport(categoryId, seasonId, weekId);
      setData(dataList);
      setLoading(false);
    }

    fetchData(category?.id, season?.id, weekId);
  }, [weekId]);

  const handleReportApprove = async () => {
    try {
      await approveBiWeekCategoryReportDD(
        season?.id,
        weekId,
        category?.id,
        onSuccess,
        onError
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Approved",
    });
    setLoading(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setLoading(false);
  };

  return (
    <>
      <h5>{category.description}</h5>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                ADA Region/Mahaweli System
              </TableCell>

              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total Target (ha)
              </TableCell>

              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total Extent (ha)
              </TableCell>
              <TableCell>Approval</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              data?.map((aiRegionData, index) => {
                const isNewAiName = aiRegionData?.name !== previousAiName;
                if (isNewAiName) {
                  // Toggle the color for the new aiName
                  isAlternateColor = !isAlternateColor;
                  previousAiName = aiRegionData?.name;
                }

                // Determine the row color based on the toggle state
                const rowColor = isAlternateColor ? "#f0f0f0" : "#ffffff"; // Change '#f0f0f0' to your desired color

                return (
                  <TableRow key={index} style={{ backgroundColor: rowColor }}>
                    <TableCell>
                      {isNewAiName ? aiRegionData?.name : ""}
                    </TableCell>
                    <TableCell>{aiRegionData?.totalTarget || 0.0}</TableCell>
                    <TableCell>{aiRegionData?.totalExtent || 0.0}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        onClick={() => handleReportApprove()}
                        sx={{ marginTop: "10px" }}
                      >
                        Approve
                      </Button>
                    </TableCell>
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

export default ADASummaryReportTable;
