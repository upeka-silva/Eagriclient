import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Colors } from "../../utils/constants/Colors";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Fonts } from "../../utils/constants/Fonts";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import Checkbox from "@mui/material/Checkbox";

export default function AddQuestionDialog({
  open,
  handleClose,
  confirmAction,
  formData,
  mode,
}) {
  const [formDataQ, setFormDataQ] = useState({});

  useEffect(() => {
    setFormDataQ(formData);
  }, [formData]);

  const handleChange = (value, target) => {
    setFormDataQ((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-question"
      aria-describedby="delete-description"
    >
      <DialogTitle
        id="delete-question"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} QUESTION
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            sx={{
              // border: "1px solid #bec0c2",
              margin: "15px",
              width: "97%",
              borderRadius: "5px",
            }}
          >
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Question
                </FieldName>
                <TextField
                  name="questionString"
                  id="questionString"
                  value={formDataQ?.questionString || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "questionString")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Order
                </FieldName>
                <TextField
                  name="order"
                  id="order"
                  value={formDataQ?.order || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "order")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Question Type
                </FieldName>

                <Select
                  name="questionType"
                  id="questionType"
                  value={formDataQ?.questionType || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "questionType")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                >
                  <MenuItem value={"TEXT"}>Text</MenuItem>
                  <MenuItem value={"BOOLEAN"}>Boolean</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Compliance Group
                </FieldName>

                <Select
                  name="complianceGroup"
                  id="complianceGroup"
                  value={formDataQ?.complianceGroup || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "complianceGroup")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                >
                  <MenuItem value={"CRUCIAL"}>Crucial</MenuItem>
                  <MenuItem value={"MAJOR"}>Major</MenuItem>
                  <MenuItem value={"MINOR"}>Minor</MenuItem>
                  <MenuItem value={"RECOMMENDED"}>Recommended</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Item Group
                </FieldName>

                <Select
                  name="itemGroup"
                  id="itemGroup"
                  value={formDataQ?.itemGroup || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "itemGroup")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    // width: "264px",
                    "& .MuiInputBase-root": {
                      // height: "30px",
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                >
                  <MenuItem value={"INPUT_MANAGEMENT"}>
                    Input Management
                  </MenuItem>
                  <MenuItem value={"DOCUMENTATION"}>Documentation</MenuItem>
                  <MenuItem value={"REQUIREMENT"}>Requirement</MenuItem>
                  <MenuItem value={"SEEDS"}>Seeds</MenuItem>
                  <MenuItem value={"PLANTING_MATERIAL"}>
                    Planting Material
                  </MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Proof Required
                </FieldName>
                <Checkbox
                  name="proofRequired"
                  id="proofRequired"
                  value={formDataQ?.proofRequired}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.checked, "proofRequired")
                  }
                  checked={formDataQ?.proofRequired === true}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          disabled={mode === DEF_ACTIONS.VIEW}
          onClick={(event) => confirmAction(event, formDataQ, mode)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
