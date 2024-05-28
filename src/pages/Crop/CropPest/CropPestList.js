import { useTranslation } from "react-i18next";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const CropPestList = ({
  url,
  selectedRows = [],
  cropId = null,
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const { t } = useTranslation();
  const columns = [
    { field: "pestName", headerName: t("cropPage.pestName") },
    { field: "scientificName", headerName: t("cropPage.scientificName") },
    { field: "damageSymptom", headerName: t("cropPage.damageSymptom") },
    { field: "management", headerName: t("cropPage.management") },
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={url}
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

export default CropPestList;
