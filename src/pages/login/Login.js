import React, {useState} from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContainerWithBG from "../../components/Containers/ContainerWithBG";
import styled from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";


const BGImage = require("../../assets/images/background.jpg");

const theme = createTheme();

const Login = () => {

  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  })

  return (
    <ThemeProvider theme={theme}>
       <ContainerWithBG>
       <CssBaseline />
       </ContainerWithBG>
    </ThemeProvider>
  )
}

export default Login