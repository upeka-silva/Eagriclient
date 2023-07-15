import React from "react";
import { CardWrapper } from "../../components/PageLayout/Card";
import { DataTable } from "../../components/PageLayout/Table";

const UserTypeList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "userTypeId", headerName: "Code" },
    { field: "name", headerName: "Name" },
  ];
  return (
    <CardWrapper>
    <DataTable
      loadingTable
      dataEndPoint={"user-types"}
      columns={columns}
      selectable
      selectedRows={selectedRows}
      selectAll={selectAll}
      onRowSelect={onRowSelect}
      unSelectAll={unSelectAll}
    />
  </CardWrapper>
  )
};

export default UserTypeList;
