import React from "react";

import { DataTable } from "../../components/PageLayout/Table";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";


const CommodityGroupList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "groupNo", headerName: "Group Number" },
    { field: "description", headerName: "Description" },
   
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/commodity-group"}
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

export default CommodityGroupList;