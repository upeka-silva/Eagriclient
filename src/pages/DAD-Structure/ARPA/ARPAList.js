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
    // { field: "ascDto.id", headerName: "ASC Code" },
  ];
  return (
<CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"arpa"}
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

export default ARPAList;
