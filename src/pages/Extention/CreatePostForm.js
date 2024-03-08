import {
    Grid,
    TextField
  } from "@mui/material";
  import React, { useState } from "react";
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
      if (enableSave()) {
        setSaving(true);
        try {
          if (formData?.id) {
            await updateAgriculturePost(formData, onSuccess, onError);
          } else {
            await handleAgriculturePost(formData, onSuccess, onError);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const getPathName = () => {
      return location.pathname === "/" || !location.pathname
        ? ""
        : location.pathname;
    };
  
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
        </Grid>
      </FormWrapper>
    );
  };
  
  export default CreatePostForm;
  