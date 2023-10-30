import React, { useEffect } from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";

const RolesList = ({

  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "name", headerName: "Role Name" },
    { field: "createdDate", headerName: "createdDate", type:"date"  },
    { field: "modifiedDate", headerName: "modifiedDate" },
  ];
 
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"app-settings/roles"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
        
      />
    </TableWrapper>
  );
};

export default RolesList;
