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
    { field: "pestName", headerName: t("cropPestPage.pestName") },
    { field: "scientificName", headerName: t("cropPestPage.scientificName") },
    { field: "damageSymptom", headerName: t("cropPestPage.damageSymptom") },
    { field: "management", headerName: t("cropPestPage.management") },
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
