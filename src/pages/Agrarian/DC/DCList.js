import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const DCList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "provincialDdId", headerName: "Code" },
    { field: "description", headerName: "Description" },
  ];

  return (
    <CardWrapper sx={{ maxWidth: "60vw" }}>
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
    </CardWrapper>
  );
};

export default DCList;
