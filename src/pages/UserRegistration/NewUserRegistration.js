import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Colors } from "../../utils/constants/Colors";

const NewUserRegistration = () => {
  return (
    <Stack p={4} sx={{ overflowY: "scroll" }}>
      <Typography variant="h6">User Profile</Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="flex-end"
        my={2}
      >
        <Box>
          <Avatar
            alt="User Profile"
            src="/static/images/avatar/1.jpg"
            sx={{ width: "98px", height: "98px" }}
          />
        </Box>
        <Box>
          <Button variant="outlined" color="success">
            Upload a photo
          </Button>
        </Box>
      </Stack>
      <Box mt={4}>
        <Button variant="contained" color="success" startIcon={<EditIcon />}>
          Edit
        </Button>
      </Box>
      <Grid container spacing={2} mt={1} pr={22}>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldName>First Name</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="Prasad"
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldName>Last Name</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="Weerasooriya"
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldName>Email</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="Prasad95@gmail.com"
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldName>Phone Number</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="07612456782"
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={12}>
          <FieldWrapper>
            <FieldName>Address</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="No: 536/25, Main Road, Padro Street, Colombo."
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldName>Date of Birth</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="05/06/1995"
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldName>Gender</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="Male"
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={12}>
          <FieldWrapper>
            <FieldName>Nationality</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="Sri Lankan"
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldName>User Type</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="Farmer"
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <FieldName>User Role</FieldName>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${Colors.white}`,
                },
              }}
              placeholder="Veiwer"
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default NewUserRegistration;
