import React, { useState, useEffect } from "react";
import theme from "../../../utils/theme/theme.json";
import styled from "styled-components";
import Card from "@mui/material/Card";
import { Button, TextField } from "@mui/material";

const ASCForm = () => {
  const [formData, setFormData] = useState({
    ascCode: "",
    ascName: "",
    districtId: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setFormData((current) => ({
      ...current,
      [e?.target?.name]: e?.target?.value || "",
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleReset = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      ascCode: "",
      ascName: "",
      districtId: "",
    }));
  };
  return (
    <FromCard>
    <FormCardWrapper>
      <FormTitle>Register ASC Area</FormTitle>
      <FieldWrapper>
      <TextField
        variant="outlined"
        fullWidth
        label="Asc area code"
        id="ascCode"
        name="ascCode"
        value={formData.ascCode}
        onChange={handleChange}
        size="small"
        prop
        sx={{ maxWidth: 500 }}
      />
       <TextField
        variant="outlined"
        fullWidth
        label="Area name"
        id="ascName"
        name="ascName"
        value={formData.ascName}
        onChange={handleChange}
        size="small"
        prop
        sx={{ maxWidth: 500 }}
      />
       <TextField
        variant="outlined"
        fullWidth
        label="District Id"
        id="districtId"
        name="districtId"
        value={formData.districtId}
        onChange={handleChange}
        size="small"
        prop
        sx={{ maxWidth: 500 }}
      />
      </FieldWrapper>
     
    </FormCardWrapper>
    <ButtonContainer>
      <Button style={{ color: `${theme.schemes.light.reset}` }} type="reset" onClick={handleReset}>
        Reset
      </Button>
      <Button type="submit">Create</Button>
    </ButtonContainer>
  </FromCard>
  )
};

export default ASCForm;


const FromCard = styled(Card).attrs((props) => ({
    sx: { height: "100%" },
  }))`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 10px;
    margin: 10px;
  `;
  
  const FormCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  `
  
  const FormTitle = styled.p`
    text-align: center;
    font-size: 25px;
    font-weight: 500;
  `;
  
  const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-top: 380px;
  `

  const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px
  `
  
