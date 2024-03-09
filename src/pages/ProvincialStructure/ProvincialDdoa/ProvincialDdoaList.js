import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const ProvincialDdoaList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "provincialDdId", headerName: "Code" },
    { field: "description", headerName: "Description" },
    {
      field: ["proDirectorLevelDTO.proDirectorId", "proDirectorLevelDTO.description"],
      joinString: " - ",
      headerName: "Provincial DOA",
    },
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

export default ProvincialDdoaList;
