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
    { field: "id", headerName: "ID" },
    { field: "code", headerName: "Sub Category Code" },
    { field: "name", headerName: "Sub Category Name" },
    { field: "cropCategoryDTO.code", headerName: "Category Code" },
  ];

  return (
    <div>
      <CardWrapper>
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
      </CardWrapper>
    </div>
  );
};

export default CropSubCategoryList;
