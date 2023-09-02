import React from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";

const DistrictCommList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "districtCommId", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "doAgrarianDevelopmentDTO.doAgrarianDevelopmentId",
      headerName: "AgrarDevDept ID",
    },
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/district-commissioner-level"}
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

export default DistrictCommList;
