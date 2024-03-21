import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const DistrictList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    {
      field:  "provinceDTO.name",
      headerName: "Province"
    },
    { field: "name", headerName: "District" },
    
    { field: "code", headerName: "Code" },
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={dataEndPoint}
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

export default DistrictList;
