import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function CropAreaViewDialog({
  open,
  handleClose,
  ConfirmAction,
  formData,
}) {
  const rows = [
    { id: 1, cropVarietyid: "1", plotNumber: "Plot-01", extent: "extent" },
    { id: 2, cropVarietyid: "2", plotNumber: "Plot-02", extent: "extent" },
  ];
  const columns = [
    { field: "cropVarietyid", headerName: "Crop Variety ID", width: 120 },
    { field: "plotNumber", headerName: "Plot Number", width: 120 },
    { field: "extent", headerName: "Extent", width: 120 },
    
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-object"
        aria-describedby="delete-description"
        sx={{ "& .MuiDialog-paper": { maxHeight: "500px", height: "450px" , width:'500px' } }}
      >
       <Box sx={{ 
        display:'flex',
        justifyContent:'space-between'
        }}>
        <DialogTitle id="delete-object">Crop Areas </DialogTitle>
        <Button onClick={handleClose} autoFocus>
            X
          </Button>
        </Box> 
        <DialogContent>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{ borderRadius: "0px", marginTop: "40px" }}
            hideFooterSelectedRowCount
          />
          
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </Dialog>
    </>
  );
}
