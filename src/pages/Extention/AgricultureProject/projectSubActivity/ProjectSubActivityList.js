import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Colors } from "../../../../utils/constants/Colors";
import Switch from "@mui/material/Switch";
import { TableWrapper } from "../../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../../components/PageLayout/Table";

export default function ProjectSubActivityList({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  activityDataId,
  refresh,
}) {
 

  const columns = [
    {
      field: "subActivityId",
      headerName: "Sub Activity Id",
    },
    {
      field: "description",
      headerName: "Description",
    },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={`extension/project-sub-activity/${activityDataId}/subactivities`}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
        refresh={refresh}
      />
    </TableWrapper>
  );
}
