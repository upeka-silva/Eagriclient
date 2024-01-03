import {
  Grid,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleScsService,
  updateScsService,
} from "../../../redux/actions/scsService/action";
import {
  DEF_ACTIONS
} from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
  
  import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import PageHeader from "../../../components/PageHeader/PageHeader";
  
  const ScsServiceForm = () => {
    useUserAccessValidation();
    const { state } = useLocation();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState(state?.target || {});
    const [saving, setSaving] = useState(false);
    
    const { addSnackBar } = useSnackBars();
  
    const goBack = () => {
      navigate("/zone/scs-structure/scs-service");
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
          if (formData.id) {
            await updateScsService(formData, onSuccess, onError);
          } else {
            await handleScsService(formData, onSuccess, onError);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    
    return (
      <div>
        <FormWrapper>
        <PageHeader saving={saving} goBack={goBack} state={state} formName="Scs Service"/>
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
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Scs Service ID</FieldName>
                <TextField
                  name="scsServiceId"
                  id="scsServiceId"
                  value={formData?.scsServiceId || ""}
                  fullWidth
                  disabled={
                    state?.action === DEF_ACTIONS.VIEW ||
                    state?.action === DEF_ACTIONS.EDIT
                  }
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "scsServiceId")
                  }
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                    },
                  }}
                  size="small"
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>Scs Service Name</FieldName>
                <TextField
                  name="name"
                  id="name"
                  value={formData?.name || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "name")}
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
      </div>
    );
  };
  
  export default ScsServiceForm;
  