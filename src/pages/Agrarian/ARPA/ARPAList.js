import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const ARPAList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "arpaId", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "ascDto.ascId", headerName: "ASC ID" },
    { field: "ascDto.name", headerName: "ASC Name" },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/arpa"}
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

export default ARPAList;
