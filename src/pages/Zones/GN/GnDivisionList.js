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
        { field: "code", headerName: "Code" },
        { field: "name", headerName: "Description" },
        {
          field: ["dsDivisionDTO.code", "dsDivisionDTO.name"],
          joinString: " - ",
          headerName: "Ds Division",
        },
      ]);
    }
    if (isProvincial) {
      setcollumns([
        { field: "code", headerName: "Code" },
        { field: "name", headerName: "Description" },
        {
          field: ["aiRegionsDTO.regionId"],
          joinString: " - ",
          headerName: "Ai Region",
        },
      ]);
    }
    if (isIntProvincial) {
      setcollumns([
        { field: "code", headerName: "Code" },
        { field: "name", headerName: "Description" },
        {
          field: ["aiRegionsDTO.regionId", "aiRegionsDTO.description"],
          joinString: " - ",
          headerName: "AI Region",
        },
      ]);
    }
    if (isMahaweli) {
     
      setcollumns([
        { field: "code", headerName: "Code" },
        { field: "name", headerName: "Description" },
        {
          field: ["mahaweliUnitDTO.unitId", "mahaweliUnitDTO.description"],
          joinString: " - ",
          headerName: "Mahaweli Unit",
        },
      ]);
    }
    if (isAgrarian) {
     
      setcollumns([
        { field: "code", headerName: "Code" },
        { field: "name", headerName: "Description" },
        {
          field: ["arpaDTO.arpaId","arpaDTO.name"],
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
