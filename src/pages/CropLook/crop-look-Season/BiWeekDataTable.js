import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Colors } from "../../../utils/constants/Colors";
import { DEF_ACTIONS } from "../../../utils/constants/permission";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  width: "100%",

  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",

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
    "&.enabled-row": {
      backgroundColor: "#000",
    },
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
    fontSize: "12px",
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
}));

export default function BiWeekDataTable({
  data,
  currentFormMode,
  statusChange,
}) {
  const columns = [
    {
      field: "week",
      headerName: "Week",
      flex: 1.5,
      headerClassName: "super-app-theme--heade",
      renderCell: (params) => params?.row?.weekDescription,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--heade",
      renderCell: (params) => params?.row?.status,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      headerClassName: "super-app-theme--heade",
      renderCell: (params) => params?.row?.startDate,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      headerClassName: "super-app-theme--heade",
      renderCell: (params) => params?.row?.endDate,
    },
    {
      field: "reportingStartDate",
      headerName: "Reporting Start Date",
      flex: 1,
      headerClassName: "super-app-theme--heade",
      renderCell: (params) => params?.row?.reportingStartDate,
    },
    {
      field: "reportingEndDate",
      headerName: "Reporting End Date",
      flex: 1,
      headerClassName: "super-app-theme--heade",
      renderCell: (params) => params?.row?.reportingEndDate,
    },
    {
      field: "action",
      headerName: "",
      headerClassName: "super-app-theme--heade",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>
            {row?.status === "ENABLED" ? (
              <>
                <Button
                  sx={{
                    fontSize: 11,
                    border: 1,
                    background: "#2e7d32",
                    borderColor: "#2e7d32",
                    marginRight: 1,
                    color: "#ffff !important",
                    borderRadius: 1.5,
                    maxHeight: "30px",
                    minWidth: "63px",
                    minHeight: "30px",
                    width: "100px",
                    "&:hover": {
                      backgroundColor: "#2e7d32",
                    },
                  }}
                  disabled={currentFormMode === DEF_ACTIONS.VIEW}
                  onClick={() => statusChange(row.id, "CLOSE")}
                >
                  SET CLOSE
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{
                    fontSize: 11,
                    border: 1,
                    background: "#white",
                    borderColor: "#2e7d32",
                    color: "#2e7d32",
                    marginRight: 1,
                    borderRadius: 1.5,
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                    width: "100px",
                  }}
                  disabled={currentFormMode === DEF_ACTIONS.VIEW}
                  onClick={() => statusChange(row.id, "ENABLED")}
                >
                  SET ENABLE
                </Button>
              </>
            )}
          </>
        );
      },
    },
  ];

  const getRowHeight = () => 40;

  return (
    <>
      <hr />
      <Typography variant="h6" gutterBottom pt={1}>
        Bi-Week Data
      </Typography>

      <div style={{ height: "100%", width: "90%" }}>
        <Box
          sx={{
            height: "93%",
            width: "99%",
          }}
        >
          {data ? (
            <StyledDataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 12 },
                },
              }}
              disableSelectionOnClick
              getRowHeight={getRowHeight}
            />
          ) : null}
        </Box>
      </div>
    </>
  );
}
