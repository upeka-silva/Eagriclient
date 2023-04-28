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
    { field: 'code', headerName: 'Province Code' },
    { field: 'name', headerName: 'Province Name' },
];


  return (
    <div>GnDivisionList</div>
  )
}

export default GnDivisionList