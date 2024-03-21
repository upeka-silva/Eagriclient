import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const EconomicCentersList  = ({
    selectedRows = [],
    onRowSelect = (_c) => {},
    selectAll = (_list = []) => {},
    unSelectAll = () => {},
  }) => {
    const columns = [
      { field: "locationCode", headerName: "Location Code" },
      { field: "location", headerName: "Location" },
      { field: "marketType", headerName: "Market Type" },
      { field: "suberb", headerName: "Suberb" },
    ];
  
    return (
      <TableWrapper>
        <DataTable
          loadingTable
          dataEndPoint={"harti/harti-economic-center"}
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

export default EconomicCentersList
