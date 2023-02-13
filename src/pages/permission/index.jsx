import * as React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Dialog,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import { CheckBox } from "@mui/icons-material";
import Popup from '../../components/Popup'

const Permission = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "testPermission1",
      headerName: "test permission 1",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "test permission 2",
      headerName: "test permission 2",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "test permission 3",
      headerName: "test permission 3",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "farmer" && <SettingsAccessibilityIcon />} */}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="PERMISSION" subtitle="Managing the Access Permission" />
        <Button onClick={handleClickOpen}>
          <Typography variant="h5" color={colors.greenAccent[400]}>
            ADD USER ROLE
          </Typography>
        </Button>
        <Dialog open={open} onClose={handleClose}>
         <Popup handleClose={handleClose}/>
        </Dialog>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam}  columns={columns} />
      </Box>
    </Box>
  );
};

export default Permission;
