import React, { useState, useEffect } from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { get_CategoryList } from "../../../redux/actions/crop/cropCategory/action";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { Button, TextField, Autocomplete, Grid } from "@mui/material";

import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const BiWeeklyReportingList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    {field: "aiRegion.regionId", headerName: "Ai Region "},
    {field: "aiRegion.parentType", headerName: "Ai Region Type"},
    { field: "season.code", headerName: "Season" },
    { field: "week.weekDescription", headerName: "Week" },
  ];

  const [id, setId] = useState(null);
  const [data, setData] = useState(null);

  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [isdisable, setIsdisable] = useState({
    cat: false,
  });

  useEffect(() => {
    get_CategoryList().then(({ dataList = [] }) => {
      setOptions(dataList);
      console.log(dataList);
    });
  }, []);
  const handleChange = (value, target) => {
    console.log(value?.id);
    setId(value?.id);
    if (Object.keys(options).length > 0) {
      setShow(!show);
    }
    setIsdisable((prevState) => ({
      ...prevState,
      [target]: true,
    }));
  };

  const reset = () => {
    const allTrueIsdisable = {
      cat: false,
    };
    setIsdisable(allTrueIsdisable);
    setData(null);
    setShow(null);
  };

  console.log(options);

  return (
    <div>
      <TableWrapper>
        <ActionWrapper isLeft>
          <Grid container>
            <Grid item lg={3}>
              <FieldWrapper>
                <FieldName>Crop Category</FieldName>
                <Autocomplete
                  disabled={isdisable.cat}
                  options={options}
                  value={data}
                  // value={formData ? formData.cropCategoryDTO : ""}
                  getOptionLabel={(i) => `${i.categoryId} - ${i.description} `}
                  onChange={(event, value) => {
                    handleChange(value, "cat");
                  }}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px",
                    },
                    marginRight: "5px",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Select Crop Category"
                    />
                  )}
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

        <DataTable
          loadingTable
          dataEndPoint={`crop-look/bi-week-reporting`}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      </TableWrapper>
    </div>
  );
};

export default BiWeeklyReportingList;
