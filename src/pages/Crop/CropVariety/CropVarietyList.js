import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";

const CropVarietyList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "varietyID", headerName: "Variety ID" },
    { field: "varietyName", headerName: "Variety Name" },
  ];

  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/crop-varieties"}
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

export default CropVarietyList;
