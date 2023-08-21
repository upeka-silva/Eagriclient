import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {FieldName} from "../FormLayout/FieldName";
import {get_DataList} from "../../redux/actions/list/list";
import data from "../../dropdown/drodwnlist";

const useStyles = makeStyles(theme => ({
    dropdownContainer: {
      // Adjust the margin value as needed
    },
}));

const FilterTypeFilter = ({ data, originalPath, parentLinks, parentFilter, currentLinkIndex,  }) => {

    console.log('originalPath  ', originalPath);
    console.log('parentLinks filter ', parentLinks);
    console.log('currentLinkIndex ', currentLinkIndex);
    console.log('data  ', data);

    const [nextIndex, setNextIndex] = useState(null);
    const [currentKeyValuePair, setCurrentKeyValuePair] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [finalFilter, setFinalFilter] = useState(null);


    const classes = useStyles();

    // check value filter for original parent
    const isValueFilter = (parentLinks == null) || (parentLinks == []) || (parentLinks.length == currentLinkIndex);

    const filterKey = parentLinks == null ? originalPath : parentLinks[currentLinkIndex];


    console.log('filterKey  ', filterKey);
    console.log('current filter ', data[filterKey]);
    console.log('isValueFilter ', isValueFilter);

    useEffect(() => {
        async function fetchData() {
            try {

                let response = null;
                let nameValue = [];

                // API call
                // if (currentLinkIndex == 0) {
                //
                //     if (filterKey == 'district') {
                //         response = await get_DataList("geo-data/districts");
                //         setApiResponse(response);
                //         nameValue = convertNameValuePair(response.dataList)
                //         console.log(response);
                //     } else if (filterKey == 'province') {
                //         response = await get_DataList("geo-data/provinces");
                //         setApiResponse(response);
                //         nameValue = convertNameValuePair(response.dataList)
                //         console.log(response);
                //     }
                //
                //     setCurrentKeyValuePair(nameValue);
                //
                //     return;
                // }
                if (currentLinkIndex == 0) {


                        response = await get_DataList(`geo-data/${filterKey}`);
                        setApiResponse(response);
                        nameValue = convertNameValuePair(response.dataList)
                        console.log(response);


                    setCurrentKeyValuePair(nameValue);

                    return;
                }
                // Data filtering without API
                if (currentLinkIndex > 0) {

                }


            } catch (error) {
                console.error('Error fetching services:', error);
            }
        }

        fetchData();
    }, []);

    const convertNameValuePair = (data) => {
        const nameValue = [];
        for (const obj of data) {
            const newobj = {
                id: obj.id,
                name: obj.name
            }
            nameValue.push(newobj);
        }
        return nameValue;
    }


    const handleAdvanceDataChange = (value) => {
        setFinalFilter(value);
        if (parentLinks == null) {
            console.log('first level val ', value);
            return;
        }

        const nextIndex = currentLinkIndex + 1;
        if (nextIndex > parentLinks.length) {
            setIsShow(false);
        } else {
            setNextIndex(nextIndex);
            setIsShow(true);
        }
    };


    return (
        <div className={classes.dropdownContainer}>


                <FormControl sx={{ minWidth: "200px" }} size="small">
                    <FieldName>Select {filterKey}</FieldName>
                    <Select
                        sx={{borderRadius :"8px"}}
                        id="dropdown"
                        onChange={(e) =>
                            handleAdvanceDataChange(e?.target?.value)
                        }
                    >
                        {currentKeyValuePair.map((key) => (
                            <MenuItem key={key.id} value={key.id}>
                                {key.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>




            {isShow && (
                <>
                    <p>next filter</p>
                    {<FilterTypeFilter data = {data} originalPath={originalPath} parentLinks={parentLinks} currentLinkIndex={nextIndex} />}
                </>

            )}

            {isValueFilter && (
                <p>load value filters for parent filter</p>
            )}


        </div>
    );
};

export default FilterTypeFilter;
