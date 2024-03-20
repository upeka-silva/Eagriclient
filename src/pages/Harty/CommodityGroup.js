import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import CommodityGroupList from "./CommodityGroupList";

const CommodityGroup = () => {
  useUserAccessValidation();
  
  const [selectedCommodityGroups, setSelectedCommodityGroups] = useState([]);

  const toggleCommodityGroupsSelect = (component) => {
    setSelectedCommodityGroups((current = []) => {
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

  const selectAllCommodityGroups = (all = []) => {
    setSelectedCommodityGroups(all);
  };

  const resetSelectedCommodityGroups = () => {
    setSelectedCommodityGroups([]);
  };

  return (
    <div>
      <List>
        <CommodityGroupList
          selectedRows={selectedCommodityGroups}
          onRowSelect={toggleCommodityGroupsSelect}
          selectAll={selectAllCommodityGroups}
          unSelectAll={resetSelectedCommodityGroups}
        />
      </List>
    </div>
  );
};

export default CommodityGroup;
