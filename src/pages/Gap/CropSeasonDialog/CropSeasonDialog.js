import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { Colors } from "../../../utils/constants/Colors";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { Fonts } from "../../../utils/constants/Fonts";

export default function CropDetailsDialog({
  open,
  handleClose,
  ConfirmAction,
  formData,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-object"
      aria-describedby="delete-description"
    >
      <DialogTitle id="delete-object">{"Add crop season"}</DialogTitle>
      <DialogContent>
        <FieldWrapper
          style={{
            flexDirection: "column",
            flex: "1 1 264px",
            gap: "0",
            fontFamily:Fonts.fontStyle1
          }}
        >
          <FieldName
            style={{
              width: "100%",
            }}
          >
            Season ID
          </FieldName>
          <TextField
            name="seasonId"
            id="seasonId"
            value={formData?.seasonId || ""}
            //   disabled={state?.action === DEF_ACTIONS.VIEW}
            //   onChange={(e) =>
            //     handleChange(
            //       e?.target?.value || "",
            //       "seasonId"
            //     )
            //   }
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
        <Button onClick={ConfirmAction}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
