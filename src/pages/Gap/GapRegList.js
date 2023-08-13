import React from "react";
import { CardWrapper } from "../../components/PageLayout/Card";
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
    <CardWrapper>
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
    </CardWrapper>
  );
};

export default GapRegList;
