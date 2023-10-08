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
    { field: "code", headerName: "Code" },
    { field: "name", headerName: "Land Name" },
    { field: "address", headerName: "Address" },
    { field: "farmLandType", headerName: "Land Type" },
    {
      field: [
        "protectedHouseTypeDTO.typeId",
        "protectedHouseTypeDTO.description",
      ],
      joinString: " - ",
      headerName: "Protected House Type",
    },
    {
      field: ["gnDivisionDTO.code", "gnDivisionDTO.name"],
      joinString: " - ",
      headerName: "GN Division",
    },
    { field: "latitude", headerName: "Latitude" },
    { field: "longitude", headerName: "Longitude" },
    { field: "elevation", headerName: "Elevation" },
    {
      field: ["soilTypeDTO.soilTypeCode", "soilTypeDTO.description"],
      joinString: " - ",
      headerName: "Soil Type",
    },
    { field: "landAreaUnit", headerName: "Unit" },
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
