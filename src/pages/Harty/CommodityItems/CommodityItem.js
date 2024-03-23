import React, { useState } from "react";
import { List } from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import CommodityItemList from "./CommodityItemList";
import { Fonts } from "../../../utils/constants/Fonts";
import ListHeader from "../../../components/ListHeader/ListHeader";

const CommodityItem = () => {
  useUserAccessValidation();

  const [selectedCommodityItems, setSelectedCommodityItems] = useState([]);

  const toggleCommodityItemsSelect = (component) => {
    setSelectedCommodityItems((current = []) => {
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

  const selectAllCommodityItems = (all = []) => {
    setSelectedCommodityItems(all);
  };

  const resetSelectedCommodityItems = () => {
    setSelectedCommodityItems([]);
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
      <ListHeader title="Commodity Items" />
      <List>
        <CommodityItemList
          selectedRows={selectedCommodityItems}
          onRowSelect={toggleCommodityItemsSelect}
          selectAll={selectAllCommodityItems}
          unSelectAll={resetSelectedCommodityItems}
        />
      </List>
    </div>
  );
};

export default CommodityItem;
