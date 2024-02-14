import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const CropPestList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "pestName", headerName: "Pest Name" },
    { field: "scientificName", headerName: "scientific Name" },
    { field: "damageSymptom", headerName: "Damage Symptom" },
    { field: "management", headerName: "Management"},
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"crop/crop-pests"}
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
