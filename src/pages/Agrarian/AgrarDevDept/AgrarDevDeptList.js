import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";

const AgrarDevDeptList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "doAgrarianDevelopmentId", headerName: "ID" },
    { field: "name", headerName: "Name" },
  ];

  return (
    
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/do_agrarian_development"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    
  );
};

export default AgrarDevDeptList;
