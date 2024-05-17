import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  getProjectReportsByRelatedUserId,
  handleProjectReport,
} from "../../../../../redux/actions/extension/agricultureProject/ProjectReport/action";
import { SnackBarTypes } from "../../../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../../../context/SnackBarContext";
import { defaultMessages } from "../../../../../utils/constants/apiMessages";

function ReportList({ allProjectData, indicatorValues = [] }) {
  console.log({ allProjectData });

  const { addSnackBar } = useSnackBars();

  const [changeReportVal, setChangeReportVal] = useState([]);
  const [relatedUserReportsVal, setRelatedUserReportsVal] = useState([]);
  console.log({ relatedUserReportsVal });

  // Update changeReportVal array when indicatorValues prop changes
  // useEffect(() => {
  //   setChangeReportVal(indicatorValues);
  // }, [indicatorValues]);

  const fetchUserReportUpdateData = async () => {
    const res = await getProjectReportsByRelatedUserId();
    console.log("newres", res);
    setRelatedUserReportsVal(res);
  };

  useEffect(() => {
    fetchUserReportUpdateData();
  }, []);

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  const saveReportData = async () => {
    console.log("update");
    for (const data of changeReportVal) {
      await handleProjectReport(data, onSuccess, onError);
    }

    console.log({ changeReportVal });
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Updated",
    });
    //setSaving(false);
  };

  const handleReportValues = (value, indicatorId) => {
    // Find the index of the indicatorId in changeReportVal array
    const indicatorIndex = changeReportVal.findIndex(
      (item) => item.projectIndicatorDTO.id === indicatorId
    );
  
    // If value is empty, remove the corresponding object from the array
    if (value.trim() === "") {
      if (indicatorIndex !== -1) {
        const updatedChangeReportVal = [...changeReportVal];
        updatedChangeReportVal.splice(indicatorIndex, 1);
        setChangeReportVal(updatedChangeReportVal);
      }
      // Also clear the value from relatedUserReportsVal for the same indicator ID
      const updatedRelatedUserReportsVal = relatedUserReportsVal.map((item) => {
        if (item.projectIndicatorDTO.id === indicatorId) {
          return { ...item, reportValue: "" };
        }
        return item;
      });
      setRelatedUserReportsVal(updatedRelatedUserReportsVal);
    } else {
      // If indicatorId exists in changeReportVal array, update its value
      if (indicatorIndex !== -1) {
        const updatedChangeReportVal = [...changeReportVal];
        updatedChangeReportVal[indicatorIndex] = {
          ...updatedChangeReportVal[indicatorIndex],
          reportValue: value,
        };
        setChangeReportVal(updatedChangeReportVal);
      } else {
        // If indicatorId doesn't exist in changeReportVal array and value is not empty, add it
        setChangeReportVal([
          ...changeReportVal,
          {
            reportValue: value,
            projectIndicatorDTO: {
              id: indicatorId,
            },
          },
        ]);
      }
    }
  };
  
  console.log({ changeReportVal });

  return (
    <div>
      <Grid item md={9} mb={3} display="flex" justifyContent="flex-end">
        {/* Your second item */}
        <Button variant="contained" color="success" onClick={saveReportData}>
          save
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                PROJECT ACTIVITY
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                PROJECT SUBACTIVITY
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                {" "}
                PROJECT INDICATOR
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                TARGET
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                REPORT FOR INDICATOR
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProjectData?.projectActivityDTOList?.map(
              (project, projectIndex) =>
                project?.projectSubActivityDTOList?.map(
                  (subActivity, subActivityIndex) =>
                    subActivity?.projectIndicatorDTOList?.map(
                      (indicator, indicatorIndex) => (
                        <TableRow
                          style={{ fontSize: "35px" }}
                          key={`${projectIndex}-${subActivityIndex}-${indicatorIndex}`}
                        >
                          <TableCell
                            sx={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              borderRight: "1px solid rgba(224, 224, 224, 1)",
                            }}
                          >
                            {subActivityIndex === 0 && indicatorIndex === 0
                              ? project?.id + "-" + project?.description
                              : null}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              borderRight: "1px solid rgba(224, 224, 224, 1)",
                            }}
                          >
                            {indicatorIndex === 0
                              ? subActivity?.description
                              : null}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "13px",
                              borderRight: "1px solid rgba(224, 224, 224, 1)",
                            }}
                          >
                            {indicator?.description}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "13px",
                              borderRight: "1px solid rgba(224, 224, 224, 1)",
                            }}
                          >
                            {indicator?.target}
                          </TableCell>
                          <TableCell>
                            <Grid container>
                              <Grid item>
                                <TextField
                                  variant="outlined"
                                  color="primary"
                                  value={
                                    changeReportVal.length>0 ?  changeReportVal?.find(
                                      (item) =>
                                        item?.projectIndicatorDTO?.id ===
                                        indicator?.id
                                    )?.reportValue :
                                    relatedUserReportsVal?.find(
                                      (item) =>
                                        item?.projectIndicatorDTO?.id ===
                                        indicator?.id
                                    )?.reportValue ||
                                    ""
                                    || ""
                                  }
                                  onChange={(event) =>
                                    handleReportValues(
                                      event.target.value,
                                      indicator?.id
                                    )
                                  }
                                />
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      )
                    )
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ReportList;
