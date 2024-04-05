import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import {
  approveBiWeekCategoryReport,
  approveBiWeekCategoryReportDD,
  approveBiWeekReport,
  getAggrigateReportData,
  getApprovalData,
  getApprovalDataDD,
  updateBiWeekReporting,
} from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";

const ApprovalDashboardTableDD = ({ week = {}, season = {} }) => {

  const { addSnackBar } = useSnackBars();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(seasonId, weekId) {
      setLoading(true);
      const dataList = await getApprovalDataDD(seasonId, weekId);
      setLoading(false);
      setData(dataList);
    }

    fetchData(season?.id, week?.id);
  }, [season, week]);

  const handleReportApprove = async (cropCategoryId) => {
    setLoading(true);
    try {
      const dataList = await approveBiWeekCategoryReportDD(
        season?.id,
        week?.id,
        cropCategoryId,
        onSuccess,
        onError
      );
      //setCropTargets(dataList?.dataList?.biWeekCropReport);
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Updated",
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Crop Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Completed ADA Segments</TableCell>
              <TableCell>Not Completed ADA Segments</TableCell>
              <TableCell>Approval</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row?.cropCategory?.description}</TableCell>
                  <TableCell>{row.status || "--"}</TableCell>
                  <TableCell>{row.completedAiRegions || "--"}</TableCell>
                  <TableCell>{row.incompletedAiRegions || "--"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => handleReportApprove(row?.cropCategory?.id)}
                      sx={{ marginTop: "10px" }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ApprovalDashboardTableDD;
