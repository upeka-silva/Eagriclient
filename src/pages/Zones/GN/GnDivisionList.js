import React from 'react'
import { CardWrapper } from '../../../components/PageLayout/Card';
import { DataTable } from '../../../components/PageLayout/Table';

const GnDivisionList = ({
  selectedRows = [],
  onRowSelect = (_c) => { },
  selectAll = (_list = []) => { },
  unSelectAll = () => { },
}) => {

  const columns = [
    { field: 'code', headerName: 'GN Division Code' },
    { field: 'name', headerName: 'GN Division Name' },
];


  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/gn-divisions"}
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

export default GnDivisionList