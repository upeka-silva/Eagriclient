import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const DOADList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "proDirectorId", headerName: "Code" },
    { field: "description", headerName: "Description" },
  ];

  return (
    <CardWrapper sx={{ maxWidth: "60vw" }}>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/provincial-director-levels"}
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

export default DOADList;
