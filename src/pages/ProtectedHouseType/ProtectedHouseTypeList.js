import React from "react";
import { DataTable } from "../../components/PageLayout/Table";

const ProtectedHouseTypeList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "typeId", headerName: "Type ID" },
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

export default ProtectedHouseTypeList;
