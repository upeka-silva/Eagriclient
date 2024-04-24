import React, { useEffect, useState } from "react";
import { Avatar, Typography, Grid, Paper, Divider } from "@mui/material";
import { getUserProfile } from "../../redux/actions/users/action";
import { Fonts } from "../../utils/constants/Fonts";
import { stringAvatar } from "../../utils/helpers/stringUtils";

const ProfileView = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    profile();
  }, []);

  const profile = () => {
    getUserProfile()
      .then((response) => {
        console.log({ response });
        setFormData(response?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ flexGrow: 1, padding: "16px", fontFamily: Fonts.fontStyle3 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            style={{
              padding: "24px",
              textAlign: "center",
              borderRadius: "20px",
              color: "#333",
              marginBottom: "24px",
              background: "#fff",
              boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease-in-out",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            {formData?.profilepic ? (
              <Avatar
                alt="Profile Image"
                src={formData?.profilepic}
                sx={{
                  width: "96px",
                  height: "96px",
                  margin: "0 auto",
                  marginBottom: "16px",
                  border: "4px solid #fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            ) : (
              <Avatar
                style={{
                  width: "96px",
                  height: "96px",
                  margin: "0 auto",
                  marginBottom: "16px",
                  fontSize: "30px",
                }}
                {...stringAvatar(
                  formData?.firstName
                    ? formData?.firstName + " " + formData?.lastName
                    : "Sample User",
                  "ProfileImgSmall"
                )}
              />
            )}
            <Typography
              variant="h5"
              gutterBottom
              style={{ marginBottom: "8px" }}
            >
              {formData?.firstName} {formData?.lastName}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginBottom: "8px" }}
            >
              @{formData?.username}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginBottom: "24px" }}
            >
              {formData?.email}
            </Typography>
            <Divider style={{ margin: "16px 0", backgroundColor: "#ddd" }} />
            <Typography fontSize={'17px'} fontWeight={'bold'} variant="subtitle1" style={{ marginBottom: "8px" }}>
              Personal Information
            </Typography>
            <Typography variant="body1" gutterBottom>
            <b>Date of Birth:</b> {new Date(formData?.dateOfBirth).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Gender:</b> {formData?.gender}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Language:</b> {formData?.userLanguage}
            </Typography>
            <Divider style={{ margin: "16px 0", backgroundColor: "#ddd" }} />
            <Typography fontSize={'17px'} fontWeight={'bold'} variant="subtitle1" style={{ marginBottom: "8px" }}>
              Contact Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Address:</b> {formData?.address1} {formData?.address2}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>City:</b> {formData?.city}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Phone Number:</b> {formData?.phone}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileView;
