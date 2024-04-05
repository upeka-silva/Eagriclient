import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { FieldWrapper } from "../FormLayout/FieldWrapper";
import { FieldName } from "../FormLayout/FieldName";

function SearchBox({ handleSearch }) {

  const [searchText, setSearchText] = useState("");

  const onSearch = () => {
    handleSearch(searchText);
  };

  return (
    <>
      <Grid item>
        <FieldWrapper>
          <FieldName>.</FieldName>

          <TextField
            name="cropArea"
            id="cropArea"
            value={searchText}
            fullWidth
            //disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) => {
              // const value = parseFloat(e.target.value) || 0;
              setSearchText(e.target.value);
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
              },
            }}
            size="small"
          />
        </FieldWrapper>
      </Grid>

      <Grid item>
        <FieldWrapper>
          <Button
            color="success"
            variant="contained"
            size="small"
            onClick={onSearch}
            sx={{ marginTop: "40px" }}
          >
            Search
          </Button>
        </FieldWrapper>
      </Grid>
    </>
  );
}

export default SearchBox;
