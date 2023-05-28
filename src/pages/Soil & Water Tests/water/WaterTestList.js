import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const WaterTestList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "code", headerName: "Water Test Code" },
    { field: "name", headerName: "Water Test Name" },
  ];
  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/Water-samples"}
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

export default WaterTestList;
