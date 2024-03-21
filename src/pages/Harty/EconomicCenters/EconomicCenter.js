import React, { useState } from "react";
import { List } from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import EconomicCentersList from "./EconomicCentersList";
import { Fonts } from "../../../utils/constants/Fonts";
import ListHeader from "../../../components/ListHeader/ListHeader";

const EconomicCenter = () => {
  useUserAccessValidation();

  const [selectedEcomicCenters, setSelectedEcomicCenters] = useState([]);

  const toggleEcomicCentersSelect = (component) => {
    setSelectedEcomicCenters((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };

  const selectAllEcomicCenters = (all = []) => {
    setSelectedEcomicCenters(all);
  };

  const resetSelectedEcomicCenters = () => {
    setSelectedEcomicCenters([]);
  };

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
      <ListHeader title="Economic Centers" />
      <List>
        <EconomicCentersList
          selectedRows={selectedEcomicCenters}
          onRowSelect={toggleEcomicCentersSelect}
          selectAll={selectAllEcomicCenters}
          unSelectAll={resetSelectedEcomicCenters}
        />
      </List>
    </div>
  );
};

export default EconomicCenter;
