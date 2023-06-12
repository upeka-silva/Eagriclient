import React from 'react'
import { CardWrapper } from '../../components/PageLayout/Card';
import { DataTable } from '../../components/PageLayout/Table';

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
   <CardWrapper>
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
    </CardWrapper>
  )
}

export default ContactList