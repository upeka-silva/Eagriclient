import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../context/SnackBarContext";
import { useUserAccessValidation } from "../../hooks/authentication";
import {
  UpdateAgriculturePostImage,
  handleAgriculturePost,
} from "../../redux/actions/extension/action";
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
import { Fonts } from "../../utils/constants/Fonts";

const CreatePostForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();

  console.log({ state });

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});

  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/extension/create-Post");
  };

  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploading2, setImageUploading2] = useState(false);
  const [imageUploading3, setImageUploading3] = useState(false);

  const [imageData, setImageData] = useState([]);

  console.log({ imageData });

  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState(
    (formData?.images &&
      formData.images.length > 0 &&
      formData.images[0]?.presignedUrl) ||
      null
  );

  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedImage2, setSelectedImage2] = useState(
    (formData?.images &&
      formData.images.length > 1 &&
      formData.images[1]?.presignedUrl) ||
      null
  );

  const [selectedFile3, setSelectedFile3] = useState();
  const [selectedImage3, setSelectedImage3] = useState(
    (formData?.images &&
      formData.images.length > 2 &&
      formData.images[2]?.presignedUrl) ||
      null
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
  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (
        JSON.stringify(state?.target || {}) !== JSON.stringify(formData) ||
        selectedFile != null ||
        selectedFile2 != null ||
        selectedFile3 != null
      ) {
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
    if (enableSave()) {
      setSaving(true);
      try {
        if (true) {
          const postForm = { ...formData, images: imageData };
          if (formData?.id) {
            await updateAgriculturePost(postForm, onSuccess, onError);
          } else {
            await handleAgriculturePost(postForm, onSuccess, onError);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const file2 = event.target.name;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);

        const form = new FormData();
        form.append("file", file);

        setImageUploading(true);

        if (state?.action === "ADD") {
          handleAgriculturePostImageUpload(form).then((data) => {
            setImageData([
              ...imageData,
              {
                postImageUrl: data.payload.storedFileName,
                originalFileName: data.payload.originalFileName,
                presignedUrl: data.payload.presignedUrl,
                presignedExpDate: data.payload.expireDate,
              },
            ]);
            setImageUploading(false);
          });
          setImageUploading(true);
        } else if (state?.action === "EDIT") {
          handleImageUploadForEdit(file).then((data) => {
            console.log("New image uploaded:", data);
            setImageUploading(false);
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setForm(null);
    }
  };

  const handleAgriculturePostImageUpload = async (file) => {
    try {
      const response = await handleAgriculturePostImage(
        file,
        () => onSuccess("Success"),
        onError
      );

      return response;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageUploadForEdit = async (file) => {
    try {
      const postId = state.target.id;
      const imageId = state.target.images[0].id;
      const response = await UpdateAgriculturePostImage(postId, imageId, file);

      return response;
    } catch (error) {
      console.error("Error uploading image for edit:", error);
    }
  };

  const handleImageChange2 = async (event) => {
    const file = event.target.files[0];
    setSelectedFile2(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage2(reader.result);

        const form = new FormData();
        form.append("file", file);

        setImageUploading2(true);
        if (state?.action === "ADD") {
          handleAgriculturePostImageUpload2(form).then((data) => {
            setImageData([
              ...imageData,
              {
                postImageUrl: data.payload.storedFileName,
                originalFileName: data.payload.originalFileName,
                presignedUrl: data.payload.presignedUrl,
                presignedExpDate: data.payload.expireDate,
              },
            ]);
            setImageUploading2(false);
          });
          setImageUploading2(true);
        } else if (state?.action === "EDIT") {
          handleImageUploadForEdit2(file).then((data) => {
            console.log("New image uploaded:", data);
            setImageUploading2(false);
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setForm(null);
    }
  };

  const handleAgriculturePostImageUpload2 = async (file) => {
    try {
      const response = await handleAgriculturePostImage(
        file,
        () => onSuccess("Success"),
        onError
      );

      return response;
    } catch (error) {}
  };

  const handleImageUploadForEdit2 = async (file) => {
    try {
      const postId = state.target.id;
      const imageId = state.target.images[1].id;
      const response = await UpdateAgriculturePostImage(postId, imageId, file);

      return response;
    } catch (error) {
      console.error("Error uploading image for edit:", error);
    }
  };

  const handleImageChange3 = async (event) => {
    const file = event.target.files[0];
    setSelectedFile3(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage3(reader.result);

        const form = new FormData();
        form.append("file", file);

        setImageUploading3(true);
        if (state?.action === "ADD") {
          handleAgriculturePostImageUpload3(form).then((data) => {
            setImageData([
              ...imageData,
              {
                postImageUrl: data.payload.storedFileName,
                originalFileName: data.payload.originalFileName,
                presignedUrl: data.payload.presignedUrl,
                presignedExpDate: data.payload.expireDate,
              },
            ]);
            setImageUploading3(false);
          });
          setImageUploading3(true);
        } else if (state?.action === "EDIT") {
          handleImageUploadForEdit3(file).then((data) => {
            console.log("New image uploaded:", data);
            setImageUploading3(false);
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setForm(null);
    }
  };

  const handleAgriculturePostImageUpload3 = async (file) => {
    try {
      const response = await handleAgriculturePostImage(
        file,
        () => onSuccess("Success"),
        onError
      );

      return response;
    } catch (error) {}
  };

  const handleImageUploadForEdit3 = async (file) => {
    try {
      const postId = state.target.id;
      const imageId = state.target.images[2].id;
      const response = await UpdateAgriculturePostImage(postId, imageId, file);

      return response;
    } catch (error) {
      console.error("Error uploading image for edit:", error);
    }
  };

  console.log(state.target);

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
      <FormWrapper>
        <PageHeader
          saving={saving}
          state={state}
          formName="Agriculture Post"
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
                onChange={(e) => handleChange(e?.target?.value || "", "code")}
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
                onChange={(e) => handleChange(e?.target?.value || "", "tags")}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={2} md={2} lg={6}>
            <FieldWrapper>
              <FieldName>Media Type</FieldName>
              <Select
                name="mediaType"
                id="mediaType"
                value={formData?.mediaType || ""}
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "mediaType")
                }
                fullWidth
                sx={{
                  borderRadius: "8px",
                }}
                size="small"
              >
                <MenuItem value={"VIDEO"}>Video</MenuItem>
                <MenuItem value={"PHOTO"}>Photo</MenuItem>
              </Select>
            </FieldWrapper>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <FieldWrapper>
              <FieldName>Video URL</FieldName>
              <TextField
                name="videoUrl"
                id="videoUrl"
                value={formData?.videoUrl || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW || formData?.mediaType !== "VIDEO"}
                onChange={(e) => handleChange(e?.target?.value || "", "videoUrl")}
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
                {!imageUploading ? (
                  <FieldWrapper>
                    <FieldName>Image 01</FieldName>
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
                        id="profile-picture-input1"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                        disabled={formData?.mediaType !== "PHOTO"}
                      />

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ position: "relative" }}
                      >
                        <label
                          htmlFor="profile-picture-input1"
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
                ) : (
                  <CircularProgress />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={4}>
            <Grid container>
              <Grid item sm={3} md={3} lg={9}>
                {!imageUploading2 ? (
                  <FieldWrapper>
                    <FieldName>Image 02</FieldName>
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
                        id="profile-picture-input2"
                        style={{ display: "none" }}
                        onChange={handleImageChange2}
                        disabled={formData?.mediaType !== "PHOTO"}
                      />

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ position: "relative" }}
                      >
                        <label
                          htmlFor="profile-picture-input2"
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
                        {selectedImage2 && (
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
                              src={selectedImage2}
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
                ) : (
                  <CircularProgress />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={4}>
            <Grid container>
              <Grid item sm={3} md={3} lg={9}>
                {!imageUploading3 ? (
                  <FieldWrapper>
                    <FieldName>Image 03</FieldName>
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
                        id="profile-picture-input3"
                        style={{ display: "none" }}
                        onChange={handleImageChange3}
                        disabled={formData?.mediaType !== "PHOTO"}
                      />

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ position: "relative" }}
                      >
                        <label
                          htmlFor="profile-picture-input3"
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
                        {selectedImage3 && (
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
                              src={selectedImage3}
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
                ) : (
                  <CircularProgress />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormWrapper>
    </div>
  );
};

export default CreatePostForm;
