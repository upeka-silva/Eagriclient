import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  Box,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  getUserProfile,
  handleUserProfile,
  updateUserPartially,
  updateUsers,
} from "../../redux/actions/users/action";
import { Fonts } from "../../utils/constants/Fonts";
import { stringAvatar } from "../../utils/helpers/stringUtils";
import { useSnackBars } from "../../context/SnackBarContext";
import PasswordResetDialog from "./PasswordResetDialog";
import { FormWrapper } from "../Temp-Farmer/Farmer";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Navigate, useLocation } from "react-router";
import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { PhotoCamera } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { format } from "d3";
import { useTranslation } from "react-i18next";

const ProfileView = () => {
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const { addSnackBar } = useSnackBars();
  const [formDataD, setFormDataD] = useState({});
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const dateAdapter = new AdapterDayjs();
  const [form, setForm] = useState();

  const { state } = useLocation();
  const { t } = useTranslation();

  console.log({ formData });

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

  const handleChange = (value, target) => {
    setFormDataD((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const handleChangeMainForm = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const onClose = () => {
    setOpen(false);
    setFormDataD(null);
  };

  const resetPassword = () => {
    setOpen(true);
  };

  const resetForm = () => {
    setFormDataD(null);
  };

  const goBack = () => {
    Navigate("/main-dashboard");
  };

  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (
      state?.action === DEF_ACTIONS.ADD &&
      Object.keys(formData || {}).length > 1
    ) {
      return true;
    }

    return false;
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Update Failed",
    });
    setSaving(false);
  };

  const handleUserProfilePicture = async (id) => {
    try {
      const response = await handleUserProfile(
        id,
        form,
        onSuccess("Success"),
        onError
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);

      console.log({ form });

      let date = new Date(formData.dateOfBirth);
      let timestamp = date.getTime();
      if (formData?.id) {
        await updateUserPartially(
          {
            ...formData,
            dateOfBirth: timestamp || null,
          },
          onSuccess,
          onError
        );
      }

      if (form && formData?.id) {
        const res = await handleUserProfilePicture(formData?.id);
        console.log("update");
        if ((res.httpCode = "200 OK")) {
          const storedFileName = res.payload.storedFileName;
          const originalFileName = res.payload.originalFileName;
          const prsignedUrl = res.payload.presignedUrl;
          const presignedExpDate = res.payload.expireDate;

          await updateUserPartially(
            {
              ...formData,
              dateOfBirth: timestamp || null,
              storedFileName: storedFileName,
              originalFileName: originalFileName,
              profilePictureUrl: prsignedUrl,
              presignedExpDate: presignedExpDate,
            },
            onSuccess,
            onError
          );
        }
      }

      // await updateUsers(
      //   {
      //     ...formData,
      //     dateOfBirth: dob.valueOf() || null,
      //     //userRoleDTOs: selectedRoles,

      //   },
      //   onSuccess,
      //   onError
      // );
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const form = new FormData();
    form.append("file", file);
    setForm(form);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <>
        <PageHeader
          //goBack={goBack}
          saving={saving}
          state={state}
          formName="userProfile"
          // formName={
          //   formData?.firstName
          //     ? formData?.firstName + " " + formData?.lastName
          //     : "Sample User"
          // }
        />

        <Grid display={"flex"}>
          <FormButtonGroup
            state={state}
            DEF_ACTIONS={DEF_ACTIONS}
            saving={saving}
            enableSave={enableSave}
            handleFormSubmit={handleFormSubmit}
            resetForm={resetForm}
          />

          <Grid ml={1} mt={1}>
            <Button
              size="small"
              variant="contained"
              onClick={resetPassword}
              color="success"
            >
              {t("action.resetPassword")}
            </Button>
          </Grid>
        </Grid>

        <PasswordResetDialog
          onOpen={open}
          onClose={onClose}
          handleChange={handleChange}
          data={formDataD}
          onReset={resetForm}
        />
        <Grid
          container
          md={12}
          sx={{
            margin: "8px",
            width: "97%",
            borderRadius: "5px",
          }}
          flex={"flex"}
        >
          <Grid item sm={3} md={3} lg={2}>
            <FieldWrapper>
              <FieldName> {t("userProfilePage.selectYourProfilePicture")}</FieldName>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="profile-picture-input"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ position: "relative" }}
                >
                  <label
                    htmlFor="profile-picture-input"
                    style={{
                      width: "140px",
                      height: "140px",
                      border: "1px solid #7a879d",
                      borderRadius: "70px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton component="span" style={{ zIndex: "2" }}>
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  {selectedImage ? (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        backgroundColor: "rgb(46,125,50,0.1)",
                        width: "140px",
                        height: "140px",
                        borderRadius: "70px",
                      }}
                    >
                      <img
                        src={selectedImage}
                        alt="Profile"
                        style={{
                          width: "140px",
                          height: "140px",
                          borderRadius: "70px",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        backgroundColor: "rgb(46,125,50,0.1)",
                        width: "140px",
                        height: "140px",
                        borderRadius: "70px",
                      }}
                    >
                      <img
                        src={formData?.profilePictureUrl}
                        alt="Profile"
                        style={{
                          width: "140px",
                          height: "140px",
                          borderRadius: "70px",
                        }}
                      />
                    </div>
                  )}
                </Box>
              </div>
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={9}>
            <Grid
              container
              sx={{
                width: "100%",
                borderRadius: "5px",
              }}
            >
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>{t("userProfilePage.firstName")}</FieldName>
                  <TextField
                    name="firstName"
                    id="firstName"
                    value={formData?.firstName || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChangeMainForm(e?.target?.value || "", "firstName")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>{t("userProfilePage.lastName")}</FieldName>
                  <TextField
                    name="lastName"
                    id="lastName"
                    value={formData?.lastName || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChangeMainForm(e?.target?.value || "", "lastName")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>{t("userProfilePage.dateOfBirth")}</FieldName>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="dob"
                      id="dob"
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      slotProps={{ textField: { size: "small", error: false } }}
                      value={
                        formData.dateOfBirth
                          ? dateAdapter.date(new Date(formData.dateOfBirth))
                          : null
                      }
                      onChange={(newValue) =>
                        handleChangeMainForm(newValue || "", "dateOfBirth")
                      }
                      in="DD-MM-YYYY"
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FieldWrapper>
              </Grid>
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>{t("userProfilePage.userName")}</FieldName>
                  <TextField
                    name="username"
                    id="username"
                    value={formData?.username || ""}
                    fullWidth
                    disabled={true}
                    onChange={(e) =>
                      handleChangeMainForm(e?.target?.value || "", "username")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>{t("userProfilePage.email")}</FieldName>
                  <TextField
                    name="email"
                    id="email"
                    value={formData?.email || ""}
                    fullWidth
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChangeMainForm(e?.target?.value || "", "email")
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                    }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item lg={4}></Grid>
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>{t("userProfilePage.gender")}</FieldName>
                  <Select
                    name="gender"
                    id="gender"
                    value={formData?.gender || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChangeMainForm(e?.target?.value || "", "gender")
                    }
                    sx={{
                      borderRadius: "8px",
                    }}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                    <MenuItem value={"O"}>Other</MenuItem>
                  </Select>
                </FieldWrapper>
              </Grid>
              <Grid item lg={4}>
                <FieldWrapper>
                  <FieldName>{t("userProfilePage.language")}</FieldName>
                  <Select
                    name="userLanguage"
                    id="userLanguage"
                    value={formData?.userLanguage || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChangeMainForm(
                        e?.target?.value || "",
                        "userLanguage"
                      )
                    }
                    sx={{
                      borderRadius: "8px",
                    }}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value={"SINHALA"}>Sinhala</MenuItem>
                    <MenuItem value={"TAMIL"}>Tamil</MenuItem>
                    <MenuItem value={"ENGLISH"}>English</MenuItem>
                  </Select>
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>

      {/* <Grid container justifyContent="center" alignItems="center" spacing={3}>
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
            <Typography
              fontSize={"17px"}
              fontWeight={"bold"}
              variant="subtitle1"
              style={{ marginBottom: "8px" }}
            >
              Personal Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Date of Birth:</b>{" "}
              {new Date(formData?.dateOfBirth).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Gender:</b> {formData?.gender}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Language:</b> {formData?.userLanguage}
            </Typography>
            <Divider style={{ margin: "16px 0", backgroundColor: "#ddd" }} />
            <Typography
              fontSize={"17px"}
              fontWeight={"bold"}
              variant="subtitle1"
              style={{ marginBottom: "8px" }}
            >
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
            <Button
              variant="contained"
              onClick={resetPassword}
              color="primary"
              style={{
                marginTop: "24px",
              }}
            >
              Reset Password
            </Button>
            <PasswordResetDialog
              onOpen={open}
              onClose={onClose}
              handleChange={handleChange}
              data={formDataD}
              onReset={resetForm}
            />
          </Paper>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default ProfileView;
