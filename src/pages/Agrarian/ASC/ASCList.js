import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const ASCList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "ascId", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: [
        "districtCommissionerLevelDTO.districtCommId",
        "districtCommissionerLevelDTO.name",
      ],
      joinString: " - ",
      headerName: "District Comm",
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

export default ASCList;
