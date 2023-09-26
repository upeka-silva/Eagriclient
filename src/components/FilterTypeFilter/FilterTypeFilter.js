import React, { useEffect, useState } from "react";
import {makeStyles} from '@material-ui/core/styles';
import { Autocomplete, FormControl, TextField } from "@mui/material";
import { FieldName } from "../FormLayout/FieldName";
import { get_DataList } from "../../redux/actions/list/list";

const useStyles = makeStyles(theme => ({
    dropdownContainer: {
        // Adjust the margin value as needed
    },
}));

const FilterTypeFilter = ({
  data,
  originalPath,
  parentLinks,
  parentFilter,
  currentLinkIndex,
  apiResponse,
  curSelectedVal,
  nextResponse,
  outPutSelectedFilterType,
}) => {
  const [nextIndex, setNextIndex] = useState(null);
  const [currentKeyValuePair, setCurrentKeyValuePair] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [apiResponseData, setApiResponseData] = useState(apiResponse);
  const [nextResponseData, setNextResponseData] = useState(null);
  const [finalFilter, setFinalFilter] = useState(null);
  const [curSelectedValData, setCurSelectedValData] = useState(curSelectedVal);
  const [view, setView] = useState(false);
  const classes = useStyles();

  // check value filter for original parent
  const isValueFilter =
    parentLinks == null ||
    parentLinks == [] ||
    parentLinks.length == currentLinkIndex;

  const filterKey =
    parentLinks == null ? originalPath : parentLinks[currentLinkIndex];

  useEffect(() => {
    async function fetchData() {
      try {
        let response = null;
        let nameValue = [];

        // API call
        if (currentLinkIndex == 0) {
          if (filterKey == "district") {
            response = await get_DataList("geo-data/districts");
            setApiResponseData(response.dataList);
            nameValue = convertNameValuePair(response.dataList);
          } else if (filterKey == "province") {
            response = await get_DataList("geo-data/provinces");
            setApiResponseData(response.dataList);
            nameValue = convertNameValuePair(response.dataList);
          } else if (filterKey == "deputiyDirOfAgriProvincial") {
          } else if (filterKey == "deputiyDirOfAgriInterProvincial") {
          } else if (filterKey == "mahaweliSystems") {
          } else if (filterKey == "districtCommisioner") {
          } else if (filterKey == "deptOfAgrarianDevelopment") {
          } else if (filterKey == "mahaweliAuthority") {
          } else if (filterKey == "directorDOA") {
          } else if (filterKey == "provincialDirectorOfAgri") {
          } else if (filterKey == "agroEcologicalZones") {
          }

          setCurrentKeyValuePair(nameValue);

          return;
        }

        if (currentLinkIndex > 0) {
          filterData();
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchData();
  }, []);

  const filterData = () => {
    // Data filtering without API
    let nameValue = [];
    if (apiResponse) {
      const filt = apiResponse.filter((d) => d.id == curSelectedValData);

      const fk = parentLinks[currentLinkIndex - 1];

      if (filt && filt[0]) {
        if (fk == "district") {
          nameValue = convertNameValuePair(filt[0].dsDivisionDTOList);
        } else if (fk == "DSDivision") {
          nameValue = convertNameValuePair(
            filt[0].dsDivisionDTOList[0].gnDivisionDTOList
          );
        }
        setCurrentKeyValuePair(nameValue);
      }
    }
  };

  const convertNameValuePair = (data, isKey = null) => {
    const nameValue = [];
    for (const obj of data) {
      const newobj = {
        id: obj.id,
        name: obj.name,
      };
      nameValue.push(newobj);
    }
    return nameValue;
  };

  const passToParent = (value) => {
    console.log("final filter type ", value);
    outPutSelectedFilterType(value);
  };

  const handleAdvanceDataChange = (value) => {
    setIsShow(false);
    setView(!view);

    if (isValueFilter) {
      passToParent(value);
      setFinalFilter(value);
    }
    setCurSelectedValData(value);

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
      <div className={classes.dropdownContainer}>

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
          onChange={(event, value) => handleAdvanceDataChange(value?.id)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>

      </div>
      {isShow && (
        <>
          {
            <FilterTypeFilter
              view={view}
              data={data}
              originalPath={originalPath}
              parentLinks={parentLinks}
              currentLinkIndex={nextIndex}
              apiResponse={apiResponseData}
              curSelectedVal={curSelectedValData}
              nextResponse={nextResponseData}
              outPutSelectedFilterType={passToParent}
            />
          }
        </>
      )}
    </>
  );
};

export default FilterTypeFilter;
