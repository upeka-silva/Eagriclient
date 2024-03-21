import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const ProvincialAdaList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    {
      field: "proDeputyDirectorLevelDTO.description",

      headerName: "Provincial DD",
    },
    { field: "description", headerName: "Provincial ADA" },

    { field: "provinceSegmentId", headerName: "Code" },
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

export default ProvincialAdaList;
