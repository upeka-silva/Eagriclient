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
  approveBiWeekCategoryReport,
  approveBiWeekCategoryReportDD,
  getAggrigateBiWeekReportData,
} from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { getConfigurationById } from "../../../redux/actions/cropLook/cropConfiguration/action";
import BiWeekProgressCell from "./biWeekProgressCell";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";

const BiWeekProgressTale = ({ category, season, week, owner }) => {
  const { addSnackBar } = useSnackBars();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportConfigs, setReportConfigs] = useState([]);
  const [confLoading, setConfLoading] = useState([]);

  useEffect(() => {
    async function fetchData(categoryId, seasonId, weekId) {
      setLoading(true);
      const dataList = await getAggrigateBiWeekReportData(
        categoryId,
        seasonId,
        weekId
      );

      fetchConfig(category?.categoryId, dataList);

      const groupedData = dataList.reduce((acc, obj) => {
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
      setReportConfigs(configs.fields);

      setConfLoading(false);
    }

    fetchData(category?.categoryId, season?.id, week?.id);
  }, [season]);

  const handleReportApprove = async () => {
    setLoading(true);
    try {
      if (owner === "DD") {
        await approveBiWeekCategoryReportDD(
          season?.id,
          week?.id,
          category?.id,
          onSuccess,
          onError
        );
      } else {
        await approveBiWeekCategoryReport(
          season?.id,
          week?.id,
          category?.id,
          onSuccess,
          onError
        );
      }
      //setCropTargets(dataList?.dataList?.biWeekCropReport);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5 style={{ marginRight: "10px" }}>
          Bi Week Extent For {week.weekDescription}
        </h5>
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={() => handleReportApprove()}
          sx={{ marginTop: "10px" }}
        >
          Approve
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>Crop</TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                Variety
              </TableCell>
              {reportConfigs.length > 0 &&
                reportConfigs.map((fieldName1, index1) => (
                  <TableCell
                    key={index1}
                    style={{ backgroundColor: "#A8CD9F" }}
                  >
                    {fieldName1} (ha)
                  </TableCell>
                ))}
              <TableCell style={{ backgroundColor: "#F5DAD2" }}>
                Total (ha)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!confLoading ? (
              Object.keys(data).map((cropName) => (
                <BiWeekProgressCell
                  cropName={cropName}
                  cropData={data[cropName]}
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

export default BiWeekProgressTale;
