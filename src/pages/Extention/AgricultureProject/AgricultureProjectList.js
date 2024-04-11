import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const AgricultureProjectList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  advancedSearchData = {},
}) => {
  const columns = [
    { field: "projectId", headerName: "Project Id" },
    { field: "description", headerName: "Description" },
   
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"extension/agriculture-project"}
        // filterEndPoint={"geo-data/provinces/filter-provinces"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
        advancedSearchData={advancedSearchData}
      />
      </TableWrapper>
   
  );
};

export default AgricultureProjectList;
