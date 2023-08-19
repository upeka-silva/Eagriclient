import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const useStyles = makeStyles(theme => ({
    dropdownContainer: {
        marginTop: theme.spacing(2), // Adjust the margin value as needed
    },
}));

//const [parentLinks, setParentLinks] = useState([]);



const FilterTypeFilter = ({ data, parentLinks, parentFilter, currentLinkIndex }) => {

    const [nextIndex, setNextIndex] = useState(null);
    const [isShow, setIsShow] = useState(false);

    const handleAdvanceDataChange = (value) => {
        console.log('cccc ', value);

        const nextIndex = currentLinkIndex + 1;
        if (nextIndex > parentLinks.length) {
            setIsShow(false);
        } else {
            console.log('nextIndex ', nextIndex);
            console.log('parentLinks.length ', parentLinks.length);
            setNextIndex(nextIndex);
            setIsShow(true);
        }

        //const currentFilter = data[parentLinks[nextIndex]]
    };


    //const [isValueFilter, setIsValueFilter] = useState(false);
    const classes = useStyles();

    // check value filter for original parent
    const isValueFilter = (parentLinks == null) || (parentLinks == []) || (parentLinks.length == currentLinkIndex);
    //setIsValueFilter(val);
    const filterKey = parentLinks[currentLinkIndex];

    console.log('parentLinks filter ', parentLinks);
    console.log('currentLinkIndex ', currentLinkIndex);
    console.log('current filter ', data[filterKey]);
    console.log('isValueFilter ', isValueFilter);
   // console.log('current filter ', currentFilter);
/*    console.log('nextFilter  ', nextFilter);
    console.log('isValueFilter  ', isValueFilter);
    console.log('nextIndex  ', nextIndex);*/

    return (
        <div className={classes.dropdownContainer}>


                <FormControl sx={{ minWidth: "200px" }} size="small">
                    <InputLabel> filter types </InputLabel>
                    <Select
                        id="dropdown"
                        onChange={(e) =>
                            handleAdvanceDataChange(e?.target?.value)
                        }
                    >
                        <MenuItem value={10}>district 1</MenuItem>
                        <MenuItem value='abc'>district 2</MenuItem>
                        <MenuItem value={30}>district 3</MenuItem>
                    </Select>
                </FormControl>




            {isShow && (
                <>
                    <p>next filter</p>
                    {<FilterTypeFilter data = {data} parentLinks={parentLinks} currentLinkIndex={nextIndex} />}
                </>

            )}

            {isValueFilter && (
                <p>load value filters for parent filter</p>
            )}


        </div>
    );
};

export default FilterTypeFilter;
