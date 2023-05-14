import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";


const ProvinceAreaList = ({
  selectedRows = [],
  onRowSelect = (_c) => { },
  selectAll = (_list = []) => { },
  unSelectAll = () => { },
}) => {
 
  const columns = [
    { field: 'id', headerName: 'Province Area ID' },
    { field: 'description', headerName: 'Description' },
];
  return (
    <CardWrapper>
    <DataTable
         loadingTable
         dataEndPoint={'geo-data/ag-province-area'}
         columns={columns}
         selectable
         selectedRows={selectedRows}
         selectAll={selectAll}
         onRowSelect={onRowSelect}
         unSelectAll={unSelectAll}
         />
</CardWrapper>
  );
};

export default ProvinceAreaList;
