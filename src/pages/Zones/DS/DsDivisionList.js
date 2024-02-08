import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";


const DsDivisionList = ({
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
      field: ["districtDTO.code", "districtDTO.name"],
      joinString: " - ",
      headerName: "District",
    },
    {
      field:["mahaweliBlockDTO.code","mahaweliBlockDTO.description"],
      joinString: " - ",
      headerName: "Mahaweli Block",
    }

  
  
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

export default DsDivisionList;
