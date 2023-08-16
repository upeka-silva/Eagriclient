import React, { useState, useEffect } from "react";
import axios from "axios";
import { get_DataList } from "../../redux/actions/table/table";
import { FieldName } from "../FormLayout/FieldName";
import { Grid } from "@mui/material";
import { FieldWrapper } from "../FormLayout/FieldWrapper";

const CascadingDropdown = ({
  dataRows = [],
  columns = [],
  filtervalues = [
    "GN Division",
    "DS Division",
    "District",
    "Province",
    "AI Region",
    "ADA Segment",
    "ADA Region",
    "ADA Province",
    "ADA District",
    "ADA Segment-Provincial",
    "Deputy director of Agriculture provincial",
    "Provincial director of Agriculture",
    "ADA Segment Inter Provincial",
    "Deputy director of Agriculture inter provincial",
    "Director DOA",
    "Mahaweli Unit",
    "Block",
    "Mahaweli Systems",
    "Mahaweli Authority",
    "ARPA Division",
    "ASC Division",
    "District commissioner",
    "Department of Agrarian development",
    "Agriculture Sector",
    "Agro ecological zones"
],
  searchable = false,
  resetSearchOnHide = false,
  enableAdvanceSearch = false,
  advanceSearchProps = {},
  advancedSearchComp = React.Component || undefined || null,
  advancedSearchData = {},
  dataEndPoint = null,
  filterEndPoint = null,
  loadingTable = false,
  loaderType = "circular",
  enableActionsOnContext = false,
  selectedRows = [],
  selectable = false,
  onRowSelect = (_r) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const [countries, setCountries] = useState([]);
  const [selectedValues, setselectedValues] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch countries from API or data source
    const fetchCountries = async () => {
      try {
        const response = await get_DataList("user-manage/users", 0, 10);

        console.log(response);
        const data = response.dataList;
        console.log("cascading", data);
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch states based on selected country
    const fetchStates = async () => {
      if (selectedValues) {
        try {
          const response = await axios.get(`states-endpoint?country=${selectedValues}`);
          const data = response.data;
          setStates(data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };

    fetchStates();
  }, [selectedValues]);

  useEffect(() => {
    // Fetch cities based on selected state
    const fetchCities = async () => {
      if (selectedState) {
        try {
          const response = await axios.get(`cities-endpoint?state=${selectedState}`);
          const data = response.data;
          setCities(data);
          setSelectedCity("");
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    fetchCities();
  }, [selectedState]);
  debugger;
  return (
    <Grid container spacing={4}>
    
    <Grid item xs={1}>
    <FieldName>
    
      <label htmlFor="countryDropdown">Filter Type</label>
    </FieldName>
    </Grid>
    <Grid item xs={6}>
<FieldWrapper>
      <select
    style={{width:"60%",
    height:"30px",
    backgroundColor:"transparent",
  borderRadius:"8px",}}
        id="countryDropdown"
        value={selectedValues}
        onChange={(e) => setselectedValues(e.target.value)}
      >
        <option value="">Select a filter type...</option>
        {filtervalues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      </FieldWrapper>
</Grid>

     {(selectedValues ==="AI Region") ? (
        <div><FieldName>
      AI region type
          </FieldName>
          <select
            id="stateDropdown"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select a State...</option>
            {(selectedValues ==="AI Region")&&(<>
              <option value="AI">Inter provincial</option>
              <option value="AI"> Provincial</option>
              </>
            ) }
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      ):(null)}

      {selectedState && (
        <div>
          <label htmlFor="cityDropdown">Provincial ADA segment</label>
          <select
            id="cityDropdown"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select a City...</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCity && (
        <div>
          <p>Selected Location:</p>
          <p>Country: {countries.find((country) => country.id === selectedValues)?.name}</p>
          <p>State: {states.find((state) => state.id === selectedState)?.name}</p>
          <p>City: {cities.find((city) => city.id === selectedCity)?.name}</p>
        </div>
      )}
      </Grid>
  
  );
};

export default CascadingDropdown;
