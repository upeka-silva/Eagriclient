import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";

const AIList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "id", headerName: "AI Region ID" },
    { field: "description", headerName: "Description" },
    { field: "name", headerName: "Parent Type" },
    { field: "", headerName: "Parent Value" },
    { field: "", headerName: "ASC Region ID" },
  ];
  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/provinces"}
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

export default AIList;
