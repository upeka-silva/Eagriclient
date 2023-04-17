import { Grid, TextField } from "@mui/material";
import React from "react";

const InterProvinceForm = ({
  selectedInterProvince = {
    interProvinceCode: "",
    name: "",
  },
  updateInterProvince = (_value, _key) => {},
}) => {
  const handleChange = (e) => {
    updateInterProvince(e?.target?.value, e?.target?.name);
  };
  return (
    <div>
      <TextField
      variant="outlined"
        fullWidth
        label="Name of the inter provincial area"
        id="interProvinceCode"
        name="interProvinceCode"
        value={selectedInterProvince?.interProvinceCode}
        onChange={handleChange}
        size="small"
        TextField prop sx={{width: 500}} 
      />
    </div>
  );
};

export default InterProvinceForm;
