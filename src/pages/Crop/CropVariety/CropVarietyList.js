import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Grid,
} from "@mui/material";



const CropVarietyList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "varietyID", headerName: "Variety ID" },
    { field: "varietyName", headerName: "Variety Name" },
  ];

  return (
    <CardWrapper>
      <ActionWrapper isLeft>

        <Autocomplete
            // disabled={state?.action === DEF_ACTIONS.VIEW}
            // options={options}
            // // value={formData ? formData.cropCategoryDTO : ""}
            // getOptionLabel={(i) => `${i.categoryId} - ${i.description} `}
            // onChange={(event, value) => {
            //   handleChange(value);
            // }}
            fullWidth
            sx={{
              width: "214px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
              },
              marginRight: "5px",
            }}
            renderInput={(params) => <TextField {...params} size="small"  placeholder="Select Crop Category" />}
            fullWidth
        />
        <Autocomplete
            // disabled={state?.action === DEF_ACTIONS.VIEW}
            // options={options}
            // // value={formData ? formData.cropCategoryDTO : ""}
            // getOptionLabel={(i) => `${i.categoryId} - ${i.description} `}
            // onChange={(event, value) => {
            //   handleChange(value);
            // }}
            fullWidth
            sx={{
              width: "214px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
              },
              marginRight: "5px",
            }}
            renderInput={(params) => <TextField {...params} size="small"  placeholder="Select Crop Sub Category" />}
            fullWidth
        />
        <Autocomplete
            // disabled={state?.action === DEF_ACTIONS.VIEW}
            // options={options}
            // // value={formData ? formData.cropCategoryDTO : ""}
            // getOptionLabel={(i) => `${i.categoryId} - ${i.description} `}
            // onChange={(event, value) => {
            //   handleChange(value);
            // }}
            fullWidth
            sx={{
              width: "214px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
              },
              marginRight: "5px",
            }}
            renderInput={(params) => <TextField {...params} size="small"  placeholder="Select Crop " />}
            fullWidth
        />

      </ActionWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/crop-varieties"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    </CardWrapper>
  );
};

export default CropVarietyList;
