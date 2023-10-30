import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Checkbox } from "@mui/material";
import { Colors } from "../../../utils/constants/Colors";
import { get_FarmLandOwnershipList } from "../../../redux/actions/farmerLandOwnership/action";
import { styled } from "@mui/material/styles";
import theme from "../../../utils/theme/theme.json";

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 22,
      height: 22,
      backgroundColor: "transparent",
      border: `1px solid red`,
      border: "none",
      color: "green",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "transparent",
      color: "green",
    },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  width: "100%",
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "white",
    borderRadius: "10px",
    border: "1px solid " + theme.coreColors.primary,

    "&:hover": {
      backgroundColor: theme.coreColors.primary,
    },
  },
  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: theme.coreColors.primary,
      marginTop: "-8px",
      marginBottom: "8px",
      zIndex: 20,
      boxShadow: Colors.shadow,
      cursor: "pointer",
    },
    transition: "all 0.3s ease",
    border: `1px solid #CCC`,
    borderBottom: `none`,
  },
  " .MuiDataGrid-cell": {
    borderRight: `1px solid #CCC`,
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: Colors.tableHeaderColor,
    color: "white",
    fontSize: "15px",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    // borderTop: `1px solid #CCC`,
    fontSize: "15px",
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none", // Remove focus outline on cells
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .css-axafay-MuiDataGrid-virtualScroller": {
    overflow: "hidden",
  },

  ...customCheckbox(theme),
}));

export default function CropDetailsList({ onRowSelect = (_c) => {}, data }) {
  

  const columns = [
    {
      field: "gapCropSeason",
      headerName: "Crop Season",
      width: 160,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "cropDTO",
      headerName: "Crop",
      width: 400,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.row.cropDTO.cropId + "-" +  params.row.cropDTO.description,
    },
    {
      field: "cropVarietyDTO",
      headerName: "Crop Variety",
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.row.cropVarietyDTO.varietyId + "-" +  params.row.cropVarietyDTO.varietyDescription
    },
    {
      field: "plotNumber",
      headerName: "Plot Number",
      width: 180,
     
      headerClassName: "super-app-theme--header",
    },
    {
      field: "extent",
      headerName: "Extent",
      width: 180,

      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  const getRowHeight = () => 40;

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Box
        sx={{
          height: 400,
          width: "99%",
        }}
      >
        <StyledDataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableSelectionOnClick
          onRowSelectionModelChange={onRowSelect}
          getRowHeight={getRowHeight}
        />
      </Box>
    </div>
  );
}
