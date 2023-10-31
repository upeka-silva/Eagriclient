import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { DEF_ACTIONS } from "../../../utils/constants/permission";

export default function BiWeekDataTable({ biWeekDataList = [], statusChangeHandler, mode }) {

  return (
    <>
    <hr/>
      <Typography variant="h6" gutterBottom pt={1}>
        Bi-Week Data
      </Typography>
      
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Week</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Reporting Start Date</TableCell>
              <TableCell align="right">Reporting End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {biWeekDataList.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.weekDescription}
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">{row.endDate}</TableCell>
                <TableCell align="right">{row.reportingStartDate}</TableCell>
                <TableCell align="right">{row.reportingEndDate}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => statusChangeHandler(row.id, "ENABLED")}
                    color="success"
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                    disabled={mode === DEF_ACTIONS.VIEW}
                  >
                    Enable
                  </Button>
                  <Button
                    onClick={() => statusChangeHandler(row.id, "CLOSE")}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                    disabled={mode === DEF_ACTIONS.VIEW}
                  >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
