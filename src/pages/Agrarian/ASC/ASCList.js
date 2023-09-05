import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const ASCList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "ascId", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "districtCommissionerLevelDTO.districtCommId",
      headerName: "District Comm ID",
    },
    {
      field: "districtCommissionerLevelDTO.name",
      headerName: "District Comm Name",
    },
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/AscDivision"}
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

export default ASCList;
