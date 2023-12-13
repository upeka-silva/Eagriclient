import { Box, Button, Grid, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { FieldName } from "../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { DEF_ACTIONS } from "../../utils/constants/permission";

export default function AddDamageTypeDialog({
  open,
  handleClose,
  confirmAction,
  formData,
  mode,
}) {
  const [formDataD, setformDataD] = useState({});

  useEffect(() => {
    setformDataD(formData);
  }, [formData]);

  const handleChange = (value, target) => {
    setformDataD((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-question"
      aria-describedby="add a description to audit forms"
    >
      <DialogTitle
        id="add-question"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} Damage Type
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            sx={{
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
                  Name
                </FieldName>
                <TextField
                  name="questionString"
                  id="questionString"
                  value={formDataD?.name || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "name")
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
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Description
                </FieldName>
                <TextField
                  name="order"
                  id="order"
                  value={formDataD?.description || ""}
                  disabled={mode === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "description")
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
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          color="info"
          variant="contained"
          size="small"
          sx={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
        <Button
          disabled={mode === DEF_ACTIONS.VIEW}
          onClick={(event) => confirmAction(event, formDataD, mode)}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginLeft: "20px" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
