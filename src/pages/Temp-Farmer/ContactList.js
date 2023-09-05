import React from 'react'
import { DataTable } from '../../components/PageLayout/Table';
import { TableWrapper } from '../../components/PageLayout/TableWrapper';

const ContactList = ({
    selectedRows = [],
    onRowSelect = (_c) => {},
    selectAll = (_list = []) => {},
    unSelectAll = () => {},
}) => {
    const columns = [
        { field: "code", headerName: "Contact Type" },
        { field: "institutionName", headerName: "Value" },
        { field: "institutionName", headerName: "Is primary" },
      ];

  return (
   <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"farmer-contacts"}
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

export default ContactList