import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";

const ActionList = () => {
  const columns = [
    { field: "code", headerName: "Code" },
    { field: "name", headerName: "Name" },
    { field: "createdDate", headerName: "Created Date", type: "datetime" },
  ];

  return (
    <TableWrapper>
      <DataTable dataEndPoint={"actions"} columns={columns} />
    </TableWrapper>
  );
};

export default ActionList;
