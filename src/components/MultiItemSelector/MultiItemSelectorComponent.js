import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { FieldWrapper } from "../FormLayout/FieldWrapper";
import { FieldName } from "../FormLayout/FieldName";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { Fonts } from "../../utils/constants/Fonts";
import { GridDeleteIcon } from "@mui/x-data-grid";

const MultiItemSelect = ({
  options = [],
  open = false,
  mode = DEF_ACTIONS.VIEW,
  itemHandler,
  handleClose,
  existingAuditores = [],
  changeGapReqStatus,
  gapReqStatus,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const users = existingAuditores.map(auditor => auditor.user);
    setSelectedItems(users);
  }, []);

  const handleSelect = (event, value) => {
    if (value && !selectedItems.some((item) => item.id === value.id)) {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const handleRemoveItem = (idToRemove) => {
    const remainItems = selectedItems.filter((item) => item.id !== idToRemove);
    setSelectedItems(remainItems);
  };

  return (
    <div>
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
          {mode} External Auditores
        </DialogTitle>
        <DialogContent>
          <Box>
            <Grid
              container
              spacing={1}
              sx={{
                margin: "15px",
                width: "97%",
                borderRadius: "5px",
              }}
            >
              <Grid item sm={12} md={12} lg={12}>
                <FieldWrapper>
                  <Autocomplete
                    options={options}
                    fullWidth
                    getOptionLabel={(option) => option.firstName}
                    onChange={handleSelect}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Item" />
                    )}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      {selectedItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {item.firstName} {item.lastName}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label="delete"
                            >
                              <GridDeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
            onClick={(event) => {
              itemHandler(selectedItems)
              if (gapReqStatus.lblState === 'APPROVED_BY_DD' && existingAuditores.length === 0) {
                changeGapReqStatus("ASSIGN_AUDITORS");
              }
            }}
            color="success"
            variant="contained"
            size="small"
            sx={{ marginLeft: "20px" }}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MultiItemSelect;
