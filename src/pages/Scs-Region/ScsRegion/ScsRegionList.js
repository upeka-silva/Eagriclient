import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";

const ScsRegionList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "scsRegionId", headerName: "Code" },
    { field: "name", headerName: "name" },
   
  ];

  return (
   
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/scs-regions"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    
  );
};

export default ScsRegionList;
