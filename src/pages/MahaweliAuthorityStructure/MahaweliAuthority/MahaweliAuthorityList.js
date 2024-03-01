import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const MahaweliAuthorityList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "authorityId", headerName: "Code" },
    { field: "description", headerName: "Description" },
  ];

  return (    
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/mahaweli-authorities"}
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

export default MahaweliAuthorityList;
