import { useEffect, useState } from "react";
import { convertCropLookFields } from "../../../utils/appUtils";
import { TableCell, TableRow } from "@mui/material";

const BiWeekProgressReportRow = ({ data = [], seasonStartMonth = null }) => {
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
            </>
          )}
        </TableRow>
      ))}
    </>
  );
};

export default BiWeekProgressReportRow;
