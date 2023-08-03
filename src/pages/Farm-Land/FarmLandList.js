import React from "react";
import { CardWrapper } from "../../components/PageLayout/Card";
import { DataTable } from "../../components/PageLayout/Table";

const FarmLandList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "landName", headerName: "Land Name" },
    { field: "protectedHouseType", headerName: "Protected House Type" },
    { field: "landType", headerName: "Land Type" },
    { field: "", headerName: "Address" },
    { field: "gnDivisionDTO", headerName: "Grama Niladari Division" },
    { field: "latitude", headerName: "Latitude" },
    { field: "longitude", headerName: "Longitude" },
    { field: "elevation", headerName: "Elevation" },
    { field: "soilTypeDTO", headerName: "Soil Type" },
    { field: "area", headerName: "Area" },
    { field: "status", headerName: "Status" },
  ];

  return (
    <CardWrapper>
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
    </CardWrapper>
  );
};

export default FarmLandList;
