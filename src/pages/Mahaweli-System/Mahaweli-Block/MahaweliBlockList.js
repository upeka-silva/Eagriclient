import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const MahaweliBlockList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "code", headerName: "Code" },
    { field: "name", headerName: "Description" },
    { field: "mahaweliSystem", headerName: "Mahaweli System"},
    { field: "description", headerName: "Description"},
    { field: "landArea", headerName: "Land Area" },
    { field: "cultivatedArea", headerName: "Cultivated Area"},
    { field: "irrigatedArea", headerName: "Irrigated Area" },
    { field: "nonIrrigatedArea", headerName: "Non Irrigated Area"},
    { field: "soilTexture", headerName: "Soil Texture"},
  ];
  return (
    <CardWrapper>
    <DataTable
      loadingTable
      dataEndPoint={"geo-data/mahaweli-blocks"}
      columns={columns}
      selectable
      selectedRows={selectedRows}
      selectAll={selectAll}
      onRowSelect={onRowSelect}
      unSelectAll={unSelectAll}
    />
  </CardWrapper>
  )
};

export default MahaweliBlockList;
