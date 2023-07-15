import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";

const ProvinceList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  advancedSearchData = {},
}) => {
  const columns = [
    { field: "code", headerName: "Code" },
    { field: "name", headerName: "Description" },
  ];

  return (
    <CardWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/provinces"}
        filterEndPoint={"geo-data/provinces/filter-provinces"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
        advancedSearchData={advancedSearchData}
      />
    </CardWrapper>
  );
};

export default ProvinceList;
