import { useTranslation } from "react-i18next";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const CropActivityList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const { t } = useTranslation();
  const columns = [
    { field: "name", headerName: t("cropActivityPage.name") },
    {
      field: "description",
      headerName: t("cropActivityPage.activityDescription"),
    },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"crop/crop-activity"}
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

export default CropActivityList;
