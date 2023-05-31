import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const SoilTypeList = ({
  selectedRows = [],
  onRowSelect = (_c) => { },
  selectAll = (_list = []) => { },
  unSelectAll = () => { },
}) => {

  const columns = [
    { field: 'soilTypeCode', headerName: 'Code' },
    { field: 'description', headerName: 'Description' },
];
 
  return (
    <CardWrapper>
    <DataTable
         loadingTable
         dataEndPoint={'soil-types'}
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

export default SoilTypeList;
