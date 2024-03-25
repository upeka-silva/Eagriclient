import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const CropLookEarlyWarningRangesList = ({
    dataEndPoint,
    selectedRows = [],
    onRowSelect = (_c) => {},
    selectAll = (_list = []) => {},
    unSelectAll = () => {},
  }) => {
    const columns = [
      {
        field: "districtDTO.name",
        headerName: "District"
      },
      { field: "name", headerName: "Ds Division" },  
      { field: "code", headerName: "Code" },
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
    );
  };

export default CropLookEarlyWarningRangesList
