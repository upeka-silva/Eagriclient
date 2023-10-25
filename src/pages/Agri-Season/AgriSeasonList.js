import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";

const AgriSeasonList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "code", headerName: "Code" },
    { field: "description", headerName: "Description" },
    { field: "climateZone", headerName: "Climate Zone" },
    { field: "startDate", headerName: "Start Date", type: "date" },
    { field: "endDate", headerName: "End Date", type: "date" },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/agriculture-seasons"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    </TableWrapper>
  );
};

export default AgriSeasonList;
