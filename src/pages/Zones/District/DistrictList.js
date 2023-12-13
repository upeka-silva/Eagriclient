import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";

const DistrictList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "code", headerName: "Code" },
    { field: "name", headerName: "Description" },
    {
      field: ["provinceDTO.code", "provinceDTO.name"],
      joinString: " - ",
      headerName: "Province",
    },
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

export default DistrictList;
