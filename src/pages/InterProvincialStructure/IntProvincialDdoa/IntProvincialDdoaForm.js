import React, { useEffect, useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  get_ProvincialDoaList,
  handleProvincialDoa,
  updateProvincialDoa,
} from "../../../redux/actions/ProvincialDoa/action";
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
import { updateInterProvincialDdoa } from "../../../redux/actions/interProvincialDdoa/action";
import { get_InterProvincialDoaList } from "../../../redux/actions/interProvincialDoa/action";
import { handleInterProvincialDdoa } from "../../../redux/actions/interProvincialDdoa/action";

const IntProvincialDdoaForm = () => {
  useUserAccessValidation();
  const { state } = useLocation();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || {});
  const [saving, setSaving] = useState(false);

  const [DirectorDoaLevels, setDirectorDoaLevels] = useState([]);
  const [selectedProDirectorLevel, setSelectedProDirectorLevel] = useState();

  const { addSnackBar } = useSnackBars();

  const goBack = () => {
    navigate("/zone/inter-provincial-structure/inter-provincial-deputy-director");
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
          await updateInterProvincialDdoa(formData, onSuccess, onError);
        } else {
          await handleInterProvincialDdoa(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    get_InterProvincialDoaList().then(({ dataList = [] }) => {
      setDirectorDoaLevels(dataList);
      console.log(dataList);
    });
  }, []);

  return (
    <FormWrapper>
      <ActionWrapper isLeft>
        <Button
          startIcon={<ArrowCircleLeftRounded />}
          onClick={goBack}
          color="success"
        >
          Go back to list
        </Button>
      </ActionWrapper>
      {/* <PathName>{}</PathName> */}
      <FormHeader style={{ padding: "0px 15px" }}>
        {saving && <CircularProgress size={20} sx={{ mr: "8px" }} />}
        {makeCapitalize(state?.action)} Inter Provincial Deputy Director
      </FormHeader>
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
            <FieldName>Inter Provincial Deputy Director Id</FieldName>
            <TextField
              name="ddId"
              id="ddId"
              value={formData?.ddId || ""}
              fullWidth
              disabled={
                state?.action === DEF_ACTIONS.VIEW ||
                state?.action === DEF_ACTIONS.EDIT
              }
              onChange={(e) =>
                handleChange(e?.target?.value || "", "ddId")
              }
              sx={{
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
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
                // width: "264px",
                "& .MuiInputBase-root": {
                  // height: "30px",
                  borderRadius: "8px",
                },
              }}
              size="small"
            />
          </FieldWrapper>
        </Grid>
        <Grid item lg={4}>
          <FieldWrapper>
            <FieldName> Director DOA Level</FieldName>
            <Autocomplete
              // disabled={state?.action === DEF_ACTIONS.VIEW}
              options={DirectorDoaLevels}
              value={formData.directorDoaDTO || selectedProDirectorLevel}
              getOptionLabel={(i) => `${i?.doaId}-${i?.description}`}
              onChange={(event, value) => {
                console.log(value);
                setSelectedProDirectorLevel(value);
                handleChange(value, "directorDoaDTO");
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

export default IntProvincialDdoaForm;
