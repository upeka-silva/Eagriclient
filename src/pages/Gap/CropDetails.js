import React, { useState } from "react";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import CropDetailsDialog from "./CropSeasonDialog/CropSeasonDialog";
import CropAreaAddDialog from "./CropAreaAddDialog/CropAreaAddDialog";
import CropAreaViewDialog from "./CropAreaViewDialog/CropAreaViewDialog";
import { Fonts } from "../../utils/constants/Fonts";

export default function CropDetails({ state }) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(state?.target || {});
  const [openCropDlg, setOpenCropDlg] = useState(false);
  const [openCropAreaAddDlg, setOpenCropAreaAddDlg] = useState(false);
  const [openCropAreaViewDlg, setOpenCropAreaViewDlg] = useState(false);

 

  const resetForm = () => {};
  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (
      state?.action === DEF_ACTIONS.ADD &&
      Object.keys(formData || {}).length > 0
    ) {
      return true;
    }
    return false;
  };

  const handleFormSubmit = async () => {
    if (enableSave()) {
      setSaving(true);
      try {
        if (formData?.id) {
          //   await updateGap(formData, onSuccess, onError);
        } else {
          //   await handleGap(formData, onSuccess, onError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderButtonView = (params) => {
   

    const handleCropAreaAdd = ()=>{
        setOpenCropAreaAddDlg(true)
    }
    const handleCropAreaView = ()=>{
        setOpenCropAreaViewDlg(true)
    }

    return (
      <Box>
        <ViewButton
          variant="contained"
          color="primary"
          onClick={handleCropAreaView}
        >
          VIEW CROP AREAS
        </ViewButton>
        <ViewButton
          variant="contained"
          color="primary"
          onClick={handleCropAreaAdd}
        >
          ADD CROP AREA
        </ViewButton>
        ;
      </Box>
    );
  };

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "seasonId", headerName: "Season ID", width: 130 },

    {
      field: "",
      headerName: "",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 320,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      renderCell: renderButtonView,
    },
  ];

  const openAddCropDetails = () => {
    console.log("add");
    setOpenCropDlg(true);
  };

  const closeAddCropDetails = () => {
    setOpenCropDlg(false);
  };

  const closeAddCropArea = () => {
    setOpenCropAreaAddDlg(false);
  };
  const closeViewCropArea = () => {
    setOpenCropAreaViewDlg(false);
  };

  return (
    <>
      <ButtonWrapper
        style={{
          width: "95%",
          justifyContent: "flex-start",
          margin: "0",
          paddingLeft: "18px",
          marginTop: "20px"
        }}
      >
        
        <ActionWrapper>
          <AddButton variant="contained" onClick={openAddCropDetails}>
            {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
          </AddButton>
        </ActionWrapper>
      </ButtonWrapper>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{ borderRadius: "0px", margin: "20px" }}
        hideFooterSelectedRowCount
        style={{ 
            fontFamily:Fonts.fontStyle1
         }}
      />
      <CropDetailsDialog
        open={openCropDlg}
        setConfirmDialog={setOpenCropDlg}
        // setConfirmDialog={setOpenDlg}
        // ConfirmAction={handle}
        handleClose={closeAddCropDetails}
        formData={formData}
      />
      <CropAreaAddDialog
       open={openCropAreaAddDlg}
       setConfirmDialog={setOpenCropAreaAddDlg}
       // setConfirmDialog={setOpenDlg}
       // ConfirmAction={handle}
       handleClose={closeAddCropArea}
       formData={formData}
      />
      <CropAreaViewDialog 
       open={openCropAreaViewDlg}
       setConfirmDialog={setOpenCropAreaViewDlg}
       // setConfirmDialog={setOpenDlg}
       // ConfirmAction={handle}
       handleClose={closeViewCropArea}
       formData={formData}/>
    </>
  );
}

export const ViewButton = styled.button`
  padding-inline: 20px;
  height: 28px;
  margin-right: 5px;
  border-radius: 22px;
  background-color: ${Colors.formButton};
  border: none;
  color: ${Colors.white};
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;
