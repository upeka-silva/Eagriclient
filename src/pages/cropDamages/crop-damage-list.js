import React from "react";
import { DataTable } from "../../components/PageLayout/Table";

import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { useTranslation } from "react-i18next";

const CropDamageList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const {t} = useTranslation();
  const columns = [
    { field: "name", headerName: t("cropDamagePage.categoryName") },
    { field: "description", headerName: t("cropDamagePage.description") },
  ];

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
