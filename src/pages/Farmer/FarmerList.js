import React from "react";
import { CardWrapper } from "../../components/PageLayout/Card";
import { DataTable } from "../../components/PageLayout/Table";

const FarmerList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
    const columns = [
        { field: "", headerName: "Code" },
        { field: "", headerName: "Name" },
      ];

  return (
    <CardWrapper>
    <DataTable
      loadingTable
      dataEndPoint={"farmers"}
      columns={columns}
      selectable
      selectedRows={selectedRows}
      selectAll={selectAll}
      onRowSelect={onRowSelect}
      unSelectAll={unSelectAll}
    />
  </CardWrapper>
  )
};

export default FarmerList;
