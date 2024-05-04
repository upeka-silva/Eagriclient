import React from "react"
import { TableWrapper } from "../../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../../components/PageLayout/Table";

export default function ProjectIndicatorList({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  subActivityDataId,
  refresh,
}) {
  console.log({subActivityDataId})
  const columns = [
    {
      field: "indicatorId",
      headerName: "Indicator Id",
    },
    {
      field: "description",
      headerName: "Description",
    },
    {
      field: "isoUnitDTO.description",
      headerName: "ISO Unit",
    },
    {
        field: "target",
        headerName: "Target",
    }
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={`extension/project-indicator/${subActivityDataId ? subActivityDataId?.id : ""}/indicators`}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        //unSelectAll={unSelectAll}
        refresh={refresh}
      />
    </TableWrapper>
  );
}
