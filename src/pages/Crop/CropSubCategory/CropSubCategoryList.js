import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";

const CropSubCategoryList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "code", headerName: "ID" },
    { field: "name", headerName: "Sub Category Name" },
    { field: "cropCategoryDTO", headerName: "Category Name" },
  ];

  return (
    <div>
      <CardWrapper>
        <DataTable
          loadingTable
          dataEndPoint={"geo-data/sub-crop-categories"}
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
