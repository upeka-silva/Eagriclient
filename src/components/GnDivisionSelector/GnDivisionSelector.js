import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldWrapper } from "../FormLayout/FieldWrapper";
import { FieldName } from "../FormLayout/FieldName";
import { get_ProvinceList } from "../../redux/actions/province/action";
import { get_DistrictListByProvinceId } from "../../redux/actions/district/action";
import { get_DsDivisionListByDistrictId } from "../../redux/actions/dsDivision/action";
import { get_GnDivisionListByDsDivisionId } from "../../redux/actions/gnDivision/action";

export default function GnDivisionSelector({ handleChange, formData }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dsDivisions, setDsDivisions] = useState([]);
  const [gnDivisions, setGnDivisions] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState({
    name: "",
    code: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: "",
    code: "",
  });
  const [selectedDsDevision, setSelectedDsDevision] = useState({
    name: "",
    code: "",
  });
  const [selectedGnDivision, setSelectedGnDevision] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    get_ProvinceList().then(({ dataList = [] }) => {
      console.log(dataList);
      setProvinces(dataList);
    });
  }, []);

  const getDistricts = (id) => {
    get_DistrictListByProvinceId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDistricts(dataList);
    });
  };
  const getDsDivisions = (id) => {
    get_DsDivisionListByDistrictId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setDsDivisions(dataList);
    });
  };
  const getGnDivisions = (id) => {
    get_GnDivisionListByDsDivisionId(id).then(({ dataList = [] }) => {
      console.log(dataList);
      setGnDivisions(dataList);
    });
  };

  return (
    <>
      <Grid item lg={2} sm={12} sx={12}>
        <FieldWrapper>
          <FieldName>Province</FieldName>
          <Autocomplete
            options={provinces}
            value={selectedProvince}
            getOptionLabel={(i) => `${i.code} - ${i.name}`}
            onChange={(event, value) => {
              setSelectedProvince(value);
              setSelectedDistrict({ code: "", name: "" });
              setSelectedDsDevision({ code: "", name: "" });
              setSelectedGnDevision({ code: "", name: "" });
              getDistricts(value.id);
            }}
            disableClearable
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
            fullWidth
          />
        </FieldWrapper>
      </Grid>
      <Grid item lg={2} sm={12} sx={12}>
        <FieldWrapper>
          <FieldName>District</FieldName>
          <Autocomplete
            disabled={selectedProvince?.id == null}
            options={districts}
            value={selectedDistrict}
            getOptionLabel={(i) => `${i.code} - ${i.name}`}
            disableClearable
            onChange={(event, value) => {
              setSelectedDistrict(value);
              setSelectedDsDevision({ code: "", name: "" });
              setSelectedGnDevision({ code: "", name: "" });
              getDsDivisions(value.id);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
            fullWidth
          />
        </FieldWrapper>
      </Grid>
      <Grid item lg={2} sm={12} sx={12}>
        <FieldWrapper>
          <FieldName>DS Division</FieldName>
          <Autocomplete
            disabled={selectedDistrict?.id == null}
            options={dsDivisions}
            value={selectedDsDevision}
            getOptionLabel={(i) => `${i.code} - ${i.name}`}
            onChange={(event, value) => {
              setSelectedDsDevision(value);
              setSelectedGnDevision({ code: "", name: "" });
              getGnDivisions(value.id);
            }}
            disableClearable
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
            fullWidth
          />
        </FieldWrapper>
      </Grid>
      <Grid item lg={2} sm={12} sx={12}>
        <FieldWrapper>
          <FieldName>GN Division</FieldName>
          <Autocomplete
            disabled={selectedDsDevision?.id == null}
            options={gnDivisions}
            value={formData?.gnDivisionDTO}
            getOptionLabel={(i) => `${i.code} - ${i.name}`}
            onChange={(event, value) => {
              handleChange(value, "gnDivisionDTO");
              setSelectedGnDevision(value);
            }}
            disableClearable
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
            fullWidth
          />
        </FieldWrapper>
      </Grid>
    </>
  );
}
