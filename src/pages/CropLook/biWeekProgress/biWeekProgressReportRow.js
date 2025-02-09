import { useEffect, useState } from "react";
import { convertCropLookFields } from "../../../utils/appUtils";
import { TableCell, TableRow } from "@mui/material";

const BiWeekProgressReportRow = ({ data = [], seasonStartMonth = null }) => {
  const getRoundValue = (value) => {
    return value?.toFixed(3);
  };

  return (
    <>
      {data?.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.cropName}</TableCell>

          {seasonStartMonth > 7 ? (
            <>
              <TableCell>{row.september_1_2}</TableCell>
              <TableCell>{row.september_3_4}</TableCell>
              <TableCell>{row.october_1_2}</TableCell>
              <TableCell>{row.october_3_4}</TableCell>
              <TableCell>{row.november_1_2}</TableCell>
              <TableCell>{row.november_3_4}</TableCell>
              <TableCell>{row.december_1_2}</TableCell>
              <TableCell>{row.december_3_4}</TableCell>
              <TableCell>{row.january_1_2}</TableCell>
              <TableCell>{row.january_3_4}</TableCell>
              <TableCell>{row.february_1_2}</TableCell>
              <TableCell>{row.february_3_4}</TableCell>
              <TableCell>{row.march_1_2}</TableCell>
              <TableCell>{row.march_3_4}</TableCell>
              <TableCell style={{ backgroundColor: "#A87676" }} align="right">
                {getRoundValue(
                  row?.september_1_2 +
                    row?.september_3_4 +
                    row?.october_1_2 +
                    row?.october_3_4 +
                    row?.november_1_2 +
                    row?.november_3_4 +
                    row?.december_1_2 +
                    row?.december_3_4 +
                    row?.january_1_2 +
                    row?.january_3_4 +
                    row?.february_1_2 +
                    row?.february_3_4 +
                    row?.march_1_2 +
                    row?.march_3_4
                )}
              </TableCell>
            </>
          ) : (
            <>
              <TableCell>{row.april_1_2}</TableCell>
              <TableCell>{row.april_3_4}</TableCell>
              <TableCell>{row.may_1_2}</TableCell>
              <TableCell>{row.may_3_4}</TableCell>
              <TableCell>{row.june_1_2}</TableCell>
              <TableCell>{row.june_3_4}</TableCell>
              <TableCell>{row.july_1_2}</TableCell>
              <TableCell>{row.july_3_4}</TableCell>
              <TableCell>{row.august_1_2}</TableCell>
              <TableCell>{row.august_3_4}</TableCell>
              <TableCell style={{ backgroundColor: "#A87676" }} align="right">
                {getRoundValue(
                  row?.april_1_2 +
                    row?.april_3_4 +
                    row?.may_1_2 +
                    row?.may_3_4 +
                    row?.june_1_2 +
                    row?.june_3_4 +
                    row?.july_1_2 +
                    row?.july_3_4 +
                    row?.august_1_2 +
                    row?.august_3_4
                )}
              </TableCell>
            </>
          )}
        </TableRow>
      ))}
    </>
  );
};

export default BiWeekProgressReportRow;
