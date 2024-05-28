import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { useTranslation } from "react-i18next";

const CropCategoryList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const { t } = useTranslation();
  const columns = [
    { field: "description", headerName: t("cropCategoryPage.cropCategory")},
    { field: "categoryId", headerName: t("cropCategoryPage.code") },
  ];

  return (
    <TableWrapper>
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
    </TableWrapper>
  );
};

export default CropCategoryList;
