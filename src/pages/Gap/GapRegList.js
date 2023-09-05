import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";

const GapRegList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"user-manage/users"}
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

export default GapRegList;
