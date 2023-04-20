import React, { useState, useEffect } from "react";
import theme from "../../utils/theme/theme.json";
import styled from "styled-components";
import Card from "@mui/material/Card";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";

const SoilForm = () => {
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    soilTypeId: "",
    description: "",
    Texture: "",
    pHLower: "",
    pHUpper: "",
    organicMatterContent: "",
    nitrogenPercentage: "",
    phosphorusPercentage: "",
    potassiumPercentage: "",
    calcium: "",
    magnesium: "",
    sulfur: "",
    iron: "",
    manganese: "",
    zinc: "",
    copper: "",
    boron: "",
    waterHoldingCapacity: "",
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
      soilTypeId: "",
      description: "",
      texture: "",
      pHLower: "",
      pHUpper: "",
      organicMatterContent: "",
      nitrogenPercentage: "",
      phosphorusPercentage: "",
      potassiumPercentage: "",
      calcium: "",
      magnesium: "",
      sulfur: "",
      iron: "",
      manganese: "",
      zinc: "",
      copper: "",
      boron: "",
      waterHoldingCapacity: "",
    }));
  };

  const onBack = () => {
    navigation("/soil");
  };

  return (
    <FromCard>
      <ActionWrapper style={{justifyContent: "flex-start"}}>
        <Button startIcon={<KeyboardBackspaceIcon />} style={{ color: `${theme.schemes.light.onBack}` }} onClick={onBack}>
          Back to table
        </Button>
      </ActionWrapper>
      <FormCardWrapper>
        <FormTitle>Soil Registration</FormTitle>
        <FieldGroup>
          <FieldWrapper>
            <TextField
              variant="outlined"
              fullWidth
              label="Soil Type Id"
              id="soilTypeId"
              name="soilTypeId"
              value={formData.soilTypeId}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Soil Name"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Texture"
              id="texture"
              name="texture"
              value={formData.texture}
              onChange={handleChange}
              size="small"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              fullWidth
              label="PH Lower"
              id="pHLower"
              name="pHLower"
              value={formData.pHLower}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="PH Upper"
              id="pHUpper"
              name="pHUpper"
              value={formData.pHUpper}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Organic Matter Content"
              id="organicMatterContent"
              name="organicMatterContent"
              value={formData.organicMatterContent}
              onChange={handleChange}
              size="small"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              fullWidth
              label="Nitrogen Percentage"
              id="nitrogenPercentage"
              name="nitrogenPercentage"
              value={formData.nitrogenPercentage}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Phosphorus Percentage"
              id="phosphorusPercentage"
              name="phosphorusPercentage"
              value={formData.phosphorusPercentage}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Potassium Percentage"
              id="potassiumPercentage"
              name="potassiumPercentage"
              value={formData.potassiumPercentage}
              onChange={handleChange}
              size="small"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              fullWidth
              label="Calcium"
              id="calcium"
              name="calcium"
              value={formData.calcium}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Magnesium"
              id="magnesium"
              name="magnesium"
              value={formData.magnesium}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Sulfur"
              id="sulfur"
              name="sulfur"
              value={formData.sulfur}
              onChange={handleChange}
              size="small"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              fullWidth
              label="Iron"
              id="iron"
              name="iron"
              value={formData.iron}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Manganese"
              id="manganese"
              name="manganese"
              value={formData.manganese}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Zinc"
              id="zinc"
              name="zinc"
              value={formData.zinc}
              onChange={handleChange}
              size="small"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              fullWidth
              label="Copper"
              id="copper"
              name="copper"
              value={formData.copper}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Boron"
              id="boron"
              name="boron"
              value={formData.boron}
              onChange={handleChange}
              size="small"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Water Holding Capacity"
              id="waterHoldingCapacity"
              name="waterHoldingCapacity"
              value={formData.waterHoldingCapacity}
              onChange={handleChange}
              size="small"
            />
          </FieldWrapper>
        </FieldGroup>
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

export default SoilForm;

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

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const BackWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
