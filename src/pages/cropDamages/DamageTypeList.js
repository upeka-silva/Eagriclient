import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Colors } from "../../utils/constants/Colors";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useTranslation } from "react-i18next";

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
}));

export default function DamageTyprList({
  data,
  currentFormMode,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation();
  const columns = [
    {
      field: "code",
      headerName: t("cropDamagePage.damageCode"),
      flex: 1,
      headerClassName: "super-app-theme--heade",
      renderCell: (params) => params.row.name,
    },
    {
      field: "description",
      headerName: t("cropDamagePage.courseOfDamage"),
      flex: 2,
      headerClassName: "super-app-theme--heade",
      renderCell: (params) => params.row.description,
    },
    {
      field: "edit",
      headerName: t("cropDamagePage.action"),
      headerClassName: "super-app-theme--heade",
      flex: 0.4,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>
            <Button
              sx={{
                fontSize: 11,
                border: 1,
                background: "#2e7d32",
                marginRight: 1,
                color: "white",
                borderRadius: 1.5,
                maxHeight: "30px",
                minHeight: "30px",
              }}
              disabled={currentFormMode === DEF_ACTIONS.VIEW}
              onClick={onEdit(row, DEF_ACTIONS.EDIT)}
            >
              {t("action.edit")}
            </Button>
            <Button
              sx={{
                fontSize: 11,
                border: 1,
                background: "#2e7d32",
                color: "white",
                borderRadius: 1.5,
                maxHeight: "30px",
                minHeight: "30px",
              }}
              disabled={currentFormMode === DEF_ACTIONS.VIEW}
              onClick={onDelete(row)}
            >
              {t("action.delete")}
            </Button>
          </>
        );
      },
    },
  ];

  const getRowHeight = () => 40;

  return (
    <div style={{ height: 500, width: "90%" }}>
      <Box
        sx={{
          height: 400,
          width: "99%",
        }}
      >
        <StyledDataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableSelectionOnClick
          getRowHeight={getRowHeight}
        />
      </Box>
    </div>
  );
}
