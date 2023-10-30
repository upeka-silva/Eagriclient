import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import { Colors } from "../../utils/constants/Colors";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Fonts } from "../../utils/constants/Fonts";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import Checkbox from "@mui/material/Checkbox";
import CropSelectDropDown from "./CropSelectDropDown";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { FormWrapper } from "../../components/FormLayout/FormWrapper";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  handleCropDetails,
  updateCropDetails,
} from "../../redux/actions/gap/action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCropDetailsDialog({
  open,
  handleClose,
  confirmAction,
  formData,
  action,
  refresh,
}) {
  const { addSnackBar } = useSnackBars();
  const [formDataQ, setFormDataQ] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormDataQ(formData);
    console.log(formData)
  }, [formData]);

  

  const handleChange = (value, target) => {
    setFormDataQ((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const onSelectedCrop = (cropId) => {
    setFormDataQ((current = {}) => {
      let newData = { ...current };
      newData["cropDTO"] = { id: cropId };
      return newData;
    });
  };

  const onSelectedCropVariety = (cropVarietyId) => {
    setFormDataQ((current = {}) => {
      let newData = { ...current };
      newData["cropVarietyDTO"] = { id: cropVarietyId };
      return newData;
    });
  };

  const enableSave = () => {
    if (action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(formData || {}) !== JSON.stringify(formDataQ)) {
        return true;
      }
    }
    if (action === DEF_ACTIONS.ADD && Object.keys(formDataQ || {}).length > 0) {
      return true;
    }
    return false;
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        action === DEF_ACTIONS.ADD
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

  const handleFormSubmit = async (event, data, action) => {
    console.log(formDataQ);
    setSaving(true);
    try {
      if (formDataQ?.id) {
        await updateCropDetails(formDataQ, onSuccess, onError);
        refresh();
      } else {
        await handleCropDetails(formDataQ, onSuccess, onError);
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetData = () => {
    console.log("reset Data")
   
    if (action === DEF_ACTIONS.EDIT) {
      setFormDataQ(formData || {});
    } else {
      setFormDataQ(null);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth={"md"}
      >
        <FormWrapper>
          <FormHeader style={{ marginLeft: "15px" }}>
            {action == DEF_ACTIONS.ADD ? "Add" : ""} Crop Details
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
            {action !== DEF_ACTIONS.VIEW && (
              <ActionWrapper>
                {saving ? (
                  <Button variant="contained" color="success" size="small">
                    {action === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
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
                      {action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
                    </Button>
                    <Button
                      onClick={resetData}
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
            <Button
              color="success"
              variant="contained"
              size="small"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </ButtonWrapper>

          <Grid
            container
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              margin: "15px",
              width: "97%",
            }}
          >
            <CropSelectDropDown
              selectedCropCallback={onSelectedCrop}
              selectedVarietyCallback={onSelectedCropVariety}
              mode={action}
              crop={formData?.cropDTO}
              cropVariety={formData?.cropVarietyDTO}
            />

            <Grid item sm={12} md={12} lg={4}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Season
                  </FieldName>

                  <Select
                    name="questionType"
                    id="questionType"
                    value={formDataQ?.gapCropSeason || ""}
                    disabled={action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "gapCropSeason")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      "& .MuiInputBase-root": {
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  >
                    <MenuItem value={"CURRENT_SEASON"}>Current Season</MenuItem>
                    <MenuItem value={"NEXT_SEASON"}>Next Season</MenuItem>
                  </Select>
                </FormControl>
              </FieldWrapper>
            </Grid>

            <Grid item sm={12} md={12} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Plot Number
                </FieldName>
                <TextField
                  name="questionString"
                  id="questionString"
                  value={formDataQ?.plotNumber || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "plotNumber")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Extent
                </FieldName>
                <TextField
                  name="order"
                  id="order"
                  value={formDataQ?.extent || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "extent")
                  }
                  size="small"
                  fullWidth
                  type="number"
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </FormWrapper>
      </Dialog>
    </div>
  );
}
