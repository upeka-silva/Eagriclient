import React, { useState, useEffect } from "react";
import { DataTable } from "../../components/PageLayout/Table";

import { TableWrapper } from "../../components/PageLayout/TableWrapper";

const CropDamageList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    {field: "name", headerName: "Damage Category Name"},
    {field: "description", headerName: "Damge Categor Description"}
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
    <div>
      <TableWrapper>
        <DataTable
          loadingTable
          dataEndPoint={`crop/damage-category`}
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

export default CropDamageList;
