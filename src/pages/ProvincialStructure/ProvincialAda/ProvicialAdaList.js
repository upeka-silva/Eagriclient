import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const ProvincialAdaList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "provinceSegmentId", headerName: "Code" },
    { field: "description", headerName: "Description" },
  ];

  return (
    
      <DataTable
        loadingTable
        dataEndPoint={dataEndPoint}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    
  );
};

export default ProvincialAdaList;
