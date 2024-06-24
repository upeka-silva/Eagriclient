import React from "react";

import { DataTable } from "../../components/PageLayout/Table";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";


const CreatePostList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "code", headerName: "Post Code" },
    { field: "titleEng", headerName: "Title" },
    { field: "contentEng", headerName: "Content" },
    { field: "mediaType", headerName: "Media Type" },
    { field: "tags", headerName: "Tags" },
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/agriculture-post"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    </TableWrapper>
  );
};

export default CreatePostList;
