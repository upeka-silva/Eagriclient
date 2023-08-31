import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";

const ARPAList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "arpaId", headerName: "Code" },
    { field: "name", headerName: "Description" },
    { field: "ascDto.ascId", headerName: "ASC Code" },
  ];
  return (
    <CardWrapper sx={{ maxWidth: "60vw" }}>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/arpa"}
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

export default ARPAList;
