import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";

const ScsServiceList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "scsServiceId", headerName: "ID" },
    { field: "name", headerName: "Name" },
   
  ];

  return (
   
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/scs-services"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    
  );
};

export default ScsServiceList;
