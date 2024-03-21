import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  Grid,
  CircularProgress,
} from "@mui/material";
import { FieldName } from "../FormLayout/FieldName";
import { get } from "../../services/api";
import { FieldWrapper } from "../FormLayout/FieldWrapper";

const AdministrativeDivisionSelectFilter = ({
  selectedOption,
  selectedId = null,
  onAdministrativeValueSelect,
}) => {
  const [parentSelectedOpt, setParentSelectedOpt] = useState(null);
  const [fetchedOptions, setFetchedOptions] = useState([]);
  const [selectedDivId, setSelectedDivId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setParentSelectedOpt(selectedOption);

    const fetchOptions = async (path) => {
      setLoading(false);
      try {
        let response = await get(`${path}?size=1000`, true);
        let nameValPair = getNameValuePair(response, selectedOption.key);
        setFetchedOptions(nameValPair);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    let url = selectedOption?.url;
    if (selectedId) {
      url = url + "/" + selectedId;
    }
    fetchOptions(url);
  }, [selectedOption, selectedId]);

  const getNameValuePair = (response, type) => {
    let nameValue = "";
    if (type == "deputiyDirOfAgriProvincial") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type == "ADASegmentProvincial") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type == "AiRegionProvincial") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type == "provincialDOA") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "deputiyDirOfAgriProvincial") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "interProvincialDOA") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "ADASegmantInterProvincial") {
      nameValue = convertNameValuePair(
        response?.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "deputiyDirOfAgriInterProvincial") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "AiRegionInterProvincial") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "mahaweliAuthority") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "mahaweliSystems") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "mahaweliBlock") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else if (type === "mahaweliUnit") {
      nameValue = convertNameValuePair(
        response.payloadDto,
        true,
        "id",
        "description"
      );
    } else {
      nameValue = convertNameValuePair(response.payloadDto);
    }
    return nameValue;
  };

  const convertNameValuePair = (
    data,
    isKey = false,
    idKey = "",
    nameKey = ""
  ) => {
    let nameValue = [];
    for (let obj of data) {
      let newobj = {};
      if (isKey) {
        newobj = {
          id: obj[idKey],
          name: obj[nameKey],
        };
      } else {
        newobj = {
          id: obj.id,
          name: obj.name,
        };
      }
      nameValue.push(newobj);
    }
    return nameValue;
  };

  const handleAdminDivSelect = (selectedValues) => {
    onAdministrativeValueSelect(selectedValues);
  };

  const handleOptionSelect = (selectedValue) => {
    setSelectedDivId(selectedValue?.id);
  };

  return (
    <>
      <Grid item lg={3}>
        <FieldWrapper>
          <FieldName>{parentSelectedOpt?.displayName}</FieldName>
          {loading ? (
            parentSelectedOpt?.child === null ? (
              <Autocomplete
                sx={{
                  minHeight: "28px", // Adjust the height as needed
                  borderRadius: "8px",
                }}
                multiple
                id="dropdown"
                options={fetchedOptions}
                onChange={(event, value) => handleAdminDivSelect(value)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
                size="small"
                fullWidth
              />
            ) : (
              <Autocomplete
                sx={{
                  minHeight: "28px", // Adjust the height as needed
                  borderRadius: "8px",
                }}
                id="dropdown"
                options={fetchedOptions}
                onChange={(event, value) => handleOptionSelect(value)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
                size="small"
                fullWidth
              />
            )
          ) : (
            <CircularProgress />
          )}
        </FieldWrapper>
      </Grid>
      {selectedDivId !== null ? (
        <AdministrativeDivisionSelectFilter
          selectedOption={parentSelectedOpt?.child}
          selectedId={selectedDivId}
          onAdministrativeValueSelect={onAdministrativeValueSelect}
        />
      ) : null}
    </>
  );
};

export default AdministrativeDivisionSelectFilter;
