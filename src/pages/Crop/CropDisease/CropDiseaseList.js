import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const CropDiseaseList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "diseaseName", headerName: "Disease Name" },
    { field: "type", headerName: "Type" },
    { field: "causalAgent", headerName: "Causal Agent" },
    { field: "vector", headerName: "Vector" },
  ];

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"crop/crop-diseases"}
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
