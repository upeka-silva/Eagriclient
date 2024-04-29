import React from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";

const HartyPricesList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {

  const columns = [
    { field: "groupname", headerName: "Group Name" },
    { field: "itemname", headerName: "Item Name" },
    { field: "itemnum", headerName: "Item No" },
    { field: "loccode", headerName: "LocCode" },
    { field: "location", headerName: "Location" },
    { field: "pricetype", headerName: "Price Type" },
    { field: "s_avg", headerName: "Average " },
    { field: "s_max", headerName: "Max" },
    { field: "s_min", headerName: "Min" },
    { field: "weeknum", headerName: "Week" },
  ];


  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"latest-producer-price"}
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

export default HartyPricesList;
