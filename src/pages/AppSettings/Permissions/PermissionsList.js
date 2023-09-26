import React, { useEffect } from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";

const PermissionList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "name", headerName: "Role Name" },
    { field: "createdDate", headerName: ""  },
    { field: "modifiedDate", headerName: "" },
  ];
 
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"roles/?page=0&size=20&sort=desc"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
        
      />
    </TableWrapper>
  );
};

export default PermissionList;
