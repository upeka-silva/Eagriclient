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
    { field: "branchName", headerName: "Branch Name" },
    { field: "managerName", headerName: "Manager Name" },
    { field: "contactNo", headerName: "Phone 1" },
    { field: "contactNo2", headerName: "Phone 2" },
    { field: "address1", headerName: "Address L1" },
    { field: "address2", headerName: "Address L2" },
    { field: "city", headerName: "City" },
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
