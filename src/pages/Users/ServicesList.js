import React from "react";
import { DataList } from "../../components/PageLayout/List";


const ServicesList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "shortName", headerName: "Service" },
 
  ];
  return (

      <DataList
        loadingTable
        dataEndPoint={"app-services"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />

  );
};

export default ServicesList;
