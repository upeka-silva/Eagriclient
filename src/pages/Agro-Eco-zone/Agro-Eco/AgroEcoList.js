import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const AgroEcoList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "aeZoneId", headerName: "Code" },
    { field: "name", headerName: "Description" },
    { field: "climateZone", headerName: "Climate Zone" },
    { field: "averageRainfall", headerName: "Avg Rainfall" },
    { field: "averageTemperature", headerName: "Avg Temp" },
    { field: "averageHumidity", headerName: "Avg Humidity" },
    { field: "soilTypeDTO.soilTypeCode", headerName: "Soil Type" },
  ];

  return (
   
      <DataTable
        loadingTable
        dataEndPoint={"aez"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    
  );
};

export default AgroEcoList;
