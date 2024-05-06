import React from "react";
import { TableWrapper } from "../../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../../components/PageLayout/Table";


const ProjectReportList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  advancedSearchData = {},
  refresh,
}) => {
  const columns = [
    { field: "reportId", headerName: "Report Id" }, 
    { field: "reportValue", headerName: "Reported Value" },
   
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"extension/project-report"}
        // filterEndPoint={"geo-data/provinces/filter-provinces"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
        //advancedSearchData={advancedSearchData}
        refresh={refresh}
      />
      </TableWrapper>
   
  );
};

export default ProjectReportList;
