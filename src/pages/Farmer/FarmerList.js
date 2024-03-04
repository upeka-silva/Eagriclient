import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";

const FarmerList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "farmerId", headerName: "ID" },
    { field: ["firstName", "lastName"], headerName: "Name" },
    { field: "nationalityClient", headerName: "Ethnicity" },
    { field: "nic", headerName: "Nic" },
    { field: "address", headerName: "Address" },
    {
      field: ["gnDivision.code", "gnDivision.name"],
      headerName: "GN Division",
    },
    { field: "mobile", headerName: "Contact" },
  ];

  return (
    <TableWrapper>
    <DataTable
      loadingTable
      dataEndPoint={"farmers"}
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

export default FarmerList;
