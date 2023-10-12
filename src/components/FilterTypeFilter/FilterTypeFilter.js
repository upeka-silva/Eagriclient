import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import {
    Autocomplete,
    FormControl, InputLabel, MenuItem, Select, TextField, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Button
} from "@mui/material";
import { FieldName } from "../FormLayout/FieldName";
import { get_DataList } from "../../redux/actions/list/list";
import data from "../../dropdown/drodwnlist";
import { TextFields } from "@mui/icons-material";

// const useStyles = makeStyles(theme => ({
//     dropdownContainer: {
//         // Adjust the margin value as needed
//     },
// }));

const FilterTypeFilter = ({
    data,
    originalPath,
    parentLinks,
    parentFilter,
    currentLinkIndex,
    apiResponse,
    curSelectedVal,
    nextResponse,
    outPutSelectedFilterType
}) => {

    const [nextIndex, setNextIndex] = useState(null);
    const [currentKeyValuePair, setCurrentKeyValuePair] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [apiResponseData, setApiResponseData] = useState(apiResponse);
    const [nextResponseData, setNextResponseData] = useState(null);
    const [finalFilter, setFinalFilter] = useState(null);
    const [curSelectedValData, setCurSelectedValData] = useState(curSelectedVal);
    const [dataListTemplates, setDataListTemplates] = useState([]);
    const [view, setView] = useState(false)
    // const classes = useStyles();

    // check value filter for original parent
    const isValueFilter = (parentLinks == null) || (parentLinks == []) || (parentLinks.length == currentLinkIndex);

    const filterKey = parentLinks == null ? originalPath : parentLinks[currentLinkIndex];

    useEffect(() => {

        async function fetchData() {
            try {

                let response = null;
                let nameValue = [];
                let apiPath = '';

                // API call
                if (currentLinkIndex == 0) {
                    apiPath = getAPIUrl(filterKey, false);
                    response = await get_DataList(apiPath);
                    setApiResponseData(response.dataList);
                    console.log('data 111111111 ------>');
                    console.log(response.dataList)

                    console.log(filterKey);
                    if (filterKey == 'deputiyDirOfAgriInterProvincial') {
                        nameValue = convertNameValuePair(response.dataList, true, 'id', 'ddId');
                    } else if (filterKey == 'mahaweliAuthority') {
                        nameValue = convertNameValuePair(response.dataList, true, 'id', 'description');
                    } else if (filterKey == 'directorDOA') {
                        nameValue = convertNameValuePair(response.dataList, true, 'id', 'description');
                    } else if (filterKey == 'provincialDirectorOfAgri') {
                        nameValue = convertNameValuePair(response.dataList, true, 'id', 'description');
                    } else if (filterKey === 'deputiyDirOfAgriProvincial') {
                        nameValue = convertNameValuePair(response.dataList, true, 'id', 'description'); 
                    } else {
                        nameValue = convertNameValuePair(response.dataList);
                    }
                    setCurrentKeyValuePair(nameValue);

                    return;
                }

                if (currentLinkIndex > 0) {
                    filterData();
                }

            } catch (error) {
                console.error('Error fetching services:', error);
            }
        }

        fetchData();
    }, []);

    const getAPIUrl = (filterKeyParam, typeParam = false) => {
        let response = null;
        if (filterKeyParam == 'district') {
            return "geo-data/districts"
        } else if (filterKeyParam == 'province') {
            return "geo-data/provinces";
        } else if (filterKeyParam == 'DSDivision') {
            return typeParam ? "geo-data/ds-divisions/by-district/" : "geo-data/provinces";
        } else if (filterKeyParam == 'ADASegmantProvincial') {
            return typeParam ? "geo-data/provincial-ada-segments" : "geo-data/provincial-ada-segments";
        } else if (filterKeyParam == 'GNDivision') {
            return typeParam ? "geo-data/gn-divisions/ds-division/" : "";
        } else if (filterKeyParam == 'deputiyDirOfAgriProvincial') {
            return typeParam ? "" : "geo-data/provincial-deputy-director-level";
        } else if (filterKeyParam == 'deputiyDirOfAgriInterProvincial') {
            return typeParam ? "geo-data/director-doa/" : "geo-data/interprovincial-dd-levels";
        } else if (filterKeyParam == 'mahaweliUnit') {
            return typeParam ? "" : "geo-data/mahaweli-units";
        } else if (filterKeyParam == 'mahaweliSystems') {
            return typeParam ? "" : "geo-data/mahaweli-systems";
        } else if (filterKeyParam == 'block') {
            return typeParam ? "" : "geo-data/mahaweli-blocks";
        } else if (filterKeyParam == 'districtCommisioner') {
            return typeParam ? "" : "geo-data/district-commissioner-level";
        } else if (filterKeyParam == 'deptOfAgrarianDevelopment') {
            return typeParam ? "" : "geo-data/do_agrarian_development";
        } else if (filterKeyParam == 'mahaweliAuthority') {
            return typeParam ? "" : "geo-data/mahaweli-authorities";
        } else if (filterKeyParam == 'directorDOA') {
            return typeParam ? "" : "geo-data/director-doa";
        } else if (filterKeyParam == 'provincialDirectorOfAgri') {
            return typeParam ? "" : "geo-data/provincial-director-levels";
        } else if (filterKeyParam == 'agroEcologicalZones') {
            return typeParam ? "" : "aez";
        }

        return null;
    }

    const filterData = async () => {
        // Data filtering without API
        let nameValue = [];
        let apiPath = '';
        if (apiResponse) {

            const filt = apiResponse.filter((d) =>
                d.id == curSelectedValData
            );

            const fk = parentLinks[currentLinkIndex - 1];
            if (isValueFilter) {
                apiPath = getAPIUrl(originalPath, true);
            } else {
                apiPath = getAPIUrl(parentLinks[currentLinkIndex], true);
            }

            const filteredResponse = await get_DataList(apiPath + curSelectedValData);
            nameValue = convertNameValuePair(filteredResponse.dataList);
            setCurrentKeyValuePair(nameValue);

        }

    }

    const convertNameValuePair = (data, isKey = false, idKey = '', nameKey = '') => {
        const nameValue = [];
        for (const obj of data) {
            let newobj = {};
            if (isKey) {
                newobj = {
                    id: obj[idKey],
                    name: obj[nameKey]
                }
            } else {
                newobj = {
                    id: obj.id,
                    name: obj.name
                }
            }

            nameValue.push(newobj);
        }
        console.log('name value--------->');
        console.log(nameValue);
        return nameValue;
    }

    const passToParent = (value) => {
        outPutSelectedFilterType(value);
    };

    const handleAdvanceDataChange = (value) => {
        setIsShow(false);
        setView(!view);

        if (isValueFilter) {
            passToParent(value);
            setFinalFilter(value?.id);
        }
        setCurSelectedValData(value?.id);

        if (parentLinks == null) {
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
        <>
            {/* <div className={classes.dropdownContainer}> */}


                <FormControl disabled={view} sx={{ minWidth: "364px" }} size="small">
                    <FieldName>{data[filterKey]?.displayName}</FieldName>
                    <Autocomplete
                        sx={{
                            minWidth: "364px",
                            minHeight: "28px", // Adjust the height as needed
                            padding: "4px", // Adjust the padding as needed
                        }}
                        disabled={view}
                        id="dropdown"
                        options={currentKeyValuePair}
                        onChange={(event, value) => handleAdvanceDataChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>

            {/* </div> */}
            {isShow && (
                <>
                    {<FilterTypeFilter view={view} data={data} originalPath={originalPath} parentLinks={parentLinks}
                        currentLinkIndex={nextIndex} apiResponse={apiResponseData}
                        curSelectedVal={curSelectedValData} nextResponse={nextResponseData}
                        outPutSelectedFilterType={passToParent} />}
                </>

            )}
        </>
    );
};

export default FilterTypeFilter;
