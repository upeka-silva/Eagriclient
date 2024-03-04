import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const ARPAList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "arpaId", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: ["ascDto.ascId", "ascDto.name"],
      joinString: " - ",
      headerName: "ASC Division",
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

export default ARPAList;
