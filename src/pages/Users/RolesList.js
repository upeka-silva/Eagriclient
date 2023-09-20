import React from "react";
import { DataList } from "../../components/PageLayout/List";

const RolesList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  onChanges = () => {},
}) => {
  const columns = [
    { field: "name", headerName: "Role" },
   
  ];
  return (

      <DataList
        loadingTable
        dataEndPoint={"app-settings/roles"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
        onChange={onChanges}
      />
   
  );
};

export default RolesList;
