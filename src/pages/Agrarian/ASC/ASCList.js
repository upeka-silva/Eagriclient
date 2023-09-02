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
    { field: "ascId", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "districtCommissionerLevelDTO.districtCommId",
      headerName: "District Comm ID",
    },
  ];

  return (
    <CardWrapper sx={{ maxWidth: "60vw" }}>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/AscDivision"}
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
