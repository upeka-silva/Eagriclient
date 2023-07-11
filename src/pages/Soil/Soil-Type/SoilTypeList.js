import React from "react";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";
import { Box } from "@mui/material";

const SoilTypeList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "soilTypeCode", headerName: "Code" },
    { field: "description", headerName: "Description" },
  ];

  return (
    <Box mt={2}>
      <CardWrapper>
        <DataTable
          loadingTable
          dataEndPoint={"soil-types"}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      </CardWrapper>
    </Box>
  );
};

export default SoilTypeList;
