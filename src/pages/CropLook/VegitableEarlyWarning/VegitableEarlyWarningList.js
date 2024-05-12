import React from "react";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";

const VegitableEarlyWarningList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "cropDTO.description", headerName: "Crop" },
    {
      field: "accumulatedExtend",
      headerName: "Accumulated Extend",
      type: "float",
    },
    { field: "vegetableEarlyWarningStatus", headerName: "Status" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <ListHeader title="Vegitable Early Warnings" />
      <TableWrapper>
        <DataTable
          loadingTable
          dataEndPoint={"crop-look/vegetable-early-warnings"}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      </TableWrapper>
    </div>
  );
};

export default VegitableEarlyWarningList;
