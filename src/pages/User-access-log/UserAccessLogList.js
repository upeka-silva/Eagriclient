import React from "react";
import { CardWrapper } from "../../components/PageLayout/Card";
import { DataTable } from "../../components/PageLayout/Table";

const UserAccessLogList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "", headerName: "LogID" },
    { field: "", headerName: "User ID" },
    { field: "", headerName: "Timestamp" },
    { field: "", headerName: "Action" },
    { field: "", headerName: "Device ID" },
    { field: "", headerName: "App Type" },
    { field: "", headerName: "IP Address" },
    { field: "", headerName: "Location" },
    { field: "", headerName: "Session ID" },
  ];

  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"app-user-acess-log"}
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

export default UserAccessLogList;
