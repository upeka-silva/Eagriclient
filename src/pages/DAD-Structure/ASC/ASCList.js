import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";

const ASCList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "ascCode", headerName: "Code"},
    { field: "name", headerName: "Name"},
    // { field: "districtDto.code", headerName: "District Code"},
  ];

  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"asc"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    </CardWrapper>
  );
};

export default ASCList;
