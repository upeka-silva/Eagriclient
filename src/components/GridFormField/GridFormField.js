import {
  Autocomplete,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { FieldWrapper } from "../FormLayout/FieldWrapper";
import { FieldName } from "../FormLayout/FieldName";
import { Colors } from "../../utils/constants/Colors";
import { FORM_CONTROL_TYPE } from "./FieldType";

const GridFormField = ({
  smSize,
  mdSize,
  lgSize,
  fieldType,
  xlSize = null,
  fieldName,
  formValue,
  ctrlId,
  ctrlName,
  ctrlType,
  disabled,
  required,
  error,
  menuItems = [],
  optionList = [],
  getOptionLabelValue,
  handleChange,
}) => {

  return (
    <Grid item sm={smSize} md={mdSize} lg={lgSize}>
      <FieldWrapper>
        {fieldType === FORM_CONTROL_TYPE.TEXTNUM && (
          <>
            <FieldName>{fieldName}</FieldName>
            <TextField
              name={ctrlName}
              id={ctrlId}
              type={ctrlType}
              value={formValue}
              disabled={disabled}
              onChange={handleChange}
              error={error}
              required={required}
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
            />
          </>
        )}
        {fieldType === FORM_CONTROL_TYPE.SELECTION && (
          <FormControl fullWidth>
            <FieldName>{fieldName}</FieldName>
            <Select
              name={ctrlName}
              id={ctrlId}
              value={formValue}
              error={error}
              disabled={disabled}
              onChange={handleChange}
              fullWidth
              sx={{
                borderRadius: "8px",
                backgroundColor: `${Colors.white}`,
              }}
              size="small"
            >
              {menuItems.map((item, key) => {
                return (
                  <MenuItem key={key} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        {fieldType === FORM_CONTROL_TYPE.AUTOCOMPLETE && (
          <FormControl fullWidth>
            <FieldName>{fieldName}</FieldName>
            <Autocomplete
              name="gnDivisionDTO"
              id="gnDivisionDTO"
              disabled={disabled}
              options={optionList || []}
              value={formValue}
              getOptionLabel={getOptionLabelValue}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              size="small"
              renderInput={(params) => (
                <>
                  <TextField error={{ error }} {...params} size="small" />
                </>
              )}
            />
          </FormControl>
        )}
      </FieldWrapper>
    </Grid>
  );
};

export default GridFormField;
