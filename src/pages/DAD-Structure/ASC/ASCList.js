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
    { field: "code", headerName: "ASC Code" },
    { field: "name", headerName: "ASC Name" },
    { field: "districtDto.id", headerName: "District Code" },
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
