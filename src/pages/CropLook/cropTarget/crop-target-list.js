import React, { useState, useEffect } from "react";
import { DataTable } from "../../../components/PageLayout/Table";

import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const CropTargetList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    {field: "regionOrUnitDisplayName", headerName: "Ai Region/ Mahaweli Unit"},
    {field: "parentType", headerName: "Region Type"},
    { field: ["season.code", "season.description"], headerName: "Season" },
  ];

  const [id, setId] = useState(null);
  const [data, setData] = useState(null);

  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [isdisable, setIsdisable] = useState({
    cat: false,
  });

  // useEffect(() => {
  //   get_CategoryList().then(({ dataList = [] }) => {
  //     setOptions(dataList);
  //     console.log(dataList);
  //   });
  // }, []);

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
        <DataTable
          loadingTable
          dataEndPoint={`crop-look/target-seasonal-region`}
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

export default CropTargetList;
