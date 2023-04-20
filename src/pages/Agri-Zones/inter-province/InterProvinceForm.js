import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import theme from "../../../utils/theme/theme.json";
import styled from "styled-components";
import Card from "@mui/material/Card";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";

const InterProvinceForm = () => {

  const navigation = new useNavigate()

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
    navigation("/agri-zone/inter-province-area")
  }

  return (
    <FromCard>
      <ActionWrapper style={{justifyContent: "flex-start"}}>
        <Button startIcon={<KeyboardBackspaceIcon />} style={{color: `${theme.schemes.light.onBack}`}} onClick={onBack}>Back to table</Button>
      </ActionWrapper>

      <FormCardWrapper>
        <FormTitle>Register Inter Province Area</FormTitle>
        <TextField
          variant="outlined"
          fullWidth
          label="Name of the inter provincial area"
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
        <Button>Create</Button>
        <Button
          style={{ color: `${theme.schemes.light.reset}` }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </ButtonContainer>
    </FromCard>
  );
};

export default InterProvinceForm;

const FromCard = styled(Card).attrs((props) => ({}))`
  display: flex;
  display: block;
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
align-items: center;
color: gray;
`
