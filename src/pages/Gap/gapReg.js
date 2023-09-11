import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import TabPanel from "./gapRegTabs";

function gapReg() {
  return (
    <FormWrapper>
      <FormHeader>New GAP Request</FormHeader>

      <FieldWrapper>
        <TextField
          id="outlined-number"
          label="GAP Request ID"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Select Farmer"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Farmer NIC"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button variant="contained" startIcon={<AddIcon />}>
          ADD NEW FARMER
        </Button>
      </FieldWrapper>

      <TabPanel />
    </FormWrapper>
  );
}

export default gapReg;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0px;
`;

const FormHeader = styled.p`
  font-size: 20px;
  font-weight: bold;
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
`;
