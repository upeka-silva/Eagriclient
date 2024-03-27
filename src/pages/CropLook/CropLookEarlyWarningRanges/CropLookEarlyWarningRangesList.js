import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";


import { useLocation, useNavigate } from "react-router";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  handleEarlyWarningRegistartion,
  updateEarlyWarningRegistartion,
} from "../../../redux/actions/cropLook/earlyWarningRegistration/action";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import { ButtonWrapper } from "../../../components/FormLayout/ButtonWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FormWrapper } from "../../../components/FormLayout/FormWrapper";

import { useEffect } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { get_SubCategoryById } from "../../../redux/actions/crop/crop/action";
import { get_CropById } from "../../../redux/actions/crop/cropVariety/action";


const CropLookEarlyWarningRangesList = ({
    dataEndPoint,
    selectedRows = [],
    onRowSelect = (_c) => {},
    selectAll = (_list = []) => {},
    unSelectAll = () => {},
  }) => {

    useUserAccessValidation();
    const { state } = useLocation();
    //const location = useLocation();
    console.log(state);
    const navigate = useNavigate();
    
    const columns = [
      { field: "cropDTO.description", headerName: "Crop" },  
      { field: "twoWeekRecommendation", headerName: "Two Week Recommendation" },
      { field: "greenUpper", headerName: "Green Upper" },
      { field: "lightGreenLower", headerName: "Light Green Lower" },
      { field: "lightGreenUpper", headerName: "Light Green Upper" },
      { field: "yellowLower", headerName: "Yellow Lower" },
      { field: "yellowUpper", headerName: "Yellow Upper" },
      { field: "orangeLower", headerName: "Orange Lower" },
      { field: "orangeUpper", headerName: "Orange Upper" },
      { field: "redLower", headerName: "Red Lower" },
    ];


    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [cropyOptions, setCropyOptions] = useState([]);
    const [category, setCategory] = useState({ categoryId: "", description: "" });
    const [subCategory, setSubCategory] = useState({subCategoryId: "",description: "",});
    const [crop, setCrop] = useState(null);


    useEffect(() => {
      get_CategoryList().then(({ dataList = [] }) => {
        setCategoryOptions(dataList);
      });
    }, []);
  
  
    const getSubCategories =(id) =>{
      debugger ;
      get_SubCategoryById(id).then(({ dataList = [] }) => {
        console.log(dataList);
        setSubCategoryOptions(dataList);
      });
    }
  
    const getCrops =(id) =>{
      debugger ;
      get_CropById(id).then(({ dataList = [] }) => {
        console.log(dataList);
        setCropyOptions(dataList);
      });
    }
  
    
  
    return (
      <TableWrapper>
         <ActionWrapper isLeft>
         <Grid container
        sx={{
          margin: "15px",
          width: "97%",
          borderRadius: "5px",
        }}>
         <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Crop Category</FieldName>
            <Autocomplete
              options={categoryOptions}
              //disabled={selectedDdoa?.id == null}
              getOptionLabel={(i) => i.categoryId ? `${i.categoryId} - ${i.description}` : ""}
              value={category || null}
              onChange={(event, value) => {
                getSubCategories(value?.id);
                setCategory(value);
                setSubCategory({subCategoryId: "",description: "",});
                setCrop(null);
              }}
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Crop Sub Category</FieldName>
            <Autocomplete
              options={subCategoryOptions}
              disabled={category.categoryId === ""}
              getOptionLabel={(i) => `${i.subCategoryId} - ${i.description}`}
              value={subCategory || null}
              onChange={(event, value) => {
                getCrops(value?.id);
                setSubCategory(value);
                setCrop(null);
              }}
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FieldWrapper>
            <FieldName>Crop</FieldName>
            <Autocomplete
              options={cropyOptions}
              disabled={subCategory.subCategoryId  === ""}
              getOptionLabel={(i) => `${i?.cropId} - ${i?.description}`}
              value={crop || null}
              onChange={(event, value) => {
                setCrop(value);
              }}
              disableClearable
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              )}
              fullWidth
            />
          </FieldWrapper>
        </Grid>
        </Grid>
        </ActionWrapper>
        <DataTable
          loadingTable
          dataEndPoint={dataEndPoint}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      </TableWrapper>
    );
  };

export default CropLookEarlyWarningRangesList
