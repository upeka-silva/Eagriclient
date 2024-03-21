import React, { useEffect, useState } from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { useStepperContext } from "@mui/material";

const GnDivisionList = ({
  geoZoneStucture,
  dataEndPoint,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const {
    isAdmin,
    isProvincial,
    isIntProvincial,
    isMahaweli,
    isAgrarian,
    isEcoz,
  } = geoZoneStucture;

  const [columns, setcollumns] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      setcollumns([
        {
          field: "dsDivisionDTO.name",
          headerName: "DS Division"
        },
        { field: "name", headerName: "Gn Division" },

        { field: "code", headerName: "Code" },
      ]);
    }
    if (isProvincial) {
      setcollumns([
        {
          field: ["aiRegionsDTO.description"],
          joinString: " - ",
          headerName: "Ai Region",
        },
        { field: "name", headerName: "Gn Division" },
        { field: "code", headerName: "Code" },
      ]);
    }
    if (isIntProvincial) {
      setcollumns([
        {
          field: [ "aiRegionsDTO.description"],
          joinString: " - ",
          headerName: "AI Region",
        },
        { field: "name", headerName: "Gn Division" },
        { field: "code", headerName: "Code" },
      ]);
    }
    if (isMahaweli) {
      setcollumns([
        {

          field: [ "mahaweliUnitDTO.description"],
          headerName: "Mahaweli Unit"
        
        },
        { field: "name", headerName: "Gn Division" },
        { field: "code", headerName: "Code" },
      ]);
    }
    if (isAgrarian) {
      setcollumns([
        { field: "code", headerName: "Code" },
        { field: "name", headerName: "Description" },
        {
          field: ["arpaDTO.arpaId", "arpaDTO.name"],
          joinString: " - ",
          headerName: "ARPA",
        },
      ]);
    }
  }, [isAdmin, isProvincial, isIntProvincial, isMahaweli, isAgrarian, isEcoz]);

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={dataEndPoint}
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

export default GnDivisionList;
