import {
  Box,
    CircularProgress,
    Grid,
    IconButton,
    TextField
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router";
  import { useSnackBars } from "../../context/SnackBarContext";
  import { useUserAccessValidation } from "../../hooks/authentication";
  import { handleAgriculturePost } from "../../redux/actions/extension/action";
  import { updateAgriculturePost } from "../../redux/actions/extension/action";
  import { DEF_ACTIONS } from "../../utils/constants/permission";
  import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
  import FormButtonGroup from "../../components/FormButtonGroup/FormButtonGroup";
  import { FieldName } from "../../components/FormLayout/FieldName";
  import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
  import { FormWrapper } from "../../../src/components/FormLayout/FormWrapper";
  import PageHeader from "../../components/PageHeader/PageHeader";
  import { PhotoCamera } from "@mui/icons-material";
  import { handleAgriculturePostImage } from "../../redux/actions/extension/action";
  
  
  const CreatePostForm = () => {
    useUserAccessValidation();
    const { state } = useLocation();
    const location = useLocation();
  
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState(state?.target || {});
 
    const [saving, setSaving] = useState(false);
  
    const { addSnackBar } = useSnackBars();
  
    const goBack = () => {
      navigate("/extension/create-Post");
    };

    const [imageUploading, setImageUploading] = useState(false);

    const [imageData, setImageData] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [selectedImage, setSelectedImage] = useState(
      state?.target?.presignedUrl || null
    );
    const [selectedImage1, setSelectedImage1] = useState(
      state?.target?.presignedUrl || null
    );
    const [selectedImage2, setSelectedImage2] = useState(
      state?.target?.presignedUrl || null
    );
    const [form, setForm] = useState();

    const handleChange = (value, target) => {
      setFormData((current = {}) => {
        let newData = { ...current };
        newData[target] = value;
        return newData;
      });
    };
  
    const resetForm = () => {
      if (state?.action === DEF_ACTIONS.EDIT) {
        setFormData(state?.target || {});
      } else {
        setFormData({});
      }
    };
    // const [selectedFile, setSelectedFile] = useState(null);
  
    const enableSave = () => {
      if (state?.action === DEF_ACTIONS.EDIT) {
        if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
          return true;
        }
      }
      if (
        state?.action === DEF_ACTIONS.ADD &&
        Object.keys(formData || {}).length > 0
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
        message: message || "Login Failed",
      });
      setSaving(false);
    };

    const handleFormSubmit = async () => {
      if (true) {
        setSaving(true);
  
        try {
          if (true) {
            console.log("forms",formData)

            const postForm = {...formData, images: imageData};

            const response = await handleAgriculturePost(
              postForm,
              onSuccess,
              onError
            );

            // if ((res.httpCode = "200 OK")) {
            //   const postImageUrl = res.payload.storedFileName;
            //   const originalFileName = res.payload.originalFileName;
            //   const prsignedUrl = res.payload.presignedUrl;
            //   const presignedExpDate = res.payload.expireDate;
            //   console.log("URL",postImageUrl)
  
            //   await updateAgriculturePost(
            //     {
            //       ...formData,
            //       id: response.payload?.id,
            //       postImageUrl: postImageUrl,
            //       originalFileName: originalFileName,
            //       presignedUrl: prsignedUrl,
            //       presignedExpDate: presignedExpDate,
            //     },
            //     onSuccess,
            //     onError
            //   );
            // }
            return;
          }
          setSaving(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const handleImageChange = async (event) => {
      const file = event.target.files[0];
      const file2 = event.target.name;
      setSelectedFile(file);
      console.log("img fun", file);
    
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          setSelectedImage(reader.result);
          
          // Logging FormData payload after it's fully populated
          const form = new FormData();
          form.append("file", file);
   
          setImageUploading(true);
          handleAgriculturePostImageUpload(form).then(data => {
            console.log("image response --------->");
            console.log(data.payload.storedFileName);
            setImageData([...imageData, {
              postImageUrl: data.payload.storedFileName,
              originalFileName: data.payload.originalFileName,
              presignedUrl: data.payload.presignedUrl,
              presignedExpDate: data.payload.expireDate,
            }]);
            setImageUploading(false);
          });

          
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedImage(null);
        setForm(null);
      }
    };
    
  
  
    const handleAgriculturePostImageUpload = async (file) => {
      try {
        const response = await handleAgriculturePostImage(file,
          () => onSuccess("Success"), // Pass onSuccess as a callback function
          onError
        );
    
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    
  
  
  
  
    // const getPathName = () => {
    //   return location.pathname === "/" || !location.pathname
    //     ? ""
    //     : location.pathname;
    // };
  
    return (
      <FormWrapper>
        
        <PageHeader
          saving={saving}
          state={state}
          formName="Agriculture Posts"
          goBack={goBack}
        />
       <FormButtonGroup
          state={state}
          DEF_ACTIONS={DEF_ACTIONS}
          saving={saving}
          enableSave={enableSave}
          handleFormSubmit={handleFormSubmit}
          resetForm={resetForm}
        />
  
        <Grid
          container
          sx={{
            margin: "15px",
            width: "97%",
            borderRadius: "5px",
          }}
        >
          <Grid item sm={3} md={3} lg={3}>
            <FieldWrapper>
              <FieldName>Post Code</FieldName>
              <TextField
                name="Code"
                id="Code"
                value={formData?.code || ""}
                fullWidth
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT
                }
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "code")
                }
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                inputProps={{ style: { textTransform: "uppercase" } }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={4} md={4} lg={12}>
            <FieldWrapper>
              <FieldName>English Content</FieldName>
              <TextField
                name="contentEng"
                id="contentEng"
                value={formData?.contentEng || ""}
                fullWidth
                multiline
                rows={6}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "contentEng")
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Sinhala Content</FieldName>
              <TextField
                name="contentSin"
                id="contentSin"
                value={formData?.contentSin || ""}
                fullWidth
                multiline
                rows={6} 
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "contentSin")
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
          <Grid item sm={6} md={6} lg={6}>
            <FieldWrapper>
              <FieldName>Tamil Content</FieldName>
              <TextField
                name="contentTam"
                id="contentTam"
                value={formData?.contentTam || ""}
                fullWidth
                multiline
                rows={6}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "contentTam")
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
          <Grid item sm={12} md={12} lg={12}>
            <FieldWrapper>
              <FieldName>Tags</FieldName>
              <TextField
                name="tags"
                id="tags"
                value={formData?.tags || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "tags")
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
            <Grid container>
              <Grid item sm={3} md={3} lg={9}>
                {!imageUploading ? <FieldWrapper>
                  <FieldName>Select Image 01</FieldName>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="file"
                      name=""
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
                          width: "320px",
                          height: "250px",
                          border: "1px solid #7a879d",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgb(46,125,50,0.1)",
                        }}
                      >
                        <IconButton component="span" style={{ zIndex: "2" }}>
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      {selectedImage && (
                        <div
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            backgroundColor: "rgb(46,125,50,0.1)",
                            width: "320px",
                            height: "250px",
                            borderRadius: "8px",
                          }}
                        >
                          <img
                            src={selectedImage}
                            alt="Profile"
                            style={{
                              width: "320px",
                              height: "250px",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}
                    </Box>
                  </div>
                </FieldWrapper> : <CircularProgress />}
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item lg={4}>
            <Grid container>
              <Grid item sm={3} md={3} lg={9}>
                <FieldWrapper>
                  <FieldName>Select Image 02</FieldName>
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
                          width: "320px",
                          height: "250px",
                          border: "1px solid #7a879d",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgb(46,125,50,0.1)",
                        }}
                      >
                        <IconButton component="span" style={{ zIndex: "2" }}>
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      {selectedImage && (
                        <div
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            backgroundColor: "rgb(46,125,50,0.1)",
                            width: "320p",
                            height: "250px",
                            borderRadius: "8px",
                          }}
                        >
                          <img
                            src={selectedImage}
                            alt="Profile"
                            style={{
                              width: "320p",
                              height: "250px",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}
                    </Box>
                  </div>
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4}>
            <Grid container>
              <Grid item sm={3} md={3} lg={9}>
                <FieldWrapper>
                  <FieldName>Select Image 03</FieldName>
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
                          width: "320px",
                          height: "250px",
                          border: "1px solid #7a879d",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgb(46,125,50,0.1)",
                        }}
                      >
                        <IconButton component="span" style={{ zIndex: "2" }}>
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      {selectedImage && (
                        <div
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            backgroundColor: "rgb(46,125,50,0.1)",
                            width: "320px",
                            height: "250px",
                            borderRadius: "8px",
                          }}
                        >
                          <img
                            src={selectedImage}
                            alt="Profile"
                            style={{
                              width: "320px",
                              height: "250px",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}
                    </Box>
                  </div>
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </FormWrapper>
    );
  };
  
  export default CreatePostForm;
  