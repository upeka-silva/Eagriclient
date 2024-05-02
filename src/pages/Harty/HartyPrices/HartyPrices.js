import React, { useState } from 'react'
import { useUserAccessValidation } from '../../../hooks/authentication'
import ListHeader from '../../../components/ListHeader/ListHeader';
import HartyPricesList from './HartyPricesList';
import { Fonts } from "../../../utils/constants/Fonts";
import { List } from "@mui/material";

const HartyPrices = () => {
    useUserAccessValidation();

const [selectedHartyPrices, setSelectedHartyPrices] = useState ([]);

const toggleHartyPrices = (component) =>{
    setSelectedHartyPrices((current =[]) => {
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
  
    const selectAllHartyPrices = (all = []) => {
      setSelectedHartyPrices(all);
    };
  
    const resetSelectedHartyPrices = () => {
      setSelectedHartyPrices([]);
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
    <ListHeader title="HARTI Item Values"/>
    <List>
        <HartyPricesList
        selectedRows={selectedHartyPrices}
        onRowSelect={toggleHartyPrices}
        selectAll={selectAllHartyPrices}
        unSelectAll={resetSelectedHartyPrices}
        />
    </List>
    </div>
   );
};


export default HartyPrices;