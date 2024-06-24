import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { RestartAlt } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  TextField,
  Autocomplete,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";

import { useEffect, useState } from "react";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { useTranslation } from "react-i18next";


const CropDamageReportList = ({
  url,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
  refresh,
}) => {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState("");

  const columns = [
    {
      field: "description",
      headerName: "Description",
      sortCol: ["description"],
    },
    {
      field: "damageExtent",
      headerName: "Damage Extent",
      sortCol: ["damageExtent"],
    },
    {
      field: "areaUnitValue",
      headerName: "Area Unit",
      sortCol: ["areaUnit"],
    },
    {
      field: "statusValue",
      headerName: "Status",
      sortCol: ["status"],
    },
  ];

  const [dataEndPoint, setDataEndPoint] = useState(
    "crop-damage-reporting/by-regionId"
  );

  const handleChange = (value, target) => {
    console.log({ value, target });
    setSelectedStatus(value); // Update the selected value

    setDataEndPoint(`crop-damage-reporting/by-regionId?status=${value}`);    
  };

  const reset = () => {
    setSelectedStatus(""); // Update the selected value

    setDataEndPoint("crop-damage-reporting/by-regionId");

  };

  return (
    <TableWrapper style={{ marginTop: "0px" }}>
      <ActionWrapper isLeft>
        <Grid container>
          <Grid item lg={2}>
            <FieldWrapper>
              <Select
                name="status"
                id="status"
                value={selectedStatus}
                onChange={(e) => handleChange(e?.target?.value)}
                fullWidth
                sx={{
                  borderRadius: "8px",
                }}
                size="small"
              >
                <MenuItem id="ea" value={"APPROVED"}>Approved</MenuItem>
                <MenuItem value={"UNAPPROVED"}>Unapproved</MenuItem>
              </Select>
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={reset}
                sx={{ marginTop: "5px" }}
              >
                <RestartAlt />
                {t("action.reset")}
              </Button>
            </FieldWrapper>
          </Grid>
        </Grid>
      </ActionWrapper>

      <>
        <>
          <DataTable
            loadingTable
            dataEndPoint={dataEndPoint}
            columns={columns}
            selectable
            selectedRows={selectedRows}
            selectAll={selectAll}
            onRowSelect={onRowSelect}
            unSelectAll={unSelectAll}
            refresh={refresh}
          />
        </>
      </>
    </TableWrapper>
  );
};

export default CropDamageReportList;
