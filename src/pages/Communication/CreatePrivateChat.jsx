import React, { useEffect, useState } from "react";
import { getContactList } from "../../redux/actions/communication/action";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Fonts } from "../../utils/constants/Fonts";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { DEF_ACTIONS } from "../../utils/constants/permission";

function CreatePrivateChat({
  open,
  handleClose,
  confirmAction,
  formDataPrivate,
  mode,
  handleChangePrivate,
  action,
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getContactList().then(({ dataList = [] }) => {
      let newOptions = dataList.map((item) => {
        return {
          userId: item.id,
          userName: item.username,
          firstName: item.firstName,
          lastName: item.lastName,
        };
      });

      setOptions(newOptions);
    });
  }, []);

  return (
    <Dialog
      className="create-private-chat-dialog"
      open={open}
      onClose={handleClose}
      aria-labelledby="new-private-chat"
      aria-describedby="start a new private chat"
    >
      <DialogTitle
        id="new-group"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} Start New Chat
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
              <FieldWrapper className="autocomplete">
                <FieldName>Select Contact To Start Chat</FieldName>
                <Autocomplete
                  // multiple
                  options={options}
                  disabled={action === DEF_ACTIONS.VIEW}
                  value={formDataPrivate?.userValueDTOS}
                  getOptionLabel={(i) => `${i?.firstName} ${i?.lastName}`}
                  onChange={(event, value) => {
                    handleChangePrivate(value, "userValueDTO");
                  }}
                  disableClearable
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
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
          disabled={action === DEF_ACTIONS.VIEW}
          onClick={(event) => confirmAction(event, formDataPrivate, mode)}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginLeft: "20px" }}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePrivateChat;
