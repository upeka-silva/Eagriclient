import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  TextField,
  getPaginationItemUtilityClass,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormHeader } from "../../../components/FormLayout/FormHeader";
import {
  ActionWrapper,
  makeCapitalize,
} from "../../../components/PageLayout/ActionWrapper";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { AddButton } from "../../../components/FormLayout/AddButton";
import { ResetButton } from "../../../components/FormLayout/ResetButton";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";
import { Add, ArrowCircleLeftRounded, Edit } from "@mui/icons-material";
import {
  handleProvincialDdoa,
  updateProvincialDdoa,
} from "../../../redux/actions/provincialDdoa/action";
import { handleInterProvincialDdoa, updateInterProvincialDdoa , } from "../../../redux/actions/interProvincialDdoa/action";
import { get_InterProvincialDoaList } from "../../../redux/actions/interProvincialDoa/action";
import { get_ProvincialDoaList } from "../../../redux/actions/ProvincialDoa/action";


const ProvincialDdoaForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();
console.log(state)
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const [proDirectorLevels, setProDirectorLevels] = useState([]);
  const [selectedProDirectorLevel, setSelectedProDirectorLevel] = useState();

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/provincial-structure/provincial-deputy-director");
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
          await updateProvincialDdoa(formData, onSuccess, onError);
        } else {
          await handleProvincialDdoa(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    get_ProvincialDoaList().then(({ dataList = [] }) => {
      setProDirectorLevels(dataList);
      console.log(dataList);
    });
  }, []);

  return (
    <FormWrapper>
      <BackToList goBack={goBack} />
      <CustFormHeader
        saving={saving}
        state={state}
        formName="Provincial Deputy Director"
      />
      <ButtonWrapper
        isCeneter
        style={{
          width: "95%",
          justifyContent: "flex-start",
          margin: "0",
          paddingLeft: "18px",
        }}
      >
        {state?.action !== DEF_ACTIONS.VIEW && (
          <ActionWrapper>
            {saving ? (
              <Button variant="contained" color="success" size="small">
                {state?.action === DEF_ACTIONS.ADD
                  ? "ADDING..."
                  : "UPDATING..."}
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  disabled={!enableSave()}
                  onClick={handleFormSubmit}
                  size="small"
                  color="success"
                >
                  {/* {state?.action === DEF_ACTIONS.ADD ? <Add /> : <Edit />} */}
                  {state?.action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
                </Button>
                <Button
                  onClick={resetForm}
                  color="success"
                  variant="contained"
                  size="small"
                  sx={{ marginLeft: "10px" }}
                >
                  RESET
                </Button>
              </>
            )}
          </ActionWrapper>
        )}
      </ButtonWrapper>
      <Grid
        container
        sx={{
          // border: "1px solid #bec0c2",
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}
      >
        <Grid item lg={3}>
          <FieldWrapper>
            <FieldName>Provincial Deputy Director Id</FieldName>
            <TextField
              name="provincialDdId"
              id="provincialDdId"
              value={formData?.provincialDdId || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "provincialDdId")
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
        <Grid item lg={5}>
          <FieldWrapper>
            <FieldName>Description</FieldName>
            <TextField
              name="description"
              id="description"
              value={formData?.description || ""}
              fullWidth
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "description")
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
            <FieldName>Provincial Director Level</FieldName>
            <Autocomplete
              // disabled={state?.action === DEF_ACTIONS.VIEW}
              options={proDirectorLevels}
              value={formData.proDirectorLevelDTO || selectedProDirectorLevel
              }
              getOptionLabel={(i) => `${i?.proDirectorId}-${i?.description}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedProDirectorLevel(value);
                handleChange(value, "proDirectorLevelDTO");
              }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
                marginRight: "5px",
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default ProvincialDdoaForm;
