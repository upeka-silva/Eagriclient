import React from "react";
import { DataTable } from "../../components/PageLayout/Table";

import { TableWrapper } from "../../components/PageLayout/TableWrapper";

const CropDamageList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "name", headerName: "Category Name" },
    { field: "description", headerName: "Description" },
  ];

  return (
    <div>
      <TableWrapper>
        <DataTable
          loadingTable
          dataEndPoint={`crop/damage-category`}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      </TableWrapper>
    </div>
  );
};

export default CropDamageList;
