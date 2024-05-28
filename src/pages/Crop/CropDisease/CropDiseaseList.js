import { useTranslation } from "react-i18next";
import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const CropDiseaseList = ({
  url,
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const { t } = useTranslation();
  const columns = [
    { field: "diseaseName", headerName: t("cropPage.diseaseName") },
    { field: "type", headerName: t("cropPage.type") },
    { field: "causalAgent", headerName: t("cropPage.causalAgent") },
    { field: "vector", headerName: t("cropPage.vector") },
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

export default CropDiseaseList;
