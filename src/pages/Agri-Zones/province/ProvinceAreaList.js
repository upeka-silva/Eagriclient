import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const ProvinceAreaList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "agProvinceId", headerName: "Code" },
    { field: "description", headerName: "Description" },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/ag-province-area"}
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

export default ProvinceAreaList;
