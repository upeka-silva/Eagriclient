import React from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";

const SoilSubTypeList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "soilSubTypeCode", headerName: "Code" },
    { field: "description", headerName: "Description" },
    { field: "soilTypeDTO.soilTypeCode", headerName: "Soil Type Code" },
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"soil-sub-types"}
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

export default SoilSubTypeList;
