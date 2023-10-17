import React from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";
// import { CardWrapper } from "../../components/PageLayout/Card";

const FarmLandOwnershipList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "code", headerName: "Code" },
    { field: "ownerType", headerName: "Owner Type" },
    { field: "address", headerName: "Address" },
    { field: "dateFrom", headerName: "From" },
    { field: "dateUntil", headerName: "Until" },
    {
      field: ["farmLandDTO.code", "farmLandDTO.name"],
      joinString: " - ",
      headerName: "Farm Land",
    },
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"farm-land-ownership"}
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

export default FarmLandOwnershipList;
