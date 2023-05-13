import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const DistrictList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "code", headerName: "District Code" },
    { field: "name", headerName: "District Name" },
    { field: "provinceDTO.code", headerName: "Province Code" },
  ];

  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/districts"}
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

export default DistrictList;
