import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";

const AgroEcoList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "id", headerName: "AEZ ID"},
    { field: "name", headerName: "AEZ Name"},
    { field: "climateZoneId", headerName: "Climate Zone Id"},
    { field: "avgRainfall", headerName: "Avg Rainfall"},
    { field: "avgTemp", headerName: "Avg Temp"},
    { field: "avgHumidity", headerName: "Avg Humidity"},
    { field: "", headerName: "Soil Type"},
  ];

  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"agro-eco-zone"}
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

export default AgroEcoList;
