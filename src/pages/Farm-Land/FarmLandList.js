import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";

const FarmLandList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "name", headerName: "Land Name" },
    { field: "address", headerName: "Address" },
    { field: "protectedHouseType", headerName: "Protected House Type" },
    { field: "landType", headerName: "Land Type" },
    { field: "gnDivisionDTO", headerName: "Grama Niladari Division" },
    { field: "latitude", headerName: "Latitude" },
    { field: "longitude", headerName: "Longitude" },
    { field: "elevation", headerName: "Elevation" },
    { field: "soilTypeDTO", headerName: "Soil Type" },
    { field: "area", headerName: "Area" },
    { field: "status", headerName: "Status" },
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
