import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";

const BranchList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "name", headerName: "Manage Name" },
    { field: "managerNIC", headerName: "Manager NIC" },
    { field: "phone1", headerName: "Phone 1" },
    { field: "phone2", headerName: "Phone 2" },
    { field: "addressL1", headerName: "Address L1" },
    { field: "addressL2", headerName: "Address L2" },
    { field: "city", headerName: "City" },
    { field: "email", headerName: "Email" },
  ];
  return (
    <TableWrapper>
      <DataTable
        dataEndPoint={"organization-contacts"}
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
