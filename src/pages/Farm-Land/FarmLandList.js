import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";
// import { CardWrapper } from "../../components/PageLayout/Card";

const FarmLandList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "name", headerName: "Land Name" },
    { field: "address", headerName: "Address" },
    {
      field: "protectedHouseTypeDTO.description",
      headerName: "Protected House Type",
    },
    { field: "farmLandType", headerName: "Land Type" },
    { field: "gnDivisionDTO.name", headerName: "Grama Niladari Division" },
    { field: "latitude", headerName: "Latitude" },
    { field: "longitude", headerName: "Longitude" },
    { field: "elevation", headerName: "Elevation" },
    { field: "soilTypeDTO.soilTypeCode", headerName: "Soil Type" },
    { field: "area", headerName: "Area" }
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"farm-land"}
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

export default FarmLandList;
