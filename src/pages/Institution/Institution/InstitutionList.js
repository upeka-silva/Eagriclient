import React from 'react'
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const InstitutionList = ({
    selectedRows = [],
    onRowSelect = (_c) => {},
    selectAll = (_list = []) => {},
    unSelectAll = () => {},
}) => {
    const columns = [
        { field: "code", headerName: "Code" },
        { field: "institutionName", headerName: "Description" },
      ];
  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/institutions"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    </CardWrapper>
  )
}

export default InstitutionList