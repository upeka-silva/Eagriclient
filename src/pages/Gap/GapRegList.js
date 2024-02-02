import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";

const GapRegList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    // { field: "id", headerName: "ID" },
    {
      field: ["farmerDTO.firstName", "farmerDTO.lastName"],
      headerName: "Applicant Name",
    },
    { field: "farmerDTO.address", headerName: "Applicant Address" },
    {
      field: ["farmLandDTO.code", "farmLandDTO.name"],
      headerName: "Farm Land",
    },
    { field: ["farmLandDTO.address"], headerName: "Land Address" },
    { field: "previousGapReqNo", headerName: "Prev. GAP" },
    {
      field: ["businessNature", "businessNatureOtherValue"],
      headerName: "Business Nature",
    },
    {
      field: ["statusClient"],
      headerName: "Current State",
    },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"gap-request"}
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

export default GapRegList;
