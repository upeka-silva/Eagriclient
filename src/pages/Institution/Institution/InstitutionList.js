import React from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";

const InstitutionList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "code", headerName: "Code" },
    { field: "institutionName", headerName: "Description" },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/institutions"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    </TableWrapper>
  );
};

export default InstitutionList;
