import React from "react";
import styled from "styled-components";
import {
  Card,
  Box,
  TextField,
  Button,
  Grid,
  Link,
  Checkbox,
  Typography,
} from "@mui/material/";


const EmailVerificationPage = () => {
  return (
    <CustomCard>
      <p style={{textAlign: "center", marginBottom: "20px"}}>
        Please verify your email address for <span style={{color: "green"}}>email@gmail.com</span> by
        clicked the button below
      </p>
      <Box
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Typography>Please verify your email address for <p>email@gmil.com</p>by clicked the button below</Typography> */}
        <ButtonContainer>
          <Button variant="contained" type="submit" fullWidth color="primary">
            Verify Your Email Address
          </Button>
        </ButtonContainer>
      </Box>
    </CustomCard>
  );
};

export default EmailVerificationPage;

const CustomCard = styled(Card).attrs((props) => ({
  sx: { maxWidth: 480 },
}))`
  padding: 24px 24px;
  margin: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
