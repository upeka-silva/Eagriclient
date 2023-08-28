import React,{useState,useEffect} from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import {
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Grid,
} from "@mui/material";



const CropSubCategoryList = ({

  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "subCategoryId", headerName: "Code" },
    { field: "description", headerName: "Description" },
    { field: ["subCategoryId","description"],
      join:"-",
      headerName: "Crop Category " },
  ];
const [id,setId] = useState(null);
    const handleChange = (value, target) => {
        console.log(value?.id)
        setId(value?.id);
        }

    const [options, setOptions] = useState([]);
    useEffect(() => {
        get_CategoryList().then(({ dataList = [] }) => {
            setOptions(dataList);
            console.log(dataList)

        });
    }, []);
    console.log(options)
  return (
    <div>
      <CardWrapper>

          <FieldWrapper>
            <FieldName>Category ID</FieldName>
            <Autocomplete
                // disabled={state?.action === DEF_ACTIONS.VIEW}
                options={options}
                // value={formData ? formData.cropCategoryDTO : ""}
                getOptionLabel={(i) => `${i.categoryId} - ${i.description}`}
                onChange={(event, value) => {
                  handleChange(value);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px", width:"40%",
                      marginLeft:"-10px"
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                fullWidth
            />
          </FieldWrapper>


        <DataTable
            
          loadingTable
          dataEndPoint={`geo-data/crop-sub-categories`}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      </CardWrapper>
    </div>
  );
};

export default CropSubCategoryList;
