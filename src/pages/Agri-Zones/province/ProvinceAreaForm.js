import React, { useState, useEffect } from "react";
import theme from "../../../utils/theme/theme.json";
import styled from "styled-components";
import Card from "@mui/material/Card";
import { Button, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const ProvinceAreaForm = () => {
  const navigation = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
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
      name: "",
    }));
  };

  const onBack = () => {
    navigation("/agri-zone/province-area")
  }

  return (
    <FromCard>
      <BackWrapper onClick={onBack}>
        <KeyboardBackspaceIcon
          style={{ color: `${theme.schemes.light.onBack}` }}
        />
        <Button style={{ color: `${theme.schemes.light.onBack}` }}>
          Back to table
        </Button>
      </BackWrapper>
      <FormCardWrapper>
        <FormTitle>Register Province Area</FormTitle>
        <TextField
          variant="outlined"
          fullWidth
          label="Name of the provincial area"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          size="small"
          prop
          sx={{ maxWidth: 500 }}
        />
      </FormCardWrapper>
      <ButtonContainer>
        <Button type="submit">Create</Button>
        <Button
          style={{ color: `${theme.schemes.light.reset}` }}
          type="reset"
          onClick={handleReset}
        >
          Reset
        </Button>
      </ButtonContainer>
    </FromCard>
  );
};

export default ProvinceAreaForm;

const FromCard = styled(Card).attrs((props) => ({}))`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  margin: 10px;
`;

const FormCardWrapper = styled.div`
  text-align: center;
`;

const FormTitle = styled.p`
  font-size: 25px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

const BackWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: gray;
`;
