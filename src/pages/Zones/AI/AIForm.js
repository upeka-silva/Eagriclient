import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "@mui/material/Card";
import { Button, TextField } from "@mui/material";
import theme from "../../../utils/theme/theme.json";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const AIForm = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    regionId: "",
    description: "",
    parentType: "",
    parentValue: "",
    ascRegionId: "",
  })

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((current) => ({
      ...current,
      [e?.target?.name]: e?.target?.value || "",
    }));
  }

  const handleReset = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      regionId: "",
      description: "",
      parentType: "",
      parentValue: "",
      ascRegionId: "",
    }));
  };

  const onBack = () => {
    navigation("/zone/ai-region")
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <FromCard>
    <ActionWrapper style={{justifyContent: "flex-start"}}>
      <Button startIcon={<KeyboardBackspaceIcon />} style={{ color: `${theme.schemes.light.onBack}` }} onClick={onBack}>
      Back to table
      </Button>
    </ActionWrapper>
    <FormCardWrapper>
      <FormTitle>Register AI Region</FormTitle>
      <FieldWrapper>
        <TextField
          variant="outlined"
          fullWidth
          label="Region ID"
          id="regionId"
          name="regionId"
          value={formData.regionId}
          onChange={handleChange}
          size="small"
          prop
          sx={{ maxWidth: 500 }}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Name"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          size="small"
          prop
          sx={{ maxWidth: 500 }}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Parent Type"
          id="parentType"
          name="parentType"
          value={formData.parentType}
          onChange={handleChange}
          size="small"
          prop
          sx={{ maxWidth: 500 }}
        />
         <TextField
          variant="outlined"
          fullWidth
          label="Parent Value"
          id="parentValue"
          name="parentValue"
          value={formData.parentValue}
          onChange={handleChange}
          size="small"
          prop
          sx={{ maxWidth: 500 }}
        />
         <TextField
          variant="outlined"
          fullWidth
          label="ASC Region Id"
          id="ascRegionId"
          name="ascRegionId"
          value={formData.ascRegionId}
          onChange={handleChange}
          size="small"
          prop
          sx={{ maxWidth: 500 }}
        />
      </FieldWrapper>
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
  )
};

export default AIForm;

const FromCard = styled(Card).attrs((props) => ({}))`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  margin: 10px;
`;

const FormCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.p`
  text-align: center;
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
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
