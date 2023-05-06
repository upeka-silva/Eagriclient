import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const SoilSubTypeList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "soilSubTypeCode", headerName: "Soil Sub Type Code" },
    { field: "description", headerName: "Description" },
    { field: "soilTypeDTO", headerName: "Soil Type Code" },
  ];

  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"soil-sub-types"}
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

export default SoilSubTypeList;
