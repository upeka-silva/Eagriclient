import React, {useState, useEffect} from 'react'
import theme from "../../../utils/theme/theme.json";
import styled from "styled-components";
import Card from "@mui/material/Card";
import { Button, TextField } from "@mui/material";


const ProvinceAreaForm = () => {
  const [formData, setFormData] = useState({
    name: ""
  })

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
    setFormData(prevFormData => ({
        ...prevFormData,
        name: '',
    }))
}


  return (
    <FromCard>
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
      <Button style={{ color: `${theme.schemes.light.reset}` }} type="reset" onClick={handleReset}>
        Reset
      </Button>
      <Button type="submit">Create</Button>
    </ButtonContainer>
  </FromCard>
  )
}

export default ProvinceAreaForm

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
text-align: center;
`

const FormTitle = styled.p`
  font-size: 25px;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: right;
margin-top: 480px;
`