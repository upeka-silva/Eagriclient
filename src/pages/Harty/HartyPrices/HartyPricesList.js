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
    { field: "weeknum", headerName: "Week", type: "number" },
    { field: "allocated_date", headerName: "Allocated Date", type: "date" },
    { field: "groupname", headerName: "Group Name" },
    {
      field: ["itemnum", "itemname"],
      headerName: "Item",
      joinString: " - ",
    },
    {
      field: ["loccode", "location"],
      headerName: "Location",
      joinString: " - ",
    },

    { field: "pricetype", headerName: "Price Type" },
    { field: "s_min", headerName: "Min", type: "float" },
    { field: "s_max", headerName: "Max", type: "float" },
    { field: "s_max", headerName: "Average", type: "float" },
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
