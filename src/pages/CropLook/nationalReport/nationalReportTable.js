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
  Grid,
} from "@mui/material";
import {
  approveNationalData,
  getNationalData,
} from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { useSnackBars } from "../../../context/SnackBarContext";

const NationalReportTable = ({ category, season, week }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetConfigs, setTargetConfigs] = useState([]);
  const [reportConfigs, setReportConfigs] = useState([]);
  const { addSnackBar } = useSnackBars();

  useEffect(() => {
    async function fetchData(categoryId, seasonId, weekId) {
      setLoading(true);
      const dataList = await getNationalData(categoryId, seasonId, weekId);

      setData(grouping(dataList));
      setLoading(false);
    }
    console.log(category?.id + "-" + season?.id + "- " + week?.id);
    fetchData(category?.id, season?.id, week?.id);
  }, [week]);

  const grouping = (data) => {
    const nestedData = {};

    data?.forEach((item) => {
      const { province, ddDivision, districtName } = item;

      if (!nestedData[province]) {
        nestedData[province] = {};
      }
      if (!nestedData[province][ddDivision]) {
        nestedData[province][ddDivision] = {};
      }
      if (!nestedData[province][ddDivision][districtName]) {
        nestedData[province][ddDivision][districtName] = [];
      }
      nestedData[province][ddDivision][districtName].push(item);
    });
    return nestedData;
  };

  const handleVegitalbleEarlyWarning = () => {
    async function publish(categoryId, seasonId, weekId) {
      await approveNationalData(categoryId, seasonId, weekId, onSuccess, onError);
    }
    publish(category?.id, season?.id, week?.id);
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Approved`,
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  return (
    <>
      <h5>{category.description}</h5>
      <Grid item sm={12} md={12} lg={12}>
        {category?.description === "Vegetables" &&
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={handleVegitalbleEarlyWarning}
          sx={{ marginTop: "5px", marginBottom: "10px" }}
        >
          Approve
        </Button>}
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                Province
              </TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                DD Office/ Mahaweli System
              </TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                District
              </TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                Total Seasonal Target (ha)
              </TableCell>
              <TableCell style={{ backgroundColor: "#A8CD9F" }}>
                Total Seasonal Progress (ha)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              Object.keys(data)?.map((province) =>
                Object.keys(data[province]).map((ddDivision, index) =>
                  Object.keys(data[province][ddDivision]).map(
                    (district, index2) => (
                      <TableRow key={`${province}-${ddDivision}-${district}`}>
                        {index === 0 && index2 === 0 && (
                          <TableCell
                            rowSpan={
                              province === "NCP"
                                ? 2
                                : province === "Inter Province DOA"
                                ? 8
                                : Object.keys(data[province]).length
                            }
                          >
                            {province}
                          </TableCell>
                        )}
                        {index2 === 0 && (
                          <TableCell
                            rowSpan={
                              Object.keys(data[province][ddDivision]).length
                            }
                          >
                            {ddDivision}
                          </TableCell>
                        )}
                        <TableCell>{district}</TableCell>

                        {data[province][ddDivision][district].map(
                          (item, index) => (
                            <React.Fragment key={index}>
                              <TableCell>{item?.totalTarget}</TableCell>
                              <TableCell>{item.totalExtent}</TableCell>
                            </React.Fragment>
                          )
                        )}
                      </TableRow>
                    )
                  )
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NationalReportTable;
