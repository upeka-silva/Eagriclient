import React from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";

const VegitableEarlyWarningList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
   
    { field: "cropDTO.description", headerName: "Crop" },
    { field: "accumulatedExtend", headerName: "Accumulated Extend" },
    { field: "vegetableEarlyWarningStatus", headerName: "Status" },

  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"crop-look/vegetable-early-warnings"}
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

export default VegitableEarlyWarningList;