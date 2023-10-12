import React from "react";
import { DataTable } from "../../components/PageLayout/Table";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";

const BranchList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  id,
}) => {
  const columns = [
    { field: "branchName", headerName: "Name" },
    { field: "managerName", headerName: "Manager Name" },
    { field: "contactNo", headerName: "Contact" },
    { field: "address", headerName: "Address" },
    { field: "email", headerName: "Email" },
  ];
  return (
    <TableWrapper>
      <DataTable
        dataEndPoint={`temp-farmer-businesses/${id}/branches`}
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

export default BranchList;
