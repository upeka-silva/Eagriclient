import { Grid, MenuItem, Select, TextField, colors } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import { FieldName } from "../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useSnackBars } from "../../context/SnackBarContext";
import { useUserAccessValidation } from "../../hooks/authentication";
import {
  handleUserType,
  updateUserType,
} from "../../redux/actions/userType/action";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { Fonts } from "../../utils/constants/Fonts";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { FormLabel, Box } from "@mui/material";
import { getUserProfile } from "../../redux/actions/users/action";

const ProfileView = () => {

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    profile();
  }, []);

  const profile =  () => {
    getUserProfile().then((response)=>{
      setFormData(response.data);
    }).catch((e) => {
      console.log(e);
  });
};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle3}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <FormWrapper style={{backgroundColor: 'white' }}>
        <PageHeader formName="User Profile" />
        <Grid container spacing={3} margin={3}>
        <img
           src={formData?.profilePictureUrl}
           alt=""
           style={{
             width: "146px",
             height: "146px",
             borderRadius: "70px",
           }}
         />             
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>First name :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.firstName||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>Last name :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.lastName||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>Date of Birth :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.dateOfBirth||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>Username :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.username||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>Email :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.email ||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>Gender :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.gender||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>Language :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.userLanguage||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>User Type :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.userTypeDTO||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>Address :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.address1||""} { " "} {formData?.address2 ||""}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>City :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.city}</FormLabel>
          </Grid>
        </Grid>
        <Grid container spacing={3} margin={0.5}>
          <Grid item xs="auto">
            <FormLabel><b>Phone Number :</b></FormLabel>
          </Grid>
          <Grid item xs={6}>
            <FormLabel>{formData?.phone || ""}</FormLabel>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default ProfileView;
