import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Colors } from "../../utils/constants/Colors";

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

export default function GapRegActionList({ onRowSelect = (_c) => {}, gapReqActionList }) {
  
  const sortedActions = [...gapReqActionList].sort((a, b) => {
    const dateA = new Date(parseInt(a.createdDate));
    const dateB = new Date(parseInt(b.createdDate));
    return dateB - dateA;
  });

  const columns = [
    {
      field: "userDTO",
      headerName: "Officer Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.row.userDTO.username
    },
    {
      field: "actionClient",
      headerName: "Action",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const action = params.row.action;
        const actionClient = params.row.actionClient;
        let textColor = "inherit"; 
      
        if ([
          'SCS_REGIONAL_OFFICER_REJECT',
          'DD_REJECTED',
          'MAIN_SCS_REGIONAL_OFFICER_REJECT'
        ].includes(action)) {
          textColor = "red";
        }
      
        return (
          <span style={{ color: textColor }}>
            {actionClient}
          </span>
        );
      }           
    },
    {
      field: "message",
      headerName: "Reason Or Message",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "createdDate",
      headerName: "Date",
      width: 320,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const timestamp = parseInt(params.row.createdDate);
        const date = new Date(timestamp);
        const options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        const isFirstRow = params.row === sortedActions[0];
        const fontWeight = isFirstRow ? "bold" : "normal";
        return (
          <span style={{ fontWeight }}>
            {date.toLocaleString(undefined, options)}
          </span>
        );      
      }
      
    }
  ];

  const getRowHeight = () => 40;

  return (
    <div style={{ height: 350, width: "100%", marginTop: "50px" }}>
      <Box
        sx={{
          height: 350,
          width: "99%",
        }}
      >
        <StyledDataGrid
          // checkboxSelection
          rows={sortedActions}
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
