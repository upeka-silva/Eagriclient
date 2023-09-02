import React,{useState,useEffect} from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { Add, Delete, Edit, Search, Vrpano } from "@mui/icons-material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
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
    const [data,setData] = useState(null);

    const [options, setOptions] = useState([]);
    const [show, setShow] = useState(false);
    const [isdisable, setIsdisable] = useState({
        cat: false,
    });

    useEffect(() => {
        get_CategoryList().then(({ dataList = [] }) => {
            setOptions(dataList);
            console.log(dataList)

        });
    }, []);
    const handleChange = (value, target) => {
        console.log(value?.id)
        setId(value?.id);
        if (Object.keys(options).length > 0) {
            setShow(!show);
        }
        setIsdisable(prevState => ({
            ...prevState,
            [target]: true
        }));
    }

    const reset = ()=>{
        const allTrueIsdisable = {
            cat: false,

        };
        setIsdisable(allTrueIsdisable);
        setData(null)
        setShow(null)
    }

    console.log(options)

  return (
    <div>
      <CardWrapper>

          <ActionWrapper isLeft>
              <Grid container>
                  <Grid item lg={3}>
                      <FieldWrapper>
                          <FieldName>Crop Category</FieldName>
            <Autocomplete
                disabled={isdisable.cat}
                options={options}
                value ={data}
                // value={formData ? formData.cropCategoryDTO : ""}
                getOptionLabel={(i) => `${i.categoryId} - ${i.description} `}
                onChange={(event, value) => {
                  handleChange(value,"cat");
                }}
                fullWidth
                sx={{

                    "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                    },
                    marginRight: "5px",
                }}
                renderInput={(params) => <TextField {...params} size="small"  placeholder="Select Crop Category" />}
                fullWidth
            />
                      </FieldWrapper>
                  </Grid>
                  <Grid item lg={2}>
                      <FieldWrapper>
              <Button
                  color="success"
                  variant="contained"
                  size="small"
                  onClick={reset}
                  sx={{ marginTop: "40px" }}
              >
                
                  Reset
              </Button>
                      </FieldWrapper>
                  </Grid>
              </Grid>
          </ActionWrapper>

          {show ?<>

              <DataTable

                  loadingTable
                  dataEndPoint={`geo-data/crop-sub-categories/crop-category/${id}`}
                  columns={columns}
                  selectable
                  selectedRows={selectedRows}
                  selectAll={selectAll}
                  onRowSelect={onRowSelect}
                  unSelectAll={unSelectAll}
              />
              </>:<>
              <DataTable

                  loadingTable
                  dataEndPoint={"geo-data/crop-sub-categories"}
                  columns={columns}
                  selectable
                  selectedRows={selectedRows}
                  selectAll={selectAll}
                  onRowSelect={onRowSelect}
                  unSelectAll={unSelectAll}
              />
          </>

          }


      </CardWrapper>
    </div>
  );
};

export default CropSubCategoryList;
