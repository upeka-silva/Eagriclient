import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    FormControl, InputLabel, MenuItem, Select, TextField, Table, Grid,

} from "@mui/material";
import { FieldName } from "../FormLayout/FieldName";
import { get } from '../../services/api';
import { FieldWrapper } from '../FormLayout/FieldWrapper';

const AdministrativeDivisionSelectFilter = ({
    selectedOption,
    selectedId = null
}) => {

    const [parentSelectedOpt, setParentSelectedOpt] = useState(null);
    const [fetchedOptions, setFetchedOptions] = useState([{id: 1, name: "name"}]);
    const [selectedDivId, setSelectedDivId] = useState(null);

    useEffect(() => {
        console.log('inside use effect ===========>');
        let child = selectedOption?.child == null ? selectedOption : selectedOption?.child;
        setParentSelectedOpt(child);

        const fetchOptions = async (path) => {
            try {
                let response = await get(
                    `${path}`,
                    true
                );
                let nameValPair = getNameValuePair(response, child.key);
                console.log('name val pair ---------->');
                console.log(nameValPair);
                setFetchedOptions(nameValPair);
            } catch(error) {
                console.log(error);
            }
        };

        let url = child?.url;
        if(selectedId) {
            url = url + "/" + selectedId;
        }
        
        console.log('child url ==========>');
        console.log(child.url)
        fetchOptions(url);
    }, [selectedOption]);

    const getNameValuePair = (response, type) => {
        let nameValue = "";
        if (type == 'deputiyDirOfAgriProvincial') {
            nameValue = convertNameValuePair(response.payloadDto, true, 'id', 'description');
        } else if (type == 'ADASegmentProvincial') {
            nameValue = convertNameValuePair(response.payload, true, 'id', 'description');
        } else if (type == 'directorDOA') {
            nameValue = convertNameValuePair(response.payloadDto, true, 'id', 'description');
        } else if (type == 'provincialDirectorOfAgri') {
            nameValue = convertNameValuePair(response.payloadDto, true, 'id', 'description');
        } else if (type === 'deputiyDirOfAgriProvincial') {
            nameValue = convertNameValuePair(response.payloadDto, true, 'id', 'description'); 
        } else {
            nameValue = convertNameValuePair(response.payloadDto);
        }
        return nameValue;
    }

    const convertNameValuePair = (data, isKey = false, idKey = '', nameKey = '') => {
        let nameValue = [];
        for (let obj of data) {
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
        return nameValue;
    }

    const handleAdminDivSelect = (selectedValues) => {
        console.log('final values ===========>');
        console.log(selectedValues);
    }

    const handleOptionSelect = (selectedValue) => {
        console.log('handle option select ---------------->');
        console.log(selectedValue);
        setSelectedDivId(selectedValue?.id);
    }

    return (
        <>
        
        <Grid item lg={8}>
            <FieldWrapper>
                <FormControl sx={{ minWidth: "364px" }} size="small">
                    <FieldName>{parentSelectedOpt?.displayName}</FieldName>
                    {parentSelectedOpt?.child === null ? <Autocomplete
                        sx={{
                            minWidth: "364px",
                            minHeight: "28px", // Adjust the height as needed
                            padding: "4px", // Adjust the padding as needed
                        }}
                        //disabled={view}
                        
                        multiple
                        id="dropdown"
                        options={fetchedOptions}
                        onChange={(event, value) => handleAdminDivSelect(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                    /> :
                    <Autocomplete
                        sx={{
                            minWidth: "364px",
                            minHeight: "28px", // Adjust the height as needed
                            padding: "4px", // Adjust the padding as needed
                        }}
                        //disabled={view}
                        id="dropdown"
                        options={fetchedOptions}
                        onChange={(event, value) => handleOptionSelect(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                    />}
                    {selectedDivId !== null ? <AdministrativeDivisionSelectFilter 
                        selectedOption={parentSelectedOpt?.child}
                        selectedId={selectedDivId}
                    />: null}
                </FormControl>
            </FieldWrapper>
        </Grid>
        </>
    );
};

export default AdministrativeDivisionSelectFilter;
