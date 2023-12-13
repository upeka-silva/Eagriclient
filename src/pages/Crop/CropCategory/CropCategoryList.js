import { DataTable } from "../../../components/PageLayout/Table";

const CropCategoryList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "categoryId", headerName: "Code" },
    { field: "description", headerName: "Description" },
  ];

  return (
    // <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"geo-data/crop-categories"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    // </TableWrapper>
  );
};

export default CropCategoryList;
