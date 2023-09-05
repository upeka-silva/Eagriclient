import React from 'react';
import { DataTable } from '../../../components/PageLayout/Table';
import { TableWrapper } from '../../../components/PageLayout/TableWrapper';

const GnDivisionList = ({
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => { },
  selectAll = (_list = []) => { },
  unSelectAll = () => { },
}) => {

  const columns = [
    { field: 'code', headerName: 'Code' },
    { field: 'name', headerName: 'Description' },
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
  )
}

export default GnDivisionList