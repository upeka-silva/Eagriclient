import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { Fonts } from "../../utils/constants/Fonts";
import { FormHeader } from "../../components/FormLayout/FormHeader";
import { FieldName } from "../../components/FormLayout/FieldName";
import Radio from "@mui/material/Radio";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { DialogContent } from "@mui/material";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { Colors } from "../../utils/constants/Colors";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useLocation } from "react-router";
import {
  handleFarmerContact,
  updateFarmerContact,
} from "../../redux/actions/farmer/action";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../context/SnackBarContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactForm = ({ open = false, onClose = () => {} }) => {
  const [formData, setFormData] = useState([]);
  const { state } = useLocation();
  const [saving, setSaving] = useState(false);

  const { addSnackBar } = useSnackBars();

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
    console.log("save data");
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          await updateFarmerContact(formData, onSuccess, onError);
        } else {
          await handleFarmerContact(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose} style={{}}>
      <ContactWrapper>
        <FormHeader>Add New Contact</FormHeader>
        <TypeWrapper>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{
                "&.MuiFormLabel-root": {
                  color: "#434343",
                  fontSize: "12px",
                  fontWeight: 400,
                },
              }}
            >
              Contact Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              style={{ gap: "10px" }}
              value={formData?.contactType || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "contactType")
              }
            >
              <FormControlLabel
                value="PHONE"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "11px",
                  },
                }}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Phone"
              />
              <FormControlLabel
                value="EMAIL"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "11px",
                  },
                }}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Email"
              />
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "11px",
                  },
                }}
                value="WHATSAPP"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Whatsapp"
              />
            </RadioGroup>
          </FormControl>
        </TypeWrapper>
        <FieldName>Value</FieldName>
        <TextField
          name="contactValue"
          id="contactValue"
          value={formData?.contactValue || ""}
          fullWidth
          onChange={(e) => handleChange(e?.target?.value || "", "contactValue")}
          sx={{
            width: "264px",
            "& .MuiInputBase-root": {
              height: "30px",
              borderRadius: "8px",
              backgroundColor: `${Colors.white}`,
              fontSize: "11px",
            },
          }}
        />
        <TypeWrapper style={{ marginTop: "10px" }}>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{
                "&.MuiFormLabel-root": {
                  color: "#434343",
                  fontSize: "12px",
                  fontWeight: 400,
                },
              }}
            >
              Make this primary contact
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              style={{ gap: "10px" }}
              value={formData?.isPrimary || ""}
              disabled={state?.action === DEF_ACTIONS.VIEW}
              onChange={(e) =>
                handleChange(e?.target?.value || "", "isPrimary")
              }
            >
              <FormControlLabel
                value="true"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "11px",
                  },
                }}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                value="false"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "11px",
                  },
                }}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </TypeWrapper>
        <ActionWrapper>
          {saving ? (
            <AddButton variant="contained" disabled>
              {state?.action === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
            </AddButton>
          ) : (
            <>
              <AddButton disabled={!enableSave()} onClick={handleFormSubmit}>
                {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
              </AddButton>
              <ResetButton onClick={resetForm}>RESET</ResetButton>
            </>
          )}

          <ResetButton onClick={onClose}>CANCEL</ResetButton>
        </ActionWrapper>
      </ContactWrapper>
    </Dialog>
  );
};

export default ContactForm;

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${Fonts.fontStyle1};
  background-color: #eeecec;
  width: 672px;
  height: 486px;
  border: 1px solid #000000;
  border-radius: 13px;
  padding: 30px;
`;

export const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${Fonts.fontStyle1};
  border: 1px solid #d6d2d2;
  border-radius: 5px;
  width: 263px;
  height: 58px;
  padding-left: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

export const Types = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export const Type = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  margin-top: 142px;
`;
