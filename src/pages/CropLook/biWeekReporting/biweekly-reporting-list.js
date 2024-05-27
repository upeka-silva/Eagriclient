import React, { useState } from "react";
import { DataTable } from "../../../components/PageLayout/Table";

import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { Fonts } from "../../../utils/constants/Fonts";

const BiWeeklyReportingList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "season.code", headerName: "Season" },
    { field: "week.weekDescription", headerName: "Week" },
    {
      field: "aiRegionOrMahaweliUnitDisplayName",
      headerName: "Ai Region/ Mahaweli Unit ",
    },
    { field: "week.statusLabel", headerName: "Status" },
    { field: "parentType", headerName: "Region Type" },
  ];

  const [id, setId] = useState(null);
  const [data, setData] = useState(null);

  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [isdisable, setIsdisable] = useState({
    cat: false,
  });

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <TableWrapper>
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
